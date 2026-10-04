import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "primary" | "ghost" | "outline";
  className?: string;
  arrow?: boolean;
};

const buttonStyles = {
  gold: "bg-gold text-navy-950 hover:bg-[#f7c55e] shadow-lg shadow-gold/20",
  primary: "bg-brand text-white hover:bg-royal shadow-lg shadow-brand/25",
  ghost: "bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20 backdrop-blur",
  outline: "bg-white text-navy-800 ring-1 ring-navy-800/15 hover:ring-brand hover:text-brand",
};

export function Button({ href, children, variant = "primary", className, arrow = true }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky",
        buttonStyles[variant],
        className,
      )}
    >
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
    </Link>
  );
}

export function Eyebrow({ children, light, className }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
        light ? "text-mist" : "text-brand",
        className,
      )}
    >
      <span className={cn("h-px w-6", light ? "bg-mist" : "bg-brand")} aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", light ? "text-white/70" : "text-slate")}>{intro}</p>
      )}
    </div>
  );
}
