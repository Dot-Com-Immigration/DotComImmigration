import type { Metadata } from "next";
import { getDict } from "@/content";
import { Section, Meta, H2, Lede, Tldr } from "@/components/ui";
import { Reveal } from "@/components/motion";
import DeadlineChecker from "@/components/deadline-checker";
import GuidedFinder from "@/components/guided-finder";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.checker.title, description: d.checker.hint, alternates: { canonical: `/${locale}/deadline-checker` } };
}

export default async function CheckerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale); const fr = locale === "fr";
  const faqs = d.faqs.filter((f) => /15|48|délai|deadline|detention|détention/i.test(f.q));

  return (
    <>
      <JsonLd data={[faqSchema(faqs), breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.checker.title, href: `/${locale}/deadline-checker` }])]} />
      <section className="grain relative overflow-hidden">
        <div className="container-x relative z-10 grid items-start gap-12 pb-12 pt-12 sm:pb-16 sm:pt-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="meta mb-5">{d.nav[0].label}</p>
            <h1 className="display-l mb-6">{d.checker.title}</h1>
            <p className="measure text-[1.02rem] leading-relaxed text-[var(--fg-dim)]">{d.hero.sub}</p>
          </div>
          <div className="hair bg-[var(--surface)] p-6 sm:p-9">
            <DeadlineChecker d={d} />
          </div>
        </div>
      </section>

      <Section tint>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <Meta>{fr ? "Vous ne savez pas de quoi il s'agit ?" : "Not sure what you are looking at?"}</Meta>
            <H2 className="mb-5">{fr ? "Répondez à trois questions" : "Answer three questions"}</H2>
            <Lede className="mb-7">{d.checker.hint}</Lede>
            <Tldr label={fr ? "Important" : "Important"}>{d.disclaimer}</Tldr>
          </Reveal>
          <Reveal delay={0.08}><GuidedFinder locale={locale} /></Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <H2 className="mb-8">{fr ? "Questions sur les délais" : "Questions about deadlines"}</H2>
          <div className="hair-t max-w-3xl">
            {faqs.map((f) => (
              <details key={f.q} className="hair-b group py-4">
                <summary className="flex cursor-pointer list-none items-start gap-4">
                  <span className="min-w-0 flex-1 text-[0.97rem] font-medium">{f.q}</span>
                  <span className="shrink-0 accent-type transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="measure mt-3 text-[0.92rem] leading-relaxed text-[var(--muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
