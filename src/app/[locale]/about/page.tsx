import type { Metadata } from "next";
import Image from "next/image";
import { getDict } from "@/content";
import { site, isTodo } from "@/site.config";
import { Section, Eyebrow, H2, Lede, Cta, Tldr } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.about.h2, description: d.about.p1, alternates: { canonical: `/${locale}/about` } };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale);
  return (
    <Section>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.about.h2, href: `/${locale}/about` }])} />
      <div className="grid items-start gap-9 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
        <Reveal>
          <figure className="relative m-0 overflow-hidden rounded-sm border border-line bg-navy-950">
            <Image src="/brand/angad.jpg" alt={`${site.consultant.name}, ${site.consultant.title}`} width={720} height={1212} priority className="h-auto w-full" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 to-transparent px-5 py-4 text-cream">
              <span className="block font-display text-[1.1rem]">{site.consultant.name}</span>
              <span className="block text-[0.7rem] uppercase tracking-[0.15em] text-gold-400">{site.consultant.credential}</span>
            </figcaption>
          </figure>
        </Reveal>
        <Reveal delay={0.08}>
          <Eyebrow>{d.about.eyebrow}</Eyebrow>
          <h1 className="mb-5 text-[clamp(1.8rem,3.6vw,2.7rem)] leading-[1.14]">{d.about.h2}</h1>
          <Lede className="mb-4">{d.about.p1}</Lede>
          <Lede className="mb-5">{d.about.p2}</Lede>
          <Tldr label={locale === "fr" ? "La limite" : "The limit"}>{d.about.limit}</Tldr>
          {isTodo(site.registeredName) && (
            <p className="mt-6 rounded-sm border border-dashed border-[#B4472F] bg-[#B4472F]/10 p-4 text-[0.85rem] text-[#B4472F]">
              {locale === "fr"
                ? "Nom inscrit, numéro de permis et adresse du bureau à fournir avant la mise en ligne."
                : "Registered name, licence number and office address to be supplied before this goes live."}
            </p>
          )}
          <div className="mt-7 flex flex-wrap gap-3">
            <Cta href={`/${locale}/verify`} variant="navy">{d.nav[3].label}</Cta>
            <Cta href={`/${locale}/contact`}>{d.cta.secondary}</Cta>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
