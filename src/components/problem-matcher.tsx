"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import { MATCHER } from "@/content/matcher";

const COPY = {
  en: {
    eyebrow: "Step one, before anything else",
    h2: "Choose your problem. We will show you the answer.",
    lede: "Eight situations cover almost everyone who lands on this page. Pick yours and you get the deadline, what it actually means, and what we would do about it.",
    what: "What has happened?",
    isLabel: "What this is",
    doLabel: "What we would do",
    read: "Read the full page",
    send: "Send us the document",
    clockOn: "A clock is running",
    clockOff: "No immediate deadline",
  },
  fr: {
    eyebrow: "Étape un, avant toute chose",
    h2: "Choisissez votre problème. Nous vous montrons la réponse.",
    lede: "Huit situations couvrent presque tous ceux qui arrivent sur cette page. Choisissez la vôtre : vous obtenez le délai, ce qu'il signifie vraiment, et ce que nous ferions.",
    what: "Que s'est-il passé ?",
    isLabel: "De quoi il s'agit",
    doLabel: "Ce que nous ferions",
    read: "Lire la page complète",
    send: "Envoyez-nous le document",
    clockOn: "Un délai court",
    clockOff: "Pas de délai immédiat",
  },
} as const;

export default function ProblemMatcher({ locale }: { locale: string }) {
  const lang = locale === "fr" ? "fr" : "en";
  const t = COPY[lang];
  const cases = MATCHER[lang];
  const [i, setI] = useState(0);
  const c = cases[i];

  return (
    <section className="band tex" id="solve">
      <div className="wrap">
        <p className="lab" style={{ marginBottom: 16 }}>{t.eyebrow}</p>
        <h2 className="md" style={{ marginBottom: 18 }}>{t.h2}</h2>
        <p className="measure dim" style={{ marginBottom: 26 }}>{t.lede}</p>

        <div className="mx">
          <div className="mx-l">
            <div className="mx-h"><p className="lab g" style={{ margin: 0 }}>{t.what}</p></div>
            <div role="tablist" aria-label={t.what} style={{ flex: 1 }}>
              {cases.map((x, n) => (
                <button key={x.t} type="button" role="tab" className="mxb"
                  aria-selected={n === i} tabIndex={n === i ? 0 : -1}
                  onClick={() => setI(n)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") { e.preventDefault(); setI((n + 1) % cases.length); }
                    if (e.key === "ArrowUp") { e.preventDefault(); setI((n - 1 + cases.length) % cases.length); }
                  }}>
                  <span className="n">{String(n + 1).padStart(2, "0")}</span>
                  <span className="t">{x.t}</span>
                  <span className={`c${x.urgent ? "" : " ok"}`}>{x.c}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mx-r" role="tabpanel" aria-live="polite">
            <span className={`dl${c.urgent ? "" : " ok"}`}>
              {c.urgent ? <AlertTriangle aria-hidden style={{ width: 17, height: 17 }} />
                        : <CheckCircle2 aria-hidden style={{ width: 17, height: 17 }} />}
              {c.urgent ? t.clockOn : t.clockOff} &middot; {c.c}
            </span>

            <div className="mx-sec" style={{ borderTop: 0, paddingTop: 0 }}>
              <h4>{t.isLabel}</h4>
              <p>{c.is}</p>
            </div>
            <div className="mx-sec">
              <h4>{c.urgent ? t.clockOn : t.clockOff}</h4>
              <p>{c.clock}</p>
            </div>
            <div className="mx-sec">
              <h4>{t.doLabel}</h4>
              <p>{c.do}</p>
            </div>

            <div className="mx-cta">
              {c.slug && (
                <Link href={`/${locale}/services/${c.slug}`} className="btn sm o">
                  {t.read} <ArrowRight aria-hidden style={{ width: 16, height: 16 }} />
                </Link>
              )}
              <Link href={`/${locale}/contact`} className="btn sm">{t.send}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
