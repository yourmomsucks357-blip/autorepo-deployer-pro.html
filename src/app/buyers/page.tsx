import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { LeadForm, type FieldGroup } from "@/components/LeadForm";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Join the Buyer Network — Dealers, Exporters, Salvage & Parts Buyers",
  description:
    "Join the OfferOnly buyer network. Set your buyer type, regions, accepted title statuses, and vehicle preferences to receive matched vehicle opportunities.",
  alternates: { canonical: "/buyers" },
};

const buyerTypes = [
  "Dealer",
  "Wholesaler",
  "Exporter",
  "Salvage buyer",
  "Parts buyer",
  "Repair shop",
  "Body shop",
  "Rebuilder",
  "Collector",
  "Scrap buyer",
  "Fleet buyer",
  "Insurance salvage buyer",
  "Towing / storage buyer",
  "Specialty buyer",
];

const vehicleTypesWanted = [
  "Clean wholesale",
  "Insurance total loss",
  "Salvage / rebuilt",
  "Export units",
  "Repo / surrender",
  "Fleet / rental",
  "Parts / non-running",
  "Scrap",
  "Specialty / collector",
];

const titleStatusesAccepted = [
  "Clean",
  "Salvage",
  "Rebuilt",
  "Flood",
  "Junk",
  "Parts only",
  "Missing title",
];

const groups: FieldGroup[] = [
  {
    legend: "Business contact",
    fields: [
      { name: "businessName", label: "Business name", type: "text", required: true, half: true },
      { name: "contactName", label: "Contact name", type: "text", required: true, half: true },
      { name: "phone", label: "Phone", type: "tel", required: true, half: true },
      { name: "email", label: "Email", type: "email", required: true, half: true },
      { name: "buyerType", label: "Buyer type", type: "select", options: buyerTypes, required: true, half: true },
      { name: "city", label: "City", type: "text", half: true },
      { name: "state", label: "State", type: "text", half: true },
      { name: "regions", label: "States / regions served", type: "text", half: true, placeholder: "e.g. GA, FL, Southeast US" },
    ],
  },
  {
    legend: "Buying preferences",
    fields: [
      { name: "vehicleTypesWanted", label: "Vehicle types wanted", type: "checkboxes", options: vehicleTypesWanted, required: true },
      { name: "titleStatusesAccepted", label: "Title statuses accepted", type: "checkboxes", options: titleStatusesAccepted },
      { name: "runningPreference", label: "Running / non-running preference", type: "select", options: ["Running only", "Non-running only", "Both"], half: true },
      { name: "exportInterest", label: "Export interest", type: "checkbox", half: true },
      { name: "salvageInterest", label: "Salvage interest", type: "checkbox", half: true },
      { name: "partsInterest", label: "Parts interest", type: "checkbox", half: true },
      { name: "scrapInterest", label: "Scrap interest", type: "checkbox", half: true },
      { name: "notes", label: "Notes", type: "textarea", placeholder: "Tell us about the makes, models, or volumes you focus on." },
    ],
  },
];

const benefits = [
  "Receive opportunities matched to your lane — not random blasts",
  "Set your regions, title statuses, and vehicle preferences",
  "Reach across clean wholesale, salvage, export, parts, and scrap",
  "Be first in line when units fit your profile",
];

export default function BuyersPage() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>Buyer network</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Join the OfferOnly buyer network
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Dealers, wholesalers, exporters, salvage and parts buyers,
              rebuilders, collectors, and specialty buyers all have a place.
              Set your preferences and get the opportunities that fit.
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
            formName="Join the Buyer Network"
            groups={groups}
            submitLabel="Join the Network"
            successTitle="Welcome to the buyer network."
            successBody="We'll set up your buyer profile and start matching you with vehicle opportunities that fit your lane and region."
          />
        </div>
      </Container>
    </Section>
  );
}
