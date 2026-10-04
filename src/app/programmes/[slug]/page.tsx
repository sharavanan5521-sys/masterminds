import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Users } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Button, Container, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { ProgrammeCard } from "@/components/sections/programme-card";
import { CtaBand } from "@/components/sections/cta-band";
import { getProgramme, programmes } from "@/content/programmes";
import { deliveryFormats } from "@/content/delivery";
import { learningLoop, site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/programmes/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProgramme(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    openGraph: { images: [{ url: p.image }] },
  };
}

export default async function ProgrammePage(props: PageProps<"/programmes/[slug]">) {
  const { slug } = await props.params;
  const p = getProgramme(slug);
  if (!p) notFound();

  const others = programmes.filter((o) => o.slug !== p.slug).slice(0, 3);
  const isCustom = p.slug === "customized-corporate-training";

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: p.title,
    description: p.summary,
    provider: { "@type": "Organization", name: site.name, sameAs: site.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow={`Programme ${p.number}`}
        title={p.title}
        intro={p.summary}
        crumbs={[{ label: "Programmes", href: "/programmes" }, { label: p.short }]}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="gold">
            Enquire about this programme
          </Button>
          <Button href="#areas" variant="ghost">
            {isCustom ? "How we customize" : "See key areas"}
          </Button>
        </div>
      </PageHero>

      {/* Key areas */}
      <section id="areas" className="scroll-mt-20 bg-white py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/15">
                <Image src={p.image} alt="" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
              <div className="mt-6 rounded-3xl bg-ice p-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-navy-900 uppercase">
                  <Users className="size-4 text-brand" aria-hidden /> Who should attend
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {p.audience.map((a) => (
                    <li key={a} className="flex items-center gap-2.5 text-ink/85">
                      <span className="size-1.5 rounded-full bg-sky" aria-hidden />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={isCustom ? "Adapted according to" : "Key areas"}
              title={isCustom ? "Built around your organization" : "What this programme covers"}
              intro={
                isCustom
                  ? "We work with you to develop training that's relevant to your actual workplace requirements."
                  : "Modules can be delivered as a full programme or selected individually to match your team's needs."
              }
            />
            <ol className="mt-10 grid gap-4 sm:grid-cols-2">
              {p.areas.map((a, i) => (
                <Reveal
                  as="li"
                  key={a}
                  delay={(i % 2) * 0.06}
                  className="group flex items-start gap-4 rounded-2xl p-5 ring-1 ring-navy-900/8 transition hover:bg-ice/60 hover:ring-brand/25"
                >
                  <span className="font-display text-sm font-semibold text-sky">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-medium text-navy-900">{a}</span>
                </Reveal>
              ))}
            </ol>

            <div className="mt-14 rounded-3xl bg-navy-950 p-8 text-white sm:p-10">
              <h3 className="text-2xl font-semibold">What participants take away</h3>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-white/85">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                      <Check className="size-3" strokeWidth={3} aria-hidden />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* How it's delivered */}
      <section className="bg-ice py-20 lg:py-24">
        <Container>
          <SectionHeading align="center" eyebrow="How you'll learn" title="Understand. Practise. Apply." />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {learningLoop.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 0.08} className="rounded-3xl bg-white p-7 ring-1 ring-navy-900/5">
                <span className="font-display text-4xl font-semibold text-mist">{s.step}</span>
                <h3 className="mt-3 text-lg font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{s.body}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {deliveryFormats.map((d) => (
              <span
                key={d.title}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-800 ring-1 ring-navy-900/5"
              >
                <Icon name={d.icon} className="size-4 text-brand" />
                {d.title}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Other programmes */}
      <section className="bg-white pt-20 lg:pt-28">
        <Container>
          <SectionHeading eyebrow="Explore more" title="Other programmes" />
          <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <ProgrammeCard key={o.slug} programme={o} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title={`Ready to develop your team in ${p.short}?`}
        body="Share your objectives and we'll recommend the right format, duration and content for your people."
      />
    </>
  );
}
