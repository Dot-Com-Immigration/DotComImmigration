import { site, REGISTER_URL, isTodo } from "@/site.config";
import type { Dict, Service } from "@/content/types";

const abs = (p: string) => `${site.url}${p}`;

export function organizationSchema(d: Dict, locale: string) {
  const sameAs = Object.values(site.socials).filter((v): v is string => !isTodo(v));
  const addr = site.contact.address;
  const hasAddress = !isTodo(addr.street) && !isTodo(addr.city);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: isTodo(site.registeredName) ? undefined : site.registeredName,
    url: abs(`/${locale}`),
    slogan: site.tagline,
    description: d.meta.description,
    logo: abs("/brand/logo.png"),
    image: abs("/brand/logo.png"),
    areaServed: { "@type": "Country", name: "Canada" },
    availableLanguage: ["en", "fr"],
    telephone: isTodo(site.contact.phone) ? undefined : site.contact.phone,
    email: isTodo(site.contact.email) ? undefined : site.contact.email,
    sameAs: sameAs.length ? sameAs : undefined,
    address: hasAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: addr.street,
          addressLocality: addr.city,
          addressRegion: addr.region,
          postalCode: addr.postalCode,
          addressCountry: addr.country,
        }
      : undefined,
    employee: {
      "@type": "Person",
      name: site.consultant.name,
      jobTitle: site.consultant.title,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional licence",
        name: site.consultant.credential,
        recognizedBy: {
          "@type": "Organization",
          name: "College of Immigration and Citizenship Consultants",
          url: REGISTER_URL,
        },
      },
    },
  };
}

export function websiteSchema(d: Dict, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: abs(`/${locale}`),
    name: site.name,
    inLanguage: locale === "fr" ? "fr-CA" : "en-CA",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(s: Service, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.doc,
    description: s.tldr,
    url: abs(`/${locale}/services/${s.slug}`),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "Canada" },
    audience: { "@type": "Audience", audienceType: s.audience },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.href),
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}

/**
 * SiteNavigationElement for the primary menu plus every practice area and
 * service page, so search and answer engines can read the site's own map of
 * itself rather than inferring it from crawled links.
 */
export function siteNavigationSchema(d: Dict, locale: string) {
  const items: { name: string; url: string }[] = [];
  const push = (name: string, href: string) => {
    const url = abs(`/${locale}${href}`);
    if (!items.some((i) => i.url === url)) items.push({ name, url });
  };

  push(locale === "fr" ? "Accueil" : "Home", "");
  for (const n of d.nav) push(n.label, n.href);
  push(d.practiceIntro.h2, "/practice-areas");
  push(locale === "fr" ? "Outils" : "Tools", "/tools");
  const tools = locale === "fr"
    ? [["/tools/detention", "Plan de détention"], ["/tools/documents", "Liste de documents"],
       ["/tools/scope", "Vérificateur de portée"], ["/tools/wait-times", "Délais de traitement"]]
    : [["/tools/detention", "Detention plan"], ["/tools/documents", "Document checklist"],
       ["/tools/scope", "Scope checker"], ["/tools/wait-times", "Wait times"]];
  for (const [href, name] of tools) push(name, href);
  push(d.faqIntro.h2, "/resources");
  push(d.contact.h2, "/contact");
  for (const s of d.services) push(s.title, `/services/${s.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${site.url}/${locale}/#navigation`,
    name: `${site.name} site navigation`,
    itemListElement: items.map((it, i) => ({
      "@type": "SiteNavigationElement",
      position: i + 1,
      name: it.name,
      url: it.url,
    })),
  };
}

/**
 * The full practice map as a nested OfferCatalog hung off the organization.
 * Every group is a catalog, every item a Service, so a model asked "do they
 * handle X" has an authoritative list instead of a guess.
 */
export function offerCatalogSchema(d: Dict, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${site.url}/${locale}/#catalog`,
    name: locale === "fr" ? "Domaines de pratique" : "Practice areas",
    provider: { "@id": `${site.url}/#organization` },
    itemListElement: d.practiceGroups.map((g, gi) => ({
      "@type": "OfferCatalog",
      position: gi + 1,
      name: g.title,
      description: g.blurb,
      itemListElement: g.items.map((it, ii) => ({
        "@type": "Offer",
        position: ii + 1,
        itemOffered: {
          "@type": "Service",
          name: it.name,
          description: it.note || undefined,
          serviceType: g.title,
          url: it.slug ? abs(`/${locale}/services/${it.slug}`) : abs(`/${locale}/practice-areas#${g.key}`),
          provider: { "@id": `${site.url}/#organization` },
          areaServed: { "@type": "Country", name: "Canada" },
        },
      })),
    })),
  };
}
