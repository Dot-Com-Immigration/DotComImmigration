import type { Metadata } from "next";
import { getDict } from "@/content";
import { site, isTodo, liveSocials } from "@/site.config";
import { Section, Eyebrow, H2, Lede } from "@/components/ui";
import { Reveal } from "@/components/motion";
import ContactForm from "@/components/contact-form";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const d = getDict(locale);
  return { title: d.contact.h2, description: d.contact.lede, alternates: { canonical: `/${locale}/contact` } };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale);
  const socials = liveSocials();

  return (
    <Section>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: `/${locale}` }, { name: d.contact.h2, href: `/${locale}/contact` }])} />
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div className="min-w-0">
          <Reveal>
            <Eyebrow>{d.contact.eyebrow}</Eyebrow>
            <h1 className="mb-3.5 text-[clamp(1.8rem,3.6vw,2.7rem)] leading-[1.14]">{d.contact.h2}</h1>
            <Lede className="mb-8">{d.contact.lede}</Lede>
          </Reveal>
          <Reveal delay={0.06}><ContactForm d={d} /></Reveal>
        </div>

        <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-sm border border-line bg-surface p-6">
            <h2 className="mb-4 text-[1.1rem]">{locale === "fr" ? "Autres moyens" : "Other ways to reach us"}</h2>
            <dl className="grid gap-3.5 text-[0.9rem]">
              {!isTodo(site.contact.phone) && (
                <div>
                  <dt className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-gold-600">{locale === "fr" ? "Téléphone" : "Phone"}</dt>
                  <dd><a href={`tel:${site.contact.phoneHref}`} className="hover:text-gold-600">{site.contact.phone}</a></dd>
                </div>
              )}
              {socials.map(([k, url]) => (
                <div key={k}>
                  <dt className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-gold-600 capitalize">{k}</dt>
                  <dd><a href={url} target="_blank" rel="noopener noreferrer" className="break-all hover:text-gold-600">{url.replace(/^https?:\/\//, "")}</a></dd>
                </div>
              ))}
              {isTodo(site.contact.email) && (
                <div>
                  <dt className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-gold-600">{locale === "fr" ? "Courriel" : "Email"}</dt>
                  <dd><span className="rounded-sm border border-dashed border-[#B4472F] bg-[#B4472F]/10 px-2 py-0.5 text-xs font-bold text-[#B4472F]">{d.footer.tbc}</span></dd>
                </div>
              )}
              <div>
                <dt className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-gold-600">{locale === "fr" ? "Heures" : "Hours"}</dt>
                <dd className="text-muted">{site.contact.hours}</dd>
              </div>
            </dl>
          </div>
          <div className="mt-4 rounded-sm border-l-[3px] border-gold-500 bg-sand p-5 text-[0.85rem] leading-relaxed">
            {d.disclaimer}
          </div>
        </aside>
      </div>
    </Section>
  );
}
