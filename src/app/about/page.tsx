import type { Metadata } from "next";
import Image from "next/image";
import { Check, Eye, Target } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/page-hero";
import { Outcomes } from "@/components/sections/outcomes";
import { CtaBand } from "@/components/sections/cta-band";
import { audiences, commitments, methodology, philosophy } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Masterminds Training & Marketing empowers individuals, teams and organizations through practical, relevant and results-oriented learning solutions.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Masterminds"
        title={
          <>
            Every person has the potential for <span className="text-gradient">greater performance</span>
          </>
        }
        intro="We're a professional training and development provider helping organizations build capable, adaptable and future-ready teams."
        crumbs={[{ label: "About" }]}
      />

      {/* Who we are */}
      <section className="bg-white py-20 lg:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal y={40} className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/15">
              <Image
                src="/images/about-session.jpg"
                alt="A Masterminds facilitator presenting to a room of professionals"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -right-3 -bottom-8 w-56 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-navy-900/5 sm:-right-8">
              <Image src="/brand/mark.png" alt="" width={738} height={763} className="h-10 w-auto" />
              <p className="mt-3 font-display text-sm font-semibold text-navy-900">Empowering Excellence</p>
              <p className="mt-1 text-xs text-slate">Our core philosophy in every programme we deliver.</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Who we are" title="Practical learning. Real-world performance." />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate">
              <p>
                Masterminds Training &amp; Marketing is a professional training and development provider dedicated to
                empowering individuals, teams and organizations through practical, relevant and results-oriented
                learning solutions.
              </p>
              <p>
                We develop people across Leadership &amp; Management, AI &amp; Digital Transformation, Sales &amp;
                Marketing, HR &amp; People Development, Business Skills and Workplace Performance.
              </p>
              <p>
                Our approach combines practical knowledge, hands-on activities, workplace application and participant
                engagement to create meaningful learning experiences.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & vision */}
      <section className="bg-ice py-20 lg:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          {[
            {
              Icon: Target,
              label: "Our Mission",
              text: "To empower individuals and organizations with practical knowledge, skills and strategies that enhance performance, productivity and professional growth.",
            },
            {
              Icon: Eye,
              label: "Our Vision",
              text: "To be a trusted corporate training and development partner that helps organizations build capable, adaptable and future-ready teams.",
            },
          ].map(({ Icon: I, label, text }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <div className="relative h-full overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-navy-900/5 sm:p-10">
                <div aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full bg-gradient-to-br from-mist/50 to-transparent" />
                <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-sky to-royal text-white shadow-lg shadow-royal/25">
                  <I className="size-6" aria-hidden />
                </span>
                <h2 className="relative mt-6 text-2xl font-semibold text-navy-900">{label}</h2>
                <p className="relative mt-3 text-lg leading-relaxed text-slate">{text}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Philosophy */}
      <section className="bg-white py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Our core philosophy"
              title="Empowering Excellence"
              intro="Every individual and organization can achieve greater performance when given the right knowledge, skills, mindset and learning environment. We create a safe, positive space where participants experiment with new ideas and build confidence."
            />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {philosophy.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={(i % 2) * 0.06}
                className="flex items-center gap-4 rounded-2xl bg-ice/60 p-5 ring-1 ring-navy-900/5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check className="size-4" strokeWidth={3} aria-hidden />
                </span>
                <span className="font-medium text-navy-900">{item}</span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Methodology */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28">
        <div aria-hidden className="absolute -bottom-40 -left-20 size-[36rem] rounded-full bg-royal/40 blur-[120px]" />
        <Container className="relative">
          <SectionHeading
            light
            eyebrow="Training methodology"
            title="Understand. Practise. Apply."
            intro="Depending on the programme, we combine a range of participant-centred methods so people grasp the concept, practise the skill and know exactly how to apply it in their workplace."
          />
          <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {methodology.map((m, i) => (
              <Reveal
                as="li"
                key={m.title}
                delay={(i % 4) * 0.05}
                className="group rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.08]"
              >
                <Icon name={m.icon} className="size-6 text-mist transition-colors group-hover:text-gold" />
                <p className="mt-4 text-sm font-medium sm:text-base">{m.title}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Commitment */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Our commitment"
            title="Learning experiences that are…"
          />
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {commitments.map((c, i) => (
              <Reveal
                as="li"
                key={c.title}
                delay={i * 0.06}
                className="relative overflow-hidden rounded-3xl bg-ice/60 p-6 ring-1 ring-navy-900/5"
              >
                <span className="font-display text-5xl font-semibold text-mist/70">{c.title[0]}</span>
                <h3 className="mt-3 text-lg font-semibold text-navy-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{c.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Who we serve */}
      <section className="bg-ice py-20 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Who we serve"
              title="For organizations across every sector"
            />
          </div>
          <ul className="flex flex-wrap gap-3 lg:col-span-7">
            {audiences.map((a) => (
              <li
                key={a}
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-navy-800 shadow-sm ring-1 ring-navy-900/5"
              >
                {a}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Outcomes />
      <CtaBand />
    </>
  );
}
