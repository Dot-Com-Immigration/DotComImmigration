"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, CornerDownLeft, FileText, HelpCircle, Layers, Compass } from "lucide-react";
import { buildIndex, searchDocs, type SearchDoc } from "@/lib/search-index";
import type { Dict } from "@/content/types";

const ICONS = {
  matter: FileText, question: HelpCircle, area: Layers, page: Compass,
} as const;

const LABELS = {
  en: { open: "Search the site", placeholder: "Search a document, a deadline, a question…", empty: "Nothing matched. Try the words printed on your letter.", hint: "Start typing. Try “15 days”, “detained”, “sponsorship”.", kinds: { matter: "Matter", question: "Question", area: "Practice area", page: "Page" } },
  fr: { open: "Rechercher", placeholder: "Cherchez un document, un délai, une question…", empty: "Aucun résultat. Essayez les mots imprimés sur votre lettre.", hint: "Commencez à écrire. Essayez « 15 jours », « détenu », « parrainage ».", kinds: { matter: "Dossier", question: "Question", area: "Domaine", page: "Page" } },
} as const;

export default function SearchDialog({ d, locale }: { d: Dict; locale: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = LABELS[locale === "fr" ? "fr" : "en"];

  const index = useMemo(() => buildIndex(d, locale), [d, locale]);
  const results = useMemo(() => searchDocs(index, q), [index, q]);

  const close = useCallback(() => { setOpen(false); setQ(""); setActive(0); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((v) => !v); }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; setTimeout(() => inputRef.current?.focus(), 30); }
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => setActive(0), [q]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      window.location.href = results[active].href;
    }
  };

  return (
    <>
      <button
        type="button" onClick={() => setOpen(true)} aria-label={t.open}
        className="navsearch"
      >
        <Search className="h-4 w-4" aria-hidden />
        <span className="hidden lg:inline">{t.open}</span>
        <kbd className="ml-1 hidden rounded border border-[var(--rule-strong)] px-1.5 py-0.5 text-[0.65rem] lg:inline">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label={t.open}>
          <button className="absolute inset-0 cursor-default bg-[var(--bg)]/85 backdrop-blur-sm" aria-hidden onClick={close} tabIndex={-1} />
          <div className="relative w-full max-w-2xl overflow-hidden border border-[var(--accent)] bg-[var(--surface)]">
            <div className="flex items-center gap-3 hair-b px-4">
              <Search className="h-5 w-5 shrink-0 accent-type" aria-hidden />
              <input
                ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKeyDown}
                placeholder={t.placeholder} aria-label={t.placeholder}
                className="min-w-0 flex-1 bg-transparent py-4 text-[0.95rem] text-[var(--fg)] outline-none placeholder:text-[var(--muted)]"
              />
              <button onClick={close} aria-label="Close" className="shrink-0 rounded p-1 text-[var(--muted)] hover:text-[var(--fg)]">
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="max-h-[52vh] overflow-y-auto">
              {q.trim().length < 2 ? (
                <p className="px-5 py-8 text-center text-sm text-[var(--muted)]">{t.hint}</p>
              ) : results.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-[var(--muted)]">{t.empty}</p>
              ) : (
                <ul className="py-2">
                  {results.map((r, i) => {
                    const Icon = ICONS[r.kind];
                    return (
                      <li key={r.id}>
                        <Link
                          href={r.href} onClick={close} onMouseEnter={() => setActive(i)}
                          className={`flex items-start gap-3 px-5 py-3 transition ${i === active ? "bg-[var(--surface-2)]" : ""}`}
                        >
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 accent-type" aria-hidden />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[0.92rem] text-[var(--fg)]">{r.title}</span>
                            <span className="block truncate text-xs text-[var(--muted)]">
                              {t.kinds[r.kind]} · {r.context}
                            </span>
                          </span>
                          {i === active && <CornerDownLeft className="mt-1 h-3.5 w-3.5 shrink-0 accent-type" aria-hidden />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
