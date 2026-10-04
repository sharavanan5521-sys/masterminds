import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Button, Container, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { programmes } from "@/content/programmes";
import { customization } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Corporate training programmes in Leadership & Management, AI & Digital Transformation, Sales & Marketing, HR & People Development, Business & Entrepreneurship and Customized Corporate Training.",
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our programmes"
        title={
          <>
            Professional learning designed around <span className="text-gradient">your workforce</span>
          </>
        }
        intro="Six programme areas, each adaptable to your organization's objectives, industry, skill gaps and preferred delivery format."
        crumbs={[{ label: "Programmes" }]}
      >
        <ul className="mt-10 flex flex-wrap gap-2">
          {programmes.map((p) => (
            <li key={p.slug}>
              <a
                href={`#${p.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/80 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
              >
                <Icon name={p.icon} className="size-4 text-mist" />
                {p.short}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="bg-white py-20 lg:py-28">
        <Container className="space-y-24 lg:space-y-32">
          {programmes.map((p, i) => (
            <article
              key={p.slug}
              id={p.slug}
              className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal y={40} className={cn("relative", i % 2 === 1 && "lg:order-2")}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/15">
                  <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/40 to-transparent" />
                </div>
                <span
                  className={cn(
                    "absolute -bottom-6 grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-sky to-royal text-white shadow-xl shadow-royal/30 ring-8 ring-white",
                    i % 2 === 1 ? "-right-2 lg:-left-6 lg:right-auto" : "-right-2 lg:-right-6",
                  )}
                >
                  <Icon name={p.icon} className="size-8" />
                </span>
              </Reveal>

              <div>
                <p className="font-display text-sm font-semibold tracking-widest text-brand">PROGRAMME {p.number}</p>
                <h2 className="mt-3 text-3xl leading-tight font-semibold text-navy-900 sm:text-4xl">{p.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-slate">{p.summary}</p>
                <h3 className="mt-8 text-sm font-semibold tracking-wide text-navy-900 uppercase">
                  {p.slug === "customized-corporate-training" ? "Adapted according to" : "Key areas"}
                </h3>
                <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {p.areas.map((a) => (
                    <li key={a} className="flex items-center gap-2.5 text-ink/85">
                      <Check className="size-4 shrink-0 text-sky" strokeWidth={3} aria-hidden />
                      {a}
                    </li>
                  ))}
                </ul>
                <Button href={`/programmes/${p.slug}`} className="mt-9">
                  View programme details
                </Button>
              </div>
            </article>
          ))}
        </Container>
      </section>

      {/* Customization */}
      <section className="relative overflow-hidden bg-ice py-20 lg:py-28">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <Container className="relative">
          <SectionHeading
            align="center"
            eyebrow="Tailored to you"
            title="No two organizations are the same"
            intro="Any programme can be adapted to your context. We shape every detail around what your people actually need."
          />
          <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
            {customization.map((c) => (
              <li
                key={c}
                className="rounded-2xl bg-white p-4 text-center text-sm font-medium text-navy-800 shadow-sm ring-1 ring-navy-900/5"
              >
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link
              href="/programmes/customized-corporate-training"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-royal"
            >
              Learn about customized training <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Not sure which programme fits?"
        body="Tell us about your team and your goals. We'll recommend the right programme — or design one specifically for you."
      />
    </>
  );
}
