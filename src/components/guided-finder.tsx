"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw, AlertTriangle } from "lucide-react";

type Node =
  | { type: "q"; prompt: string; options: { label: string; hint?: string; next: string }[] }
  | { type: "a"; title: string; body: string; urgency?: "now" | "soon"; slug?: string };

type Tree = Record<string, Node>;

const COPY = {
  en: {
    eyebrow: "Not sure what you are looking at?",
    h2: "Answer three questions",
    lede: "This points you to the right page and tells you whether there is a clock running. It is general information, not advice on your file.",
    back: "Back", restart: "Start again", read: "Read this in full", send: "Send us the document",
    urgentNow: "Treat this as urgent today", urgentSoon: "There is a deadline on this",
    step: "Step",
  },
  fr: {
    eyebrow: "Vous ne savez pas de quoi il s'agit ?",
    h2: "Répondez à trois questions",
    lede: "Ceci vous oriente vers la bonne page et vous indique si un délai court. Il s'agit de renseignements généraux, non d'un avis sur votre dossier.",
    back: "Retour", restart: "Recommencer", read: "Lire en entier", send: "Envoyez-nous le document",
    urgentNow: "À traiter comme urgent aujourd'hui", urgentSoon: "Un délai s'applique",
    step: "Étape",
  },
} as const;

