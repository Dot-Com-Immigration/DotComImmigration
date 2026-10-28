import Link from "next/link";
import { site, REGISTER_URL, isTodo, liveSocials } from "@/site.config";
import type { Dict } from "@/content/types";

const LABEL: Record<string, string> = {
  tiktok: "TikTok", instagram: "Instagram", facebook: "Facebook",
  youtube: "YouTube", linkedin: "LinkedIn", whatsapp: "WhatsApp",
};

function Tbc({ label }: { label: string }) {
  return (
    <span className="border border-dashed border-[var(--alarm)] px-1.5 py-0.5 font-mono text-[0.62rem] tracking-wider text-[var(--alarm)]">
      {label}
    </span>
  );
}

export default function SiteFooter({ d, locale }: { d: Dict; locale: string }) {
  const socials = liveSocials();
  const addr = site.contact.address;

  return (
    <footer className="hair-t">
      <div className="container-x grid gap-10 py-16 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <p className="display-s mb-4">{site.tagline}</p>
          <p className="measure-tight mb-5 text-sm text-[var(--muted)]">{d.footer.blurb}</p>
          {socials.length > 0 && (
            <ul className="cells flex flex-wrap">
              {socials.map(([k, url]) => (
                <li key={k}>
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    className="block bg-[var(--bg)] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-wider text-[var(--muted)] transition-colors hover:text-[var(--accent)]">
                    {LABEL[k] ?? k}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="meta mb-4">{d.footer.matters}</p>
          {d.services.slice(0, 6).map((s) => (
            <Link key={s.slug} href={`/${locale}/services/${s.slug}`}
              className="block py-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]">{s.doc}</Link>
          ))}
        </div>

        <div>
          <p className="meta mb-4">{d.footer.practice}</p>
          {[
            { l: locale === "fr" ? "Outils" : "Tools", h: "/tools" },
            { l: d.practiceIntro.h2, h: "/practice-areas" },
            { l: d.nav[3].label, h: "/verify" },
            { l: d.faqIntro.h2, h: "/resources" },
            { l: d.nav[4].label, h: "/about" },
            { l: d.contact.h2, h: "/contact" },
          ].map((x) => (
            <Link key={x.h} href={`/${locale}${x.h}`}
              className="block py-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]">{x.l}</Link>
          ))}
        </div>
      </div>

      <div className="hair-t">
        <div className="container-x grid gap-3 py-8 font-mono text-[0.7rem] leading-relaxed text-[var(--muted)]">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[var(--fg)]">{site.consultant.name}, {site.consultant.credential}</span>
            <span>{d.footer.licence} {site.consultant.licenceNumber}</span>
            <span>{d.footer.registeredName}</span>
            {isTodo(site.registeredName) ? <Tbc label={d.footer.tbc} /> : <span className="text-[var(--fg)]">{site.registeredName}</span>}
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{d.footer.address}</span>
            {isTodo(addr.street) ? <Tbc label={d.footer.tbc} /> : <span className="text-[var(--fg)]">{addr.street}, {addr.city}, {addr.region}</span>}
            {!isTodo(site.contact.phone) && <a href={`tel:${site.contact.phoneHref}`} className="text-[var(--fg)] hover:text-[var(--accent)]">{site.contact.phone}</a>}
            {!isTodo(site.contact.email) && <a href={`mailto:${site.contact.email}`} className="text-[var(--fg)] hover:text-[var(--accent)]">{site.contact.email}</a>}
          </p>
          <p>
            {d.footer.regulated}{" "}
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="accent-type underline-offset-2 hover:underline">{d.footer.registerLabel}</a>
          </p>
          <p className="measure border-l-2 border-[var(--accent)] py-1 pl-4 font-sans text-[0.78rem] text-[var(--fg-dim)]">{d.disclaimer}</p>
          <p>© {new Date().getFullYear()} {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
