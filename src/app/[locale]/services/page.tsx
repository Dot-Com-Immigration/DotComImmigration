import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getDict } from "@/content";
import { Section, Eyebrow, H2, Lede } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.mattersIntro.h2, description: d.mattersIntro.lede, alternates: { canonical: `/${locale}/services` } };
}

export default async function ServicesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale);
  return (
    <Section>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.mattersIntro.h2, href: `/${locale}/services` }])} />
      <Reveal>
        <Eyebrow>{d.mattersIntro.eyebrow}</Eyebrow>
        <H2 className="mb-3.5">{d.mattersIntro.h2}</H2>
        <Lede className="mb-9">{d.mattersIntro.lede}</Lede>
      </Reveal>
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {d.services.map((s) => (
          <StaggerItem key={s.slug} className="h-full">
            <Link href={`/${locale}/services/${s.slug}`} className="group flex h-full flex-col gap-2.5 rounded-sm border border-line bg-surface p-6 transition hover:-translate-y-1 hover:border-gold-500">
              <span className="text-[0.63rem] font-bold uppercase tracking-[0.17em] text-gold-600">{s.doc}</span>
              <h3 className="text-[1.18rem] leading-snug">{s.title}</h3>
              <p className="text-[0.9rem] text-muted">{s.summary}</p>
              {s.deadline && (
                <p className="mt-auto flex items-center gap-2 border-t border-dashed border-line pt-3 text-[0.79rem] font-semibold text-[#B4472F]">
                  <Clock className="h-4 w-4 shrink-0" aria-hidden />{s.deadline}
                </p>
              )}
              <span className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-gold-600">
                {locale === "fr" ? "Lire" : "Read more"}<ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
