"use client";

import { useMemo, useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";

type Item = { id: string; en: string; fr: string; enWhy?: string; frWhy?: string };
type Group = { id: string; en: string; fr: string; items: Item[] };

/**
 * A gathering checklist for the relative of someone detained, not legal instructions.
 * Everything here is information to collect, because the first detention review is
 * held within 48 hours and a documented release plan is what a review turns on.
 */
const GROUPS: Group[] = [
  {
    id: "where", en: "Where they are, and when it started", fr: "Où ils sont, et depuis quand",
    items: [
      { id: "w1", en: "Exact date and time they were detained",
        fr: "Date et heure exactes de la détention",
        enWhy: "The 48 hour clock runs from this moment.", frWhy: "Le délai de 48 heures court à partir de ce moment." },
      { id: "w2", en: "Which holding centre or facility, and the city", fr: "Quel centre de détention, et la ville" },
      { id: "w3", en: "Their full legal name exactly as it appears on their documents", fr: "Leur nom légal complet, exactement comme sur leurs documents" },
      { id: "w4", en: "Any file, client or UCI number written on the paperwork", fr: "Tout numéro de dossier, de client ou d'UCI figurant sur les documents" },
      { id: "w5", en: "A photograph of every page of paperwork they were given", fr: "Une photo de chaque page des documents remis" },
    ],
  },
  {
    id: "plan", en: "The release plan", fr: "Le plan de mise en liberté",
    items: [
      { id: "p1", en: "Who could act as a bondsperson, and their status in Canada",
        fr: "Qui pourrait agir comme caution, et son statut au Canada",
        enWhy: "In 2025, 1,380 people were released on an alternative to detention, about 38% of those detained.",
        frWhy: "En 2025, 1 380 personnes ont été libérées grâce à une solution de rechange, environ 38 % des personnes détenues." },
      { id: "p2", en: "That person's relationship to the detained person, and how long they have known them", fr: "Le lien de cette personne avec la personne détenue, et depuis combien de temps" },
      { id: "p3", en: "The address where the person would live, and who else lives there", fr: "L'adresse où la personne habiterait, et qui d'autre y habite" },
      { id: "p4", en: "Whether the bondsperson can supervise day to day, and their work hours", fr: "Si la caution peut superviser au quotidien, et ses heures de travail" },
      { id: "p5", en: "Proof the bondsperson lives where they say: a lease, a bill, a mortgage statement", fr: "Preuve du domicile de la caution : bail, facture, relevé hypothécaire" },
    ],
  },
  {
    id: "docs", en: "Documents to find", fr: "Documents à trouver",
    items: [
      { id: "d1", en: "Passport, and any Canadian immigration documents", fr: "Passeport, et tout document d'immigration canadien" },
      { id: "d2", en: "Any permit, visa or status document, even expired", fr: "Tout permis, visa ou document de statut, même expiré" },
      { id: "d3", en: "Any previous decision, refusal or correspondence from IRCC or CBSA", fr: "Toute décision, refus ou correspondance antérieure d'IRCC ou de l'ASFC" },
      { id: "d4", en: "Name and contact details of any representative they had before", fr: "Nom et coordonnées de tout représentant antérieur" },
      { id: "d5", en: "Anything showing ties to Canada: work, school, family, community", fr: "Tout ce qui montre des liens avec le Canada : travail, études, famille, communauté" },
    ],
  },
];

const COPY = {
  en: {
    eyebrow: "First 48 hours",
    title: "If someone you know has been detained",
    lede: "The first detention review is held within 48 hours of detention, or as soon as possible afterwards. The detained person usually has no phone. If you are reading this, you are the one who can act.",
    progress: "gathered", copy: "Copy the list", copied: "Copied", reset: "Reset",
    footer: "This is a list of what to gather, not legal advice. Send it to a licensed representative along with the paperwork.",
    header: "Detention: what to gather in the first 48 hours",
  },
  fr: {
    eyebrow: "Premières 48 heures",
    title: "Si une personne que vous connaissez a été détenue",
    lede: "Le premier contrôle des motifs de détention a lieu dans les 48 heures, ou dans les meilleurs délais par la suite. La personne détenue n'a généralement pas de téléphone. Si vous lisez ceci, c'est vous qui pouvez agir.",
    progress: "rassemblés", copy: "Copier la liste", copied: "Copié", reset: "Réinitialiser",
    footer: "Ceci est une liste de ce qu'il faut rassembler, non un avis juridique. Transmettez-la à un représentant autorisé avec les documents.",
    header: "Détention : quoi rassembler dans les 48 premières heures",
  },
} as const;

export default function DetentionPlan({ locale }: { locale: string }) {
  const L = locale === "fr" ? "fr" : "en";
  const t = COPY[L];
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const all = useMemo(() => GROUPS.flatMap((g) => g.items), []);
  const count = all.filter((i) => done[i.id]).length;

  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));

  async function copyList() {
    const lines = [t.header, ""];
    for (const g of GROUPS) {
      lines.push(`## ${L === "fr" ? g.fr : g.en}`);
      for (const i of g.items) {
        lines.push(`${done[i.id] ? "[x]" : "[ ]"} ${L === "fr" ? i.fr : i.en}`);
      }
      lines.push("");
    }
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      <p className="meta mb-3">{t.eyebrow}</p>
      <h3 className="display-s mb-3">{t.title}</h3>
      <p className="measure mb-7 text-sm leading-relaxed text-[var(--fg-dim)]">{t.lede}</p>

      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[var(--rule)]">
          <div className="h-px bg-[var(--accent)] transition-all duration-500" style={{ width: `${(count / all.length) * 100}%` }} />
        </div>
        <span className="font-mono text-xs tabular-nums text-[var(--muted)]">
          {count}/{all.length} {t.progress}
        </span>
      </div>

      <div className="grid gap-7">
        {GROUPS.map((g) => (
          <section key={g.id}>
            <h4 className="meta meta-dim mb-3">{L === "fr" ? g.fr : g.en}</h4>
            <ul className="hair-t">
              {g.items.map((i) => {
                const on = !!done[i.id];
                const why = L === "fr" ? i.frWhy : i.enWhy;
                return (
                  <li key={i.id} className="hair-b">
                    <button
                      onClick={() => toggle(i.id)}
                      aria-pressed={on}
                      className="flex w-full cursor-pointer items-start gap-3 py-3.5 text-left transition-colors hover:bg-[var(--surface)]"
                    >
                      <span
                        className={`mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center border transition-colors ${
                          on ? "border-[var(--accent)] bg-[var(--accent)]" : "border-[var(--rule-strong)]"
                        }`}
                      >
                        {on && <Check className="h-3 w-3 text-[var(--bg)]" aria-hidden />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[0.93rem] ${on ? "text-[var(--muted)] line-through" : ""}`}>
                          {L === "fr" ? i.fr : i.en}
                        </span>
                        {why && <span className="mt-1 block text-xs text-[var(--muted)]">{why}</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap gap-2.5">
        <button onClick={copyList} className="btn btn-ghost">
          <Copy className="h-3.5 w-3.5" aria-hidden />
          {copied ? t.copied : t.copy}
        </button>
        <button onClick={() => setDone({})} className="btn btn-ghost">
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          {t.reset}
        </button>
      </div>

      <p className="measure mt-5 text-xs leading-relaxed text-[var(--muted)]">{t.footer}</p>
    </div>
  );
}
