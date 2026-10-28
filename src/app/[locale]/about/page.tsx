import type { Metadata } from "next";
import Image from "next/image";
import { getDict } from "@/content";
import { site, isTodo } from "@/site.config";
import { Section, Meta, Lede, Cta, Tldr } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.about.h2, description: d.about.p1, alternates: { canonical: `/${locale}/about` } };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale); const fr = locale === "fr";
  return (
    <Section>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.about.h2, href: `/${locale}/about` }])} />
      <div className="grid items-start gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
        <Reveal>
          <figure className="hair relative m-0 overflow-hidden">
            <Image src="/brand/angad.jpg" alt={`${site.consultant.name}, ${site.consultant.title}`}
              width={720} height={1212} priority className="h-auto w-full grayscale transition duration-700 hover:grayscale-0" />
          </figure>
          <p className="mt-4 font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.1em] text-[var(--muted)]">
            {site.consultant.name}<br />
            <span className="accent-type">{site.consultant.credential} · {site.consultant.licenceNumber}</span>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Meta>{d.about.eyebrow}</Meta>
          <h1 className="display-l mb-7">{d.about.h2}</h1>
          <Lede className="mb-4">{d.about.p1}</Lede>
          <Lede className="mb-6">{d.about.p2}</Lede>
          <Tldr label={fr ? "La limite" : "The limit"}>{d.about.limit}</Tldr>
          {isTodo(site.registeredName) && (
            <p className="measure mt-7 border border-dashed border-[var(--alarm)] p-4 font-mono text-[0.72rem] leading-relaxed text-[var(--alarm)]">
              {fr ? "Nom inscrit et adresse du bureau à fournir avant la mise en ligne." : "Registered name and office address to be supplied before this goes live."}
            </p>
          )}
          <div className="mt-9 flex flex-wrap gap-2.5">
            <Cta href={`/${locale}/verify`} ghost>{d.nav[3].label}</Cta>
            <Cta href={`/${locale}/contact`}>{d.cta.secondary}</Cta>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
