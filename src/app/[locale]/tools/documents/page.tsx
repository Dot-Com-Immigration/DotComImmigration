import type { Metadata } from "next";
import { getDict } from "@/content";
import ToolPage from "@/components/tool-page";
import DocumentChecklist from "@/components/tools/document-checklist";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const fr = locale === "fr";
  return {
    title: fr ? "Liste de documents" : "Document checklist",
    description: fr ? "Ce qu'il faut rassembler, par type de dossier d'immigration ou d'asile."
                    : "What to gather, by type of immigration or refugee matter.",
    alternates: { canonical: `/${locale}/tools/documents` },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale); const fr = locale === "fr";
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", href: `/${locale}` },
        { name: fr ? "Outils" : "Tools", href: `/${locale}/tools` },
        { name: fr ? "Documents" : "Documents", href: `/${locale}/tools/documents` }])} />
      <ToolPage d={d} locale={locale}
        meta={fr ? "Liste" : "Checklist"}
        title={fr ? "Quoi apporter" : "What to bring"}
        lede={fr
          ? "La première rencontre vaut la peine si vous arrivez avec les bons documents. Choisissez votre situation, cochez au fur et à mesure, copiez la liste."
          : "The first meeting is worth having if you arrive with the right documents. Pick your situation, tick as you go, copy the list."}>
        <DocumentChecklist locale={locale} />
      </ToolPage>
    </>
  );
}
