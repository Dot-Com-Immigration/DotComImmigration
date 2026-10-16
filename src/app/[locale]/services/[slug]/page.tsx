import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getDict } from "@/content";
import { site } from "@/site.config";
import { Section, Eyebrow, H2, Lede, Cta, Tldr, SourceList } from "@/components/ui";
import { Reveal } from "@/components/motion";
import DeadlineChecker from "@/components/deadline-checker";
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  const d = getDict("en");
  return site.locales.flatMap((locale) => d.services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const d = getDict(locale);
  const s = d.services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.tldr.slice(0, 180),
    alternates: { canonical: `/${locale}/services/${slug}`, languages: { "en-CA": `/en/services/${slug}`, "fr-CA": `/fr/services/${slug}` } },
    openGraph: { title: s.title, description: s.summary, type: "article" },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const d = getDict(locale);
  const s = d.services.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = d.services.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[
        serviceSchema(s, locale),
        faqSchema(s.faqs),
        breadcrumbSchema([
          { name: "Home", href: `/${locale}` },
          { name: d.mattersIntro.h2, href: `/${locale}/services` },
          { name: s.title, href: `/${locale}/services/${s.slug}` },
        ]),
      ]} />

      <section className="relative overflow-hidden bg-navy-950 py-12 text-cream sm:py-16">
        <div className="mesh pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-x relative z-10">
          <Link href={`/${locale}/services`} className="mb-5 inline-flex items-center gap-2 text-[0.82rem] text-navy-400 transition hover:text-gold-400">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />{d.mattersIntro.h2}
          </Link>
          <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-400">{s.doc}</p>
          <h1 className="mb-4 max-w-[20ch] text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.12] text-cream">{s.title}</h1>
          <p className="mb-5 max-w-[58ch] text-[1.02rem] text-navy-400">{s.summary}</p>
          {s.deadline && (
            <p className="inline-flex items-center gap-2 rounded-sm border border-[#E08264]/40 bg-[#B4472F]/15 px-4 py-2.5 text-[0.88rem] font-semibold text-[#E08264]">
              <Clock className="h-4 w-4 shrink-0" aria-hidden />{s.deadline}
            </p>
          )}
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <article className="min-w-0">
            <Tldr label={locale === "fr" ? "En bref" : "In short"}>{s.tldr}</Tldr>
            {s.sections.map((sec) => (
              <Reveal key={sec.h} className="mt-9">
                <h2 className="mb-3 text-[clamp(1.3rem,2.4vw,1.75rem)] leading-snug">{sec.h}</h2>
                {sec.p.map((para, i) => (
                  <p key={i} className="mb-3 max-w-[65ch] text-[0.97rem] leading-relaxed text-muted">{para}</p>
                ))}
              </Reveal>
            ))}

            <Reveal className="mt-12">
              <h2 className="mb-4 text-[clamp(1.3rem,2.4vw,1.75rem)]">{locale === "fr" ? "Questions fréquentes" : "Common questions"}</h2>
              <div className="grid gap-2.5">
                {s.faqs.map((f) => (
                  <details key={f.q} className="rounded-sm border border-line bg-surface px-5 py-4">
                    <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
                    <p className="mt-2.5 text-[0.92rem] leading-relaxed text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>

            <SourceList label={d.sourcesLabel} sources={s.sources} />
          </article>

          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded border border-gold-500/35 bg-navy-950 p-6">
              <DeadlineChecker d={d} compact />
            </div>
            <div className="mt-4 rounded-sm border border-line bg-surface p-6">
              <p className="mb-2.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-gold-600">{d.contact.eyebrow}</p>
              <p className="mb-4 text-[0.9rem] text-muted">{d.contact.lede}</p>
              <Cta href={`/${locale}/contact`} className="w-full">{d.cta.secondary}</Cta>
            </div>
          </aside>
        </div>

        <Reveal className="mt-16 border-t border-line pt-10">
          <h2 className="mb-5 text-[1.4rem]">{locale === "fr" ? "Autres situations" : "Other situations"}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/${locale}/services/${o.slug}`} className="rounded-sm border border-line bg-surface p-5 transition hover:border-gold-500">
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-gold-600">{o.doc}</span>
                <h3 className="mt-1.5 text-[1.02rem] leading-snug">{o.title}</h3>
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
