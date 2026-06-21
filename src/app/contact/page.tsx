import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { LeadForm, type FieldGroup } from "@/components/LeadForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact OfferOnly",
  description:
    "Contact OfferOnly to sell a vehicle, join the buyer network, or start an insurance, fleet, finance/repo, or towing/storage inquiry.",
  alternates: { canonical: "/contact" },
};

const inquiryTypes = [
  "Sell a vehicle",
  "Join buyer network",
  "Insurance / company inquiry",
  "Fleet inquiry",
  "Finance / repo inquiry",
  "Towing / storage inquiry",
  "General question",
];

const groups: FieldGroup[] = [
  {
    fields: [
      { name: "name", label: "Name", type: "text", required: true, half: true },
      { name: "company", label: "Company", type: "text", half: true },
      { name: "phone", label: "Phone", type: "tel", half: true },
      { name: "email", label: "Email", type: "email", required: true, half: true },
      { name: "inquiryType", label: "Inquiry type", type: "select", options: inquiryTypes, required: true },
      { name: "message", label: "Message", type: "textarea", required: true, placeholder: "How can we help?" },
    ],
  },
];

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Get in touch
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Whether you&apos;re selling a unit, joining the buyer network, or
              representing an insurance, fleet, finance, or towing operation, we
              want to hear from you.
            </p>
            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-ink">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.email}`} className="text-brand-700 hover:text-brand-600">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Phone</dt>
                <dd className="mt-1 text-muted">{site.phone}</dd>
              </div>
            </dl>
          </div>

          <LeadForm
            formName="Contact"
            leadType="contact"
            groups={groups}
            submitLabel="Send Message"
            successTitle="Message sent."
            successBody="Thanks for reaching out — a member of the OfferOnly team will get back to you shortly."
          />
        </div>
      </Container>
    </Section>
  );
}
