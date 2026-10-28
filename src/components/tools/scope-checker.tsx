"use client";

import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";

type Verdict = "consultant-irb" | "consultant" | "lawyer" | "either" | "outside";

const OPTIONS = {
  en: [
    { v: "consultant-irb" as Verdict, label: "Represent me at a refugee hearing", hint: "Refugee Protection Division" },
    { v: "consultant-irb" as Verdict, label: "Appeal a refused refugee claim", hint: "Refugee Appeal Division" },
    { v: "consultant-irb" as Verdict, label: "Act at a detention review or admissibility hearing", hint: "Immigration Division" },
    { v: "consultant-irb" as Verdict, label: "Appeal a sponsorship or removal decision", hint: "Immigration Appeal Division" },
    { v: "consultant" as Verdict, label: "File an application with IRCC", hint: "PR, sponsorship, work, study, citizenship, TRP" },
    { v: "consultant" as Verdict, label: "Respond to a fairness letter or a PRRA", hint: "Written submissions to an officer" },
    { v: "lawyer" as Verdict, label: "Challenge a decision at the Federal Court", hint: "Judicial review" },
    { v: "outside" as Verdict, label: "Defend a criminal charge", hint: "Even where it affects my status" },
  ],
  fr: [
    { v: "consultant-irb" as Verdict, label: "Me représenter à une audience", hint: "Section de la protection des réfugiés" },
    { v: "consultant-irb" as Verdict, label: "Faire appel d'une demande d'asile rejetée", hint: "Section d'appel des réfugiés" },
    { v: "consultant-irb" as Verdict, label: "Agir à un contrôle de détention ou une enquête", hint: "Section de l'immigration" },
    { v: "consultant-irb" as Verdict, label: "Faire appel d'un parrainage ou d'un renvoi", hint: "Section d'appel de l'immigration" },
    { v: "consultant" as Verdict, label: "Déposer une demande auprès d'IRCC", hint: "RP, parrainage, travail, études, citoyenneté, PST" },
    { v: "consultant" as Verdict, label: "Répondre à une lettre d'équité ou un ERAR", hint: "Observations écrites à un agent" },
    { v: "lawyer" as Verdict, label: "Contester une décision à la Cour fédérale", hint: "Contrôle judiciaire" },
    { v: "outside" as Verdict, label: "Me défendre contre une accusation criminelle", hint: "Même si cela touche mon statut" },
  ],
} as const;

const RESULTS = {
  en: {
    "consultant-irb": {
      head: "A consultant can act for you, but only one with the IRB endorsement",
      body: "Appearing before the Immigration and Refugee Board requires the RCIC-IRB licence class specifically. A plain RCIC licence does not permit it, and most consultants do not hold the endorsement. A lawyer can also act. Check the licence class on the public register before you hire anyone.",
      tone: "ok" as const,
    },
    "consultant": {
      head: "A licensed consultant can act for you",
      body: "Applications to IRCC and written submissions to an officer are within the scope of any licensed RCIC. A lawyer can also do this work. Choose on fit, responsiveness and cost, and verify the licence either way.",
      tone: "ok" as const,
    },
    "lawyer": {
      head: "You need a lawyer. A consultant cannot do this",
      body: "No immigration consultant and no paralegal may represent you in a judicial review at the Federal Court. Only a lawyer can. If your matter reaches that point we will say so and refer you rather than take it on.",
      tone: "stop" as const,
    },
    "either": { head: "Either can act", body: "", tone: "ok" as const },
    "outside": {
      head: "This is outside immigration practice entirely",
      body: "A criminal charge needs a criminal defence lawyer, even when the consequences for your status are the thing you are most worried about. An immigration representative can work alongside them on the status consequences, but cannot defend the charge.",
      tone: "stop" as const,
    },
  },
  fr: {
    "consultant-irb": {
      head: "Un consultant peut agir, mais seulement avec la mention CISR",
      body: "Comparaître devant la Commission de l'immigration et du statut de réfugié exige précisément la catégorie CRIC-CISR. Un permis CRIC ordinaire ne le permet pas, et la plupart des consultants n'ont pas cette mention. Un avocat peut aussi agir. Vérifiez la catégorie au registre public avant d'engager qui que ce soit.",
      tone: "ok" as const,
    },
    "consultant": {
      head: "Un consultant autorisé peut agir pour vous",
      body: "Les demandes à IRCC et les observations écrites à un agent relèvent de tout CRIC autorisé. Un avocat peut aussi faire ce travail. Choisissez selon l'adéquation, la réactivité et le coût, et vérifiez le permis dans tous les cas.",
      tone: "ok" as const,
    },
    "lawyer": {
      head: "Il vous faut un avocat. Un consultant ne peut pas",
      body: "Aucun consultant en immigration ni parajuriste ne peut vous représenter dans un contrôle judiciaire à la Cour fédérale. Seul un avocat le peut. Si votre dossier en arrive là, nous vous le dirons et vous orienterons plutôt que de l'accepter.",
      tone: "stop" as const,
    },
    "either": { head: "L'un ou l'autre peut agir", body: "", tone: "ok" as const },
    "outside": {
      head: "Cela sort entièrement de la pratique en immigration",
      body: "Une accusation criminelle exige un avocat de la défense, même lorsque les conséquences sur votre statut sont ce qui vous inquiète le plus. Un représentant en immigration peut travailler en parallèle sur les conséquences liées au statut, mais ne peut pas défendre l'accusation.",
      tone: "stop" as const,
    },
  },
} as const;

