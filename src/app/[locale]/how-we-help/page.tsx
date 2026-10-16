import type { Metadata } from "next";
import { getDict } from "@/content";
import { Section, Eyebrow, H2, Lede, Cta } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.problemsIntro.h2, description: d.problemsIntro.lede, alternates: { canonical: `/${locale}/how-we-help` } };
}

export default async function HowWeHelp({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale);
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.problemsIntro.h2, href: `/${locale}/how-we-help` }])} />
      <Section>
        <Reveal>
          <Eyebrow>{d.problemsIntro.eyebrow}</Eyebrow>
          <H2 className="mb-3.5">{d.problemsIntro.h2}</H2>
          <Lede className="mb-10">{d.problemsIntro.lede}</Lede>
        </Reveal>
        <Stagger className="grid gap-5 lg:grid-cols-2">
          {d.problems.map((p) => (
            <StaggerItem key={p.n} className="h-full">
              <div className="flex h-full flex-col rounded border border-line border-l-[3px] border-l-gold-500 bg-surface p-6">
                <div className="mb-3 flex items-start gap-3">
                  <span className="font-display tabular-nums text-gold-600">{p.n}</span>
                  <h2 className="text-[1.15rem] leading-snug">{p.title}</h2>
                </div>
                <h3 className="mb-1.5 font-sans text-[0.64rem] font-bold uppercase tracking-[0.17em] text-gold-600">
                  {locale === "fr" ? "Le problème" : "The problem"}
                </h3>
                <p className="mb-4 text-[0.9rem] text-muted">{p.problem}</p>
                <h3 className="mb-1.5 font-sans text-[0.64rem] font-bold uppercase tracking-[0.17em] text-gold-600">
                  {locale === "fr" ? "Ce que nous faisons" : "What we do"}
                </h3>
                <p className="text-[0.9rem] text-muted">{p.solution}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tint>
        <Reveal>
          <Eyebrow>{d.tiersIntro.eyebrow}</Eyebrow>
          <H2 className="mb-3.5">{d.tiersIntro.h2}</H2>
          <Lede className="mb-9">{d.tiersIntro.lede}</Lede>
        </Reveal>
        <Stagger className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-5">
          {d.tiers.map((t) => (
            <StaggerItem key={t.offer} className="h-full">
              <div className="flex h-full flex-col gap-2 rounded-sm border border-line bg-surface p-5">
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-gold-600">{t.tier}</span>
                <h3 className="text-[1.05rem] leading-snug">{t.offer}</h3>
                <p className="text-[0.85rem] text-muted">{t.detail}</p>
                <p className="mt-auto border-t border-dashed border-line pt-2.5 text-[0.76rem] text-muted">{t.who}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-9"><Cta href={`/${locale}/contact`}>{d.cta.secondary}</Cta></Reveal>
      </Section>
    </>
  );
}
