import Link from "next/link";
import { Container, Section, SectionHeading, Button, Card, Eyebrow } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import {
  RouteIcon,
  TargetIcon,
  UsersIcon,
  ShieldIcon,
  GlobeIcon,
  WrenchIcon,
  RecycleIcon,
  TruckIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@/components/icons";
import { sellerGroups, buyerGroups, howItWorksSteps, vehicleTypes } from "@/lib/content";

const whatWeDo = [
  {
    icon: TargetIcon,
    title: "Identify the opportunity",
    body: "Every vehicle has a best exit path. We start by understanding the unit, not forcing it into one lane.",
  },
  {
    icon: RouteIcon,
    title: "Classify by best buyer",
    body: "Title, condition, damage, mileage, and demand decide whether a unit is wholesale, export, salvage, parts, or scrap.",
  },
  {
    icon: UsersIcon,
    title: "Route to the right network",
    body: "Opportunities reach qualified buyers in the matching lanes and regions — not blasted to everyone.",
  },
  {
    icon: CheckIcon,
    title: "Organize by VIN",
    body: "Capture interest and offers, and keep the whole process organized by VIN for a clean record.",
  },
];

const laneDemo = [
  { lane: "Wholesale buyers", score: 86 },
  { lane: "Export buyers", score: 74 },
  { lane: "Repair / rebuilders", score: 62 },
  { lane: "Parts buyers", score: 38 },
  { lane: "Scrap buyers", score: 8 },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-brand-600/25 blur-3xl" />
          <div className="absolute bottom-0 -left-24 h-96 w-96 rounded-full bg-brand-700/20 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>
        <Container className="relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <Eyebrow>Vehicle opportunity platform</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Vehicle Opportunities Matched to the Right Buyers
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              OfferOnly helps sellers, insurance companies, finance companies,
              fleets, towing yards, and vehicle owners connect with buyers who
              understand each unit&apos;s real value — from clean wholesale
              vehicles to total losses, salvage, export, parts, repair, and
              scrap opportunities.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/sell">Sell a Vehicle</Button>
              <Button href="/buyers" variant="light">
                Join the Buyer Network
              </Button>
              <Button href="/insurance" variant="ghost" className="text-white hover:text-white/80">
                Insurance / Company Inquiry
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {[
                { v: "11", l: "Buyer lanes" },
                { v: "VIN", l: "Organized records" },
                { v: "All titles", l: "Clean to scrap" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="text-2xl font-bold text-white">{s.v}</dt>
                  <dd className="mt-1 text-sm text-white/55">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Routing preview card */}
          <div className="relative">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    2018 Ford F-150 XLT 4x4
                  </p>
                  <p className="text-xs text-white/50">
                    Clean title · 142,000 mi · Macon, GA
                  </p>
                </div>
                <span className="rounded-full bg-brand-600/20 px-3 py-1 text-xs font-semibold text-brand-50 ring-1 ring-brand-600/40">
                  Routing
                </span>
              </div>
              <div className="mt-6 space-y-4">
                {laneDemo.map((row) => (
                  <div key={row.lane}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">{row.lane}</span>
                      <span className="font-semibold text-white">{row.score}%</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-brand-600"
                        style={{ width: `${row.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-white/10 bg-ink/40 p-4 text-xs text-white/60">
                <span className="font-semibold text-white/80">Best initial path:</span>{" "}
                Wholesale / export buyer network
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What OfferOnly Does */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What OfferOnly does"
            title="Take a vehicle opportunity and route it to the right buyer network"
            intro="OfferOnly is not dealer-only, not salvage-only, and not a classifieds clone. It is built around one idea: every vehicle has a best exit path."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeDo.map((item) => (
              <Card key={item.title}>
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Who Uses OfferOnly */}
      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Who uses OfferOnly"
            title="Built for sellers and buyers across the entire vehicle landscape"
            intro="OfferOnly serves a far broader network than dealers alone — including insurance, finance, fleet, towing, and specialty buyers."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                Sellers &amp; companies
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {sellerGroups.map((g) => (
                  <div key={g.title} className="rounded-lg border border-line bg-white p-4">
                    <p className="text-sm font-semibold text-ink">{g.title}</p>
                    <p className="mt-1 text-sm text-muted">{g.blurb}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                Buyer network
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {buyerGroups.map((g) => (
                  <div key={g.title} className="rounded-lg border border-line bg-white p-4">
                    <p className="text-sm font-semibold text-ink">{g.title}</p>
                    <p className="mt-1 text-sm text-muted">{g.blurb}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Vehicle Opportunity Types */}
      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Vehicle opportunity types"
              title="Different vehicles, different best buyers"
              intro="A clean-title truck does not belong in the same lane as a flood vehicle, a repo, a non-running car, or a parts unit."
            />
            <Button href="/vehicle-types" variant="secondary">
              View all vehicle types
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: TruckIcon, t: "Clean wholesale", d: "Late-model, clean-title units that run and drive." },
              { icon: ShieldIcon, t: "Insurance total loss", d: "Total losses, collision, hail, flood, fire, theft." },
              { icon: GlobeIcon, t: "Export units", d: "Models with strong overseas demand and value." },
              { icon: WrenchIcon, t: "Parts & repair", d: "Donor units and economically repairable vehicles." },
              { icon: RouteIcon, t: "Repo & fleet", d: "Repossessions, surrenders, and fleet liquidations." },
              { icon: RecycleIcon, t: "Salvage & scrap", d: "Salvage-title and end-of-life units with floor value." },
            ].map((c) => (
              <Card key={c.t} className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <c.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink">{c.t}</h3>
                  <p className="mt-1 text-sm text-muted">{c.d}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="From submission to the right buyer"
            intro="A clear path that organizes every opportunity by VIN and routes it to qualified buyers."
            align="center"
          />
          <ol className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-5">
            {howItWorksSteps.map((s) => (
              <li key={s.step} className="relative rounded-xl border border-line bg-white p-5">
                <span className="text-sm font-bold text-brand-600">{s.step}</span>
                <h3 className="mt-2 text-sm font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Button href="/how-it-works" variant="secondary">
              See the full process
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* Insurance / Total Loss */}
      <Section>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>Insurance &amp; total loss</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                A dedicated lane for insurance and claim vehicles
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Insurance companies, claims and total-loss departments, and
                recovery teams use OfferOnly to move units faster, reach
                salvage, export, parts, and rebuild buyers, improve recovery
                value, and reduce storage drag.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Total losses, theft recoveries, flood, hail, fire, and collision units",
                  "Route different claim vehicles to different buyer lanes",
                  "Reduce storage time while value is highest",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-ink">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/insurance">Insurance / Company Inquiry</Button>
              </div>
            </div>
            <Card className="bg-ink text-white">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
                Insurance recovery goals
              </h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  { v: "Faster", l: "Unit disposition" },
                  { v: "Higher", l: "Recovery value" },
                  { v: "Lower", l: "Storage drag" },
                  { v: "Matched", l: "Buyer lanes" },
                ].map((s) => (
                  <div key={s.l} className="rounded-lg bg-white/5 p-4">
                    <p className="text-xl font-bold">{s.v}</p>
                    <p className="mt-1 text-sm text-white/55">{s.l}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Why Buyer Matching Matters */}
      <Section muted>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Card>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-700">
                Why matching matters
              </h3>
              <div className="mt-5 space-y-4">
                <div className="rounded-lg border border-line p-4">
                  <p className="text-sm font-semibold text-ink">Blast to everyone</p>
                  <p className="mt-1 text-sm text-muted">
                    Low offers, marketplace noise, and the wrong buyers ignoring the unit.
                  </p>
                </div>
                <div className="flex justify-center text-brand-600">
                  <ArrowRightIcon className="h-6 w-6 rotate-90" />
                </div>
                <div className="rounded-lg border border-brand-600/30 bg-brand-50 p-4">
                  <p className="text-sm font-semibold text-ink">Route to the right lane</p>
                  <p className="mt-1 text-sm text-muted">
                    Buyers who understand the unit&apos;s real value compete for it.
                  </p>
                </div>
              </div>
            </Card>
            <div>
              <Eyebrow>Buyer network</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                The right buyer beats the biggest blast
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Sending every vehicle to every buyer creates low-quality noise.
                OfferOnly routes opportunities to the strongest matching lanes
                first — so the buyers most likely to value a unit correctly are
                the ones who see it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/buyers">Join the Buyer Network</Button>
                <Button href="/how-it-works" variant="secondary">
                  How routing works
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quick access vehicle type chips */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Find your lane"
            title="Tell us what you have"
            align="center"
          />
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {vehicleTypes.slice(0, 12).map((vt) => (
              <Link
                key={vt.slug}
                href="/vehicle-types"
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-brand-600 hover:text-brand-700"
              >
                {vt.name.replace(/ Vehicles$| Units$/, "")}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Ready to move a unit or join the network?"
        body="Sellers get matched to the right buyers. Buyers get opportunities that fit their lane. Companies get faster, smarter disposition."
      />
    </>
  );
}