const COPY = {
  en: { eyebrow: "Scope checker", title: "Do you need a lawyer, or will a consultant do?",
    lede: "The honest answer depends entirely on what you need done. Pick the closest.",
    q: "What do you need done?", again: "Check something else", back: "Back",
    foot: "Verify any representative on the College public register before you pay anyone." },
  fr: { eyebrow: "Vérificateur de portée", title: "Avocat ou consultant ?",
    lede: "La réponse honnête dépend entièrement de ce dont vous avez besoin. Choisissez le plus proche.",
    q: "De quoi avez-vous besoin ?", again: "Vérifier autre chose", back: "Retour",
    foot: "Vérifiez tout représentant au registre public du Collège avant de payer qui que ce soit." },
} as const;

export default function ScopeChecker({ locale }: { locale: string }) {
  const L = locale === "fr" ? "fr" : "en";
  const t = COPY[L];
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const r = verdict ? RESULTS[L][verdict] : null;

  return (
    <div>
      <p className="meta mb-3">{t.eyebrow}</p>
      <h3 className="display-s mb-2">{t.title}</h3>
      <p className="measure mb-7 text-sm text-[var(--muted)]">{t.lede}</p>

      {!r ? (
        <>
          <p className="meta meta-dim mb-3">{t.q}</p>
          <ul className="hair-t">
            {OPTIONS[L].map((o) => (
              <li key={o.label} className="hair-b">
                <button
                  onClick={() => setVerdict(o.v)}
                  className="group flex w-full cursor-pointer items-baseline gap-4 py-4 text-left transition-colors hover:bg-[var(--surface)]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.95rem]">{o.label}</span>
                    <span className="mt-0.5 block font-mono text-[0.68rem] text-[var(--muted)]">{o.hint}</span>
                  </span>
                  <span className="shrink-0 accent-type opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>→</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>
          <div
            className={`border-l-2 pl-5 ${r.tone === "stop" ? "border-[var(--alarm)]" : "border-[var(--accent)]"}`}
          >
            <h4
              className={`display-s mb-3 ${r.tone === "stop" ? "text-[var(--alarm)]" : "accent-type"}`}
            >
              {r.head}
            </h4>
            <p className="measure text-[0.95rem] leading-relaxed text-[var(--fg-dim)]">{r.body}</p>
          </div>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <button onClick={() => setVerdict(null)} className="btn btn-ghost">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />{t.back}
            </button>
            <button onClick={() => setVerdict(null)} className="btn btn-ghost">
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />{t.again}
            </button>
          </div>
        </div>
      )}

      <p className="measure mt-6 text-xs leading-relaxed text-[var(--muted)]">{t.foot}</p>
    </div>
  );
}
