import Link from "next/link";
import Image from "next/image";
import { site, REGISTER_URL, isTodo, liveSocials } from "@/site.config";
import type { Dict } from "@/content/types";

const SOCIAL_LABEL: Record<string, string> = {
  tiktok: "TikTok", instagram: "Instagram", facebook: "Facebook",
  youtube: "YouTube", linkedin: "LinkedIn", whatsapp: "WhatsApp",
};

function Tbc({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-sm border border-dashed border-[#B4472F] bg-[#B4472F]/12 px-1.5 py-0.5 text-[0.7rem] font-bold tracking-wide text-[#E08264]">
      {label}
    </span>
  );
}

export default function SiteFooter({ d, locale }: { d: Dict; locale: string }) {
  const socials = liveSocials();
  const addr = site.contact.address;

  return (
    <footer className="bg-navy-950 text-[0.85rem] text-navy-400">
      <div className="container-x grid gap-8 py-12 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Image src="/brand/logo-on-dark.png" alt={site.name} width={140} height={146} className="mb-3.5 h-16 w-auto" />
          <p className="mb-3 max-w-[46ch]">{d.footer.blurb}</p>
          {socials.length > 0 && (
            <ul className="mt-3.5 flex flex-wrap gap-2">
              {socials.map(([k, url]) => (
                <li key={k}>
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    className="inline-block rounded-sm border border-cream/20 px-3 py-1.5 text-xs transition hover:border-gold-400 hover:text-gold-400">
                    {SOCIAL_LABEL[k] ?? k}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h4 className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold-400">{d.footer.matters}</h4>
          {d.services.slice(0, 6).map((s) => (
            <Link key={s.slug} href={`/${locale}/services/${s.slug}`} className="block py-1 transition hover:text-gold-400">{s.doc}</Link>
          ))}
          <Link href={`/${locale}/practice-areas`} className="block py-1 transition hover:text-gold-400">{d.practiceIntro.h2}</Link>
        </div>

        <div>
          <h4 className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold-400">{d.footer.practice}</h4>
          <Link href={`/${locale}/deadline-checker`} className="block py-1 transition hover:text-gold-400">{d.nav[0].label}</Link>
          <Link href={`/${locale}/verify`} className="block py-1 transition hover:text-gold-400">{d.nav[3].label}</Link>
          <Link href={`/${locale}/resources`} className="block py-1 transition hover:text-gold-400">{d.faqIntro.h2}</Link>
          <Link href={`/${locale}/about`} className="block py-1 transition hover:text-gold-400">{d.nav[4].label}</Link>
          <Link href={`/${locale}/contact`} className="block py-1 transition hover:text-gold-400">{d.contact.h2}</Link>
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="block py-1 transition hover:text-gold-400">{d.footer.registerLabel}</a>
        </div>
      </div>

      <div className="border-t border-cream/12">
        <div className="container-x grid gap-3 py-6 text-[0.76rem] leading-relaxed">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <strong className="text-cream">{site.consultant.name}, {site.consultant.credential}</strong>
            <span aria-hidden>·</span>
            <span>{d.footer.licence}</span>
            {isTodo(site.consultant.licenceNumber) ? <Tbc label={d.footer.tbc} /> : <span className="text-cream">{site.consultant.licenceNumber}</span>}
            <span aria-hidden>·</span>
            <span>{d.footer.registeredName}</span>
            {isTodo(site.registeredName) ? <Tbc label={d.footer.tbc} /> : <span className="text-cream">{site.registeredName}</span>}
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{d.footer.address}</span>
            {isTodo(addr.street)
              ? <Tbc label={d.footer.tbc} />
              : <span className="text-cream">{addr.street}, {addr.city}, {addr.region} {addr.postalCode}</span>}
            {!isTodo(site.contact.phone) && (<><span aria-hidden>·</span><a href={`tel:${site.contact.phoneHref}`} className="text-cream hover:text-gold-400">{site.contact.phone}</a></>)}
          </p>
          <p>
            {d.footer.regulated}{" "}
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="text-gold-400 underline-offset-2 hover:underline">{d.footer.registerLabel}</a>
          </p>
          <p className="rounded-sm border-l-2 border-gold-500 bg-gold-500/10 px-4 py-3 text-cream">{d.disclaimer}</p>
          <p>© {new Date().getFullYear()} {site.name}. {site.tagline}.</p>
        </div>
      </div>
    </footer>
  );
}
