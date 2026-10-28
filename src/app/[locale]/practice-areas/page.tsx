import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/content";
import { Section, Meta, Lede } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.practiceIntro.h2, description: d.practiceIntro.lede, alternates: { canonical: `/${locale}/practice-areas` } };
}

export default async function PracticeAreas({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale);
  return (
    <Section>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.practiceIntro.h2, href: `/${locale}/practice-areas` }])} />
      <Reveal>
        <Meta>{d.practiceIntro.eyebrow}</Meta>
        <h1 className="display-l mb-6">{d.practiceIntro.h2}</h1>
        <Lede className="mb-14">{d.practiceIntro.lede}</Lede>
      </Reveal>

      <div className="grid gap-14">
        {d.practiceGroups.map((g) => (
          <Reveal key={g.key}>
            <section>
              <div className="hair-b mb-6 flex flex-wrap items-baseline gap-4 pb-4">
                <h2 className="display-s min-w-0 flex-1">{g.title}</h2>
                {g.flagship && (
                  <span className="border border-[var(--accent)] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] accent-type">
                    {d.practiceIntro.flagshipTag}
                  </span>
                )}
              </div>
              <p className="measure mb-6 text-[0.93rem] text-[var(--muted)]">{g.blurb}</p>
              <ul className={`cells grid ${g.flagship ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                {g.items.map((it) => {
                  const body = (
                    <>
                      <span className="block text-[0.9rem]">{it.name}</span>
                      {it.note && <span className="mt-1 block font-mono text-[0.64rem] uppercase tracking-wider text-[var(--muted)]">{it.note}</span>}
                    </>
                  );
                  return (
                    <li key={it.name} className="bg-[var(--bg)]">
                      {it.slug ? (
                        <Link href={`/${locale}/services/${it.slug}`} className="group block h-full p-4 transition-colors hover:bg-[var(--surface)]">
                          {body}
                          <span className="mt-2 inline-block accent-type opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>→</span>
                        </Link>
                      ) : (
                        <div className="h-full p-4">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
