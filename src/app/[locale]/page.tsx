import Link from "next/link";
import Image from "next/image";
import { getDict } from "@/content";
import { site, REGISTER_URL } from "@/site.config";
import { Section, Meta, H2, Lede, Cta, Row } from "@/components/ui";
import { Reveal, Counter } from "@/components/motion";
import DeadlineChecker from "@/components/deadline-checker";
import GuidedFinder from "@/components/guided-finder";
import ProblemMatcher from "@/components/problem-matcher";
import WaitTimes from "@/components/tools/wait-times";
import { JsonLd, faqSchema } from "@/lib/schema";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = getDict(locale);
  const fr = locale === "fr";

  const ticker = [
    { n: "15", l: fr ? "jours pour l'avis d'appel" : "days to file the appeal" },
    { n: "48", l: fr ? "heures jusqu'au contrôle" : "hours to the detention review" },
    { n: "30", l: fr ? "jours pour mettre en état" : "days to perfect it" },
    { n: "24", l: fr ? "mois d'attente avant cela" : "months of waiting before that" },
  ];

  const tools = [
    { h: "/deadline-checker", m: fr ? "Outil" : "Tool", t: d.checker.title, b: fr ? "Le document, la date, le compte à rebours." : "The document, the date, the countdown.", span: "b-3" },
    { h: "/tools/detention", m: fr ? "48 heures" : "48 hours", t: fr ? "Une personne a été détenue" : "Someone has been detained", b: fr ? "Ce qu'il faut rassembler, pour le proche qui peut agir." : "What to gather, for the relative who can act.", span: "b-3" },
    { h: "/tools/documents", m: fr ? "Liste" : "Checklist", t: fr ? "Quoi apporter" : "What to bring", b: fr ? "Par type de dossier." : "By matter type.", span: "b-2" },
    { h: "/tools/scope", m: fr ? "Portée" : "Scope", t: fr ? "Avocat ou consultant ?" : "Lawyer or consultant?", b: fr ? "La réponse honnête." : "The honest answer.", span: "b-2" },
    { h: "/tools/wait-times", m: fr ? "Délais" : "Waits", t: fr ? "Combien de temps" : "How long", b: fr ? "Les chiffres de la Commission." : "The Board's own figures.", span: "b-2" },
  ];

  return (
    <>
      <JsonLd data={faqSchema(d.faqs.slice(0, 6))} />

      {/* ---------- typographic hero. no photograph ---------- */}
      <section className="relative grain overflow-hidden">
        <div className="container-x relative z-10 pb-14 pt-12 sm:pb-20 sm:pt-16">
          <p className="meta mb-8">{d.hero.eyebrow}</p>
          <h1 className="display-xl mb-8">
            {d.hero.h1a}
            <span className="block accent-type italic">{d.hero.h1b}</span>
          </h1>
          <div className="hair-t grid gap-8 pt-8 lg:grid-cols-[1.1fr_0.9fr]">
            <p className="measure text-[1.05rem] leading-relaxed text-[var(--fg-dim)]">{d.hero.sub}</p>
            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-wrap gap-2.5">
                <Cta href={`/${locale}/deadline-checker`}>{d.cta.primary}</Cta>
                <Cta href={`/${locale}/contact`} ghost>{d.cta.secondary}</Cta>
              </div>
              <ul className="grid gap-1">
                {d.hero.trust.map((t) => (
                  <li key={t} className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                    <span className="accent-type">/ </span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- the clocks, as a hairline band ---------- */}
      <div className="hair-t hair-b overflow-hidden">
        <div className="cells container-x grid grid-cols-2 lg:grid-cols-4">
          {ticker.map((t) => (
            <div key={t.l} className="bg-[var(--bg)] px-5 py-7">
              <div className="font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-none tabular-nums accent-type">{t.n}</div>
              <p className="mt-2 font-mono text-[0.64rem] uppercase leading-snug tracking-[0.1em] text-[var(--muted)]">{t.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- the matcher: pick your problem, get the answer ---------- */}
      <ProblemMatcher locale={locale} />

      {/* ---------- deadline checker, given the room it deserves ---------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <Meta>{fr ? "Commencez ici" : "Start here"}</Meta>
            <H2 className="mb-5">{fr ? "Trouvez votre date avant de décider quoi que ce soit." : "Find your date before you decide anything."}</H2>
            <Lede className="mb-6">
              {fr
                ? "La plupart des gens perdent une semaine à comprendre la lettre. Le délai court déjà. Commencez par la date, puis décidez."
                : "Most people lose a week working out what the letter means. The clock is already running. Start with the date, then decide."}
            </Lede>
            <Cta href={`/${locale}/tools`} ghost>{fr ? "Tous les outils" : "All the tools"}</Cta>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="hair bg-[var(--surface)] p-6 sm:p-9">
              <DeadlineChecker d={d} />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- tools bento ---------- */}
      <Section tint>
        <Reveal>
          <Meta>{fr ? "Gratuit, sans inscription" : "Free, no sign-up"}</Meta>
          <H2 className="mb-5">{fr ? "Des outils que personne d'autre dans ce domaine n'a" : "Tools nobody else in this niche has"}</H2>
          <Lede className="mb-10">
            {fr
              ? "Construits pour les dossiers à délai, pas pour l'immigration économique. C'est là que se trouvent vos vrais problèmes."
              : "Built for deadline-driven matters rather than economic immigration, because that is where the real trouble is."}
          </Lede>
        </Reveal>
        <div className="bento">
          {tools.map((t) => (
            <Link key={t.h} href={`/${locale}${t.h}`} className={`${t.span} group p-7 transition-colors hover:bg-[var(--surface-2)]`}>
              <p className="meta mb-3">{t.m}</p>
              <h3 className="display-s mb-2">{t.t}</h3>
              <p className="text-sm text-[var(--muted)]">{t.b}</p>
              <span className="mt-4 inline-block accent-type opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>→</span>
            </Link>
          ))}
          <div className="b-4 p-7">
            <p className="meta mb-3">{fr ? "Pas sûr ?" : "Not sure?"}</p>
            <GuidedFinder locale={locale} />
          </div>
        </div>
      </Section>

      {/* ---------- stats ---------- */}
      <Section>
        <Reveal>
          <Meta>{fr ? "Le système, en chiffres publiés" : "The system, in published numbers"}</Meta>
        </Reveal>
        <div className="hair-t">
          {d.stats.map((s) => (
            <div key={s.label} className="hair-b flex flex-wrap items-baseline gap-x-7 gap-y-2 py-6">
              <span className="font-display text-[clamp(2.2rem,6vw,4rem)] leading-none tabular-nums accent-type">
                {s.count ? <Counter to={s.count} display={s.value} locale={locale} /> : s.value}
              </span>
              <span className="min-w-0 flex-1 text-[0.95rem] text-[var(--fg-dim)]">{s.label}</span>
              <a href={s.source.url} target="_blank" rel="noopener noreferrer"
                className="font-mono text-[0.64rem] uppercase tracking-wider text-[var(--muted)] underline-offset-4 hover:text-[var(--fg)] hover:underline">
                {s.source.label}
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- matters, as rows not cards ---------- */}
      <Section tint>
        <Reveal>
          <Meta>{d.mattersIntro.eyebrow}</Meta>
          <H2 className="mb-5">{d.mattersIntro.h2}</H2>
          <Lede className="mb-10">{d.mattersIntro.lede}</Lede>
        </Reveal>
        <div className="hair-t">
          {d.services.map((s, i) => (
            <Row key={s.slug} index={String(i + 1).padStart(2, "0")} meta={s.doc}
              title={s.title} body={s.summary} alarm={s.deadline ?? undefined}
              href={`/${locale}/services/${s.slug}`} />
          ))}
        </div>
        <Cta href={`/${locale}/practice-areas`} ghost className="mt-9">{d.practiceIntro.h2}</Cta>
      </Section>

      {/* ---------- problems ---------- */}
      <Section>
        <Reveal>
          <Meta>{d.problemsIntro.eyebrow}</Meta>
          <H2 className="mb-5">{d.problemsIntro.h2}</H2>
          <Lede className="mb-10">{d.problemsIntro.lede}</Lede>
        </Reveal>
        <div className="hair-t">
          {d.problems.map((p) => (
            <details key={p.n} className="hair-b group" open={p.n === "01"}>
              <summary className="flex cursor-pointer list-none items-start gap-5 py-6">
                <span className="mt-1 font-mono text-[0.7rem] tabular-nums text-[var(--muted)]">{p.n}</span>
                <span className="min-w-0 flex-1 display-s">{p.title}</span>
                <span className="mt-1 shrink-0 accent-type transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <div className="grid gap-6 pb-7 pl-0 sm:grid-cols-2 sm:pl-[3.1rem]">
                <div>
                  <p className="meta meta-dim mb-2">{fr ? "Le problème" : "The problem"}</p>
                  <p className="text-[0.92rem] leading-relaxed text-[var(--muted)]">{p.problem}</p>
                </div>
                <div>
                  <p className="meta mb-2">{fr ? "Ce que nous faisons" : "What we do"}</p>
                  <p className="text-[0.92rem] leading-relaxed text-[var(--fg-dim)]">{p.solution}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* ---------- wait times ---------- */}
      <Section tint>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Meta>{fr ? "Attendez-vous à attendre" : "Expect to wait"}</Meta>
            <H2>{fr ? "Lent pendant deux ans, puis brutal pendant deux semaines." : "Slow for two years, then brutal for two weeks."}</H2>
          </Reveal>
          <Reveal delay={0.08}><WaitTimes locale={locale} /></Reveal>
        </div>
      </Section>

      {/* ---------- verify ---------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Meta>{d.verify.eyebrow}</Meta>
            <H2 className="mb-5">{d.verify.h2}</H2>
            <Lede className="mb-7">{d.verify.p}</Lede>
            <Cta href={REGISTER_URL} external>{d.verify.cta}</Cta>
          </Reveal>
          <Reveal delay={0.08}>
            <ol className="hair-t">
              {d.verify.steps.map((s, i) => (
                <li key={s} className="hair-b flex items-start gap-5 py-5">
                  <span className="mt-0.5 font-mono text-[0.7rem] tabular-nums accent-type">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[0.9rem] leading-relaxed text-[var(--fg-dim)]">{s}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* ---------- about. the one photograph on the page ---------- */}
      <Section tint>
        <div className="grid items-end gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <Reveal>
            <figure className="hair relative m-0 overflow-hidden">
              <Image src="/brand/angad.jpg" alt={`${site.consultant.name}, ${site.consultant.title}`}
                width={720} height={1212} className="h-auto w-full grayscale transition duration-700 hover:grayscale-0" />
            </figure>
          </Reveal>
          <Reveal delay={0.08}>
            <Meta>{d.about.eyebrow}</Meta>
            <H2 className="mb-5">{d.about.h2}</H2>
            <Lede className="mb-4">{d.about.p1}</Lede>
            <Lede className="mb-5">{d.about.p2}</Lede>
            <p className="measure border-l-2 border-[var(--alarm)] pl-5 text-[0.98rem] leading-relaxed">{d.about.limit}</p>
            <Cta href={`/${locale}/about`} ghost className="mt-7">{d.nav[4].label}</Cta>
          </Reveal>
        </div>
      </Section>

      {/* ---------- close ---------- */}
      <Section>
        <div className="hair-t pt-12">
          <p className="meta mb-6">{d.contact.eyebrow}</p>
          <h2 className="display-l mb-7">{d.contact.h2}</h2>
          <Lede className="mb-9">{d.contact.lede}</Lede>
          <div className="flex flex-wrap gap-2.5">
            <Cta href={`/${locale}/contact`}>{d.cta.send}</Cta>
            <Cta href={`/${locale}/resources`} ghost>{d.faqIntro.h2}</Cta>
          </div>
        </div>
      </Section>
    </>
  );
}
