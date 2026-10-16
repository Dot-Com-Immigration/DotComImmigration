import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { getDict } from "@/content";
import { REGISTER_URL, site } from "@/site.config";
import { Section, H2, Lede, Tldr } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.verify.h2, description: d.verify.p, alternates: { canonical: `/${locale}/verify` } };
}

export default async function VerifyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale);
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.verify.h2, href: `/${locale}/verify` }])} />
      <section className="relative overflow-hidden bg-navy-950 py-14 text-cream sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46rem_30rem_at_80%_40%,rgba(195,149,60,0.18),transparent_62%)]" aria-hidden />
        <div className="container-x relative z-10 grid items-center gap-9 lg:grid-cols-2">
          <div>
            <p className="mb-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-400">{d.verify.eyebrow}</p>
            <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)] leading-[1.12] text-cream">{d.verify.h2}</h1>
            <p className="mb-6 max-w-[56ch] text-[0.98rem] text-navy-400">{d.verify.p}</p>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-br from-gold-400 to-gold-500 px-6 py-3 text-sm font-semibold text-[#2A1D05] transition hover:-translate-y-0.5">
              <ShieldCheck className="h-4 w-4" aria-hidden />{d.verify.cta}
            </a>
          </div>
          <Stagger className="grid gap-3">
            {d.verify.steps.map((s, i) => (
              <StaggerItem key={s}>
                <div className="flex items-start gap-3.5 rounded-sm border border-cream/13 bg-cream/5 px-4 py-4">
                  <span className="font-display tabular-nums text-gold-400">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[0.88rem] text-navy-400">{s}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Section>
        <Reveal className="max-w-3xl">
          <H2 className="mb-4">{locale === "fr" ? "Ce que la catégorie de permis signifie" : "What the licence class means"}</H2>
          <Lede className="mb-5">{d.about.p1}</Lede>
          <Tldr label={locale === "fr" ? "La limite" : "The limit"}>{d.about.limit}</Tldr>
          <p className="mt-6 text-[0.9rem] text-muted">
            {locale === "fr" ? "Rechercher :" : "Search for:"}{" "}
            <strong className="text-fg">{site.consultant.name}</strong> · {site.consultant.credential}
          </p>
        </Reveal>
      </Section>
    </>
  );
}
