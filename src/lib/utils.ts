export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function localePath(locale: string, href: string) {
  return `/${locale}${href === "/" ? "" : href}`;
}
