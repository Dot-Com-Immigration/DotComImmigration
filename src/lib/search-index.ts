import type { Dict } from "@/content/types";

export type SearchDoc = {
  id: string;
  kind: "matter" | "question" | "area" | "page";
  title: string;
  context: string;
  href: string;
  body: string;
};

/** Flattens every piece of content into one client-searchable index. */
export function buildIndex(d: Dict, locale: string): SearchDoc[] {
  const p = (h: string) => `/${locale}${h}`;
  const out: SearchDoc[] = [];

  for (const s of d.services) {
    out.push({
      id: `svc-${s.slug}`, kind: "matter", title: s.title, context: s.doc,
      href: p(`/services/${s.slug}`),
      body: [s.summary, s.tldr, s.audience, s.deadline ?? "", ...s.sections.flatMap((x) => [x.h, ...x.p])].join(" "),
    });
    for (const f of s.faqs) {
      out.push({ id: `svcq-${s.slug}-${f.q.slice(0, 18)}`, kind: "question", title: f.q, context: s.title, href: p(`/services/${s.slug}`), body: f.a });
    }
  }

  for (const f of d.faqs) {
    out.push({ id: `faq-${f.q.slice(0, 24)}`, kind: "question", title: f.q, context: d.faqIntro.h2, href: p("/resources"), body: f.a });
  }

  for (const g of d.practiceGroups) {
    for (const it of g.items) {
      out.push({
        id: `area-${g.key}-${it.name.slice(0, 20)}`, kind: "area", title: it.name,
        context: g.title, href: it.slug ? p(`/services/${it.slug}`) : p("/practice-areas"),
        body: [it.note ?? "", g.blurb].join(" "),
      });
    }
  }

  for (const prob of d.problems) {
    out.push({ id: `prob-${prob.n}`, kind: "page", title: prob.title, context: d.problemsIntro.h2, href: p("/how-we-help"), body: `${prob.problem} ${prob.solution}` });
  }

  const fr = locale === "fr";
  for (const tl of [
    { h: "/tools", t: fr ? "Outils" : "Tools", b: fr ? "Tous les outils gratuits" : "All the free tools" },
    { h: "/tools/detention", t: fr ? "Détention : 48 premières heures" : "Detention: first 48 hours", b: fr ? "Ce qu'un proche doit rassembler avant le premier contrôle" : "What a relative must gather before the first review" },
    { h: "/tools/documents", t: fr ? "Liste de documents" : "Document checklist", b: fr ? "Quoi apporter, par type de dossier" : "What to bring, by matter type" },
    { h: "/tools/scope", t: fr ? "Avocat ou consultant ?" : "Lawyer or consultant?", b: fr ? "Portée du permis, Cour fédérale, mention CISR" : "Licence scope, Federal Court, IRB endorsement" },
    { h: "/tools/wait-times", t: fr ? "Délais de la Commission" : "Board wait times", b: fr ? "SPR SAR SAI enquêtes contrôles de détention" : "RPD RAD IAD admissibility detention reviews" },
  ]) {
    out.push({ id: `tool-${tl.h}`, kind: "page", title: tl.t, context: fr ? "Outil" : "Tool", href: p(tl.h), body: tl.b });
  }

  out.push(
    { id: "pg-checker", kind: "page", title: d.checker.title, context: d.nav[0].label, href: p("/deadline-checker"), body: d.checker.hint },
    { id: "pg-verify", kind: "page", title: d.verify.h2, context: d.verify.eyebrow, href: p("/verify"), body: d.verify.p },
    { id: "pg-about", kind: "page", title: d.about.h2, context: d.about.eyebrow, href: p("/about"), body: `${d.about.p1} ${d.about.limit}` },
    { id: "pg-contact", kind: "page", title: d.contact.h2, context: d.contact.eyebrow, href: p("/contact"), body: d.contact.lede },
    { id: "pg-areas", kind: "page", title: d.practiceIntro.h2, context: d.practiceIntro.eyebrow, href: p("/practice-areas"), body: d.practiceIntro.lede },
  );

  return out;
}

const strip = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function searchDocs(docs: SearchDoc[], q: string, limit = 12): SearchDoc[] {
  const needle = strip(q.trim());
  if (needle.length < 2) return [];
  const terms = needle.split(/\s+/).filter(Boolean);

  const scored = docs.map((doc) => {
    const title = strip(doc.title);
    const context = strip(doc.context);
    const body = strip(doc.body);
    let score = 0;
    for (const t of terms) {
      if (title.startsWith(t)) score += 12;
      else if (title.includes(t)) score += 8;
      if (context.includes(t)) score += 3;
      if (body.includes(t)) score += 1;
    }
    if (terms.every((t) => title.includes(t) || context.includes(t) || body.includes(t))) score += 4;
    else score = score * 0.4;
    return { doc, score };
  });

  return scored.filter((s) => s.score > 2).sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.doc);
}
