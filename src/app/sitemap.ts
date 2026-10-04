import type { MetadataRoute } from "next";
import { nav, site } from "@/content/site";
import { programmes } from "@/content/programmes";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...nav.map((n) => ({ url: `${site.url}${n.href === "/" ? "" : n.href}` })),
    ...programmes.map((p) => ({ url: `${site.url}/programmes/${p.slug}` })),
  ];
}
