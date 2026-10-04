import { NetworkCanvas } from "@/components/motion/network-canvas";
import { Reveal } from "@/components/motion/reveal";
import { Button, Container } from "@/components/ui/primitives";

export function CtaBand({
  title = "Let's build better capabilities together.",
  body = "Whether you're developing supervisors, strengthening your leadership pipeline, equipping teams with AI capabilities or improving sales performance — we'll design a learning solution aligned with your needs.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-800 via-royal to-brand px-6 py-16 text-center text-white sm:px-12 lg:py-20">
            <NetworkCanvas className="-z-10 opacity-60" density={0.5} />
            <div aria-hidden className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-sky/40 blur-3xl" />
            <h2 className="mx-auto max-w-3xl text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{body}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/contact" variant="gold">
                Talk to us
              </Button>
              <Button href="/programmes" variant="ghost">
                View programmes
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
