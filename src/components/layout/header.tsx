"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button, Container } from "@/components/ui/primitives";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Every page opens on a dark hero, so the header starts transparent and turns solid on scroll.
  const solid = scrolled || open;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "bg-white/90 shadow-[0_1px_0_rgb(6_10_74/0.08)] backdrop-blur-lg" : "bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Logo variant={solid ? "color" : "white"} />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                solid ? "text-ink/80 hover:text-brand" : "text-white/80 hover:text-white",
                isActive(item.href) && (solid ? "text-brand" : "text-white"),
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-dot"
                  className={cn("absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full", solid ? "bg-brand" : "bg-gold")}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact" variant={solid ? "primary" : "gold"} className="hidden px-5 py-2.5 sm:inline-flex">
            Enquire now
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "grid size-11 place-items-center rounded-full transition-colors lg:hidden",
              solid ? "text-navy-900 hover:bg-ice" : "text-white hover:bg-white/10",
            )}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-navy-900/5 bg-white lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-2xl px-4 py-4 font-display text-xl font-medium",
                    isActive(item.href) ? "bg-ice text-brand" : "text-navy-900 hover:bg-ice",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div onClick={() => setOpen(false)} className="mt-6 flex flex-col">
                <Button href="/contact" variant="primary" className="py-4">
                  Enquire now
                </Button>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
