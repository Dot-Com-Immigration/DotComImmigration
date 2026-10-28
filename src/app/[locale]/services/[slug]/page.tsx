import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getDict } from "@/content";
import { site } from "@/site.config";
import { Meta, Lede, Cta, Tldr, SourceList } from "@/components/ui";
import { Reveal } from "@/components/motion";
import DeadlineChecker from "@/components/deadline-checker";
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  const d = getDict("en");
  return site.locales.flatMap((locale) => d.services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = getDict(locale).services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.title, description: s.tldr.slice(0, 180),
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
  const fr = locale === "fr";

  return (
    <>
      <JsonLd data={[serviceSchema(s, locale), faqSchema(s.faqs), breadcrumbSchema([
        { name: "Home", href: `/${locale}` },
        { name: d.mattersIntro.h2, href: `/${locale}/services` },
        { name: s.title, href: `/${locale}/services/${s.slug}` }])]} />

      <section className="grain relative overflow-hidden">
        <div className="container-x relative z-10 pb-10 pt-10 sm:pb-14 sm:pt-14">
          <Link href={`/${locale}/services`}
            className="mb-7 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />{d.mattersIntro.h2}
          </Link>
          <p className="meta mb-5">{s.doc}</p>
          <h1 className="display-l mb-6 max-w-[18ch]">{s.title}</h1>
          <p className="measure mb-6 text-[1.02rem] leading-relaxed text-[var(--fg-dim)]">{s.summary}</p>
          {s.deadline && (
            <p className="inline-block border border-[var(--alarm)] px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--alarm)]">
              {s.deadline}
            </p>
          )}
        </div>
      </section>

      <section className="hair-t py-12 sm:py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <article className="min-w-0">
            <Tldr label={fr ? "En bref" : "In short"}>{s.tldr}</Tldr>
            {s.sections.map((sec) => (
              <Reveal key={sec.h} className="mt-11">
                <h2 className="display-s mb-4">{sec.h}</h2>
                {sec.p.map((para, i) => (
                  <p key={i} className="measure mb-3.5 text-[0.97rem] leading-relaxed text-[var(--fg-dim)]">{para}</p>
                ))}
              </Reveal>
            ))}

            <Reveal className="mt-14">
              <h2 className="display-s mb-5">{fr ? "Questions fréquentes" : "Common questions"}</h2>
              <div className="hair-t">
                {s.faqs.map((f) => (
                  <details key={f.q} className="hair-b group py-4">
                    <summary className="flex cursor-pointer list-none items-start gap-4">
                      <span className="min-w-0 flex-1 text-[0.97rem] font-medium">{f.q}</span>
                      <span className="shrink-0 accent-type transition-transform group-open:rotate-45" aria-hidden>+</span>
                    </summary>
                    <p className="measure mt-3 text-[0.92rem] leading-relaxed text-[var(--muted)]">{f.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>

            <SourceList label={d.sourcesLabel} sources={s.sources} />
          </article>

          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="hair bg-[var(--surface)] p-6">
              <DeadlineChecker d={d} />
            </div>
            <div className="hair mt-4 p-6">
              <Meta>{d.contact.eyebrow}</Meta>
              <p className="mb-5 text-[0.9rem] leading-relaxed text-[var(--muted)]">{d.contact.lede}</p>
              <Cta href={`/${locale}/contact`} className="w-full">{d.cta.secondary}</Cta>
            </div>
          </aside>
        </div>

        <div className="container-x hair-t mt-16 pt-10">
          <Meta>{fr ? "Autres situations" : "Other situations"}</Meta>
          <div className="bento mt-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/${locale}/services/${o.slug}`} className="b-2 group p-6 transition-colors hover:bg-[var(--surface)]">
                <p className="meta mb-2">{o.doc}</p>
                <h3 className="display-s">{o.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
