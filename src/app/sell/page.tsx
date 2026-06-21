import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { LeadForm, type FieldGroup } from "@/components/LeadForm";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Sell a Vehicle — Wholesale, Salvage, Export, Parts & More",
  description:
    "Sell a vehicle of any condition or title status. Tell us about the unit and OfferOnly routes it to the right buyer lane — clean wholesale, salvage, export, parts, repair, or scrap.",
  alternates: { canonical: "/sell" },
};

const titleStatuses = [
  "Clean",
  "Salvage",
  "Rebuilt",
  "Flood",
  "Junk",
  "Parts only",
  "Certificate of destruction",
  "Lien",
  "Missing title",
  "Unknown",
];

const runningOptions = [
  "Runs and drives",
  "Runs, not drivable",
  "Starts, no drive",
  "Does not start",
  "Unknown",
];

const groups: FieldGroup[] = [
  {
    legend: "Your contact",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, half: true },
      { name: "phone", label: "Phone", type: "tel", required: true, half: true },
      { name: "email", label: "Email", type: "email", required: true, half: true },
      { name: "company", label: "Company (if applicable)", type: "text", half: true },
    ],
  },
  {
    legend: "Vehicle details",
    fields: [
      { name: "vin", label: "VIN", type: "text", half: true, hint: "Improves routing accuracy." },
      { name: "mileage", label: "Mileage", type: "number", half: true },
      { name: "year", label: "Year", type: "number", half: true },
      { name: "make", label: "Make", type: "text", half: true },
      { name: "model", label: "Model", type: "text", half: true },
      { name: "trim", label: "Trim", type: "text", half: true },
      { name: "titleStatus", label: "Title status", type: "select", options: titleStatuses, half: true, required: true },
      { name: "running", label: "Running condition", type: "select", options: runningOptions, half: true, required: true },
      { name: "city", label: "Location city", type: "text", half: true },
      { name: "state", label: "Location state", type: "text", half: true },
    ],
  },
  {
    legend: "Condition & context",
    fields: [
      { name: "damageNotes", label: "Damage notes", type: "textarea", placeholder: "Describe any collision, flood, hail, fire, or mechanical damage." },
      { name: "mechanicalNotes", label: "Mechanical notes", type: "textarea", placeholder: "Engine, transmission, drivetrain, or electrical status." },
      { name: "isLien", label: "There is a lien on this vehicle", type: "checkbox", half: true },
      { name: "isInsurance", label: "This is insurance-related", type: "checkbox", half: true },
      { name: "isRepo", label: "This is a repossession", type: "checkbox", half: true },
      { name: "isFleet", label: "This is a fleet vehicle", type: "checkbox", half: true },
      { name: "isTowStorage", label: "This is at a tow / storage yard", type: "checkbox", half: true },
      { name: "notes", label: "Anything else", type: "textarea", placeholder: "Additional notes for our review team." },
    ],
  },
];

const benefits = [
  "Any title status — clean, salvage, rebuilt, flood, junk, or missing",
  "Any condition — runs and drives to non-running and parts-only",
  "Routed to the right lane: wholesale, export, salvage, parts, repair, scrap",
  "Photos and VIN-based intake coming in a later phase",
];

export default function SellPage() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>Sell a vehicle</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Tell us about your vehicle
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Share what you have and OfferOnly will route the opportunity to
              buyers who understand its real value. There&apos;s no obligation —
              the more detail you provide, the better the match.
            </p>
            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-ink">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <LeadForm
            formName="Sell a Vehicle"
            leadType="sell"
            groups={groups}
            submitLabel="Submit Vehicle"
            successTitle="Your vehicle opportunity is in."
            successBody="Our review team will classify the unit and connect it with the right buyer lane. We'll reach out with interest, offers, or next steps."
          />
        </div>
      </Container>
    </Section>
  );
}
