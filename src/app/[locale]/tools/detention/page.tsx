import type { Metadata } from "next";
import { getDict } from "@/content";
import ToolPage from "@/components/tool-page";
import DetentionPlan from "@/components/tools/detention-plan";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const fr = locale === "fr";
  return {
    title: fr ? "Détention : les 48 premières heures" : "Detention: the first 48 hours",
    description: fr
      ? "Le premier contrôle des motifs de détention a lieu dans les 48 heures. Liste de ce qu'un proche doit rassembler."
      : "The first detention review is held within 48 hours. A checklist of what a relative needs to gather.",
    alternates: { canonical: `/${locale}/tools/detention` },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale); const fr = locale === "fr";
  const faqs = d.services.find((s) => s.slug === "detention-review")?.faqs ?? [];
  return (
    <>
      <JsonLd data={[faqSchema(faqs), breadcrumbSchema([
        { name: "Home", href: `/${locale}` },
        { name: fr ? "Outils" : "Tools", href: `/${locale}/tools` },
        { name: fr ? "Détention" : "Detention", href: `/${locale}/tools/detention` }])]} />
      <ToolPage d={d} locale={locale}
        meta={fr ? "48 heures" : "48 hours"}
        title={fr ? "Une personne a été détenue" : "Someone has been detained"}
        lede={fr
          ? "La Section de l'immigration contrôle les motifs de la détention dans les 48 heures, ou dans les meilleurs délais. La personne détenue n'a généralement pas accès à un téléphone. Si vous lisez ceci, c'est vous qui pouvez agir."
          : "The Immigration Division reviews the reasons for detention within 48 hours, or as soon as possible afterwards. The detained person usually has no access to a phone. If you are reading this, you are the one who can act."}
        sources={d.services.find((s) => s.slug === "detention-review")?.sources}>
        <DetentionPlan locale={locale} />
      </ToolPage>
    </>
  );
}
