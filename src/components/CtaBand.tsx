import { Container, Button } from "@/components/ui";

export function CtaBand({
  title = "Have a vehicle opportunity?",
  body = "Tell us about the unit and we'll route it to the right buyer lane.",
  primary = { label: "Sell a Vehicle", href: "/sell" },
  secondary = { label: "Join the Buyer Network", href: "/buyers" },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="overflow-hidden rounded-2xl bg-ink px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">{body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={primary.href}>{primary.label}</Button>
            <Button href={secondary.href} variant="light">
              {secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
