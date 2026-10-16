"use client";

import { useEffect, useMemo, useState } from "react";
import type { Dict } from "@/content/types";

type Props = { d: Dict; compact?: boolean };

export default function DeadlineChecker({ d, compact }: Props) {
  const c = d.checker;
  const [kind, setKind] = useState(c.options[0].value);
  const [date, setDate] = useState("");
  const [now, setNow] = useState<number | null>(null);

  const rule = c.rules[kind];
  const isOther = !rule;

  const target = useMemo(() => {
    if (!rule || !date) return null;
    const from = new Date(`${date}T09:00:00`);
    if (Number.isNaN(from.getTime())) return null;
    const t = new Date(from.getTime());
    if (rule.hours) t.setHours(t.getHours() + rule.hours);
    else if (rule.days) t.setDate(t.getDate() + rule.days);
    return t;
  }, [rule, date]);

  useEffect(() => {
    if (!target) { setNow(null); return; }
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  const parts = (() => {
    if (!target || now === null) return null;
    const ms = target.getTime() - now;
    const past = ms < 0;
    const a = Math.abs(ms);
    return {
      past,
      d: Math.floor(a / 86_400_000),
      h: Math.floor(a / 3_600_000) % 24,
      m: Math.floor(a / 60_000) % 60,
      s: Math.floor(a / 1000) % 60,
    };
  })();

  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (t: Date) =>
    t.toLocaleDateString(d.locale === "fr" ? "fr-CA" : "en-CA", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

  return (
    <div className={compact ? "" : "rounded border border-gold-500/35 bg-gradient-to-b from-cream/10 to-cream/[0.03] p-6 shadow-[0_30px_70px_-36px_rgba(0,0,0,0.9)] sm:p-7"}>
      <h2 className="text-xl text-cream">{c.title}</h2>
      <p className="mt-1 mb-5 text-sm text-navy-400/90">{c.hint}</p>

      <div className="mb-4">
        <label htmlFor="dc-kind" className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold-400">
          {c.whatLabel}
        </label>
        <select
          id="dc-kind" value={kind} onChange={(e) => setKind(e.target.value)}
          className="w-full rounded-sm border border-cream/25 bg-navy-950/60 px-3 py-3 text-[0.92rem] text-cream focus:border-gold-400 focus:outline-none"
        >
          {c.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {!isOther && (
        <div className="mb-4">
          <label htmlFor="dc-date" className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold-400">
            {c.dateLabel}
          </label>
          <input
            id="dc-date" type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-sm border border-cream/25 bg-navy-950/60 px-3 py-3 text-[0.92rem] text-cream focus:border-gold-400 focus:outline-none"
          />
        </div>
      )}

      <div className="mt-5 border-t border-gold-500/30 pt-5" aria-live="polite">
        {isOther ? (
          <>
            <p className="mb-2 text-sm text-cream"><strong className="text-gold-400">{c.varies}</strong></p>
            <p className="text-xs leading-relaxed text-navy-400/90">{c.variesBody}</p>
          </>
        ) : !parts || !target ? (
          <>
            <p className="mb-2 text-sm text-cream">{c.prompt}</p>
            <p className="text-xs leading-relaxed text-navy-400/90">{rule.cite}</p>
          </>
        ) : (
          <>
            <div className="mb-3 flex gap-2">
              {([[parts.d, c.days], [pad(parts.h), c.hrs], [pad(parts.m), c.min], [pad(parts.s), c.sec]] as const).map(([v, k]) => (
                <div key={k} className="flex-1 rounded-sm border border-gold-500/25 bg-navy-950/60 px-1 py-3 text-center">
                  <div className="font-display text-2xl leading-none tabular-nums text-gold-400 sm:text-3xl">{v}</div>
                  <div className="mt-1.5 text-[0.58rem] uppercase tracking-[0.17em] text-navy-400/90">{k}</div>
                </div>
              ))}
            </div>
            <p className="mb-1.5 text-sm text-cream">
              {parts.past ? (
                <strong className="text-[#E08264]">{c.passed}</strong>
              ) : (
                <><strong className="text-gold-400">{fmt(target)}</strong> {c.by} {rule.label}.</>
              )}
            </p>
            <p className="text-xs leading-relaxed text-navy-400/90">{rule.cite} {c.notAdvice}</p>
          </>
        )}
      </div>
    </div>
  );
}
