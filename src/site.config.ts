/**
 * SINGLE SOURCE OF TRUTH for every firm detail on the site.
 *
 * ⚠️  FIELDS MARKED `TODO:` ARE PLACEHOLDERS.
 * The CICC Code of Professional Conduct (SOR/2022-128, s.44(1)) requires a written
 * advertisement to display the licensee's REGISTERED NAME and the College public
 * register's internet address. Do not point dotcomimmigration.com at this build, and
 * do not promote it, until every TODO below holds a real, verified value copied
 * exactly from the College public register.
 */

export const REGISTER_URL =
  "https://college-ic.ca/protecting-the-public/find-an-immigration-consultant";

export const site = {
  name: "Dot Com Immigration",
  tagline: "We Find Ways",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dotcomimmigration.com",

  /** Exactly as it appears on the College public register. */
  registeredName: "TODO: confirm against the College public register (site currently shows 'Dot.Com Immigration', which is a trade name, not necessarily the registered name)",

  consultant: {
    name: "Angad Sachdeva",
    credential: "RCIC-IRB",
    licenceNumber: "R518464", // from the current site footer. Confirm against the public register.
    title: "Regulated Canadian Immigration Consultant",
    titleFr: "Consultant réglementé en immigration canadienne",
  },

  contact: {
    email: "info@dotcomimmigration.com",
    phone: "+1 (647) 518-5500",
    phoneHref: "+16475185500",
    whatsappDisplay: "+1 (647) 518-5500",
    address: {
      street: "1058A Albion Rd #200",
      city: "Etobicoke",
      region: "ON",
      postalCode: "M9V 1B3",
      country: "CA",
    },
    hours: "Monday to Friday, 9am to 6pm ET",
  },

  /** Set to null to hide the icon. Replace the # with your real profile URLs. */
  socials: {
    tiktok: "https://www.tiktok.com/@dotcomimmigration",
    whatsapp: "https://wa.me/16475185500",
    instagram: "https://www.instagram.com/dot.com.immigration/",
    facebook: "TODO: https://facebook.com/...",
    youtube: "TODO: https://youtube.com/@...",
    linkedin: "TODO: https://linkedin.com/company/...",
  } as Record<string, string | null>,

  /** Social posts shown in the feed row. Add or reorder freely. */
  posts: [
    "https://www.instagram.com/p/Dew3JY0oEu-/",
    "https://www.instagram.com/p/DeuFiB2I88Q/",
    "https://www.instagram.com/p/Dej0YKfIXzV/",
    "https://www.instagram.com/p/DehG7eZoIhj/",
    "https://www.instagram.com/p/DeekN_EolbL/",
    "https://www.instagram.com/p/DecEE23ocyX/",
    "https://www.instagram.com/p/DeUhp7WIBNE/",
  ] as string[],

  /** YouTube / Vimeo IDs for the video section. Empty array hides the section. */
  videos: [] as { id: string; provider: "youtube" | "vimeo"; title: string; titleFr: string }[],

  locales: ["en", "fr"] as const,
  defaultLocale: "en" as const,
};

export type Locale = (typeof site.locales)[number];

/** True when a config value is still an unfilled placeholder. */
export const isTodo = (v: string | null | undefined): boolean =>
  !v || v.startsWith("TODO:");

/** Returns only the socials that have been filled in with a real URL. */
export const liveSocials = (): [string, string][] =>
  Object.entries(site.socials).filter(
    (e): e is [string, string] => !isTodo(e[1]),
  );

export const DISCLAIMER_EN =
  "Every case is different. Eligibility and available remedies depend on your circumstances. No outcome is guaranteed.";
export const DISCLAIMER_FR =
  "Chaque dossier est différent. L'admissibilité et les recours possibles dépendent de votre situation. Aucun résultat n'est garanti.";
