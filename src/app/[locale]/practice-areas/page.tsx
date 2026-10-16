import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { getDict } from "@/content";
import { Section, Eyebrow, H2, Lede } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.practiceIntro.h2, description: d.practiceIntro.lede, alternates: { canonical: `/${locale}/practice-areas` } };
}

export default async function PracticeAreas({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale);
  return (
    <Section>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.practiceIntro.h2, href: `/${locale}/practice-areas` }])} />
      <Reveal>
        <Eyebrow>{d.practiceIntro.eyebrow}</Eyebrow>
        <H2 className="mb-3.5">{d.practiceIntro.h2}</H2>
        <Lede className="mb-10">{d.practiceIntro.lede}</Lede>
      </Reveal>
      <Stagger className="grid gap-5 lg:grid-cols-2">
        {d.practiceGroups.map((g) => (
          <StaggerItem key={g.key} className={g.flagship ? "lg:col-span-2" : ""}>
            <div className={`h-full rounded border bg-surface p-6 sm:p-7 ${g.flagship ? "border-gold-500 shadow-[0_18px_40px_-28px_rgba(195,149,60,0.6)]" : "border-line"}`}>
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <h2 className="text-[1.3rem] leading-snug">{g.title}</h2>
                {g.flagship && (
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-gold-500/15 px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-gold-600">
                    <Star className="h-3 w-3" aria-hidden />{d.practiceIntro.flagshipTag}
                  </span>
                )}
              </div>
              <p className="mb-5 max-w-[60ch] text-[0.9rem] text-muted">{g.blurb}</p>
              <ul className={`grid gap-2 ${g.flagship ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2"}`}>
                {g.items.map((it) => {
                  const inner = (
                    <>
                      <span className="block text-[0.9rem] font-medium">{it.name}</span>
                      {it.note && <span className="mt-0.5 block text-xs text-muted">{it.note}</span>}
                    </>
                  );
                  return (
                    <li key={it.name}>
                      {it.slug ? (
                        <Link href={`/${locale}/services/${it.slug}`} className="group flex h-full items-start gap-2 rounded-sm border border-line bg-bg px-3.5 py-3 transition hover:border-gold-500">
                          <span className="min-w-0 flex-1">{inner}</span>
                          <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-600 opacity-0 transition group-hover:opacity-100" aria-hidden />
                        </Link>
                      ) : (
                        <div className="h-full rounded-sm border border-line bg-bg px-3.5 py-3">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
