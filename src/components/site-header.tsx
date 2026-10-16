"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ShieldCheck } from "lucide-react";
import SearchDialog from "./search-dialog";
import { site, REGISTER_URL, isTodo } from "@/site.config";
import type { Dict } from "@/content/types";

export default function SiteHeader({ d, locale }: { d: Dict; locale: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "";
  const other = locale === "fr" ? "en" : "fr";
  const switchHref = "/" + other + pathname.replace(/^\/(en|fr)/, "");

  return (
    <>
      <div className="border-b border-gold-500/20 bg-navy-950 text-[0.78rem] text-navy-400">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2 text-center">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-400" aria-hidden />
            {locale === "fr" ? "Autorisé et réglementé." : "Licensed and regulated."}{" "}
            <b className="font-semibold text-gold-400">{site.consultant.name}, {site.consultant.credential}</b>
          </span>
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="text-cream underline-offset-4 hover:underline">
            {locale === "fr" ? "Vérifiez tout consultant au registre public" : "Verify any consultant on the public register"}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-cream/10 bg-navy-950/92 backdrop-blur-md backdrop-saturate-150">
        <div className="container-x flex items-center gap-4 py-3">
          <Link href={`/${locale}`} className="flex shrink-0 items-center gap-3">
            <Image src="/brand/logo-on-dark.png" alt={site.name} width={112} height={117} priority className="h-11 w-auto" />
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-[1.02rem] tracking-wide text-cream">{site.name}</span>
              <span className="block text-[0.63rem] uppercase tracking-[0.22em] text-gold-400">{site.tagline}</span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-7 xl:flex">
            {d.nav.map((n) => (
              <Link key={n.href} href={`/${locale}${n.href}`} className="group relative py-1 text-[0.86rem] font-medium text-navy-400 transition hover:text-cream">
                {n.label}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold-400 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 xl:ml-0">
            <div className="hidden md:block"><SearchDialog d={d} locale={locale} /></div>

            <Link href={switchHref} aria-label={other === "fr" ? "Français" : "English"}
              className="rounded-sm border border-cream/20 px-2.5 py-2 text-[0.78rem] font-semibold uppercase text-navy-400 transition hover:border-gold-400 hover:text-gold-400">
              {other}
            </Link>

            <Link href={`/${locale}/contact`}
              className="hidden rounded-sm bg-gradient-to-br from-gold-400 to-gold-500 px-5 py-2.5 text-[0.84rem] font-semibold text-[#2A1D05] transition hover:-translate-y-0.5 sm:inline-flex">
              {d.cta.secondary}
            </Link>

            <button onClick={() => setOpen(true)} aria-label="Menu" className="rounded-sm border border-cream/20 p-2 text-cream xl:hidden">
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[80] bg-navy-950 xl:hidden">
          <div className="container-x flex items-center py-3">
            <Image src="/brand/logo-on-dark.png" alt="" width={100} height={104} className="h-10 w-auto" />
            <button onClick={() => setOpen(false)} aria-label="Close" className="ml-auto rounded-sm border border-cream/20 p-2 text-cream">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <nav className="container-x mt-6 grid gap-1">
            {d.nav.map((n) => (
              <Link key={n.href} href={`/${locale}${n.href}`} onClick={() => setOpen(false)}
                className="border-b border-cream/10 py-4 font-display text-xl text-cream">
                {n.label}
              </Link>
            ))}
            <Link href={`/${locale}/practice-areas`} onClick={() => setOpen(false)} className="border-b border-cream/10 py-4 font-display text-xl text-cream">
              {d.practiceIntro.h2}
            </Link>
            <Link href={`/${locale}/resources`} onClick={() => setOpen(false)} className="border-b border-cream/10 py-4 font-display text-xl text-cream">
              {d.faqIntro.h2}
            </Link>
            <Link href={`/${locale}/contact`} onClick={() => setOpen(false)}
              className="mt-5 rounded-sm bg-gradient-to-br from-gold-400 to-gold-500 px-6 py-3.5 text-center font-semibold text-[#2A1D05]">
              {d.cta.secondary}
            </Link>
            {!isTodo(site.contact.phone) && (
              <a href={`tel:${site.contact.phoneHref}`} className="mt-3 inline-flex items-center justify-center gap-2 rounded-sm border border-cream/25 px-6 py-3.5 text-cream">
                <Phone className="h-4 w-4" aria-hidden /> {site.contact.phone}
              </a>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
