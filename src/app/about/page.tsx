import type { Metadata } from "next";
import { Container, Section, SectionHeading, Card, Button } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { CheckIcon } from "@/components/icons";
import { buyerLanes } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — A Vehicle Opportunity Platform",
  description:
    "OfferOnly exists because every vehicle does not belong in the same lane. We identify each opportunity and connect it to the right buyer network.",
  alternates: { canonical: "/about" },
};

const beliefs = [
  "A clean-title wholesale unit and an insurance total loss have different best buyers.",
  "A flood vehicle, a repo, a non-running car, and a parts unit all exit differently.",
  "Buyers are far broader than dealers — exporters, salvage, parts, and specialty all matter.",
  "Insurance, finance, fleet, and towing companies are core users, not afterthoughts.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About OfferOnly"
        title="Every vehicle has a best exit path"
        intro="OfferOnly is a vehicle opportunity platform. Its purpose is to take a vehicle opportunity and route it to the buyer type most likely to understand its real value."
      />

      <Section>
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Why we exist"
                title="Not every vehicle belongs in the same lane"
              />
              <p className="mt-4 text-lg leading-relaxed text-muted">
                A clean title wholesale unit, insurance total loss, repo, export
                unit, flood vehicle, damaged vehicle, non-running unit, parts
                vehicle, and scrap vehicle all have different likely best
                buyers. Treating them the same leaves value on the table.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                OfferOnly is built to identify the opportunity and connect it to
                the right buyer lane — from clean wholesale to total losses,
                salvage, export, parts, repair, repossessions, fleet units, and
                scrap.
              </p>
            </div>
            <Card className="bg-surface">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                What we believe
              </h3>
              <ul className="mt-5 space-y-4">
                {beliefs.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-ink">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    {b}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="The core idea"
            title="Route every unit to the buyer who values it most"
            align="center"
          />
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {buyerLanes.map((lane) => (
              <span
                key={lane}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink"
              >
                {lane}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-muted">
            The future platform will evaluate each unit by VIN, title status,
            condition, damage, mileage, location, vehicle type, demand, parts
            value, export value, salvage value, wholesale value, and buyer
            appetite — then rank the best buyer lanes.
          </p>
          <div className="mt-8 text-center">
            <Button href="/how-it-works">See how it works</Button>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
