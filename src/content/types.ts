export type Source = { label: string; url: string };

export type Faq = { q: string; a: string };

export type Section = { h: string; p: string[] };

export type Service = {
  slug: string;
  /** The document name the visitor is actually holding. This is the SEO hook. */
  doc: string;
  title: string;
  summary: string;
  /** 60-90 word standalone answer block for answer engines. */
  tldr: string;
  deadline: string | null;
  audience: string;
  sections: Section[];
  faqs: Faq[];
  sources: Source[];
};

export type PracticeGroup = {
  key: string;
  title: string;
  blurb: string;
  /** The RCIC-IRB specialism. Rendered first and marked. */
  flagship?: boolean;
  items: { name: string; note?: string; slug?: string }[];
};

export type Problem = {
  n: string;
  title: string;
  problem: string;
  solution: string;
};

export type Tier = {
  tier: string;
  offer: string;
  detail: string;
  who: string;
};

export type Stat = { value: string; count: number | null; label: string; source: Source };

export type Dict = {
  locale: "en" | "fr";
  meta: { title: string; description: string; keywords: string[] };
  nav: { label: string; href: string }[];
  cta: {
    primary: string; secondary: string; send: string;
    checkDeadline: string; verify: string; call: string;
  };
  hero: {
    eyebrow: string; h1a: string; h1b: string; sub: string;
    trust: string[];
  };
  checker: {
    title: string; hint: string; whatLabel: string; dateLabel: string;
    prompt: string; passed: string; varies: string; variesBody: string;
    days: string; hrs: string; min: string; sec: string;
    by: string; notAdvice: string;
    options: { value: string; label: string }[];
    rules: Record<string, { days?: number; hours?: number; label: string; cite: string }>;
  };
  stats: Stat[];
  mattersIntro: { eyebrow: string; h2: string; lede: string };
  services: Service[];
  practiceIntro: { eyebrow: string; h2: string; lede: string; flagshipTag: string };
  practiceGroups: PracticeGroup[];
  problemsIntro: { eyebrow: string; h2: string; lede: string };
  problems: Problem[];
  tiersIntro: { eyebrow: string; h2: string; lede: string };
  tiers: Tier[];
  verify: {
    eyebrow: string; h2: string; p: string; cta: string; steps: string[];
  };
  about: {
    eyebrow: string; h2: string; p1: string; p2: string; limit: string;
  };
  contact: {
    eyebrow: string; h2: string; lede: string;
    name: string; email: string; phone: string; phoneHelp: string;
    language: string; who: string; whoOpts: string[];
    matter: string; matterOpts: string[]; choose: string;
    docDate: string; docDateHelp: string; province: string; provinceOpts: string[];
    rep: string; repOpts: string[];
    upload: string; uploadHelp: string;
    message: string; messagePlaceholder: string;
    consent: string; submit: string; sending: string;
    note: string; success: string; error: string;
  };
  faqIntro: { eyebrow: string; h2: string; lede: string };
  faqs: Faq[];
  footer: {
    blurb: string; matters: string; practice: string;
    regulated: string; registerLabel: string;
    licence: string; registeredName: string; address: string;
    tbc: string;
  };
  disclaimer: string;
  sourcesLabel: string;
  lastUpdated: string;
};
