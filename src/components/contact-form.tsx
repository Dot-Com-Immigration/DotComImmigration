"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { Dict } from "@/content/types";
import { site, DISCLAIMER_EN, DISCLAIMER_FR } from "@/site.config";

const MAX_TOTAL = 8 * 1024 * 1024;

export default function ContactForm({ d }: { d: Dict }) {
  const c = d.contact;
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const files = fd.getAll("file").filter((f): f is File => f instanceof File && f.size > 0);
    const total = files.reduce((n, f) => n + f.size, 0);
    if (total > MAX_TOTAL) {
      setState("err");
      setMsg(c.uploadHelp);
      return;
    }

    fd.set("locale", d.locale);
    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error ?? "failed");
      setState("ok");
      form.reset();
    } catch {
      setState("err");
      setMsg(c.error);
    }
  }

  const lbl = "meta meta-dim mb-2 block";
  const inp =
    "field";

  if (state === "ok") {
    return (
      <div className="border-l-2 border-[var(--accent)] bg-[var(--surface)] p-7">
        <CheckCircle2 className="mb-3 h-7 w-7 accent-type" aria-hidden />
        <p className="text-[0.95rem]">{c.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="hair bg-[var(--surface)] p-6 sm:p-8">
      <div className="mb-3.5 grid gap-3.5 sm:grid-cols-2">
        <div>
          <label className={lbl} htmlFor="f-name">{c.name} <span className="text-[var(--alarm)]">*</span></label>
          <input id="f-name" name="name" required autoComplete="name" className={inp} />
        </div>
        <div>
          <label className={lbl} htmlFor="f-email">{c.email} <span className="text-[var(--alarm)]">*</span></label>
          <input id="f-email" name="email" type="email" required autoComplete="email" className={inp} />
        </div>
      </div>

      <div className="mb-3.5 grid gap-3.5 sm:grid-cols-2">
        <div>
          <label className={lbl} htmlFor="f-phone">{c.phone}</label>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" className={inp} />
          <p className="mt-1 text-xs text-[var(--muted)]">{c.phoneHelp}</p>
        </div>
        <div>
          <label className={lbl} htmlFor="f-lang">{c.language}</label>
          <select id="f-lang" name="language" className={inp} defaultValue={d.locale === "fr" ? "Français" : "English"}>
            {["English","Français","Punjabi","Hindi","Urdu","Spanish","Haitian Creole","Other"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <fieldset className="mb-3.5">
        <legend className={lbl}>{c.who} <span className="text-[var(--alarm)]">*</span></legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {c.whoOpts.map((o, i) => (
            <label key={o} htmlFor={`f-who-${i}`} className="flex cursor-pointer items-start gap-2.5 hair px-3 py-2.5 text-[0.87rem] transition-colors hover:border-[var(--accent)]">
              <input id={`f-who-${i}`} type="radio" name="who" value={o} defaultChecked={i === 0} className="mt-1 accent-[var(--accent)]" />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mb-3.5 grid gap-3.5 sm:grid-cols-2">
        <div>
          <label className={lbl} htmlFor="f-matter">{c.matter} <span className="text-[var(--alarm)]">*</span></label>
          <select id="f-matter" name="matter" required defaultValue="" className={inp}>
            <option value="" disabled>{c.choose}</option>
            {c.matterOpts.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className={lbl} htmlFor="f-docdate">{c.docDate}</label>
          <input id="f-docdate" name="docDate" type="date" className={inp} />
          <p className="mt-1 text-xs text-[var(--muted)]">{c.docDateHelp}</p>
        </div>
      </div>

      <div className="mb-3.5 grid gap-3.5 sm:grid-cols-2">
        <div>
          <label className={lbl} htmlFor="f-prov">{c.province}</label>
          <select id="f-prov" name="province" className={inp}>{c.provinceOpts.map((o) => <option key={o}>{o}</option>)}</select>
        </div>
        <div>
          <label className={lbl} htmlFor="f-rep">{c.rep}</label>
          <select id="f-rep" name="representative" className={inp}>{c.repOpts.map((o) => <option key={o}>{o}</option>)}</select>
        </div>
      </div>

      <div className="mb-3.5">
        <label className={lbl} htmlFor="f-file">{c.upload}</label>
        <input id="f-file" name="file" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp" className={inp} />
        <p className="mt-1 text-xs text-[var(--muted)]">{c.uploadHelp}</p>
      </div>

      <div className="mb-4">
        <label className={lbl} htmlFor="f-msg">{c.message}</label>
        <textarea id="f-msg" name="message" rows={4} placeholder={c.messagePlaceholder} className={`${inp} min-h-28 resize-y`} />
      </div>

      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />

      <label htmlFor="f-consent" className="mb-4 flex cursor-pointer items-start gap-3 hair bg-[var(--surface-2)] p-3.5 text-[0.82rem] text-[var(--muted)]">
        <input id="f-consent" name="consent" type="checkbox" required className="mt-0.5 shrink-0 accent-[var(--accent)]" />
        <span>{c.consent}</span>
      </label>

      {state === "err" && (
        <p className="mb-3 flex items-start gap-2 bg-[#B4472F]/10 p-3 text-sm text-[var(--alarm)]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {msg || c.error}
        </p>
      )}

      <button
        type="submit" disabled={state === "sending"}
        className="btn w-full disabled:opacity-60"
      >
        {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {state === "sending" ? c.sending : c.submit}
      </button>

      <p className="mt-3.5 hair-t pt-3.5 text-xs leading-relaxed text-[var(--muted)]">
        {c.note} {d.locale === "fr" ? DISCLAIMER_FR : DISCLAIMER_EN}
      </p>
      {!site.contact.email.startsWith("TODO") && (
        <p className="mt-2 text-xs text-[var(--muted)]">{site.contact.email}</p>
      )}
    </form>
  );
}
