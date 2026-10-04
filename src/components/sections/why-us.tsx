import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Button, Container, SectionHeading } from "@/components/ui/primitives";
import { whyUs } from "@/content/site";

export function WhyUs() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Why Masterminds"
              title="A training partner focused on results"
              intro="Effective training should create value for both employees and employers. That's the standard we hold every programme to."
            />
            <Button href="/about" variant="outline" className="mt-8">
              About us
            </Button>
          </div>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
          {whyUs.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(i % 2) * 0.08}
              className="group h-full rounded-3xl bg-ice/60 p-7 ring-1 ring-navy-900/5 transition-colors hover:bg-white hover:ring-brand/25"
            >
                <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-navy-900/5 transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
