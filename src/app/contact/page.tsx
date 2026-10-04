import type { Metadata } from "next";
import { ChevronDown, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { site } from "@/content/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Talk to Masterminds Training & Marketing about training for your team or organization.",
};

const faqs = [
  {
    q: "Can programmes be customized for our organization?",
    a: "Yes. Every programme can be adapted to your objectives, industry, employee skill gaps, job roles, participant experience levels, duration and delivery format.",
  },
  {
    q: "Do you offer online or virtual training?",
    a: "Yes. We deliver live, interactive online training for geographically distributed and hybrid teams, as well as in-person sessions.",
  },
  {
    q: "Can you deliver training at our premises?",
    a: "Absolutely. Our in-house corporate training is delivered specifically for your organization, at your premises or a venue of your choice.",
  },
  {
    q: "Do you work with government and public sector organizations?",
    a: "Yes. We work with corporate organizations, SMEs, and government and public sector organizations.",
  },
];

export default function ContactPage() {
  const details = [
    { Icon: Mail, label: "Email", value: site.contact.email },
    { Icon: Phone, label: "Phone", value: site.contact.phone },
    { Icon: MessageCircle, label: "WhatsApp", value: site.contact.whatsapp },
    { Icon: MapPin, label: "Office", value: site.contact.address },
    { Icon: Clock, label: "Hours", value: site.contact.hours },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Let&apos;s design the right learning for <span className="text-gradient">your team</span>
          </>
        }
        intro="Tell us about your people and your goals. We'll recommend a programme — or build one around you."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="relative bg-ice pb-20 lg:pb-28">
        <Container className="relative -mt-10 grid gap-6 lg:grid-cols-12">
          <div className="rounded-[2rem] bg-white p-6 shadow-2xl shadow-navy-900/10 ring-1 ring-navy-900/5 sm:p-10 lg:col-span-8">
            <h2 className="text-2xl font-semibold text-navy-900">Send us an enquiry</h2>
            <p className="mt-2 mb-8 text-slate">We typically respond within one business day.</p>
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-6 lg:col-span-4">
            <div className="rounded-[2rem] bg-navy-950 p-8 text-white">
              <h2 className="text-xl font-semibold">Contact details</h2>
              <ul className="mt-6 space-y-5">
                {details.map(({ Icon, label, value }) => (
                  <li key={label} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-mist">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-xs tracking-wide text-white/50 uppercase">{label}</span>
                      <span className="mt-0.5 block text-sm text-white/90">{value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative grid min-h-56 flex-1 place-items-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-mist/40 to-ice ring-1 ring-navy-900/5">
              <div aria-hidden className="bg-grid absolute inset-0" />
              <div className="relative text-center">
                <MapPin className="mx-auto size-8 text-brand" aria-hidden />
                <p className="mt-2 text-sm font-medium text-navy-800">Map placeholder</p>
                <p className="text-xs text-slate">Google Map embed once address is confirmed</p>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title="Common questions" />
          </div>
          <div className="divide-y divide-navy-900/10 border-y border-navy-900/10 lg:col-span-8">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-navy-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown
                    className="size-5 shrink-0 text-brand transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-slate">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
