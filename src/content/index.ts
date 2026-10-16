import type { Dict } from "./types";
import { en } from "./en";
import { fr } from "./fr";
import type { Locale } from "@/site.config";

const dicts: Record<Locale, Dict> = { en, fr };

export function getDict(locale: string): Dict {
  return dicts[(locale as Locale)] ?? en;
}

export function isLocale(v: string): v is Locale {
  return v === "en" || v === "fr";
}

export type { Dict };
export * from "./types";
