import type { Metadata } from "next";
import { getDict } from "@/content";
import { REGISTER_URL, site } from "@/site.config";
import { Section, Meta, H2, Lede, Cta, Tldr } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.verify.h2, description: d.verify.p, alternates: { canonical: `/${locale}/verify` } };
}

export default async function VerifyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale); const fr = locale === "fr";
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.verify.h2, href: `/${locale}/verify` }])} />
      <section className="grain relative overflow-hidden">
        <div className="container-x relative z-10 grid items-start gap-12 pb-12 pt-12 sm:pb-16 sm:pt-16 lg:grid-cols-2">
          <div>
            <p className="meta mb-5">{d.verify.eyebrow}</p>
            <h1 className="display-l mb-6">{d.verify.h2}</h1>
            <p className="measure mb-8 text-[1.02rem] leading-relaxed text-[var(--fg-dim)]">{d.verify.p}</p>
            <Cta href={REGISTER_URL} external>{d.verify.cta}</Cta>
          </div>
          <ol className="hair-t">
            {d.verify.steps.map((s, i) => (
              <li key={s} className="hair-b flex items-start gap-5 py-5">
                <span className="mt-0.5 font-mono text-[0.7rem] tabular-nums accent-type">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[0.9rem] leading-relaxed text-[var(--fg-dim)]">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section tint>
        <Reveal className="max-w-3xl">
          <Meta>{fr ? "La catégorie de permis" : "The licence class"}</Meta>
          <H2 className="mb-5">{fr ? "Ce que la mention CISR signifie" : "What the IRB endorsement means"}</H2>
          <Lede className="mb-7">{d.about.p1}</Lede>
          <Tldr label={fr ? "La limite" : "The limit"}>{d.about.limit}</Tldr>
          <p className="mt-8 font-mono text-[0.78rem] uppercase tracking-[0.1em] text-[var(--muted)]">
            {fr ? "Rechercher" : "Search for"} <span className="accent-type">{site.consultant.name}</span>
            {" · "}{site.consultant.credential}{" · "}{site.consultant.licenceNumber}
          </p>
        </Reveal>
      </Section>
    </>
  );
}
