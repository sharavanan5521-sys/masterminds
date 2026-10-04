import { audiences } from "@/content/site";

export function AudienceMarquee() {
  const items = [...audiences, ...audiences];
  return (
    <section aria-label="Who we serve" className="border-b border-navy-900/5 bg-white py-8">
      <p className="mb-5 text-center text-xs font-semibold tracking-[0.2em] text-slate/70 uppercase">
        Trusted to develop people across every level
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {items.map((a, i) => (
            <li
              key={i}
              aria-hidden={i >= audiences.length}
              className="flex items-center gap-3 rounded-full bg-ice px-5 py-2.5 text-sm font-medium whitespace-nowrap text-navy-800"
            >
              <span className="size-1.5 rounded-full bg-sky" aria-hidden />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
