import type { Metadata } from "next";
import { Container, Section, SectionHeading, Pill } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { vehicleTypes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Vehicle Types — From Clean Wholesale to Salvage, Parts & Scrap",
  description:
    "OfferOnly handles every kind of vehicle opportunity: clean wholesale, insurance total loss, flood, hail, salvage, rebuilt, repo, fleet, export, parts, non-running, storage-lien, and scrap vehicles.",
  alternates: { canonical: "/vehicle-types" },
};

const groupOrder = [
  "Wholesale & Retail",
  "Insurance & Claims",
  "Salvage & Rebuild",
  "Finance & Repo",
  "Fleet & Rental",
  "Export & Specialty",
  "Parts & Mechanical",
  "Towing & Storage",
  "Scrap",
];

export default function VehicleTypesPage() {
  const byGroup = groupOrder
    .map((group) => ({
      group,
      items: vehicleTypes.filter((v) => v.group === group),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Vehicle types"
        title="Different vehicles, different best buyers"
        intro="Each category below explains what it is, why normal buyers may not value it correctly, and which buyer types are most likely to be interested."
      />

      {byGroup.map((group, gi) => (
        <Section key={group.group} muted={gi % 2 === 1}>
          <Container>
            <SectionHeading eyebrow={group.group} title={`${group.group} vehicles`} />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((v) => (
                <article
                  key={v.slug}
                  className="flex flex-col rounded-xl border border-line bg-white p-6"
                >
                  <h3 className="text-lg font-semibold text-ink">{v.name}</h3>
                  <p className="mt-3 text-sm text-muted">
                    <span className="font-semibold text-ink">What it is: </span>
                    {v.what}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    <span className="font-semibold text-ink">Why it&apos;s different: </span>
                    {v.why}
                  </p>
                  <div className="mt-4 border-t border-line pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                      Likely buyers
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {v.buyers.map((b) => (
                        <Pill key={b}>{b}</Pill>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      <CtaBand
        title="Not sure which lane your vehicle fits?"
        body="Submit the unit and OfferOnly will classify it and route it to the right buyer network."
      />
    </>
  );
}