const TREES: Record<"en" | "fr", Tree> = {
  en: {
    start: {
      type: "q", prompt: "What has happened?",
      options: [
        { label: "I received a decision or a letter", hint: "A refusal, a notice, a letter from IRCC or CBSA", next: "letter" },
        { label: "Someone has been detained", hint: "Held at an airport, a border, or by CBSA", next: "detained" },
        { label: "I am waiting for a hearing or a decision", hint: "Nothing has gone wrong yet", next: "waiting" },
        { label: "I want to apply for something", hint: "Status, sponsorship, citizenship", next: "apply" },
      ],
    },
    letter: {
      type: "q", prompt: "What does the letter say?",
      options: [
        { label: "My refugee claim was refused", next: "a-rad" },
        { label: "I may be ineligible for a hearing", hint: "A fairness letter about eligibility", next: "a-c12" },
        { label: "I can apply for a risk assessment", hint: "A PRRA notice from CBSA", next: "a-prra" },
        { label: "A sponsorship application was refused", next: "a-iad" },
        { label: "I must report for removal", next: "a-removal" },
      ],
    },
    detained: {
      type: "q", prompt: "How long ago?",
      options: [
        { label: "Within the last two days", next: "a-det48" },
        { label: "A few days ago, detention was continued", next: "a-det7" },
        { label: "Longer than that", next: "a-det30" },
      ],
    },
    waiting: {
      type: "q", prompt: "Which are you waiting for?",
      options: [
        { label: "A refugee hearing", next: "a-hearing" },
        { label: "A decision on an appeal I already filed", next: "a-record" },
        { label: "A decision on an application", next: "a-apply" },
      ],
    },
    apply: {
      type: "q", prompt: "What kind of application?",
      options: [
        { label: "Sponsoring a family member", next: "a-family" },
        { label: "Permanent residence", next: "a-pr" },
        { label: "Work, study or visitor status", next: "a-temp" },
        { label: "Something is blocking my file", hint: "Inadmissibility, a past refusal, a removal order", next: "a-inadmiss" },
      ],
    },
    "a-rad": { type: "a", urgency: "now", slug: "refugee-appeal-rad", title: "A 15 day clock is probably running", body: "If you have a right of appeal, you generally have 15 days from receiving the written reasons to file a Notice of Appeal with the Refugee Appeal Division. The clock runs from the day the reasons reached you, not your hearing date." },
    "a-c12": { type: "a", urgency: "now", slug: "bill-c12-ineligibility", title: "This is a fairness letter, and the window is short", body: "It is not a final decision. What you file in response, and whether you file it in time, shapes everything that follows. Around 30,000 people received these letters." },
    "a-prra": { type: "a", urgency: "now", slug: "pre-removal-risk-assessment", title: "A written application decided by an officer", body: "There is normally no hearing, so everything has to be argued on paper the first time and supported by evidence. The timeline is set out in your notification and it is short." },
    "a-iad": { type: "a", urgency: "soon", slug: "sponsorship-appeal-iad", title: "The sponsor in Canada is the appellant", body: "Not the applicant abroad. The right of appeal to the Immigration Appeal Division belongs to the sponsor, which is probably you if you are reading this." },
    "a-removal": { type: "a", urgency: "now", slug: "removal-order", title: "Act today, not on the reporting date", body: "Some options exist only before a removal date is fixed. The gap between acting now and acting next week changes the answer more here than anywhere else." },
    "a-det48": { type: "a", urgency: "now", slug: "detention-review", title: "The first review is within 48 hours", body: "The Immigration Division reviews the detention within 48 hours or as soon as possible afterwards. If you are the relative searching, you are the one who can act. A documented release plan is what matters." },
    "a-det7": { type: "a", urgency: "now", slug: "detention-review", title: "The next review is within seven days", body: "If continued detention was ordered at the first review, the next hearing takes place within seven days. That is enough time to build a proper release plan, but only just." },
    "a-det30": { type: "a", urgency: "soon", slug: "detention-review", title: "Reviews continue at least every 30 days", body: "You can also ask for an earlier review if there are new facts to put forward. A credible bondsperson and a documented plan are usually what changes the outcome." },
    "a-hearing": { type: "a", slug: "refugee-hearing", title: "Use the wait, because it is long", body: "A claim took about 24 months from referral to decision as of December 2025. Most refusals turn on inconsistency between your form, your documents and your testimony rather than on the story itself." },
    "a-record": { type: "a", urgency: "soon", slug: "appellants-record", title: "The record is what decides it", body: "Filing the Notice of Appeal only starts the appeal. Perfecting it means filing the appellant's record, and an unperfected appeal can be declared abandoned." },
    "a-apply": { type: "a", title: "Keep your file current while you wait", body: "Make sure the department has your current address, and that any change in your circumstances is properly filed. If a fairness letter arrives, the response window will be short." },
    "a-family": { type: "a", slug: "sponsorship-appeal-iad", title: "Build the relationship evidence from the start", body: "Most sponsorship refusals turn on the genuineness of the relationship or on gaps in the communication record. Those gaps are much easier to prevent than to argue away later." },
    "a-pr": { type: "a", title: "Several routes, and they are not interchangeable", body: "Express Entry, a provincial nomination, and a humanitarian application each suit different circumstances. Choosing the wrong one costs time you may not have." },
    "a-temp": { type: "a", title: "Status is easier to keep than to recover", body: "Work, study and visitor status all have extension and restoration rules with their own deadlines. If your status has already lapsed, restoration is time limited." },
    "a-inadmiss": { type: "a", urgency: "soon", title: "Something in the file is blocking everything else", body: "A temporary resident permit, criminal rehabilitation, an authorization to return, or a response to a misrepresentation allegation each address a different blockage. Identifying which one applies is the first step." },
  },
  fr: {
    start: {
      type: "q", prompt: "Que s'est-il passé ?",
      options: [
        { label: "J'ai reçu une décision ou une lettre", hint: "Un refus, un avis, une lettre d'IRCC ou de l'ASFC", next: "letter" },
        { label: "Une personne a été détenue", hint: "Retenue à un aéroport, à la frontière, ou par l'ASFC", next: "detained" },
        { label: "J'attends une audience ou une décision", hint: "Rien n'a encore mal tourné", next: "waiting" },
        { label: "Je veux présenter une demande", hint: "Statut, parrainage, citoyenneté", next: "apply" },
      ],
    },
    letter: {
      type: "q", prompt: "Que dit la lettre ?",
      options: [
        { label: "Ma demande d'asile a été rejetée", next: "a-rad" },
        { label: "Je pourrais être irrecevable", hint: "Une lettre d'équité sur la recevabilité", next: "a-c12" },
        { label: "Je peux demander un examen des risques", hint: "Un avis d'ERAR de l'ASFC", next: "a-prra" },
        { label: "Une demande de parrainage a été refusée", next: "a-iad" },
        { label: "Je dois me présenter pour un renvoi", next: "a-removal" },
      ],
    },
    detained: {
      type: "q", prompt: "Il y a combien de temps ?",
      options: [
        { label: "Dans les deux derniers jours", next: "a-det48" },
        { label: "Il y a quelques jours, la détention a été maintenue", next: "a-det7" },
        { label: "Plus longtemps que cela", next: "a-det30" },
      ],
    },
    waiting: {
      type: "q", prompt: "Qu'attendez-vous ?",
      options: [
        { label: "Une audience", next: "a-hearing" },
        { label: "Une décision sur un appel déjà déposé", next: "a-record" },
        { label: "Une décision sur une demande", next: "a-apply" },
      ],
    },
    apply: {
      type: "q", prompt: "Quel type de demande ?",
      options: [
        { label: "Parrainer un membre de ma famille", next: "a-family" },
        { label: "Résidence permanente", next: "a-pr" },
        { label: "Travail, études ou séjour", next: "a-temp" },
        { label: "Quelque chose bloque mon dossier", hint: "Interdiction de territoire, refus antérieur, mesure de renvoi", next: "a-inadmiss" },
      ],
    },
    "a-rad": { type: "a", urgency: "now", slug: "refugee-appeal-rad", title: "Un délai de 15 jours court probablement", body: "Si vous avez un droit d'appel, vous disposez généralement de 15 jours à compter de la réception des motifs écrits pour déposer un avis d'appel. Le délai court à partir du jour où les motifs vous sont parvenus, et non de la date de votre audience." },
    "a-c12": { type: "a", urgency: "now", slug: "bill-c12-ineligibility", title: "C'est une lettre d'équité, et la fenêtre est courte", body: "Ce n'est pas une décision définitive. Ce que vous déposez en réponse, et si vous le déposez à temps, détermine toute la suite. Environ 30 000 personnes ont reçu ces lettres." },
    "a-prra": { type: "a", urgency: "now", slug: "pre-removal-risk-assessment", title: "Une demande écrite tranchée par un agent", body: "Il n'y a normalement pas d'audience, donc tout doit être plaidé sur papier du premier coup et appuyé par de la preuve. Le délai figure dans votre avis et il est court." },
    "a-iad": { type: "a", urgency: "soon", slug: "sponsorship-appeal-iad", title: "C'est le répondant au Canada qui est l'appelant", body: "Et non le demandeur à l'étranger. Le droit d'appel à la Section d'appel de l'immigration appartient au répondant, ce qui est probablement vous si vous lisez ceci." },
    "a-removal": { type: "a", urgency: "now", slug: "removal-order", title: "Agissez aujourd'hui, pas à la date de convocation", body: "Certaines options n'existent qu'avant qu'une date de renvoi soit fixée. L'écart entre agir maintenant et agir la semaine prochaine change davantage la réponse ici qu'ailleurs." },
    "a-det48": { type: "a", urgency: "now", slug: "detention-review", title: "Le premier contrôle a lieu dans les 48 heures", body: "La Section de l'immigration contrôle la détention dans les 48 heures ou dans les meilleurs délais. Si vous êtes le proche qui cherche, c'est vous qui pouvez agir. Un plan de mise en liberté documenté est ce qui compte." },
    "a-det7": { type: "a", urgency: "now", slug: "detention-review", title: "Le prochain contrôle a lieu dans les sept jours", body: "Si le maintien en détention a été ordonné au premier contrôle, l'audience suivante a lieu dans les sept jours. C'est juste assez de temps pour bâtir un plan solide." },
    "a-det30": { type: "a", urgency: "soon", slug: "detention-review", title: "Les contrôles se poursuivent au moins tous les 30 jours", body: "Vous pouvez aussi demander un contrôle anticipé s'il y a des faits nouveaux. Une caution crédible et un plan documenté sont généralement ce qui change l'issue." },
    "a-hearing": { type: "a", slug: "refugee-hearing", title: "Profitez de l'attente, car elle est longue", body: "Une demande prenait environ 24 mois entre le renvoi et la décision en décembre 2025. La plupart des refus reposent sur des incohérences entre votre formulaire, vos documents et votre témoignage." },
    "a-record": { type: "a", urgency: "soon", slug: "appellants-record", title: "C'est le dossier qui décide", body: "Déposer l'avis d'appel ne fait qu'amorcer l'appel. Le mettre en état signifie déposer le dossier de l'appelant, et un appel non mis en état peut être déclaré abandonné." },
    "a-apply": { type: "a", title: "Gardez votre dossier à jour pendant l'attente", body: "Assurez-vous que le ministère a votre adresse actuelle et que tout changement de situation est correctement déposé. Si une lettre d'équité arrive, le délai de réponse sera court." },
    "a-family": { type: "a", slug: "sponsorship-appeal-iad", title: "Bâtissez la preuve de la relation dès le départ", body: "La plupart des refus de parrainage portent sur l'authenticité de la relation ou sur des lacunes dans le dossier de communication. Ces lacunes sont bien plus faciles à prévenir qu'à expliquer plus tard." },
    "a-pr": { type: "a", title: "Plusieurs voies, et elles ne sont pas interchangeables", body: "Entrée express, une nomination provinciale et une demande humanitaire conviennent à des situations différentes. Choisir la mauvaise coûte un temps que vous n'avez peut-être pas." },
    "a-temp": { type: "a", title: "Le statut est plus facile à conserver qu'à récupérer", body: "Les statuts de travail, d'études et de visiteur ont tous des règles de prolongation et de rétablissement assorties de délais. Si votre statut a déjà expiré, le rétablissement est limité dans le temps." },
    "a-inadmiss": { type: "a", urgency: "soon", title: "Un élément du dossier bloque tout le reste", body: "Un permis de séjour temporaire, une réhabilitation criminelle, une autorisation de revenir, ou une réponse à une allégation de fausses déclarations règlent chacun un blocage différent." },
  },
};

