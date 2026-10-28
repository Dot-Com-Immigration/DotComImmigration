import type { Metadata } from "next";
import { getDict } from "@/content";
import { site, isTodo, liveSocials } from "@/site.config";
import { Section, Meta, Lede } from "@/components/ui";
import { Reveal } from "@/components/motion";
import ContactForm from "@/components/contact-form";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.contact.h2, description: d.contact.lede, alternates: { canonical: `/${locale}/contact` } };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale); const fr = locale === "fr";
  const socials = liveSocials();

  return (
    <Section>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.contact.h2, href: `/${locale}/contact` }])} />
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="min-w-0">
          <Reveal>
            <Meta>{d.contact.eyebrow}</Meta>
            <h1 className="display-l mb-6">{d.contact.h2}</h1>
            <Lede className="mb-10">{d.contact.lede}</Lede>
          </Reveal>
          <Reveal delay={0.06}><ContactForm d={d} /></Reveal>
        </div>

        <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <div className="hair p-6">
            <Meta dim>{fr ? "Autres moyens" : "Other ways"}</Meta>
            <dl className="hair-t">
              {!isTodo(site.contact.phone) && (
                <div className="hair-b py-3.5">
                  <dt className="meta mb-1">{fr ? "Téléphone" : "Phone"}</dt>
                  <dd className="text-[0.92rem]"><a href={`tel:${site.contact.phoneHref}`} className="hover:text-[var(--accent)]">{site.contact.phone}</a></dd>
                </div>
              )}
              {!isTodo(site.contact.email) && (
                <div className="hair-b py-3.5">
                  <dt className="meta mb-1">{fr ? "Courriel" : "Email"}</dt>
                  <dd className="text-[0.92rem]"><a href={`mailto:${site.contact.email}`} className="break-all hover:text-[var(--accent)]">{site.contact.email}</a></dd>
                </div>
              )}
              {socials.map(([k, url]) => (
                <div key={k} className="hair-b py-3.5">
                  <dt className="meta mb-1 capitalize">{k}</dt>
                  <dd className="text-[0.92rem]"><a href={url} target="_blank" rel="noopener noreferrer" className="break-all hover:text-[var(--accent)]">{url.replace(/^https?:\/\//, "")}</a></dd>
                </div>
              ))}
              <div className="hair-b py-3.5">
                <dt className="meta mb-1">{fr ? "Heures" : "Hours"}</dt>
                <dd className="text-[0.92rem] text-[var(--muted)]">{site.contact.hours}</dd>
              </div>
            </dl>
          </div>
          <p className="measure mt-4 border-l-2 border-[var(--accent)] pl-4 text-[0.8rem] leading-relaxed text-[var(--muted)]">{d.disclaimer}</p>
        </aside>
      </div>
    </Section>
  );
}
