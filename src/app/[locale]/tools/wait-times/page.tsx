import type { Metadata } from "next";
import { getDict } from "@/content";
import ToolPage from "@/components/tool-page";
import WaitTimes from "@/components/tools/wait-times";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const fr = locale === "fr";
  return {
    title: fr ? "Délais de la Commission" : "Board wait times",
    description: fr
      ? "Délais d'attente publiés pour les demandes d'asile, les appels des réfugiés, les appels en immigration et les enquêtes."
      : "Published wait times for refugee claims, refugee appeals, immigration appeals and admissibility hearings.",
    alternates: { canonical: `/${locale}/tools/wait-times` },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale); const fr = locale === "fr";
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", href: `/${locale}` },
        { name: fr ? "Outils" : "Tools", href: `/${locale}/tools` },
        { name: fr ? "Délais" : "Wait times", href: `/${locale}/tools/wait-times` }])} />
      <ToolPage d={d} locale={locale}
        meta={fr ? "Délais" : "Wait times"}
        title={fr ? "Combien de temps vous attendrez" : "How long you will wait"}
        lede={fr
          ? "Les chiffres de la Commission, non les nôtres. Une demande d'asile prenait environ 24 mois, un appel environ 4. Les contrôles de détention sont les seuls délais fixés par la loi plutôt que par la charge de travail."
          : "The Board's figures, not ours. A refugee claim took about 24 months, an appeal about 4. Detention reviews are the only timelines set by statute rather than by workload."}
        sources={[d.stats[0].source, d.stats[1].source]}>
        <WaitTimes locale={locale} />
      </ToolPage>
    </>
  );
}
