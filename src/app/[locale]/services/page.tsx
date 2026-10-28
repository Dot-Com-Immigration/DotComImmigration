import type { Metadata } from "next";
import { getDict } from "@/content";
import { Section, Meta, Lede, Row } from "@/components/ui";
import { Reveal } from "@/components/motion";
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
        <Meta>{d.mattersIntro.eyebrow}</Meta>
        <h1 className="display-l mb-6">{d.mattersIntro.h2}</h1>
        <Lede className="mb-12">{d.mattersIntro.lede}</Lede>
      </Reveal>
      <div className="hair-t">
        {d.services.map((s, i) => (
          <Row key={s.slug} index={String(i + 1).padStart(2, "0")} meta={s.doc} title={s.title}
            body={s.summary} alarm={s.deadline ?? undefined} href={`/${locale}/services/${s.slug}`} />
        ))}
      </div>
    </Section>
  );
}
