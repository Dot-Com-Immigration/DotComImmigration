"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

type Matter = {
  id: string; en: string; fr: string;
  items: { en: string; fr: string }[];
};

const MATTERS: Matter[] = [
  {
    id: "rad", en: "Refugee appeal (RAD)", fr: "Appel des réfugiés (SAR)",
    items: [
      { en: "The written reasons for the refusal, every page", fr: "Les motifs écrits du refus, chaque page" },
      { en: "The envelope or email showing the date you received them", fr: "L'enveloppe ou le courriel indiquant la date de réception" },
      { en: "Your Basis of Claim form as filed", fr: "Votre formulaire de fondement de la demande, tel que déposé" },
      { en: "Every document already filed with the Refugee Protection Division", fr: "Tout document déjà déposé à la Section de la protection des réfugiés" },
      { en: "Any document that was not filed, and the reason it was not", fr: "Tout document non déposé, et la raison" },
      { en: "Certified translations of anything not in English or French", fr: "Traductions certifiées de tout document qui n'est ni en anglais ni en français" },
      { en: "Your representative's name, if you had one at the hearing", fr: "Le nom de votre représentant, si vous en aviez un à l'audience" },
    ],
  },
  {
    id: "c12", en: "Ineligibility letter (Bill C-12)", fr: "Lettre d'irrecevabilité (C-12)",
    items: [
      { en: "The letter itself, every page", fr: "La lettre elle-même, chaque page" },
      { en: "Your passport, including every page with a stamp", fr: "Votre passeport, y compris chaque page tamponnée" },
      { en: "A list of every entry to and exit from Canada since June 2020", fr: "La liste de chaque entrée au Canada et sortie depuis juin 2020" },
      { en: "Boarding passes, tickets or travel records for those trips", fr: "Cartes d'embarquement, billets ou dossiers de voyage pour ces déplacements" },
      { en: "Any visa or permit you have held", fr: "Tout visa ou permis que vous avez détenu" },
      { en: "The date you made your claim, and proof of it", fr: "La date de votre demande, et une preuve" },
    ],
  },
  {
    id: "iad", en: "Sponsorship refusal (IAD)", fr: "Refus de parrainage (SAI)",
    items: [
      { en: "The refusal letter and the officer's notes if you have them", fr: "La lettre de refus et les notes de l'agent, si vous les avez" },
      { en: "A complete copy of the application as submitted", fr: "Une copie complète de la demande telle que soumise" },
      { en: "Your proof of status in Canada as the sponsor", fr: "Votre preuve de statut au Canada comme répondant" },
      { en: "Evidence of the relationship across its whole length, not just the start", fr: "Preuve de la relation sur toute sa durée, pas seulement au début" },
      { en: "Call logs, messages and travel records showing contact", fr: "Relevés d'appels, messages et dossiers de voyage montrant les contacts" },
      { en: "Photographs with dates and context, not a folder of selfies", fr: "Photographies datées et contextualisées, non un dossier de égoportraits" },
      { en: "Any interview notes or what you remember of the interview", fr: "Toute note d'entrevue ou vos souvenirs de l'entrevue" },
    ],
  },
  {
    id: "det", en: "Detention review", fr: "Contrôle de détention",
    items: [
      { en: "Every page of paperwork given at the time of detention", fr: "Chaque page des documents remis au moment de la détention" },
      { en: "The exact date and time detention began", fr: "La date et l'heure exactes du début de la détention" },
      { en: "Identity and status documents for the detained person", fr: "Documents d'identité et de statut de la personne détenue" },
      { en: "Proposed bondsperson's status, address and relationship", fr: "Statut, adresse et lien de la caution proposée" },
      { en: "Proof of the address where the person would live", fr: "Preuve de l'adresse où la personne habiterait" },
      { en: "Evidence of ties to Canada: work, study, family, community", fr: "Preuve de liens avec le Canada : travail, études, famille, communauté" },
    ],
  },
  {
    id: "rpd", en: "Refugee hearing preparation", fr: "Préparation d'audience",
    items: [
      { en: "Your Basis of Claim form, and any amendment you filed", fr: "Votre formulaire de fondement de la demande, et toute modification déposée" },
      { en: "Identity documents, and certified translations of each", fr: "Documents d'identité, et traductions certifiées de chacun" },
      { en: "Anything corroborating the events you described", fr: "Tout ce qui corrobore les événements décrits" },
      { en: "Country condition evidence relevant to your specific situation", fr: "Preuve sur les conditions du pays pertinente à votre situation précise" },
      { en: "Proof of any change in your circumstances since you filed", fr: "Preuve de tout changement de situation depuis le dépôt" },
      { en: "Your current address on file with the Board", fr: "Votre adresse actuelle au dossier de la Commission" },
    ],
  },
  {
    id: "rem", en: "Direction to report for removal", fr: "Convocation pour renvoi",
    items: [
      { en: "The direction to report itself", fr: "La convocation elle-même" },
      { en: "The removal order", fr: "La mesure de renvoi" },
      { en: "Every application you currently have pending, with file numbers", fr: "Chaque demande en instance, avec les numéros de dossier" },
      { en: "Any decision you have received in the last twelve months", fr: "Toute décision reçue au cours des douze derniers mois" },
      { en: "Travel documents and their expiry dates", fr: "Titres de voyage et leurs dates d'expiration" },
      { en: "Details of dependants in Canada and their status", fr: "Détails sur les personnes à charge au Canada et leur statut" },
    ],
  },
];

