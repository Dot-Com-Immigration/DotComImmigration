import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/content";
import { Section, Eyebrow, H2, Lede } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.faqIntro.h2, description: d.faqIntro.lede, alternates: { canonical: `/${locale}/resources` } };
}

export default async function Resources({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale);
  const allSources = Array.from(
    new Map(d.services.flatMap((s) => s.sources).map((s) => [s.url, s])).values(),
  );

  return (
    <Section>
      <JsonLd data={[
        faqSchema(d.faqs),
        breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.faqIntro.h2, href: `/${locale}/resources` }]),
      ]} />
      <Reveal>
        <Eyebrow>{d.faqIntro.eyebrow}</Eyebrow>
        <H2 className="mb-3.5">{d.faqIntro.h2}</H2>
        <Lede className="mb-10">{d.faqIntro.lede}</Lede>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-2.5">
          {d.faqs.map((f) => (
            <details key={f.q} className="rounded-sm border border-line bg-surface px-5 py-4">
              <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
              <p className="mt-2.5 max-w-[62ch] text-[0.93rem] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>

        <aside className="min-w-0">
          <div className="rounded-sm border border-line bg-surface p-6">
            <h2 className="mb-3 text-[1.1rem]">{d.sourcesLabel}</h2>
            <ul className="grid gap-2">
              {allSources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[0.84rem] text-muted underline-offset-4 hover:text-fg hover:underline">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 rounded-sm border border-line bg-surface p-6">
            <h2 className="mb-3 text-[1.1rem]">{d.mattersIntro.h2}</h2>
            <ul className="grid gap-1.5">
              {d.services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${locale}/services/${s.slug}`} className="text-[0.86rem] text-muted underline-offset-4 hover:text-fg hover:underline">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}
