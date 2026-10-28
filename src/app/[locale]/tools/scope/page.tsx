import type { Metadata } from "next";
import { getDict } from "@/content";
import ToolPage from "@/components/tool-page";
import ScopeChecker from "@/components/tools/scope-checker";
import { JsonLd, faqSchema, breadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; const fr = locale === "fr";
  return {
    title: fr ? "Avocat ou consultant ?" : "Lawyer or consultant?",
    description: fr
      ? "Ce qu'un consultant autorisé peut faire, ce qui exige un avocat, et pourquoi la mention CISR compte."
      : "What a licensed consultant can do, what needs a lawyer, and why the IRB endorsement matters.",
    alternates: { canonical: `/${locale}/tools/scope` },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const d = getDict(locale); const fr = locale === "fr";
  const faqs = d.faqs.filter((f) => /consultant|lawyer|avocat|Federal Court|Cour fédérale/i.test(f.q));
  return (
    <>
      <JsonLd data={[faqSchema(faqs), breadcrumbSchema([
        { name: "Home", href: `/${locale}` },
        { name: fr ? "Outils" : "Tools", href: `/${locale}/tools` },
        { name: fr ? "Portée" : "Scope", href: `/${locale}/tools/scope` }])]} />
      <ToolPage d={d} locale={locale}
        meta={fr ? "Portée" : "Scope"}
        title={fr ? "Avez-vous besoin d'un avocat ?" : "Do you need a lawyer?"}
        lede={fr
          ? "Certaines choses qu'un consultant autorisé peut faire, d'autres non, et personne ne devrait avoir à le deviner. Cet outil vous le dit, y compris lorsque la réponse est que nous ne sommes pas les bonnes personnes."
          : "Some things a licensed consultant can do and some it cannot, and nobody should have to guess which. This tells you, including when the answer is that we are not the right people."}>
        <ScopeChecker locale={locale} />
      </ToolPage>
    </>
  );
}
