"use client";

import { useState } from "react";

/**
 * IRB wait times, as published by the Board. Figures are the Board's own, stated
 * as at 31 December 2025 unless noted, with the inventory from the August 2026
 * volume report. Re-verify before changing any number here.
 */
const ROWS = [
  { key: "rpd",  months: 24, en: "Refugee claim (RPD)", fr: "Demande d'asile (SPR)",
    enNote: "Referral to decision. Less complex claims about 16 months.", frNote: "Du renvoi à la décision. Demandes moins complexes, environ 16 mois." },
  { key: "rad",  months: 4,  en: "Refugee appeal (RAD)", fr: "Appel des réfugiés (SAR)",
    enNote: "Filing to decision.", frNote: "Du dépôt à la décision." },
  { key: "iad",  months: 6,  en: "Immigration appeal (IAD)", fr: "Appel en immigration (SAI)",
    enNote: "Includes sponsorship appeals.", frNote: "Comprend les appels en parrainage." },
  { key: "adm",  months: 4,  en: "Admissibility hearing (ID)", fr: "Enquête (SI)",
    enNote: "80% held within 4 months.", frNote: "80 % tenues dans les 4 mois." },
];

const DETENTION = { en: "48 hours, then 7 days, then every 30 days", fr: "48 heures, puis 7 jours, puis tous les 30 jours" };

const COPY = {
  en: {
    title: "How long you are likely to wait",
    sub: "The Board's own published figures. Your file can differ.",
    division: "Division", wait: "Typical wait", pending: "Pending",
    detention: "Detention reviews", detentionNote: "Set by statute, not by workload. This is the one timeline that does not drift.",
    inventory: "259,085 refugee claims were pending in August 2026. The Board has said wait times will continue to grow because intake exceeds its funded capacity.",
    months: "months", asAt: "As at 31 December 2025",
  },
  fr: {
    title: "Combien de temps vous attendrez probablement",
    sub: "Les chiffres publiés par la Commission. Votre dossier peut différer.",
    division: "Section", wait: "Attente typique", pending: "En instance",
    detention: "Contrôles de détention", detentionNote: "Fixés par la loi, non par la charge de travail. C'est le seul délai qui ne dérive pas.",
    inventory: "259 085 demandes d'asile étaient en instance en août 2026. La Commission a indiqué que les délais continueront de croître.",
    months: "mois", asAt: "Au 31 décembre 2025",
  },
} as const;

export default function WaitTimes({ locale }: { locale: string }) {
  const L = locale === "fr" ? "fr" : "en";
  const t = COPY[L];
  const max = Math.max(...ROWS.map((r) => r.months));
  const [active, setActive] = useState<string | null>(null);

  return (
    <div>
      <p className="meta mb-3">{t.asAt}</p>
      <h3 className="display-s mb-2">{t.title}</h3>
      <p className="measure mb-7 text-sm text-[var(--muted)]">{t.sub}</p>

      <div className="hair-t">
        {ROWS.map((r) => {
          const on = active === r.key;
          return (
            <button
              key={r.key}
              onClick={() => setActive(on ? null : r.key)}
              aria-expanded={on}
              className="hair-b block w-full cursor-pointer px-0 py-5 text-left transition-colors hover:bg-[var(--surface)]"
            >
              <div className="kv">
                <span className="text-[0.98rem]">{L === "fr" ? r.fr : r.en}</span>
                <span className="font-mono text-sm tabular-nums accent-type">
                  {r.months} {t.months}
                </span>
              </div>
              <div className="mt-3 h-px w-full bg-[var(--rule)]">
                <div
                  className="h-px bg-[var(--accent)] transition-all duration-700"
                  style={{ width: `${(r.months / max) * 100}%` }}
                />
              </div>
              {on && (
                <p className="mt-3 text-xs text-[var(--muted)]">{L === "fr" ? r.frNote : r.enNote}</p>
              )}
            </button>
          );
        })}

        <div className="hair-b py-5">
          <div className="kv">
            <span className="text-[0.98rem]">{t.detention}</span>
            <span className="font-mono text-sm tabular-nums text-[var(--alarm)]">{DETENTION[L]}</span>
          </div>
          <p className="mt-2 text-xs text-[var(--muted)]">{t.detentionNote}</p>
        </div>
      </div>

      <p className="measure mt-6 text-xs leading-relaxed text-[var(--muted)]">{t.inventory}</p>
    </div>
  );
}
