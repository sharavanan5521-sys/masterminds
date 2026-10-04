import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Button, Container, SectionHeading } from "@/components/ui/primitives";
import { HomeHero } from "@/components/sections/home-hero";
import { AudienceMarquee } from "@/components/sections/audience-marquee";
import { ProgrammeCard } from "@/components/sections/programme-card";
import { LearningLoop } from "@/components/sections/learning-loop";
import { WhyUs } from "@/components/sections/why-us";
import { Outcomes } from "@/components/sections/outcomes";
import { CtaBand } from "@/components/sections/cta-band";
import { programmes } from "@/content/programmes";
import { deliveryFormats } from "@/content/delivery";

export default function Home() {
  return (
    <>
      <HomeHero />
      <AudienceMarquee />

      {/* Programmes */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="What we do"
              title="Programmes built around how your people actually work"
              intro="Six focused areas of professional development — each delivered through practical, hands-on learning that translates into real-world performance."
            />
            <Button href="/programmes" variant="outline" className="shrink-0 self-start lg:self-auto">
              All programmes
            </Button>
          </div>
          <div className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {programmes.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <ProgrammeCard programme={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <LearningLoop />

      {/* Delivery formats */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Training delivery"
            title="Flexible formats for every organization"
            intro="From scheduled public programmes to one-to-one coaching — choose the format that fits your people and operations."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deliveryFormats.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 0.08}>
                <Link
                  href="/training-delivery"
                  className="group relative isolate flex h-64 flex-col justify-end overflow-hidden rounded-3xl p-6 text-white"
                >
                  <Image
                    src={d.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/10 transition-colors group-hover:via-royal/50" />
                  <span className="mb-auto grid size-11 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
                    <Icon name={d.icon} className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{d.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-white/75">{d.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/training-delivery"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-royal"
            >
              How we deliver training <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <Outcomes />
      <WhyUs />
      <CtaBand />
    </>
  );
}
