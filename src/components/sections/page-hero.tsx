import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { NetworkCanvas } from "@/components/motion/network-canvas";
import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow } from "@/components/ui/primitives";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs = [],
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pt-36 pb-20 text-white lg:pt-44 lg:pb-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-royal/45 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-64 w-[40rem] rounded-full bg-sky/15 blur-[100px]" />
      </div>
      <NetworkCanvas className="-z-10 opacity-50" density={0.6} />

      <Container>
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/50">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3.5" aria-hidden />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white/80">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal>
          <Eyebrow light>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-4xl text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-6xl">{title}</h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{intro}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.24}>{children}</Reveal>}
      </Container>
    </section>
  );
}
