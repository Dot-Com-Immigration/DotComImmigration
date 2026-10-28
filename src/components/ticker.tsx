/**
 * The running headline band.
 *
 * Two identical sets translate exactly -50%, so the loop is seamless with no
 * JavaScript and no measurement. Pure CSS, which means it survives a failed
 * script and stops dead for anyone who has asked for reduced motion.
 */
export default function Ticker({ locale }: { locale: string }) {
  const fr = locale === "fr";
  const items: [string, string][] = fr
    ? [
        ["259 085", "demandes d'asile en instance, août 2026"],
        ["15 jours", "pour déposer un avis d'appel"],
        ["48 heures", "avant le premier contrôle des motifs de détention"],
        ["Projet de loi C-12", "en vigueur depuis le 26 mars 2026"],
        ["31 %", "des appels accueillis au fond, 2025"],
        ["23 160", "renvois en 2025"],
      ]
    : [
        ["259,085", "refugee claims pending, August 2026"],
        ["15 days", "to file a Notice of Appeal"],
        ["48 hours", "to the first detention review"],
        ["Bill C-12", "in force since 26 March 2026"],
        ["31%", "of appeals allowed on the merits, 2025"],
        ["23,160", "removals in 2025"],
      ];

  const set = (
    <div className="tk-set">
      {items.map(([n, l]) => (
        <span className="tk-i" key={n}><b>{n}</b>{l}</span>
      ))}
    </div>
  );

  return (
    <div className="tick" aria-label={fr ? "Chiffres clés" : "Key figures"}>
      <div className="tk-rail">
        {set}
        <div className="tk-set" aria-hidden>
          {items.map(([n, l]) => (
            <span className="tk-i" key={n + "b"}><b>{n}</b>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
