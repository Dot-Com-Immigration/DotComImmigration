import type { Metadata } from "next";
import { getDict } from "@/content";
import { Section, Meta, H2, Lede, Cta } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.problemsIntro.h2, description: d.problemsIntro.lede, alternates: { canonical: `/${locale}/how-we-help` } };
}

export default async function HowWeHelp({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale); const fr = locale === "fr";
  return (
    <>
      <Section>
        <JsonLd data={breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.problemsIntro.h2, href: `/${locale}/how-we-help` }])} />
        <Reveal>
          <Meta>{d.problemsIntro.eyebrow}</Meta>
          <h1 className="display-l mb-6">{d.problemsIntro.h2}</h1>
          <Lede className="mb-12">{d.problemsIntro.lede}</Lede>
        </Reveal>
        <div className="hair-t">
          {d.problems.map((p) => (
            <Reveal key={p.n}>
              <article className="hair-b grid gap-6 py-9 lg:grid-cols-[0.4fr_0.6fr]">
                <div className="flex items-start gap-5">
                  <span className="mt-1.5 font-mono text-[0.7rem] tabular-nums text-[var(--muted)]">{p.n}</span>
                  <h2 className="display-s">{p.title}</h2>
                </div>
                <div className="grid gap-5">
                  <div>
                    <p className="meta meta-dim mb-2">{fr ? "Le problème" : "The problem"}</p>
                    <p className="measure text-[0.92rem] leading-relaxed text-[var(--muted)]">{p.problem}</p>
                  </div>
                  <div>
                    <p className="meta mb-2">{fr ? "Ce que nous faisons" : "What we do"}</p>
                    <p className="measure text-[0.92rem] leading-relaxed text-[var(--fg-dim)]">{p.solution}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tint>
        <Reveal>
          <Meta>{d.tiersIntro.eyebrow}</Meta>
          <H2 className="mb-5">{d.tiersIntro.h2}</H2>
          <Lede className="mb-10">{d.tiersIntro.lede}</Lede>
        </Reveal>
        <div className="hair-t">
          {d.tiers.map((t) => (
            <div key={t.offer} className="hair-b grid gap-3 py-6 sm:grid-cols-[7rem_1fr_14rem] sm:items-baseline sm:gap-7">
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] accent-type">{t.tier}</span>
              <div className="min-w-0">
                <h3 className="display-s mb-1.5">{t.offer}</h3>
                <p className="text-[0.9rem] text-[var(--muted)]">{t.detail}</p>
              </div>
              <span className="font-mono text-[0.68rem] leading-relaxed text-[var(--muted)]">{t.who}</span>
            </div>
          ))}
        </div>
        <Cta href={`/${locale}/contact`} className="mt-10">{d.cta.secondary}</Cta>
      </Section>
    </>
  );
}
