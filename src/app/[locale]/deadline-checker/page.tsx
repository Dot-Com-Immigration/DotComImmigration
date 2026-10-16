import type { Metadata } from "next";
import { getDict } from "@/content";
import { Section, Eyebrow, H2, Lede, Tldr } from "@/components/ui";
import { Reveal } from "@/components/motion";
import DeadlineChecker from "@/components/deadline-checker";
import GuidedFinder from "@/components/guided-finder";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.checker.title, description: d.checker.hint, alternates: { canonical: `/${locale}/deadline-checker` } };
}

export default async function CheckerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale);
  const deadlineFaqs = d.faqs.filter((f) => /15|48|délai|deadline|detention|détention/i.test(f.q));

  return (
    <>
      <JsonLd data={[
        faqSchema(deadlineFaqs),
        breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.checker.title, href: `/${locale}/deadline-checker` }]),
      ]} />
      <section className="relative overflow-hidden bg-navy-950 py-12 text-cream sm:py-16">
        <div className="mesh pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-x relative z-10 grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-400">{d.nav[0].label}</p>
            <h1 className="mb-4 text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.12] text-cream">{d.checker.title}</h1>
            <p className="max-w-[56ch] text-[1.02rem] text-navy-400">{d.hero.sub}</p>
          </div>
          <DeadlineChecker d={d} />
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <Eyebrow>{locale === "fr" ? "Vous ne savez pas de quoi il s'agit ?" : "Not sure what you are looking at?"}</Eyebrow>
            <H2 className="mb-4">{locale === "fr" ? "Répondez à trois questions" : "Answer three questions"}</H2>
            <Lede className="mb-6">{d.checker.hint}</Lede>
            <Tldr label={locale === "fr" ? "Important" : "Important"}>{d.disclaimer}</Tldr>
          </Reveal>
          <Reveal delay={0.08}><GuidedFinder locale={locale} /></Reveal>
        </div>
      </Section>

      <Section tint>
        <Reveal>
          <H2 className="mb-6">{locale === "fr" ? "Questions sur les délais" : "Questions about deadlines"}</H2>
          <div className="grid max-w-3xl gap-2.5">
            {deadlineFaqs.map((f) => (
              <details key={f.q} className="rounded-sm border border-line bg-surface px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
