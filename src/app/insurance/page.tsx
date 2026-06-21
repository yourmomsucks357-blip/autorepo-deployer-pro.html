import type { Metadata } from "next";
import { Container, Section, SectionHeading, Card, Eyebrow } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { LeadForm, type FieldGroup } from "@/components/LeadForm";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Insurance & Total Loss Vehicle Disposition",
  description:
    "OfferOnly helps insurance companies, claims and total-loss departments route total losses, theft recoveries, flood, hail, fire, and collision vehicles to salvage, rebuild, parts, and export buyers.",
  alternates: { canonical: "/insurance" },
};

const vehicleTypes = [
  "Total losses",
  "Collision vehicles",
  "Flood vehicles",
  "Hail vehicles",
  "Fire vehicles",
  "Theft recoveries",
  "Non-running claim vehicles",
  "Salvage vehicles",
  "Storage-heavy vehicles",
  "Export-value units",
  "Parts-value units",
];

const goals = [
  "Move units faster and reduce storage drag",
  "Reach salvage, export, parts, rebuild, and scrap buyers",
  "Improve recovery value on every claim",
  "Route different claim vehicles to different buyer lanes",
];

const groups: FieldGroup[] = [
  {
    legend: "Company contact",
    fields: [
      { name: "company", label: "Company / department", type: "text", required: true, half: true },
      { name: "name", label: "Contact name", type: "text", required: true, half: true },
      { name: "role", label: "Role", type: "select", options: ["Claims", "Total loss", "Adjuster", "Salvage handler", "Recovery team", "Other"], half: true },
      { name: "phone", label: "Phone", type: "tel", required: true, half: true },
      { name: "email", label: "Email", type: "email", required: true, half: true },
      { name: "volume", label: "Approx. monthly vehicle volume", type: "text", half: true, placeholder: "e.g. 25–50 units" },
    ],
  },
  {
    legend: "Vehicle types",
    fields: [
      { name: "vehicleTypes", label: "Vehicle types you need to move", type: "checkboxes", options: vehicleTypes, required: true },
      { name: "message", label: "Tell us about your disposition needs", type: "textarea", placeholder: "Locations, storage situations, and recovery goals." },
    ],
  },
];

export default function InsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Insurance & companies"
        title="Smarter disposition for total-loss and claim vehicles"
        intro="Insurance companies, claims and total-loss departments, adjusters, salvage handlers, and recovery teams use OfferOnly to route claim vehicles to the right buyer lanes."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Built for insurance"
                title="Every claim vehicle has a different best buyer"
                intro="A flood vehicle, a hail unit, a theft recovery, and a clean total loss each have distinct recovery paths. OfferOnly routes them accordingly."
              />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {vehicleTypes.map((t) => (
                  <div key={t} className="rounded-lg border border-line bg-surface px-4 py-3 text-sm font-medium text-ink">
                    {t}
                  </div>
                ))}
              </div>
              <Card className="mt-8 bg-ink text-white">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
                  Insurance goals
                </h3>
                <ul className="mt-4 space-y-3">
                  {goals.map((g) => (
                    <li key={g} className="flex items-start gap-3 text-sm text-white/85">
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                      {g}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div>
              <Eyebrow>Company inquiry</Eyebrow>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink">
                Start a conversation
              </h2>
              <p className="mt-2 text-muted">
                Tell us about your vehicle volume and disposition needs.
              </p>
              <div className="mt-6">
                <LeadForm
                  formName="Insurance / Company Inquiry"
                  groups={groups}
                  submitLabel="Submit Inquiry"
                  successTitle="Thanks — we'll be in touch."
                  successBody="Our team will follow up to set up a disposition plan tailored to your claim vehicles and recovery goals."
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
