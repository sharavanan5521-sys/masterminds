import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { WhyUs } from "@/components/sections/why-us";
import { CtaBand } from "@/components/sections/cta-band";
import { deliveryFormats, engagementProcess } from "@/content/delivery";

export const metadata: Metadata = {
  title: "Training Delivery",
  description:
    "Public programmes, in-house corporate training, customized training, online training, workshops & seminars, and coaching & mentoring.",
};

export default function TrainingDeliveryPage() {
  return (
    <>
      <PageHero
        eyebrow="Training delivery"
        title={
          <>
            The right format for <span className="text-gradient">your people</span>
          </>
        }
        intro="Public, in-house, customized and online — we deliver learning in the way that works best for your organization, your schedule and your teams."
        crumbs={[{ label: "Training Delivery" }]}
      />

      {/* Formats */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {deliveryFormats.map((d, i) => (
              <Reveal key={d.title} delay={(i % 2) * 0.08}>
                <article className="group grid h-full overflow-hidden rounded-3xl bg-white ring-1 ring-navy-900/8 transition-shadow hover:shadow-2xl hover:shadow-brand/10 sm:grid-cols-5">
                  <div className="relative aspect-[16/10] sm:col-span-2 sm:aspect-auto">
                    <Image
                      src={d.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 20vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-royal/40 to-transparent" />
                  </div>
                  <div className="flex flex-col p-7 sm:col-span-3">
                    <span className="grid size-12 place-items-center rounded-2xl bg-ice text-brand">
                      <Icon name={d.icon} className="size-5" />
                    </span>
                    <h2 className="mt-5 text-xl font-semibold text-navy-900">{d.title}</h2>
                    <p className="mt-2 leading-relaxed text-slate">{d.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28">
        <div aria-hidden className="absolute -top-40 right-0 size-[36rem] rounded-full bg-royal/40 blur-[120px]" />
        <Container className="relative">
          <SectionHeading
            light
            eyebrow="How we work with you"
            title="From first conversation to lasting impact"
            intro="A simple, collaborative process that keeps every programme anchored to your organizational goals."
          />
          <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            <span
              aria-hidden
              className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-sky via-mist/60 to-sky md:block"
            />
            {engagementProcess.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1} className="relative text-center">
                <span className="relative mx-auto grid size-14 place-items-center rounded-full bg-navy-950 font-display text-lg font-semibold text-white ring-2 ring-sky">
                  {i + 1}
                  <span aria-hidden className="absolute -inset-2 rounded-full ring-1 ring-sky/30" />
                </span>
                <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/65">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <WhyUs />
      <CtaBand
        title="Let's find the right format for your team."
        body="Tell us how many participants, where they're based and what you want to achieve — we'll take it from there."
      />
    </>
  );
}
