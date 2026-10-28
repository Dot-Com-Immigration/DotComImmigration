"use client";

import { useEffect, useMemo, useState } from "react";
import type { Dict } from "@/content/types";

export default function DeadlineChecker({ d }: { d: Dict; compact?: boolean }) {
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
    const a = Math.abs(ms);
    return {
      past: ms < 0,
      d: Math.floor(a / 86_400_000),
      h: Math.floor(a / 3_600_000) % 24,
      m: Math.floor(a / 60_000) % 60,
      s: Math.floor(a / 1000) % 60,
    };
  })();

  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (t: Date) =>
    t.toLocaleDateString(d.locale === "fr" ? "fr-CA" : "en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div>
      <p className="meta mb-3">{d.nav[0].label}</p>
      <h3 className="display-s mb-2">{c.title}</h3>
      <p className="measure mb-7 text-sm text-[var(--muted)]">{c.hint}</p>

      <label htmlFor="dc-kind" className="meta meta-dim mb-2 block">{c.whatLabel}</label>
      <select id="dc-kind" value={kind} onChange={(e) => setKind(e.target.value)} className="field mb-4">
        {c.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>

      {!isOther && (
        <>
          <label htmlFor="dc-date" className="meta meta-dim mb-2 block">{c.dateLabel}</label>
          <input id="dc-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="field mb-4" />
        </>
      )}

      <div className="hair-t pt-6" aria-live="polite">
        {isOther ? (
          <>
            <p className="mb-2 text-[0.95rem] accent-type">{c.varies}</p>
            <p className="measure text-xs leading-relaxed text-[var(--muted)]">{c.variesBody}</p>
          </>
        ) : !parts || !target ? (
          <>
            <p className="mb-2 text-[0.95rem]">{c.prompt}</p>
            <p className="measure text-xs leading-relaxed text-[var(--muted)]">{rule.cite}</p>
          </>
        ) : (
          <>
            <div className="cells mb-5 grid grid-cols-4">
              {([[parts.d, c.days], [pad(parts.h), c.hrs], [pad(parts.m), c.min], [pad(parts.s), c.sec]] as const).map(([v, k]) => (
                <div key={k} className="bg-[var(--bg)] px-1 py-4 text-center">
                  <div className={`font-display text-[clamp(1.9rem,6vw,3rem)] leading-none tabular-nums ${parts.past ? "text-[var(--alarm)]" : "accent-type"}`}>{v}</div>
                  <div className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[var(--muted)]">{k}</div>
                </div>
              ))}
            </div>
            <p className="measure mb-2 text-[0.95rem] leading-relaxed">
              {parts.past
                ? <span className="text-[var(--alarm)]">{c.passed}</span>
                : <><span className="accent-type">{fmt(target)}</span> {c.by} {rule.label}.</>}
            </p>
            <p className="measure text-xs leading-relaxed text-[var(--muted)]">{rule.cite} {c.notAdvice}</p>
          </>
        )}
      </div>
    </div>
  );
}
