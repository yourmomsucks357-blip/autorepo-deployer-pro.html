/**
 * Client-side lead submission helper.
 *
 * In the normal (server / Node) build, this POSTs to the `/api/leads` route,
 * which logs the lead and fans it out to any configured delivery sinks.
 *
 * In a STATIC export (e.g. uploaded to GoDaddy basic web hosting where there is
 * no Node server), there is no `/api/leads` endpoint. The static build sets
 * `NEXT_PUBLIC_STATIC_EXPORT=1`, and we resolve the submission client-side so
 * the form still confirms success to the visitor instead of erroring.
 */
export const IS_STATIC_EXPORT =
  process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

export type LeadPayload = {
  type: string;
  formName: string;
  fields: Record<string, string | string[]>;
  meta?: Record<string, unknown>;
  honeypot?: string;
};

export async function submitLead(payload: LeadPayload): Promise<void> {
  if (IS_STATIC_EXPORT) {
    if (typeof window !== "undefined") {
      console.info("[OfferOnly][lead][static]", payload);
    }
    return;
  }

  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
  };
  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
}
