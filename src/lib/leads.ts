import "server-only";
import { randomUUID } from "node:crypto";

/**
 * Server-side lead pipeline.
 *
 * Every form on the site (sell, buyer, insurance, contact, snap) POSTs to
 * `/api/leads`, which hands the payload to `recordLead`. A lead is always
 * written to the server log (visible in Vercel's runtime logs) and then
 * forwarded to whichever delivery sinks are configured via environment
 * variables. Nothing here requires a database to function — sinks are opt-in:
 *
 *   LEAD_WEBHOOK_URL        POST the full JSON lead to any HTTPS endpoint
 *                           (Zapier/Make/your own API, etc.)
 *   LEAD_SLACK_WEBHOOK_URL  Slack Incoming Webhook — posts a readable summary
 *   RESEND_API_KEY          + LEAD_NOTIFY_EMAIL (+ optional LEAD_FROM_EMAIL):
 *                           emails the lead via Resend's HTTP API
 *   LEAD_STORE_FILE         append newline-delimited JSON to this path
 *                           (great for local dev / self-hosting; skipped on
 *                           Vercel where the filesystem is ephemeral)
 *
 * With nothing configured, leads still land in the server logs, so they are
 * never silently dropped.
 */

export const LEAD_TYPES = ["sell", "buyer", "insurance", "contact", "snap"] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

export type LeadInput = {
  type?: unknown;
  formName?: unknown;
  fields?: unknown;
  meta?: unknown;
  honeypot?: unknown;
};

export type Lead = {
  id: string;
  type: LeadType;
  formName: string;
  fields: Record<string, string | string[]>;
  meta: Record<string, unknown>;
  receivedAt: string;
};

export type NormalizeResult =
  | { ok: true; lead: Lead }
  | { ok: false; reason: "spam" | "invalid"; error: string };

const MAX_FIELDS = 80;
const MAX_KEY_LEN = 200;
const MAX_VALUE_LEN = 8000;
const MAX_ARRAY_ITEMS = 50;
const MAX_META_BYTES = 20_000;

function isLeadType(value: unknown): value is LeadType {
  return typeof value === "string" && (LEAD_TYPES as readonly string[]).includes(value);
}

function clampString(value: unknown): string {
  return String(value ?? "").slice(0, MAX_VALUE_LEN);
}

function normalizeFields(raw: unknown): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {};
  if (!raw || typeof raw !== "object") return out;
  let count = 0;
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (count >= MAX_FIELDS) break;
    const k = key.slice(0, MAX_KEY_LEN);
    if (Array.isArray(value)) {
      out[k] = value.slice(0, MAX_ARRAY_ITEMS).map(clampString).filter(Boolean);
    } else if (value !== undefined && value !== null && value !== "") {
      out[k] = clampString(value).trim();
    } else {
      continue;
    }
    count += 1;
  }
  return out;
}

function normalizeMeta(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "object") return {};
  try {
    const json = JSON.stringify(raw);
    if (json.length > MAX_META_BYTES) {
      return { _truncated: true };
    }
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function hasContent(fields: Record<string, string | string[]>): boolean {
  return Object.values(fields).some((v) =>
    Array.isArray(v) ? v.length > 0 : v.trim().length > 0
  );
}

export function normalizeLead(input: LeadInput): NormalizeResult {
  // Honeypot: a hidden field bots tend to fill. If present, drop silently.
  if (typeof input.honeypot === "string" && input.honeypot.trim() !== "") {
    return { ok: false, reason: "spam", error: "Rejected." };
  }
  if (!isLeadType(input.type)) {
    return { ok: false, reason: "invalid", error: "Unknown submission type." };
  }
  const fields = normalizeFields(input.fields);
  if (!hasContent(fields)) {
    return { ok: false, reason: "invalid", error: "Submission was empty." };
  }
  const formName =
    typeof input.formName === "string" && input.formName.trim()
      ? input.formName.slice(0, MAX_KEY_LEN)
      : input.type;
  return {
    ok: true,
    lead: {
      id: randomUUID(),
      type: input.type,
      formName,
      fields,
      meta: normalizeMeta(input.meta),
      receivedAt: new Date().toISOString(),
    },
  };
}

function summarize(lead: Lead): string {
  const parts = Object.entries(lead.fields)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .filter(Boolean);
  return `New OfferOnly lead — ${lead.formName} (${lead.type})\n${parts.join("\n")}`;
}

async function postJson(url: string, body: unknown): Promise<void> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
}

async function deliverWebhook(lead: Lead): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  await postJson(url, lead);
}

async function deliverSlack(lead: Lead): Promise<void> {
  const url = process.env.LEAD_SLACK_WEBHOOK_URL;
  if (!url) return;
  await postJson(url, { text: summarize(lead) });
}

async function deliverEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return;
  const from = process.env.LEAD_FROM_EMAIL || "OfferOnly <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      subject: `New lead: ${lead.formName}`,
      text: `${summarize(lead)}\n\nLead ID: ${lead.id}\nReceived: ${lead.receivedAt}`,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend HTTP ${res.status}`);
  }
}

async function deliverFile(lead: Lead): Promise<void> {
  const file = process.env.LEAD_STORE_FILE;
  // Vercel's filesystem is read-only/ephemeral, so skip file storage there.
  if (!file || process.env.VERCEL) return;
  const { appendFile, mkdir } = await import("node:fs/promises");
  const path = await import("node:path");
  await mkdir(path.dirname(file), { recursive: true });
  await appendFile(file, JSON.stringify(lead) + "\n", "utf8");
}

export type RecordResult = { id: string; delivered: string[] };

export async function recordLead(lead: Lead): Promise<RecordResult> {
  // Always log — this is the baseline "it goes somewhere" guarantee.
  console.log("[OfferOnly][lead]", JSON.stringify(lead));

  const sinks: Array<[string, Promise<void>]> = [
    ["webhook", deliverWebhook(lead)],
    ["slack", deliverSlack(lead)],
    ["email", deliverEmail(lead)],
    ["file", deliverFile(lead)],
  ];

  const results = await Promise.allSettled(sinks.map(([, p]) => p));
  const delivered: string[] = ["log"];
  results.forEach((r, i) => {
    const name = sinks[i][0];
    if (r.status === "fulfilled") {
      // Only count sinks that were actually configured (the deliver* helpers
      // resolve immediately when their env var is missing). We can't tell those
      // apart from a real no-op send, so we report configured sinks via env.
      if (isSinkConfigured(name)) delivered.push(name);
    } else {
      console.error(`[OfferOnly][lead] sink "${name}" failed:`, r.reason);
    }
  });
  return { id: lead.id, delivered };
}

function isSinkConfigured(name: string): boolean {
  switch (name) {
    case "webhook":
      return Boolean(process.env.LEAD_WEBHOOK_URL);
    case "slack":
      return Boolean(process.env.LEAD_SLACK_WEBHOOK_URL);
    case "email":
      return Boolean(process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL);
    case "file":
      return Boolean(process.env.LEAD_STORE_FILE && !process.env.VERCEL);
    default:
      return false;
  }
}
