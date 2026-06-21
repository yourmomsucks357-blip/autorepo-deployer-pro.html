"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import {
  scoreVehicle,
  TITLE_OPTIONS,
  RUNNING_OPTIONS,
  DAMAGE_OPTIONS,
  type ScoreResult,
  type TitleStatus,
  type RunningStatus,
  type DamageType,
} from "@/lib/scoring";
import { CheckIcon, ArrowRightIcon, RecycleIcon } from "@/components/icons";
import { submitLead } from "@/lib/leadClient";

type Photo = { id: string; url: string; name: string };

type Details = {
  vin: string;
  year: string;
  make: string;
  model: string;
  mileage: string;
  titleStatus: TitleStatus | "";
  running: RunningStatus | "";
  damage: DamageType | "";
  city: string;
  state: string;
  notes: string;
};

const emptyDetails: Details = {
  vin: "",
  year: "",
  make: "",
  model: "",
  mileage: "",
  titleStatus: "",
  running: "",
  damage: "",
  city: "",
  state: "",
  notes: "",
};

const fieldClass =
  "mt-1.5 block w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink shadow-sm placeholder:text-muted/70 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 focus:outline-none";

const STEPS = ["Photos", "Details", "Result"];

export function SnapFlow() {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs on unmount.
  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addPhotos(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const next = files.map((f) => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 7)}`,
      url: URL.createObjectURL(f),
      name: f.name,
    }));
    setPhotos((prev) => [...prev, ...next]);
    e.target.value = "";
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
  }

  function update<K extends keyof Details>(key: K, value: Details[K]) {
    setDetails((d) => ({ ...d, [key]: value }));
  }

  function runScore() {
    const res = scoreVehicle({
      vin: details.vin || undefined,
      year: details.year ? Number(details.year) : undefined,
      make: details.make || undefined,
      model: details.model || undefined,
      mileage: details.mileage ? Number(details.mileage) : undefined,
      titleStatus: (details.titleStatus || "unknown") as TitleStatus,
      running: (details.running || "unknown") as RunningStatus,
      damage: (details.damage || "unknown") as DamageType,
      photoCount: photos.length,
    });
    setResult(res);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    if (!contact.name.trim() || (!contact.phone.trim() && !contact.email.trim())) {
      setStatus("error");
      setSubmitError("Add your name and a phone number or email so we can reach you.");
      return;
    }

    const fields: Record<string, string> = {
      ...details,
      photoCount: String(photos.length),
      name: contact.name.trim(),
      phone: contact.phone.trim(),
      email: contact.email.trim(),
    };

    setStatus("submitting");
    setSubmitError(null);
    try {
      await submitLead({
        type: "snap",
        formName: "Snap Before You Scrap",
        fields,
        meta: {
          path: "/snap",
          result: result
            ? {
                primary: result.primary.label,
                worthMoreThanScrap: result.worthMoreThanScrap,
                lanes: result.lanes,
              }
            : null,
        },
      });
      setStatus("idle");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus("error");
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  function reset() {
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    setPhotos([]);
    setDetails(emptyDetails);
    setResult(null);
    setContact({ name: "", phone: "", email: "" });
    setSubmitted(false);
    setStatus("idle");
    setSubmitError(null);
    setStep(0);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700">
          <CheckIcon className="h-8 w-8" />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-ink">Sent to OfferOnly</h2>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          Your unit is in the queue. We&apos;ll route it to the right buyer lane
          and follow up with interest or offers before it ever hits scrap.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Snap another vehicle
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-7">
      {/* Stepper */}
      <ol className="mb-6 flex items-center gap-2">
        {STEPS.map((label, i) => {
          const state = i < step ? "done" : i === step ? "current" : "todo";
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                  state === "done"
                    ? "bg-brand-600 text-white"
                    : state === "current"
                      ? "bg-brand-50 text-brand-700 ring-2 ring-brand-600"
                      : "bg-surface text-muted"
                }`}
              >
                {state === "done" ? <CheckIcon className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={`hidden text-sm font-medium sm:block ${
                  state === "todo" ? "text-muted" : "text-ink"
                }`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 ? (
                <span className="ml-1 hidden h-px flex-1 bg-line sm:block" />
              ) : null}
            </li>
          );
        })}
      </ol>

      {/* Step 1: Photos */}
      {step === 0 ? (
        <div>
          <h2 className="text-xl font-bold text-ink">Snap a few photos</h2>
          <p className="mt-1 text-sm text-muted">
            Use your phone camera. Photos sharpen the routing — but you can skip
            and add them later.
          </p>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={addPhotos}
            className="sr-only"
            aria-label="Add vehicle photos"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-5 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-surface px-6 py-10 text-center transition-colors hover:border-brand-600"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-white">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
                <circle cx="12" cy="13" r="3.2" />
              </svg>
            </span>
            <span className="text-sm font-semibold text-ink">Take or upload photos</span>
            <span className="text-xs text-muted">VIN plate, damage, dash, corners</span>
          </button>

          {photos.length > 0 ? (
            <div className="mt-5 grid grid-cols-3 gap-3">
              {photos.map((p) => (
                <div key={p.id} className="relative aspect-square overflow-hidden rounded-xl border border-line">
                  {/* eslint-disable-next-line @next/next/no-img-element -- client-side camera blob URL, not a remote asset */}
                  <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(p.id)}
                    className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-ink/70 text-white"
                    aria-label={`Remove ${p.name}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-muted">
              {photos.length} photo{photos.length === 1 ? "" : "s"} added
            </span>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Next: Details
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}

      {/* Step 2: Details */}
      {step === 1 ? (
        <div>
          <h2 className="text-xl font-bold text-ink">Vehicle details</h2>
          <p className="mt-1 text-sm text-muted">
            A few quick fields. Anything you don&apos;t know, leave on
            &ldquo;Not sure&rdquo;.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
            <div className="col-span-2">
              <label htmlFor="snap-vin" className="text-sm font-medium text-ink">VIN</label>
              <input id="snap-vin" value={details.vin} onChange={(e) => update("vin", e.target.value.toUpperCase())} placeholder="17-character VIN" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="snap-year" className="text-sm font-medium text-ink">Year</label>
              <input id="snap-year" inputMode="numeric" value={details.year} onChange={(e) => update("year", e.target.value.replace(/[^0-9]/g, ""))} placeholder="2018" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="snap-mileage" className="text-sm font-medium text-ink">Mileage</label>
              <input id="snap-mileage" inputMode="numeric" value={details.mileage} onChange={(e) => update("mileage", e.target.value.replace(/[^0-9]/g, ""))} placeholder="142000" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="snap-make" className="text-sm font-medium text-ink">Make</label>
              <input id="snap-make" value={details.make} onChange={(e) => update("make", e.target.value)} placeholder="Ford" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="snap-model" className="text-sm font-medium text-ink">Model</label>
              <input id="snap-model" value={details.model} onChange={(e) => update("model", e.target.value)} placeholder="F-150" className={fieldClass} />
            </div>
            <div className="col-span-2">
              <label htmlFor="snap-title" className="text-sm font-medium text-ink">Title status</label>
              <select id="snap-title" value={details.titleStatus} onChange={(e) => update("titleStatus", e.target.value as TitleStatus)} className={fieldClass}>
                <option value="">Not sure</option>
                {TITLE_OPTIONS.filter((o) => o.value !== "unknown").map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="snap-running" className="text-sm font-medium text-ink">Running condition</label>
              <select id="snap-running" value={details.running} onChange={(e) => update("running", e.target.value as RunningStatus)} className={fieldClass}>
                <option value="">Not sure</option>
                {RUNNING_OPTIONS.filter((o) => o.value !== "unknown").map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="snap-damage" className="text-sm font-medium text-ink">Main damage</label>
              <select id="snap-damage" value={details.damage} onChange={(e) => update("damage", e.target.value as DamageType)} className={fieldClass}>
                <option value="">Not sure</option>
                {DAMAGE_OPTIONS.filter((o) => o.value !== "unknown").map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="snap-city" className="text-sm font-medium text-ink">City</label>
              <input id="snap-city" value={details.city} onChange={(e) => update("city", e.target.value)} placeholder="Macon" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="snap-state" className="text-sm font-medium text-ink">State</label>
              <input id="snap-state" value={details.state} onChange={(e) => update("state", e.target.value)} placeholder="GA" className={fieldClass} />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button type="button" onClick={() => setStep(0)} className="rounded-xl px-4 py-3 text-sm font-semibold text-ink hover:bg-surface">
              Back
            </button>
            <button type="button" onClick={runScore} className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
              Check the value
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}

      {/* Step 3: Result */}
      {step === 2 && result ? (
        <div>
          <div
            className={`rounded-2xl p-5 ${
              result.worthMoreThanScrap
                ? "bg-brand-50 ring-1 ring-brand-600/30"
                : "bg-surface ring-1 ring-line"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${result.worthMoreThanScrap ? "bg-brand-600 text-white" : "bg-ink text-white"}`}>
                <RecycleIcon className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-ink">{result.verdict}</h2>
                <p className="mt-1 text-sm text-muted">
                  Best initial path:{" "}
                  <span className="font-semibold text-ink">{result.primary.label}</span>
                </p>
              </div>
            </div>
          </div>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-700">
            Buyer-lane fit
          </h3>
          <div className="mt-3 space-y-3">
            {result.lanes.map((lane) => (
              <div key={lane.key}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink">{lane.label}</span>
                  <span className="font-semibold text-ink">{lane.score}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface">
                  <div
                    className={`h-full rounded-full ${lane.key === "scrap" ? "bg-muted" : "bg-brand-600"}`}
                    style={{ width: `${lane.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {result.missingInfo.length > 0 ? (
            <div className="mt-5 rounded-xl border border-line bg-surface p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Add to improve routing
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.missingInfo.map((m) => (
                  <span key={m} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink ring-1 ring-line">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* Submit to OfferOnly */}
          <div className="mt-7 border-t border-line pt-6">
            <h3 className="text-base font-bold text-ink">Send it to the buyer network</h3>
            <p className="mt-1 text-sm text-muted">
              Add your contact and we&apos;ll route this opportunity to matching
              buyers.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <input value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} placeholder="Name" className={fieldClass} aria-label="Name" />
              <input value={contact.phone} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} placeholder="Phone" className={fieldClass} aria-label="Phone" />
              <input value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} placeholder="Email" className={fieldClass} aria-label="Email" />
            </div>
            <div className="mt-5 flex items-center justify-between gap-3">
              <button type="button" onClick={() => setStep(1)} className="rounded-xl px-4 py-3 text-sm font-semibold text-ink hover:bg-surface">
                Edit details
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send to OfferOnly"}
                {status === "submitting" ? null : <ArrowRightIcon className="h-4 w-4" />}
              </button>
            </div>
            {submitError ? (
              <p role="alert" className="mt-3 text-sm font-medium text-red-600">
                {submitError}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
