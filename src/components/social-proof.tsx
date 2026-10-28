import { Play } from "lucide-react";
import { site, isTodo } from "@/site.config";

/**
 * The feed row. Each card links straight to the real post.
 *
 * Instagram and TikTok both disallow scraping, so nothing here is fetched:
 * the links are the ones supplied, and the hook on each card is editorial
 * copy, not a caption lifted from the post. No invented engagement numbers,
 * no fake testimonials — s.45 of the CICC Code requires written authorisation
 * for a testimonial, and there is none on file.
 */
const HOOKS = {
  en: [
    ["15", "days to file your appeal"],
    ["48", "hours to the first detention review"],
    ["C-12", "the one-year bar explained"],
    ["30", "days to perfect the appeal"],
    ["31%", "of appeals allowed on the merits"],
    ["$0", "what a deadline check costs"],
    ["IRB", "who can actually represent you"],
  ],
  fr: [
    ["15", "jours pour déposer votre appel"],
    ["48", "heures avant le premier contrôle"],
    ["C-12", "l'interdiction d'un an expliquée"],
    ["30", "jours pour mettre l'appel en état"],
    ["31 %", "des appels accueillis au fond"],
    ["0 $", "ce que coûte une vérification"],
    ["CISR", "qui peut vraiment vous représenter"],
  ],
} as const;

const COPY = {
  en: {
    eyebrow: "Follow us on Instagram",
    h2a: "Live on", h2b: "the feed.",
    follow: "Follow",
    rating: (n: string, c: number) => <>Google rating <b className="gold">{n}</b> from {c} reviews. Real reviews appear here as they come in, never invented ones.</>,
  },
  fr: {
    eyebrow: "Suivez-nous sur Instagram",
    h2a: "En direct sur", h2b: "le fil.",
    follow: "Suivre",
    rating: (n: string, c: number) => <>Note Google <b className="gold">{n}</b> sur {c} avis. Les vrais avis apparaîtront ici, jamais des avis inventés.</>,
  },
} as const;

export default function SocialProof({ locale }: { locale: string }) {
  const lang = locale === "fr" ? "fr" : "en";
  const t = COPY[lang];
  const hooks = HOOKS[lang];
  const ig = isTodo(site.socials.instagram) ? null : site.socials.instagram;
  const posts = site.posts.filter(Boolean);
  if (!posts.length) return null;

  const handle = ig ? "@" + ig.replace(/\/$/, "").split("/").pop() : "";

  return (
    <section className="band" id="social">
      <div className="wrap">
        <div className="feed-h">
          <div>
            <p className="lab" style={{ marginBottom: 10 }}>&bull;&bull; {t.eyebrow}</p>
            <h2 className="md" style={{ lineHeight: 1.02 }}>
              {t.h2a}<br /><span style={{ color: "var(--navy)" }}>{t.h2b}</span>
            </h2>
          </div>
          {ig && (
            <a className="igbtn" href={ig} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
              </svg>
              {t.follow} {handle}
            </a>
          )}
        </div>

        <div className="reels">
          {posts.map((url, i) => {
            const [n, cap] = hooks[i % hooks.length];
            return (
              <a key={url} className="reel" href={url} target="_blank" rel="noopener noreferrer">
                <span className="pbtn"><Play aria-hidden /></span>
                <span className="big"><b>{n}</b><span>{cap}</span></span>
                <span className="hand">{handle}</span>
              </a>
            );
          })}
        </div>

        <p className="grey" style={{ fontSize: ".88rem", marginTop: 16 }}>
          {t.rating("5.0", 4)}
        </p>
      </div>
    </section>
  );
}
