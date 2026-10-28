import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/content";
import { Section, Meta, Lede } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.faqIntro.h2, description: d.faqIntro.lede, alternates: { canonical: `/${locale}/resources` } };
}

export default async function Resources({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale);
  const allSources = Array.from(new Map(d.services.flatMap((s) => s.sources).map((s) => [s.url, s])).values());

  return (
    <Section>
      <JsonLd data={[faqSchema(d.faqs), breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.faqIntro.h2, href: `/${locale}/resources` }])]} />
      <Reveal>
        <Meta>{d.faqIntro.eyebrow}</Meta>
        <h1 className="display-l mb-6">{d.faqIntro.h2}</h1>
        <Lede className="mb-12">{d.faqIntro.lede}</Lede>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div className="hair-t min-w-0">
          {d.faqs.map((f) => (
            <details key={f.q} className="hair-b group py-4">
              <summary className="flex cursor-pointer list-none items-start gap-4">
                <span className="min-w-0 flex-1 text-[0.97rem] font-medium">{f.q}</span>
                <span className="shrink-0 accent-type transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="measure mt-3 text-[0.93rem] leading-relaxed text-[var(--muted)]">{f.a}</p>
            </details>
          ))}
        </div>

        <aside className="min-w-0">
          <div className="hair p-6">
            <Meta dim>{d.sourcesLabel}</Meta>
            <ul className="grid gap-2">
              {allSources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer"
                    className="text-[0.82rem] text-[var(--muted)] underline-offset-4 hover:text-[var(--fg)] hover:underline">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="hair mt-4 p-6">
            <Meta dim>{d.mattersIntro.h2}</Meta>
            <ul className="grid gap-2">
              {d.services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${locale}/services/${s.slug}`}
                    className="text-[0.86rem] text-[var(--muted)] underline-offset-4 hover:text-[var(--fg)] hover:underline">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}
