import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Cta } from "@/components/ui";
import type { Dict } from "@/content/types";

export default function ToolPage({
  d, locale, meta, title, lede, children, sources,
}: {
  d: Dict; locale: string; meta: string; title: string; lede: string;
  children: React.ReactNode; sources?: { label: string; url: string }[];
}) {
  return (
    <>
      <section className="grain relative overflow-hidden">
        <div className="container-x relative z-10 pb-10 pt-10 sm:pb-14 sm:pt-14">
          <Link href={`/${locale}/tools`}
            className="mb-7 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />{locale === "fr" ? "Outils" : "Tools"}
          </Link>
          <p className="meta mb-5">{meta}</p>
          <h1 className="display-l mb-6">{title}</h1>
          <p className="measure text-[1.02rem] leading-relaxed text-[var(--fg-dim)]">{lede}</p>
        </div>
      </section>

      <section className="hair-t py-12 sm:py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div className="min-w-0">{children}</div>
          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="hair bg-[var(--surface)] p-6">
              <p className="meta mb-3">{d.contact.eyebrow}</p>
              <p className="mb-5 text-[0.9rem] leading-relaxed text-[var(--muted)]">{d.contact.lede}</p>
              <Cta href={`/${locale}/contact`} className="w-full">{d.cta.secondary}</Cta>
            </div>
            {sources && sources.length > 0 && (
              <div className="hair mt-4 p-6">
                <p className="meta meta-dim mb-3">{d.sourcesLabel}</p>
                <ul className="grid gap-2">
                  {sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer"
                        className="text-[0.82rem] text-[var(--muted)] underline-offset-4 hover:text-[var(--fg)] hover:underline">{s.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="measure mt-4 border-l-2 border-[var(--accent)] pl-4 text-[0.78rem] leading-relaxed text-[var(--muted)]">
              {d.disclaimer}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
