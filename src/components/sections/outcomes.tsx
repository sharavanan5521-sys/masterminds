import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { outcomes } from "@/content/site";

export function Outcomes() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28">
      <div aria-hidden className="absolute top-0 left-1/2 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-royal/35 blur-[120px]" />
      <Container className="relative">
        <SectionHeading
          light
          align="center"
          eyebrow="The impact"
          title="Value for your people and your organization"
          intro="Our programmes are built to strengthen individuals and lift organizational performance at the same time."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {[
            { title: "For your employees", lead: "Programmes that develop", items: outcomes.employees },
            { title: "For your organization", lead: "Training that supports", items: outcomes.organizations },
          ].map((col, i) => (
            <Reveal key={col.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl bg-white/[0.04] p-8 ring-1 ring-white/10 backdrop-blur sm:p-10">
                <p className="text-sm text-mist">{col.lead}</p>
                <h3 className="mt-1 text-2xl font-semibold">{col.title}</h3>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sky/20 text-mist">
                        <Check className="size-3" strokeWidth={3} aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
