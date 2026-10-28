import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getDict, isLocale } from "@/content";
import { JsonLd, organizationSchema, websiteSchema, siteNavigationSchema, offerCatalogSchema } from "@/lib/schema";
import { site } from "@/site.config";

export function generateStaticParams() {
  return site.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  const path = `/${locale}`;
  return {
    title: { default: `${site.name} | ${d.meta.title}`, template: `%s | ${site.name}` },
    description: d.meta.description,
    keywords: d.meta.keywords,
    alternates: {
      canonical: path,
      languages: { "en-CA": "/en", "fr-CA": "/fr", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      url: path,
      title: `${site.name} | ${d.meta.title}`,
      description: d.meta.description,
      images: [{ url: "/brand/logo.png", width: 560, height: 584, alt: site.name }],
    },
    twitter: { card: "summary", title: site.name, description: d.meta.description },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children, params,
}: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);

  return (
    <div lang={locale === "fr" ? "fr-CA" : "en-CA"}>
      <JsonLd data={[organizationSchema(d, locale), websiteSchema(d, locale), siteNavigationSchema(d, locale), offerCatalogSchema(d, locale)]} />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-navy-900">
        {locale === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>
      <SiteHeader d={d} locale={locale} />
      <main id="main">{children}</main>
      <SiteFooter d={d} locale={locale} />
    </div>
  );
}
