import { NextResponse } from "next/server";
import { normalizeLead, recordLead } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const result = normalizeLead(body as Record<string, unknown>);
  if (!result.ok) {
    // Silently accept spam so bots don't learn the honeypot exists.
    if (result.reason === "spam") {
      return NextResponse.json({ ok: true, id: "ignored" });
    }
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  try {
    const { id, delivered } = await recordLead(result.lead);
    return NextResponse.json({ ok: true, id, delivered });
  } catch (error) {
    console.error("[OfferOnly][lead] unexpected failure:", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't record your submission. Please try again." },
      { status: 500 }
    );
  }
}
