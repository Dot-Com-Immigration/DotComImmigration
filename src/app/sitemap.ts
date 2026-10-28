import type { MetadataRoute } from "next";
import { site } from "@/site.config";
import { getDict } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/practice-areas", "/how-we-help", "/deadline-checker", "/tools", "/tools/detention", "/tools/documents", "/tools/scope", "/tools/wait-times", "/verify", "/about", "/resources", "/contact"];
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];

  for (const locale of site.locales) {
    const d = getDict(locale);
    for (const p of pages) {
      out.push({
        url: `${site.url}/${locale}${p}`,
        lastModified: now,
        changeFrequency: p === "" ? "weekly" : "monthly",
        priority: p === "" ? 1 : p.startsWith("/tools") || p === "/deadline-checker" ? 0.9 : 0.7,
        alternates: { languages: { "en-CA": `${site.url}/en${p}`, "fr-CA": `${site.url}/fr${p}` } },
      });
    }
    for (const s of d.services) {
      out.push({
        url: `${site.url}/${locale}/services/${s.slug}`,
        lastModified: now, changeFrequency: "monthly", priority: 0.8,
        alternates: { languages: { "en-CA": `${site.url}/en/services/${s.slug}`, "fr-CA": `${site.url}/fr/services/${s.slug}` } },
      });
    }
  }
  return out;
}
