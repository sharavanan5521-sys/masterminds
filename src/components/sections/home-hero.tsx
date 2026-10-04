import Image from "next/image";
import { BrainCircuit, CircleCheck, Sparkles } from "lucide-react";
import { MindScene } from "@/components/motion/mind-scene";
import { Reveal } from "@/components/motion/reveal";
import { Button, Container } from "@/components/ui/primitives";
import { methodology } from "@/content/site";
import { programmes, topicCount } from "@/content/programmes";
import { deliveryFormats } from "@/content/delivery";

const stats = [
  { value: programmes.length, label: "Programme areas" },
  { value: `${topicCount}+`, label: "Training topics" },
  { value: deliveryFormats.length, label: "Delivery formats" },
  { value: methodology.length, label: "Learning methods" },
];

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pt-32 pb-20 text-white lg:pt-40 lg:pb-28">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[36rem] w-[36rem] rounded-full bg-royal/40 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-[30rem] w-[30rem] rounded-full bg-sky/25 blur-[120px]" />
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-mist ring-1 ring-white/10 backdrop-blur">
              <Sparkles className="size-3.5 text-gold" aria-hidden />
              Corporate Training &amp; Development
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem]">
              Empower your people.
              <br />
              <span className="text-gradient">Strengthen your organization.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Practical, relevant and results-oriented learning in Leadership, AI &amp; Digital Transformation,
              Sales &amp; Marketing, HR and Business — designed around your real workplace needs.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="gold">
                Plan your training
              </Button>
              <Button href="/programmes" variant="ghost">
                Explore programmes
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-semibold text-white">{s.value}</dd>
                  <dd className="mt-1 text-xs tracking-wide text-white/55 uppercase">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={40} className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
            <MindScene
              className="absolute -inset-6 sm:-inset-10"
              fallback={
                <div className="absolute inset-6 overflow-hidden rounded-[2rem] ring-1 ring-white/15 sm:inset-10">
                  <Image
                    src="/images/hero-training.jpg"
                    alt="Facilitator leading a corporate training session with engaged participants"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover object-left"
                  />
                </div>
              }
            />

            <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-white p-4 text-ink shadow-2xl shadow-navy-950/40 sm:-left-8">
              <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-brand to-royal text-white">
                <BrainCircuit className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-semibold">AI-ready teams</span>
                <span className="block text-xs text-slate">Future-ready skills, today</span>
              </span>
            </div>

            <div className="absolute top-0 -left-3 hidden items-center gap-2 rounded-full bg-navy-900/85 px-4 py-2 text-sm font-medium shadow-xl ring-1 ring-white/20 backdrop-blur-md sm:flex lg:-left-6">
              <CircleCheck className="size-4 text-gold" aria-hidden />
              Practical, hands-on learning
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
