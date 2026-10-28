"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, Clock, MessageCircle, Phone, X } from "lucide-react";
import { site, isTodo } from "@/site.config";

type Msg = { role: "user" | "assistant"; content: string };

const COPY = {
  en: {
    ask: "Ask AI", whatsapp: "WhatsApp", call: "Call", top: "Back to top",
    title: "Ask about your letter", close: "Close", send: "Ask",
    placeholder: "Ask in any language",
    foot: "General information only. Not advice on your file.",
    opening: "Tell me what your document says, or what has happened, and I will tell you what the rules are and whether a clock is running. I give general information, not advice on your file.",
    thinking: "Thinking…",
    failed: "Something went wrong reaching the assistant. Call the practice on " + site.contact.phone + " or send the document through the contact form.",
    busy: "Too many questions at once. Wait a moment and try again.",
    suggestions: [
      "My claim was refused last Tuesday, what now?",
      "My brother was detained at Pearson",
      "What is the 15 day deadline exactly?",
      "Do I need a lawyer or a consultant?",
    ],
  },
  fr: {
    ask: "Demander", whatsapp: "WhatsApp", call: "Appeler", top: "Haut de page",
    title: "Posez une question", close: "Fermer", send: "Envoyer",
    placeholder: "Posez votre question dans n'importe quelle langue",
    foot: "Informations générales seulement. Pas un avis sur votre dossier.",
    opening: "Dites-moi ce que votre document indique, ou ce qui s'est passé, et je vous dirai quelles règles s'appliquent et si un délai court. Je donne des informations générales, pas un avis sur votre dossier.",
    thinking: "Réflexion…",
    failed: "Impossible de joindre l'assistant. Appelez le cabinet au " + site.contact.phone + " ou envoyez le document via le formulaire.",
    busy: "Trop de questions à la fois. Patientez un instant.",
    suggestions: [
      "Ma demande d'asile a été refusée, et maintenant ?",
      "Mon frère a été détenu à Pearson",
      "Quel est exactement le délai de 15 jours ?",
      "Ai-je besoin d'un avocat ou d'un consultant ?",
    ],
  },
} as const;

export default function AssistantDock({ locale }: { locale: string }) {
  const t = COPY[locale === "fr" ? "fr" : "en"];
  const wa = isTodo(site.socials.whatsapp) ? null : site.socials.whatsapp;
  const tel = isTodo(site.contact.phone) ? null : site.contact.phoneHref;

  const [visible, setVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* The dock stays out of the way until the first screen has been read, and
     back-to-top only appears once there is something to go back up to. */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > window.innerHeight * 0.55);
      setShowTop(y > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [msgs, busy]);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  const send = useCallback(async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setValue("");
    setBusy(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-10), locale: locale === "fr" ? "fr" : "en" }),
      });
      if (res.status === 429) {
        setMsgs((m) => [...m, { role: "assistant", content: t.busy }]);
      } else {
        const data = await res.json().catch(() => null);
        setMsgs((m) => [...m, { role: "assistant", content: data?.reply || t.failed }]);
      }
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: t.failed }]);
    } finally {
      setBusy(false);
    }
  }, [busy, msgs, locale, t]);

  return (
    <>
      <div className={`dock${visible ? " on" : ""}`}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button type="button" className={`fab top${showTop ? " on" : ""}`} aria-label={t.top}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <ArrowUp aria-hidden />
          </button>
          {wa && (
            <a className="fab wa" href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden /> {t.whatsapp}
            </a>
          )}
        </div>
        <button type="button" className="fab ai" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          <Clock aria-hidden /> {t.ask}
        </button>
      </div>

      <div className={`pop${open ? " on" : ""}`} role="dialog" aria-label={t.title} aria-hidden={!open}>
        <div className="hd">
          <span className="dot" style={{ background: "#6FCF97" }} aria-hidden />
          <b>{t.title}</b>
          <button type="button" className="x" aria-label={t.close} onClick={() => setOpen(false)}>
            <X aria-hidden style={{ width: 18, height: 18 }} />
          </button>
        </div>

        <div className="log" ref={logRef}>
          <div className="msg">
            <span className="who">Assistant</span>
            <p>{t.opening}</p>
          </div>
          {msgs.map((m, i) => (
            <div key={i} className={`msg${m.role === "user" ? " me" : ""}`}>
              <span className="who">{m.role === "user" ? (locale === "fr" ? "Vous" : "You") : "Assistant"}</span>
              <p>{m.content}</p>
            </div>
          ))}
          {busy && (
            <div className="msg">
              <span className="who">Assistant</span>
              <p style={{ color: "var(--grey)" }}>{t.thinking}</p>
            </div>
          )}
        </div>

        {msgs.length === 0 && (
          <div className="sg">
            {t.suggestions.map((s) => (
              <button key={s} type="button" className="sgb" onClick={() => send(s)}>{s}</button>
            ))}
          </div>
        )}

        <form className="bar" onSubmit={(e) => { e.preventDefault(); send(value); }}>
          <input ref={inputRef} className="inp" value={value} onChange={(e) => setValue(e.target.value)}
            placeholder={t.placeholder} autoComplete="off" aria-label={t.placeholder} />
          <button className="btn" type="submit" disabled={busy}>{t.send}</button>
        </form>
        <p className="ft">{t.foot}</p>
      </div>

      <div className="ab">
        {tel && <a href={`tel:${tel}`}><Phone aria-hidden /> {t.call}</a>}
        {wa && <a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden /> {t.whatsapp}</a>}
        <button type="button" className="p" onClick={() => setOpen(true)}><Clock aria-hidden /> {t.ask}</button>
      </div>
    </>
  );
}
