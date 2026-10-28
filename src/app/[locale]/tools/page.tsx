import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/content";
import { Section, Meta, H2, Lede } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

function tools(locale: string, d: ReturnType<typeof getDict>) {
  const fr = locale === "fr";
  return [
    { h: "/deadline-checker", m: fr ? "Compte à rebours" : "Countdown", t: d.checker.title,
      b: fr ? "Choisissez le document, entrez la date, voyez le délai courir. Ne contient que les délais vérifiés auprès de la Commission."
            : "Pick the document, enter the date, watch the clock run. Carries only timelines verified against the Board's own material.", span: "b-4" },
    { h: "/tools/detention", m: fr ? "48 heures" : "48 hours", t: fr ? "Une personne a été détenue" : "Someone has been detained",
      b: fr ? "Le premier contrôle a lieu dans les 48 heures et la personne détenue n'a pas de téléphone. Voici ce que le proche doit rassembler."
            : "The first review is within 48 hours and the detained person has no phone. This is what the relative needs to gather.", span: "b-2" },
    { h: "/tools/documents", m: fr ? "Liste" : "Checklist", t: fr ? "Quoi apporter" : "What to bring",
      b: fr ? "Par type de dossier. Cochez, copiez, apportez." : "By matter type. Tick it, copy it, bring it.", span: "b-2" },
    { h: "/tools/scope", m: fr ? "Portée" : "Scope", t: fr ? "Avocat ou consultant ?" : "Lawyer or consultant?",
      b: fr ? "Y compris les cas où la réponse est : pas nous." : "Including the cases where the answer is: not us.", span: "b-2" },
    { h: "/tools/wait-times", m: fr ? "Délais" : "Waits", t: fr ? "Combien de temps" : "How long you will wait",
      b: fr ? "Les chiffres publiés par la Commission, par section." : "The Board's published figures, by division.", span: "b-2" },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const fr = locale === "fr";
  return {
    title: fr ? "Outils gratuits" : "Free tools",
    description: fr
      ? "Vérificateur de délai, plan de détention en 48 heures, listes de documents, avocat ou consultant, délais de la Commission."
      : "Deadline checker, 48-hour detention plan, document checklists, lawyer-or-consultant scope checker, and Board wait times.",
    alternates: { canonical: `/${locale}/tools` },
  };
}

export default async function Tools({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = getDict(locale);
  const fr = locale === "fr";

  return (
    <Section>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: fr ? "Outils" : "Tools", href: `/${locale}/tools` }])} />
      <Reveal>
        <Meta>{fr ? "Gratuit, sans inscription, sans engagement" : "Free, no sign-up, no commitment"}</Meta>
        <h1 className="display-l mb-6">{fr ? "Outils" : "Tools"}</h1>
        <Lede className="mb-12">
          {fr
            ? "Chacun répond à une question que les gens posent à trois heures du matin avec une lettre à la main. Aucun ne vous demande votre courriel."
            : "Each one answers a question people ask at three in the morning holding a letter. None of them asks for your email."}
        </Lede>
      </Reveal>
      <div className="bento">
        {tools(locale, d).map((t) => (
          <Link key={t.h} href={`/${locale}${t.h}`} className={`${t.span} group p-8 transition-colors hover:bg-[var(--surface)]`}>
            <p className="meta mb-3">{t.m}</p>
            <h2 className="display-s mb-3">{t.t}</h2>
            <p className="measure text-sm leading-relaxed text-[var(--muted)]">{t.b}</p>
            <span className="mt-5 inline-block accent-type opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>→</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
