import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import type { Programme } from "@/content/programmes";

export function ProgrammeCard({ programme: p }: { programme: Programme }) {
  return (
    <Link
      href={`/programmes/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-navy-900/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/15 hover:ring-brand/30"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={p.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-navy-950/55 px-3 py-1 font-display text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur">
          {p.number}
        </span>
      </div>
      <div className="relative flex flex-1 flex-col p-6 pt-9">
        <span className="absolute -top-7 left-6 grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-sky to-royal text-white shadow-lg shadow-royal/30 ring-4 ring-white">
          <Icon name={p.icon} className="size-6" />
        </span>
        <h3 className="text-xl font-semibold text-navy-900">{p.short}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate">{p.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.areas.slice(0, 3).map((a) => (
            <li key={a} className="rounded-full bg-ice px-3 py-1 text-xs font-medium text-navy-800">
              {a}
            </li>
          ))}
          {p.areas.length > 3 && (
            <li className="rounded-full px-2 py-1 text-xs font-medium text-slate">+{p.areas.length - 3} more</li>
          )}
        </ul>
        <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand">
          Explore programme
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
