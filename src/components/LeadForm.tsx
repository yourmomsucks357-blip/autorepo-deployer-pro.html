"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { CheckIcon } from "@/components/icons";

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "checkboxes";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  half?: boolean; // render at half width on larger screens
  hint?: string;
};

export type FieldGroup = {
  legend?: string;
  fields: Field[];
};

const inputClass =
  "mt-1.5 block w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm placeholder:text-muted/70 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 focus:outline-none";

export function LeadForm({
  formName,
  groups,
  submitLabel = "Submit",
  successTitle = "Thank you — we received your submission.",
  successBody = "Our team will review the details and follow up with next steps.",
}: {
  formName: string;
  groups: FieldGroup[];
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
}) {
  const allFields = useMemo(
    () => groups.flatMap((g) => g.fields),
    [groups]
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(formData: FormData) {
    const next: Record<string, string> = {};
    for (const f of allFields) {
      if (!f.required) continue;
      if (f.type === "checkboxes") {
        if (!formData.getAll(f.name).length) {
          next[f.name] = "Please select at least one option.";
        }
        continue;
      }
      const value = (formData.get(f.name) as string | null)?.trim();
      if (!value) {
        next[f.name] = "This field is required.";
        continue;
      }
      if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        next[f.name] = "Please enter a valid email address.";
      }
    }
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`field-${first}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    // Phase 1: no backend. Capture intent locally and confirm to the user.
    // A later phase wires this to lead storage + notifications.
    if (typeof window !== "undefined") {
      console.info(`[OfferOnly] ${formName} submission`, Object.fromEntries(formData));
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-line bg-white p-8 text-center shadow-sm"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-700">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-xl font-bold text-ink">{successTitle}</h3>
        <p className="mx-auto mt-2 max-w-md text-muted">{successBody}</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-brand-700 hover:text-brand-600"
        >
          Submit another &rarr;
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="space-y-8">
        {groups.map((group, gi) => (
          <fieldset key={gi} className="space-y-5">
            {group.legend ? (
              <legend className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                {group.legend}
              </legend>
            ) : null}
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
              {group.fields.map((f) => (
                <FieldControl
                  key={f.name}
                  field={f}
                  error={errors[f.name]}
                />
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <button
        type="submit"
        className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:w-auto"
      >
        {submitLabel}
      </button>
      <p className="mt-3 text-xs text-muted">
        By submitting, you agree to be contacted about this vehicle opportunity.
      </p>
    </form>
  );
}

function FieldControl({ field, error }: { field: Field; error?: string }) {
  const span = field.type === "textarea" || field.type === "checkboxes" || !field.half
    ? "sm:col-span-2"
    : "sm:col-span-1";
  const id = `field-${field.name}`;

  if (field.type === "checkbox") {
    return (
      <div className={span} id={id}>
        <label className="flex items-start gap-3 text-sm text-ink">
          <input
            type="checkbox"
            name={field.name}
            value="yes"
            className="mt-0.5 h-4 w-4 rounded border-line text-brand-600 focus:ring-brand-600"
          />
          <span>{field.label}</span>
        </label>
      </div>
    );
  }

  if (field.type === "checkboxes") {
    return (
      <fieldset className={span} id={id}>
        <legend className="text-sm font-medium text-ink">
          {field.label}
          {field.required ? <span className="text-brand-600"> *</span> : null}
        </legend>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {field.options?.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2.5 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink"
            >
              <input
                type="checkbox"
                name={field.name}
                value={opt}
                className="h-4 w-4 rounded border-line text-brand-600 focus:ring-brand-600"
              />
              {opt}
            </label>
          ))}
        </div>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </fieldset>
    );
  }

  return (
    <div className={span} id={id}>
      <label htmlFor={field.name} className="text-sm font-medium text-ink">
        {field.label}
        {field.required ? <span className="text-brand-600"> *</span> : null}
      </label>
      {field.type === "textarea" ? (
        <textarea
          id={field.name}
          name={field.name}
          rows={4}
          placeholder={field.placeholder}
          className={inputClass}
        />
      ) : field.type === "select" ? (
        <select id={field.name} name={field.name} defaultValue="" className={inputClass}>
          <option value="" disabled>
            {field.placeholder ?? "Select an option"}
          </option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          className={inputClass}
        />
      )}
      {field.hint ? (
        <p className="mt-1 text-xs text-muted">{field.hint}</p>
      ) : null}
      {error ? <ErrorText>{error}</ErrorText> : null}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs font-medium text-red-600">{children}</p>;
}