export default function GuidedFinder({ locale }: { locale: string }) {
  const L = locale === "fr" ? "fr" : "en";
  const t = COPY[L];
  const tree = TREES[L];
  const reduce = useReducedMotion();
  const [path, setPath] = useState<string[]>(["start"]);

  const id = path[path.length - 1];
  const node = tree[id];
  const back = () => setPath((p) => (p.length > 1 ? p.slice(0, -1) : p));
  const restart = () => setPath(["start"]);

  return (
    <div className="overflow-hidden rounded border border-line bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-gold-600">
          {t.step} {path.length}
        </span>
        <div className="flex gap-2">
          {path.length > 1 && (
            <button onClick={back} className="inline-flex items-center gap-1.5 rounded-sm border border-line px-2.5 py-1 text-xs transition hover:border-gold-500">
              <ArrowLeft className="h-3 w-3" aria-hidden /> {t.back}
            </button>
          )}
          {path.length > 1 && (
            <button onClick={restart} className="inline-flex items-center gap-1.5 rounded-sm border border-line px-2.5 py-1 text-xs transition hover:border-gold-500">
              <RotateCcw className="h-3 w-3" aria-hidden /> {t.restart}
            </button>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={id}
            initial={reduce ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -18 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {node.type === "q" ? (
              <>
                <h3 className="mb-5 font-display text-xl sm:text-2xl">{node.prompt}</h3>
                <div className="grid gap-2.5">
                  {node.options.map((o) => (
                    <button
                      key={o.label}
                      onClick={() => setPath((p) => [...p, o.next])}
                      className="group flex items-start gap-3 rounded-sm border border-line bg-bg px-4 py-3.5 text-left transition hover:border-gold-500 hover:bg-sand"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.95rem] font-medium">{o.label}</span>
                        {o.hint && <span className="mt-0.5 block text-xs text-muted">{o.hint}</span>}
                      </span>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-gold-600" aria-hidden />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {node.urgency && (
                  <p className={`mb-3 inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-xs font-semibold ${node.urgency === "now" ? "bg-[#B4472F]/12 text-[#B4472F]" : "bg-gold-500/15 text-gold-600"}`}>
                    <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
                    {node.urgency === "now" ? t.urgentNow : t.urgentSoon}
                  </p>
                )}
                <h3 className="mb-3 font-display text-xl sm:text-2xl">{node.title}</h3>
                <p className="mb-6 max-w-[62ch] text-[0.95rem] leading-relaxed text-muted">{node.body}</p>
                <div className="flex flex-wrap gap-2.5">
                  {node.slug && (
                    <Link href={`/${locale}/services/${node.slug}`} className="inline-flex items-center gap-2 rounded-sm bg-navy-800 px-5 py-3 text-sm font-semibold text-cream transition hover:-translate-y-0.5">
                      {t.read} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  )}
                  <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-br from-gold-400 to-gold-500 px-5 py-3 text-sm font-semibold text-[#2A1D05] transition hover:-translate-y-0.5">
                    {t.send}
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export { COPY as FINDER_COPY };
