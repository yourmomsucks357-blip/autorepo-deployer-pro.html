import type { Metadata } from "next";
import { Container, Section, SectionHeading, Card } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { howItWorksSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "How It Works — Vehicle Routing & Buyer Matching",
  description:
    "Submit vehicle information, OfferOnly classifies the opportunity by buyer lane, the right buyers review it, and you receive interest, offers, or next-step options.",
  alternates: { canonical: "/how-it-works" },
};

const futureSteps = [
  "VIN-based intake",
  "Photo upload",
  "Condition disclosure",
  "Title status classification",
  "Buyer matching",
  "Offer tracking",
  "Status tracking",
  "External syndication",
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="From a vehicle opportunity to the right buyer"
        intro="OfferOnly reviews each unit, classifies it by buyer lane, and routes it to qualified buyers — keeping the process organized by VIN."
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="The process"
            title="Five steps from submission to next steps"
          />
          <div className="mt-12 space-y-6">
            {howItWorksSteps.map((s) => (
              <div
                key={s.step}
                className="flex flex-col gap-4 rounded-xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:gap-8"
              >
                <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-brand-600 text-lg font-bold text-white">
                    {s.step}
                  </span>
                  <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                </div>
                <p className="text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Coming next"
                title="A full VIN-based platform"
                intro="As OfferOnly expands, the intake and routing flow grows into a complete platform built around the VIN as the permanent record."
              />
            </div>
            <Card>
              <ol className="grid gap-3 sm:grid-cols-2">
                {futureSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm font-medium text-ink"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
