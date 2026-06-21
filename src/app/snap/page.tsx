import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { SnapFlow } from "@/components/SnapFlow";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Snap Before You Scrap — Check a Vehicle's Real Value",
  description:
    "Before you scrap a vehicle, snap a few photos and answer a few questions. OfferOnly instantly checks whether it's worth more as parts, export, rebuild, salvage, or wholesale — then routes it to the right buyers.",
  alternates: { canonical: "/snap" },
};

const useCases = [
  "Tow & storage yards",
  "Repair & body shops",
  "Insurance vehicles",
  "Private sellers",
  "Non-running units",
  "Scrap candidates",
];

const checks = [
  "Parts value",
  "Export value",
  "Rebuild value",
  "Salvage value",
  "Wholesale value",
  "Collector / specialty",
];

export default function SnapPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-600/25 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-700/20 blur-3xl" />
        </div>
        <Container className="relative py-14 sm:py-16">
          <div className="max-w-2xl">
            <Eyebrow>Snap before you scrap</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Don&apos;t scrap it until you&apos;ve checked
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              A vehicle headed for scrap is often worth far more as parts,
              export, rebuild, salvage, or wholesale. Snap a few photos, answer
              a few questions, and get an instant buyer-lane read — right from
              your phone.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {checks.map((c) => (
                <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm text-white/85 ring-1 ring-white/15">
                  <CheckIcon className="h-4 w-4 text-brand-50" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="text-2xl font-bold text-ink">How it works</h2>
              <ol className="mt-5 space-y-5">
                {[
                  { t: "Snap photos", b: "VIN plate, damage, dash, and corners — straight from your camera." },
                  { t: "Add quick details", b: "Title, running condition, damage, and mileage. Unsure? Leave it blank." },
                  { t: "See the buyer lanes", b: "Get an instant read on whether it beats scrap — and where it fits best." },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{s.t}</p>
                      <p className="mt-0.5 text-sm text-muted">{s.b}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 rounded-xl border border-line bg-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Built for
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {useCases.map((u) => (
                    <span key={u} className="rounded-full border border-line bg-white px-3 py-1 text-sm font-medium text-ink">
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <SnapFlow />
          </div>
        </Container>
      </section>
    </>
  );
}