const COPY = {
  en: { eyebrow: "Document checklist", title: "What to gather", sub: "Pick your situation. Bring these and the first meeting is worth having.",
    label: "Your situation", copy: "Copy the list", copied: "Copied", count: "gathered",
    footer: "A general list. Your file may need more, and a licensed representative will tell you what." },
  fr: { eyebrow: "Liste de documents", title: "Quoi rassembler", sub: "Choisissez votre situation. Avec ceci, la première rencontre vaut la peine.",
    label: "Votre situation", copy: "Copier la liste", copied: "Copié", count: "rassemblés",
    footer: "Une liste générale. Votre dossier peut en exiger davantage, et un représentant autorisé vous le dira." },
} as const;

export default function DocumentChecklist({ locale }: { locale: string }) {
  const L = locale === "fr" ? "fr" : "en";
  const t = COPY[L];
  const [matterId, setMatterId] = useState(MATTERS[0].id);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const matter = useMemo(() => MATTERS.find((m) => m.id === matterId) ?? MATTERS[0], [matterId]);
  const keys = matter.items.map((_, i) => `${matter.id}-${i}`);
  const count = keys.filter((k) => done[k]).length;

  async function copyList() {
    const title = L === "fr" ? matter.fr : matter.en;
    const lines = [title, ""].concat(
      matter.items.map((it, i) => `${done[`${matter.id}-${i}`] ? "[x]" : "[ ]"} ${L === "fr" ? it.fr : it.en}`),
    );
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { setCopied(false); }
  }

  return (
    <div>
      <p className="meta mb-3">{t.eyebrow}</p>
      <h3 className="display-s mb-2">{t.title}</h3>
      <p className="measure mb-6 text-sm text-[var(--muted)]">{t.sub}</p>

      <label htmlFor="dcl-matter" className="meta meta-dim mb-2 block">{t.label}</label>
      <select
        id="dcl-matter" value={matterId}
        onChange={(e) => { setMatterId(e.target.value); setDone({}); }}
        className="field mb-6"
      >
        {MATTERS.map((m) => <option key={m.id} value={m.id}>{L === "fr" ? m.fr : m.en}</option>)}
      </select>

      <div className="mb-4 flex items-center gap-4">
        <div className="h-px flex-1 bg-[var(--rule)]">
          <div className="h-px bg-[var(--accent)] transition-all duration-500" style={{ width: `${(count / keys.length) * 100}%` }} />
        </div>
        <span className="font-mono text-xs tabular-nums text-[var(--muted)]">{count}/{keys.length} {t.count}</span>
      </div>

      <ul className="hair-t">
        {matter.items.map((it, i) => {
          const k = `${matter.id}-${i}`;
          const on = !!done[k];
          return (
            <li key={k} className="hair-b">
              <button
                onClick={() => setDone((d) => ({ ...d, [k]: !d[k] }))}
                aria-pressed={on}
                className="flex w-full cursor-pointer items-start gap-3 py-3.5 text-left transition-colors hover:bg-[var(--surface)]"
              >
                <span className={`mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center border transition-colors ${on ? "border-[var(--accent)] bg-[var(--accent)]" : "border-[var(--rule-strong)]"}`}>
                  {on && <Check className="h-3 w-3 text-[var(--bg)]" aria-hidden />}
                </span>
                <span className={`min-w-0 flex-1 text-[0.93rem] ${on ? "text-[var(--muted)] line-through" : ""}`}>
                  {L === "fr" ? it.fr : it.en}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={copyList} className="btn btn-ghost mt-6">
        <Copy className="h-3.5 w-3.5" aria-hidden />{copied ? t.copied : t.copy}
      </button>
      <p className="measure mt-5 text-xs leading-relaxed text-[var(--muted)]">{t.footer}</p>
    </div>
  );
}
