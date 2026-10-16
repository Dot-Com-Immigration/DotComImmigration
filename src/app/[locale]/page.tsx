import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Clock, ShieldCheck } from "lucide-react";
import { getDict } from "@/content";
import { site, REGISTER_URL } from "@/site.config";
import { Section, Eyebrow, H2, Lede, Cta } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, Counter } from "@/components/motion";
import DeadlineChecker from "@/components/deadline-checker";
import GuidedFinder from "@/components/guided-finder";
import { JsonLd, faqSchema } from "@/lib/schema";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = getDict(locale);

  return (
    <>
      <JsonLd data={faqSchema(d.faqs.slice(0, 6))} />

      {/* hero */}
      <section className="relative overflow-hidden bg-navy-950 text-cream">
        <div className="mesh pointer-events-none absolute inset-0" aria-hidden />
        <div className="noise pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-x relative z-10 grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.04fr_0.96fr] lg:py-24">
          <div>
            <p className="mb-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-400">{d.hero.eyebrow}</p>
            <h1 className="mb-5 text-[clamp(2.3rem,5.4vw,4.1rem)] leading-[1.1] text-cream">
              {d.hero.h1a}
              <span className="block gold-text">{d.hero.h1b}</span>
            </h1>
            <p className="mb-7 max-w-[54ch] text-[clamp(1rem,1.5vw,1.14rem)] text-navy-400">{d.hero.sub}</p>
            <div className="mb-7 flex flex-wrap gap-3">
              <Cta href={`/${locale}/deadline-checker`}>{d.cta.primary}</Cta>
              <Cta href={`/${locale}/contact`} variant="ghost">{d.cta.secondary}</Cta>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.78rem] text-navy-400">
              {d.hero.trust.map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-gold-400" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
          <DeadlineChecker d={d} />
        </div>
      </section>

      {/* stats */}
      <section className="border-y border-gold-500/20 bg-navy-800 text-cream">
        <Stagger className="container-x grid grid-cols-2 gap-7 py-10 sm:py-12 lg:grid-cols-4">
          {d.stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] leading-none text-gold-400">
                {s.count ? <Counter to={s.count} display={s.value} locale={locale} /> : s.value}
              </div>
              <p className="mt-2.5 text-[0.8rem] leading-snug text-navy-400">{s.label}</p>
              <a href={s.source.url} target="_blank" rel="noopener noreferrer" className="mt-1.5 inline-block text-[0.68rem] text-navy-400 underline-offset-2 hover:text-gold-400 hover:underline">
                {s.source.label}
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* guided finder */}
      <Section tint>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <Eyebrow>{locale === "fr" ? "Vous ne savez pas de quoi il s'agit ?" : "Not sure what you are looking at?"}</Eyebrow>
            <H2 className="mb-4">{locale === "fr" ? "Répondez à trois questions" : "Answer three questions"}</H2>
            <Lede className="mb-6">
              {locale === "fr"
                ? "Ceci vous oriente vers la bonne page et vous indique si un délai court. Si vous préférez chercher directement, la recherche du site couvre chaque page, chaque question et chaque domaine de pratique."
                : "This points you to the right page and tells you whether there is a clock running. If you would rather search directly, the site search covers every page, every question and every practice area."}
            </Lede>
            <p className="inline-flex items-center gap-2 rounded-sm border border-line bg-surface px-4 py-2.5 text-[0.83rem] text-muted">
              <kbd className="rounded border border-line px-1.5 py-0.5 text-[0.7rem]">⌘K</kbd>
              {locale === "fr" ? "pour rechercher partout" : "to search everything"}
            </p>
          </Reveal>
          <Reveal delay={0.08}><GuidedFinder locale={locale} /></Reveal>
        </div>
      </Section>

      {/* matters */}
      <Section>
        <Reveal>
          <Eyebrow>{d.mattersIntro.eyebrow}</Eyebrow>
          <H2 className="mb-3.5">{d.mattersIntro.h2}</H2>
          <Lede className="mb-9">{d.mattersIntro.lede}</Lede>
        </Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {d.services.map((s) => (
            <StaggerItem key={s.slug} className="h-full">
              <Link href={`/${locale}/services/${s.slug}`}
                className="group flex h-full flex-col gap-2.5 rounded-sm border border-line bg-surface p-6 transition duration-200 hover:-translate-y-1 hover:border-gold-500 hover:shadow-[0_20px_42px_-26px_rgba(11,34,64,0.5)]">
                <span className="text-[0.63rem] font-bold uppercase tracking-[0.17em] text-gold-600">{s.doc}</span>
                <h3 className="text-[1.18rem] leading-snug">{s.title}</h3>
                <p className="text-[0.9rem] text-muted">{s.summary}</p>
                {s.deadline && (
                  <p className="mt-auto flex items-center gap-2 border-t border-dashed border-line pt-3 text-[0.79rem] font-semibold">
                    <Clock className="h-4 w-4 shrink-0 text-[#B4472F]" aria-hidden />
                    <span className="text-[#B4472F]">{s.deadline}</span>
                  </p>
                )}
                <span className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-gold-600">
                  {locale === "fr" ? "Lire" : "Read more"}
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-8">
          <Cta href={`/${locale}/practice-areas`} variant="navy">
            {d.practiceIntro.h2} <ArrowRight className="h-4 w-4" aria-hidden />
          </Cta>
        </Reveal>
      </Section>

      {/* problems */}
      <Section tint>
        <Reveal>
          <Eyebrow>{d.problemsIntro.eyebrow}</Eyebrow>
          <H2 className="mb-3.5">{d.problemsIntro.h2}</H2>
          <Lede className="mb-8">{d.problemsIntro.lede}</Lede>
        </Reveal>
        <Stagger className="grid gap-3.5">
          {d.problems.map((p) => (
            <StaggerItem key={p.n}>
              <details className="overflow-hidden rounded-sm border border-line border-l-[3px] border-l-gold-500 bg-surface" open={p.n === "01"}>
                <summary className="flex cursor-pointer list-none items-start gap-3.5 px-5 py-4 font-semibold sm:px-6">
                  <span className="font-display tabular-nums text-gold-600">{p.n}</span>
                  <span className="min-w-0 flex-1">{p.title}</span>
                  <span className="shrink-0 text-muted transition-transform">▾</span>
                </summary>
                <div className="grid gap-4 px-5 pb-5 sm:grid-cols-2 sm:gap-6 sm:px-6 sm:pb-6">
                  <div>
                    <h4 className="mb-1.5 font-sans text-[0.66rem] font-bold uppercase tracking-[0.17em] text-gold-600">
                      {locale === "fr" ? "Le problème" : "The problem"}
                    </h4>
                    <p className="text-[0.9rem] text-muted">{p.problem}</p>
                  </div>
                  <div>
                    <h4 className="mb-1.5 font-sans text-[0.66rem] font-bold uppercase tracking-[0.17em] text-gold-600">
                      {locale === "fr" ? "Ce que nous faisons" : "What we do"}
                    </h4>
                    <p className="text-[0.9rem] text-muted">{p.solution}</p>
                  </div>
                </div>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* tiers */}
      <Section>
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
      </Section>

      {/* verify */}
      <section className="relative overflow-hidden bg-navy-950 py-14 text-cream sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46rem_30rem_at_82%_50%,rgba(195,149,60,0.17),transparent_62%)]" aria-hidden />
        <div className="container-x relative z-10 grid items-center gap-9 lg:grid-cols-2">
          <Reveal>
            <p className="mb-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-400">{d.verify.eyebrow}</p>
            <h2 className="mb-4 text-[clamp(1.8rem,3.4vw,2.7rem)] leading-[1.14] text-cream">{d.verify.h2}</h2>
            <p className="mb-6 max-w-[56ch] text-[0.96rem] text-navy-400">{d.verify.p}</p>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-br from-gold-400 to-gold-500 px-6 py-3 text-sm font-semibold text-[#2A1D05] transition hover:-translate-y-0.5">
              <ShieldCheck className="h-4 w-4" aria-hidden /> {d.verify.cta}
            </a>
          </Reveal>
          <Stagger className="grid gap-3">
            {d.verify.steps.map((s, i) => (
              <StaggerItem key={s}>
                <div className="flex items-start gap-3.5 rounded-sm border border-cream/13 bg-cream/5 px-4 py-4">
                  <span className="font-display tabular-nums text-gold-400">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[0.87rem] text-navy-400">{s}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* about */}
      <Section>
        <div className="grid items-center gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <figure className="relative m-0 overflow-hidden rounded-sm border border-line bg-navy-950">
              <Image src="/brand/angad.jpg" alt={`${site.consultant.name}, ${site.consultant.title}`} width={720} height={1212} className="h-auto w-full" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 to-transparent px-5 py-4 text-cream">
                <span className="block font-display text-[1.1rem]">{site.consultant.name}</span>
                <span className="block text-[0.7rem] uppercase tracking-[0.15em] text-gold-400">{site.consultant.credential}</span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.08}>
            <Eyebrow>{d.about.eyebrow}</Eyebrow>
            <H2 className="mb-4">{d.about.h2}</H2>
            <Lede className="mb-4">{d.about.p1}</Lede>
            <Lede className="mb-4">{d.about.p2}</Lede>
            <p className="max-w-[62ch] rounded-sm border-l-[3px] border-gold-500 bg-sand p-4 text-[0.95rem] font-semibold">{d.about.limit}</p>
          </Reveal>
        </div>
      </Section>

      {/* contact cta */}
      <Section tint>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-center">{d.contact.eyebrow}</Eyebrow>
          <H2 className="mb-3.5">{d.contact.h2}</H2>
          <Lede className="mx-auto mb-7">{d.contact.lede}</Lede>
          <div className="flex flex-wrap justify-center gap-3">
            <Cta href={`/${locale}/contact`}>{d.cta.send}</Cta>
            <Cta href={`/${locale}/resources`} variant="navy">{d.faqIntro.h2}</Cta>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
