import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { learningLoop } from "@/content/site";

export function LearningLoop() {
  return (
    <section className="relative overflow-hidden bg-ice py-20 lg:py-28">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <Container className="relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Our approach"
            title="Learning that turns into performance"
            intro="Our programmes emphasize practical, participant-centred learning rather than theory alone — so every session ends with something people can use at work tomorrow."
          />
          <ol className="relative mt-12 space-y-8">
            <span aria-hidden className="absolute top-3 bottom-3 left-[1.375rem] w-px bg-gradient-to-b from-sky via-brand to-royal" />
            {learningLoop.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 0.1} className="relative flex gap-6">
                  <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-white font-display text-sm font-semibold text-brand shadow-md ring-2 ring-sky/40">
                    {s.step}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-lg font-semibold text-navy-900">{s.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-slate">{s.body}</p>
                  </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal y={40} className="relative h-[28rem] sm:h-[34rem]">
          <div className="absolute top-0 right-0 h-[75%] w-[78%] overflow-hidden rounded-3xl shadow-2xl shadow-navy-900/15">
            <Image
              src="/images/method-discussion.jpg"
              alt="Participants in an engaged group discussion"
              fill
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 h-[52%] w-[58%] overflow-hidden rounded-3xl shadow-2xl shadow-navy-900/20 ring-8 ring-ice">
            <Image
              src="/images/method-collab.jpg"
              alt="Team collaborating on a practical exercise"
              fill
              sizes="(min-width: 1024px) 30vw, 60vw"
              className="object-cover"
            />
          </div>
          <div className="absolute right-4 bottom-10 rounded-2xl bg-navy-900 px-5 py-4 text-white shadow-xl sm:right-8">
            <p className="font-display text-3xl font-semibold">
              Learn <span className="text-mist">→</span> Apply
            </p>
            <p className="mt-1 text-xs text-white/60">Knowledge applied immediately</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
