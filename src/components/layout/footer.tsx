import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/primitives";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/icon";
import { nav, site } from "@/content/site";
import { programmes } from "@/content/programmes";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white/70">
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-royal/30 blur-3xl"
      />
      <Container className="relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo variant="white" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Practical, relevant and results-oriented learning solutions that empower individuals, teams and
            organizations.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
              { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
              { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid size-10 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition hover:bg-brand hover:ring-brand"
              >
                <Icon className="size-4 text-white" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-white">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold text-white">Programmes</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {programmes.map((p) => (
              <li key={p.slug}>
                <Link href={`/programmes/${p.slug}`} className="hover:text-white">
                  {p.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold text-white">Get in touch</h3>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden />
              {site.contact.email}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden />
              {site.contact.phone}
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden />
              {site.contact.address}
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-display tracking-wide">Let&apos;s build better capabilities together.</p>
        </Container>
      </div>
    </footer>
  );
}
