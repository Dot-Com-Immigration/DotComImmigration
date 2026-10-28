"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import SearchDialog from "./search-dialog";
import { site, REGISTER_URL, isTodo } from "@/site.config";
import type { Dict } from "@/content/types";

type Leaf = { label: string; href: string; note?: string };
type Col = { title: string; flag?: string; items: Leaf[] };

export default function SiteHeader({ d, locale }: { d: Dict; locale: string }) {
  const [drawer, setDrawer] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [acc, setAcc] = useState<string | null>(null);
  const pathname = usePathname() || "";
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fr = locale === "fr";
  const other = fr ? "en" : "fr";
  const switchHref = "/" + other + pathname.replace(/^\/(en|fr)/, "");
  const p = (href: string) => `/${locale}${href}`;
  const isCur = (href: string) => pathname === p(href) || (href !== "" && pathname.startsWith(p(href) + "/"));

  /* Every practice group becomes a column; an item links to its service page
     when one exists, otherwise to its anchor on the practice-areas page. */
  const practiceCols: Col[] = d.practiceGroups.map((g) => ({
    title: g.title,
    flag: g.flagship ? d.practiceIntro.flagshipTag : undefined,
    items: g.items.map((it) => ({
      label: it.name,
      note: it.note,
      href: it.slug ? `/services/${it.slug}` : `/practice-areas#${g.key}`,
    })),
  }));

  const toolCols: Col[] = [{
    title: fr ? "Outils gratuits" : "Free tools",
    items: [
      { label: fr ? "Vérificateur de délai" : "Deadline checker", href: "/deadline-checker", note: fr ? "Compte à rebours en direct" : "Live countdown to your filing date" },
      { label: fr ? "Plan de détention" : "Detention plan", href: "/tools/detention", note: fr ? "48 h, 7 jours, puis 30 jours" : "48 hours, 7 days, then 30 days" },
      { label: fr ? "Liste de documents" : "Document checklist", href: "/tools/documents", note: fr ? "Ce qu'il faut réunir" : "What to gather, by matter type" },
      { label: fr ? "Vérificateur de portée" : "Scope checker", href: "/tools/scope", note: fr ? "Qui peut vous représenter" : "Who can represent you where" },
      { label: fr ? "Délais de traitement" : "Wait times", href: "/tools/wait-times", note: fr ? "Délais actuels de la CISR" : "Current IRB and IRCC timelines" },
    ],
  }];

  const flat = [
    { label: fr ? "Ce qui s'est passé" : "What happened", href: "/services" },
    { label: d.nav.find((n) => n.href === "/how-we-help")?.label ?? "How we help", href: "/how-we-help" },
    { label: d.nav.find((n) => n.href === "/verify")?.label ?? "Verify us", href: "/verify" },
    { label: d.nav.find((n) => n.href === "/about")?.label ?? "About", href: "/about" },
  ];

  /* Close on route change, Escape, and clicks outside the header. */
  useEffect(() => { setMega(null); setDrawer(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setMega(null); setDrawer(false); } };
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMega(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, []);
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawer]);

  const openMega = (k: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setMega(k); };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(null), 160);
  };

  const Panel = ({ k, cols, wide, foot }: { k: string; cols: Col[]; wide: boolean; foot: React.ReactNode }) => (
    <div className={`mega${wide ? " anchored" : " narrow"}${mega === k ? " on" : ""}`} role="menu" aria-hidden={mega !== k}>
      <div className="megagrid" style={wide ? undefined : { gridTemplateColumns: "1fr" }}>
        {cols.map((c) => (
          <div className="megacol" key={c.title}>
            <h4>{c.title}{c.flag ? <em>{c.flag}</em> : null}</h4>
            {c.items.map((it) => (
              <Link key={c.title + it.label} href={p(it.href)} role="menuitem" tabIndex={mega === k ? 0 : -1}>
                <b>{it.label}</b>
                {it.note ? <i>{it.note}</i> : null}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="megafoot">{foot}</div>
    </div>
  );

  return (
    <>
      <div className="util">
        <div className="wrap">
          <span>
            {site.consultant.name} · <strong style={{ color: "var(--navy)" }}>{site.consultant.credential}</strong> · {fr ? "Permis" : "Licence"} {site.consultant.licenceNumber}
          </span>
          <span className="r">
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
              {fr ? "Vérifier au registre public" : "Verify on the public register"}
            </a>
            {!isTodo(site.contact.phone) && <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phone}</a>}
          </span>
        </div>
      </div>

      <nav className="top" ref={headerRef as React.RefObject<HTMLElement>}>
        <div className="wrap">
          <Link href={p("")} className="brand" aria-label={site.name}>
            <Image src="/brand/logo.png" alt="" width={96} height={100} priority />
            <i>{site.name}</i>
          </Link>

          <div className="nl">
            <div className="navitem anchored" onMouseEnter={() => openMega("practice")} onMouseLeave={scheduleClose}>
              <button type="button" className="navbtn" aria-expanded={mega === "practice"} aria-haspopup="true"
                onClick={() => setMega(mega === "practice" ? null : "practice")}>
                {fr ? "Domaines de pratique" : "Practice areas"} <ChevronDown aria-hidden />
              </button>
              <Panel k="practice" cols={practiceCols} wide foot={
                <>
                  <p>{d.practiceIntro.lede}</p>
                  <Link href={p("/practice-areas")} className="btn sm o">
                    {fr ? "Voir tous les domaines" : "See every practice area"}
                  </Link>
                </>
              } />
            </div>

            <div className="navitem" onMouseEnter={() => openMega("tools")} onMouseLeave={scheduleClose}>
              <button type="button" className="navbtn" aria-expanded={mega === "tools"} aria-haspopup="true"
                onClick={() => setMega(mega === "tools" ? null : "tools")}>
                {fr ? "Outils" : "Tools"} <ChevronDown aria-hidden />
              </button>
              <Panel k="tools" cols={toolCols} wide={false} foot={
                <Link href={p("/tools")} className="btn sm o">{fr ? "Tous les outils" : "All tools"}</Link>
              } />
            </div>

            {flat.map((n) => (
              <Link key={n.href} href={p(n.href)} className={isCur(n.href) ? "cur" : undefined}>{n.label}</Link>
            ))}
          </div>

          <div className="nr">
            <div className="hidden md:block"><SearchDialog d={d} locale={locale} /></div>
            <Link href={switchHref} className="btn sm o" aria-label={other === "fr" ? "Français" : "English"}
              style={{ textTransform: "uppercase", letterSpacing: ".06em" }}>{other}</Link>
            <Link href={p("/contact")} className="btn sm" style={{ display: "none" }} data-desk>{d.cta.secondary}</Link>
            <button type="button" className="burger" aria-label="Menu" aria-expanded={drawer} onClick={() => setDrawer(true)}>
              <Menu aria-hidden />
            </button>
          </div>
        </div>
      </nav>

      <div className={`drawer${drawer ? " on" : ""}`} role="dialog" aria-modal="true" aria-hidden={!drawer}>
        <div className="dh">
          <Image src="/brand/logo.png" alt="" width={88} height={92} />
          <button type="button" className="dx" aria-label={fr ? "Fermer" : "Close"} onClick={() => setDrawer(false)}>
            <X aria-hidden style={{ width: 20, height: 20 }} />
          </button>
        </div>
        <nav>
          {[{ k: "practice", label: fr ? "Domaines de pratique" : "Practice areas", cols: practiceCols, all: "/practice-areas" },
            { k: "tools", label: fr ? "Outils" : "Tools", cols: toolCols, all: "/tools" }].map((grp) => (
            <div className="dacc" key={grp.k}>
              <button type="button" aria-expanded={acc === grp.k} onClick={() => setAcc(acc === grp.k ? null : grp.k)}>
                {grp.label} <ChevronDown aria-hidden />
              </button>
              <div className={`dsub${acc === grp.k ? " on" : ""}`}>
                {grp.cols.map((c) => (
                  <div key={c.title}>
                    {grp.cols.length > 1 && <h5>{c.title}</h5>}
                    {c.items.map((it) => (
                      <Link key={c.title + it.label} href={p(it.href)} onClick={() => setDrawer(false)}>{it.label}</Link>
                    ))}
                  </div>
                ))}
                <Link href={p(grp.all)} onClick={() => setDrawer(false)} style={{ color: "var(--red)", fontWeight: 700 }}>
                  {fr ? "Tout voir" : "See all"} →
                </Link>
              </div>
            </div>
          ))}
          {[...flat,
            { label: d.faqIntro.h2, href: "/resources" },
            { label: d.contact.h2, href: "/contact" }].map((n) => (
            <a key={n.href} href={p(n.href)} onClick={() => setDrawer(false)}>{n.label}</a>
          ))}
        </nav>
        <div className="foot">
          <Link href={p("/contact")} className="btn" onClick={() => setDrawer(false)} style={{ width: "100%" }}>
            {d.cta.secondary}
          </Link>
          {!isTodo(site.contact.phone) && (
            <a href={`tel:${site.contact.phoneHref}`} className="btn o" style={{ width: "100%", marginTop: 10 }}>
              <Phone aria-hidden style={{ width: 18, height: 18 }} /> {site.contact.phone}
            </a>
          )}
        </div>
      </div>
    </>
  );
}
