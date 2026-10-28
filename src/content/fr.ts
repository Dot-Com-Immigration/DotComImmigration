import type { Dict } from "./types";

const IRB_FILING = { label: "CISR, Interjeter appel d'une décision", url: "https://www.irb-cisr.gc.ca/fr/interjeter-appel-refugie/Pages/index.aspx" };
const IRB_PRACTICE = { label: "CISR, Avis de pratique sur la mise en état d'un appel", url: "https://irb-cisr.gc.ca/en/legal-policy/procedures/Pages/practice-notice-extending-time-perfecting-appeal.aspx" };
const IRB_DETENTION = { label: "CISR, Contrôle des motifs de détention", url: "https://irb.gc.ca/en/legal-policy/procedures/pages/ProcessRevMot.aspx" };
const IRB_RAD_STATS = { label: "CISR, Statistiques des appels des réfugiés 2025", url: "https://www.irb-cisr.gc.ca/en/statistics/appeals/Pages/RADStat2025.aspx" };
const IRB_RPD_STATS = { label: "CISR, Statistiques des demandes d'asile 2025", url: "https://www.irb-cisr.gc.ca/en/statistics/protection/Pages/RPDStat2025.aspx" };
const IRB_IAD_STATS = { label: "CISR, Statistiques des appels en immigration", url: "https://irb.gc.ca/en/statistics/immigration-appeals/Pages/index.aspx" };
const IRB_VOLUMES = { label: "CISR, Tendances récentes et rapports de volume", url: "https://irb.gc.ca/en/statistics/Pages/volume-reports.aspx" };
const IRB_WAITS = { label: "CISR, Comparution devant CIMM, mars 2026", url: "https://www.irb-cisr.gc.ca/en/transparency/proactive-disclosure/Pages/cimm-mar-2026.aspx" };
const CBSA_REMOVALS = { label: "ASFC, Statistiques sur les renvois", url: "https://www.cbsa-asfc.gc.ca/agency-agence/reports-rapports/security-securite/removals-renvois-fra.html" };
const CBSA_DETENTION = { label: "ASFC, Statistiques sur la détention", url: "https://www.cbsa-asfc.gc.ca/security-securite/detent/qstat-fra.html" };
const C12 = { label: "Loi visant à renforcer le système d'immigration et les frontières du Canada", url: "https://en.wikipedia.org/wiki/Strengthening_Canada%27s_Immigration_System_and_Borders_Act" };
const IRCC_REGS = { label: "IRCC, Projet de règlement sur l'asile, juin 2026", url: "https://www.canada.ca/en/immigration-refugees-citizenship/news/2026/06/canada-proposes-new-regulations-to-modernize-the-asylum-process-and-support-timely-decisions.html" };

export const fr: Dict = {
  locale: "fr",
  meta: {
    title: "Appels des réfugiés, contrôles de détention et appels en immigration au Canada",
    description:
      "Représentation par un CRIC-CISR autorisé devant la Commission de l'immigration et du statut de réfugié. Demande d'asile rejetée, appel à la SAR, irrecevabilité sous le projet de loi C-12, contrôle de détention, appel en parrainage et renvoi. Vérification de délai gratuite.",
    keywords: [
      "demande d'asile rejetée Canada", "délai appel SAR", "avis d'appel 15 jours",
      "lettre irrecevabilité C-12", "examen des risques avant renvoi", "contrôle de détention Canada",
      "appel parrainage SAI", "convocation renvoi", "consultant CRIC-CISR",
    ],
  },

  nav: [
    { label: "Vérificateur de délai", href: "/deadline-checker" },
    { label: "Ce qui s'est passé", href: "/services" },
    { label: "Comment nous aidons", href: "/how-we-help" },
    { label: "Vérifiez-nous", href: "/verify" },
    { label: "À propos", href: "/about" },
  ],

  cta: {
    primary: "Vérifier mon délai",
    secondary: "Envoyez-nous la lettre",
    send: "Envoyer et obtenir mon délai",
    checkDeadline: "Vérifier mon délai",
    verify: "Ouvrir le registre public",
    call: "Appeler le cabinet",
  },

  hero: {
    eyebrow: "Appels des réfugiés · Détention · Appels en parrainage",
    h1a: "Vous avez attendu deux ans une réponse.",
    h1b: "Il vous reste quinze jours.",
    sub: "Une demande d'asile rejetée déclenche un délai de 15 jours dès la réception des motifs écrits. Un contrôle de détention a lieu dans les 48 heures. La plupart des gens perdent des jours à comprendre la lettre. Trouvez d'abord votre délai. Décidez ensuite.",
    trust: ["CRIC-CISR autorisé", "Autorisé devant la CISR", "La vérification du délai est gratuite"],
  },

  checker: {
    title: "Quel est mon délai ?",
    hint: "Délais généraux seulement. Ceci n'est pas un avis juridique sur votre dossier. Votre délai peut différer.",
    whatLabel: "Qu'avez-vous reçu ?",
    dateLabel: "Date de réception",
    prompt: "Indiquez la date de réception et nous compterons les jours.",
    passed:
      "Cette date est passée. Cela ne met pas toujours fin au dossier, mais cela change ce qu'il faut plaider. Communiquez avec nous aujourd'hui.",
    varies: "Les délais varient dans ce cas.",
    variesBody:
      "Les lettres d'irrecevabilité, les refus de parrainage et les convocations suivent chacun leur propre calendrier, et certains sont très courts. Envoyez-nous le document aujourd'hui plutôt que de le calculer vous-même. Nous confirmerons la date sans frais.",
    days: "jours", hrs: "h", min: "min", sec: "s",
    by: "est la date limite dont vous disposez pour",
    notAdvice: "Cet outil donne des délais généraux et ne constitue pas un avis sur votre dossier.",
    options: [
      { value: "rad15", label: "Demande d'asile rejetée — motifs écrits" },
      { value: "rad30", label: "Avis d'appel déposé — dossier à venir" },
      { value: "det48", label: "Une personne a été détenue — premier contrôle" },
      { value: "det7", label: "Détention maintenue au premier contrôle" },
      { value: "det30", label: "Détention qui se poursuit — contrôles suivants" },
      { value: "other", label: "Autre chose (lettre C-12, refus de parrainage, convocation)" },
    ],
    rules: {
      rad15: { days: 15, label: "déposer votre avis d'appel auprès de la Section d'appel des réfugiés",
        cite: "Compté à partir du jour où vous avez reçu les motifs écrits. Source : Commission de l'immigration et du statut de réfugié." },
      rad30: { days: 30, label: "mettre l'appel en état en déposant le dossier de l'appelant",
        cite: "Les Règles de la SAR prévoient 30 jours. Un avis de pratique de 2020 a prolongé ce délai, de sorte que le chiffre applicable doit être confirmé auprès de l'avis en vigueur pour votre dossier." },
      det48: { hours: 48, label: "le premier contrôle des motifs de détention devant la Section de l'immigration",
        cite: "La Section de l'immigration contrôle les motifs de la détention dans les 48 heures suivant la détention, ou dans les meilleurs délais par la suite." },
      det7: { days: 7, label: "le deuxième contrôle des motifs de détention",
        cite: "Si le maintien en détention est ordonné au premier contrôle, l'audience suivante a lieu dans les sept jours." },
      det30: { days: 30, label: "le prochain contrôle des motifs de détention",
        cite: "Après le contrôle de sept jours, les audiences ont lieu au moins tous les 30 jours tant que la personne demeure détenue. Un contrôle anticipé peut être demandé sur la base de faits nouveaux." },
    },
  },

  stats: [
    { value: "259 085", count: 259085, label: "Demandes d'asile en instance à la Commission, août 2026", source: IRB_VOLUMES },
    { value: "24", count: 24, label: "Mois entre le renvoi et la décision, décembre 2025", source: IRB_WAITS },
    { value: "15", count: 15, label: "Jours pour déposer un avis d'appel après réception des motifs", source: IRB_FILING },
    { value: "31 %", count: 31, label: "Des appels tranchés sur le fond ont été accueillis en 2025", source: IRB_RAD_STATS },
  ],

  mattersIntro: {
    eyebrow: "Commencez par le document que vous avez en main",
    h2: "Que vous est-il arrivé ?",
    lede: "Les gens ne cherchent pas un consultant en immigration. Ils cherchent les mots imprimés sur la lettre. Trouvez les vôtres.",
  },

  services: [
    {
      slug: "refugee-appeal-rad",
      doc: "Avis de décision",
      title: "Votre demande d'asile a été rejetée",
      summary:
        "Si vous avez un droit d'appel, la Section d'appel des réfugiés est l'étape suivante. Le délai court à partir du jour où vous avez reçu les motifs écrits, et non du jour de votre audience.",
      tldr:
        "Si la Section de la protection des réfugiés a rejeté votre demande et que vous avez un droit d'appel, vous disposez généralement de 15 jours à compter de la réception des motifs écrits pour déposer un avis d'appel auprès de la Section d'appel des réfugiés, puis d'un délai supplémentaire pour déposer le dossier de l'appelant. L'appel est tranché en grande partie sur dossier. En 2025, 3 045 appels sur 9 910 tranchés sur le fond ont été accueillis.",
      deadline: "15 jours pour déposer l'avis d'appel",
      audience: "Personnes dont la demande a été rejetée par la SPR au cours des deux dernières semaines",
      sections: [
        { h: "Quand le délai de 15 jours commence-t-il réellement ?",
          p: ["Il commence le jour où les motifs écrits vous parviennent, et non à la date imprimée en haut de la décision ni le jour de votre audience. Ce seul malentendu est la raison la plus fréquente pour laquelle les gens perdent des jours qu'ils ne peuvent pas récupérer.",
              "Si vous n'êtes pas certain de la date applicable, envoyez-nous l'enveloppe, la lettre d'accompagnement et la décision. Confirmer la date ne coûte rien."] },
        { h: "Ai-je même un droit d'appel ?",
          p: ["Pas tous les demandeurs rejetés en ont un. Certaines catégories sont exclues de la Section d'appel des réfugiés par la loi, et la bonne étape suivante pour ces personnes est différente. Déterminer votre situation est la première chose que nous faisons, car un appel déposé devant la mauvaise instance gaspille le seul temps dont vous disposez."] },
        { h: "Qu'est-ce qui décide un appel ?",
          p: ["Le dossier de l'appelant. Un appel à la SAR est largement une affaire sur papier plutôt qu'une deuxième audience, de sorte que le dossier écrit est là où il se gagne ou se perd. La plupart des gens s'attendent à raconter leur histoire de nouveau à quelqu'un de nouveau. Ce n'est généralement pas ce qui se produit.",
              "Notre travail consiste à trouver l'erreur dans la décision et à construire le dossier autour de celle-ci."] },
        { h: "Quelles sont les véritables chances ?",
          p: ["En 2025, la Commission a réglé 10 955 appels. Sur les 9 910 tranchés sur le fond, 6 865 ont été rejetés et 3 045 accueillis, soit environ 31 %. Nous vous dirons honnêtement où se situe votre dossier. Aucun résultat n'est garanti et personne ne peut vous en promettre un."] },
      ],
      faqs: [
        { q: "De combien de temps est-ce que je dispose pour faire appel d'une demande d'asile rejetée au Canada ?",
          a: "Dans la plupart des cas, vous avez 15 jours à compter de la réception des motifs écrits pour déposer un avis d'appel auprès de la Section d'appel des réfugiés, puis un délai supplémentaire pour mettre l'appel en état." },
        { q: "Un appel à la SAR est-il une nouvelle audience ?",
          a: "Généralement non. La Section d'appel des réfugiés tranche la plupart des appels sur le dossier écrit plutôt qu'en tenant une nouvelle audience, ce qui explique pourquoi le dossier de l'appelant importe plus que tout." },
        { q: "Que se passe-t-il si je manque le délai de 15 jours ?",
          a: "Un délai manqué ne met pas toujours fin au dossier, mais il change ce qu'il faut plaider et ajoute une étape. Communiquez avec un représentant autorisé le jour même où vous constatez que la date est passée." },
      ],
      sources: [IRB_FILING, IRB_RAD_STATS, IRB_PRACTICE],
    },
    {
      slug: "appellants-record",
      doc: "Dossier de l'appelant",
      title: "Votre appel est déposé mais non mis en état",
      summary:
        "Un appel est largement une affaire sur papier. Le dossier est là où il se gagne ou se perd, et un dossier tardif ou mince est l'échec évitable le plus courant.",
      tldr:
        "Déposer un avis d'appel ne fait qu'amorcer l'appel. Pour le mettre en état, vous devez déposer un dossier de l'appelant contenant la décision, les éléments de preuve invoqués et des observations écrites. Les Règles de la SAR prévoient 30 jours, et un avis de pratique de 2020 a prolongé ce délai. Un appel non mis en état peut être déclaré abandonné.",
      deadline: "30 jours selon les Règles, confirmez l'avis de pratique",
      audience: "Personnes ayant déposé un avis d'appel et devant maintenant construire le dossier",
      sections: [
        { h: "Qu'est-ce que mettre un appel en état ?",
          p: ["Déposer l'avis d'appel amorce l'appel. Le mettre en état signifie déposer le dossier de l'appelant : la décision, les éléments de preuve que vous invoquez et des observations écrites exposant les erreurs que vous reprochez à la Commission. Sans ce dossier, la Section n'a rien sur quoi se prononcer, et l'appel peut être déclaré abandonné."] },
        { h: "De combien de temps est-ce que je dispose ?",
          p: ["Les Règles de la SAR prévoient 30 jours. Un avis de pratique publié en 2020 a prolongé ce délai et devait demeurer en vigueur jusqu'à nouvel ordre. Comme ce chiffre dépend d'un avis susceptible de changer, nous confirmons le délai applicable auprès de l'avis en vigueur pour chaque dossier plutôt que de citer un chiffre de mémoire."] },
        { h: "Puis-je déposer de nouveaux éléments de preuve ?",
          p: ["Seulement dans des circonstances limitées. Les nouveaux éléments de preuve à la SAR sont régis par des conditions légales, et soumettre des documents qui n'y satisfont pas gaspille de l'espace dans le dossier et de la crédibilité auprès du tribunal."] },
      ],
      faqs: [
        { q: "Qu'est-ce qu'un dossier de l'appelant à la Section d'appel des réfugiés ?",
          a: "C'est l'ensemble de documents qui rend votre appel plaidable : la décision portée en appel, les éléments de preuve invoqués et des observations écrites identifiant les erreurs. Son dépôt met l'appel en état." },
        { q: "Puis-je présenter de nouveaux éléments de preuve en appel ?",
          a: "Seulement dans des circonstances limitées prévues par la loi. Savoir si un document est admissible est une question juridique à évaluer avant de l'inclure au dossier." },
      ],
      sources: [IRB_PRACTICE, IRB_FILING],
    },
    {
      slug: "bill-c12-ineligibility",
      doc: "Lettre d'irrecevabilité",
      title: "On vous a dit que vous pourriez être irrecevable",
      summary:
        "Le projet de loi C-12 est entré en vigueur le 26 mars 2026 et remonte au 24 juin 2020. Une courte visite il y a des années peut toucher une demande faite aujourd'hui. Environ 30 000 personnes ont reçu une lettre.",
      tldr:
        "La Loi visant à renforcer le système d'immigration et les frontières du Canada a reçu la sanction royale le 26 mars 2026. Elle interdit le renvoi à la Section de la protection des réfugiés lorsqu'une demande est faite plus d'un an après la première entrée, de manière rétroactive au 24 juin 2020, et lorsqu'une personne entrée irrégulièrement demande l'asile 14 jours ou plus après son entrée. Environ 30 000 personnes ont été avisées.",
      deadline: "Vérifiez votre lettre et envoyez-la le jour même",
      audience: "Personnes ayant reçu une lettre d'équité procédurale sur la recevabilité",
      sections: [
        { h: "Qu'est-ce qui a changé avec le projet de loi C-12 ?",
          p: ["Deux nouvelles interdictions. Une demande faite plus d'un an après votre première entrée au Canada n'est pas déférée à la Section de la protection des réfugiés, et cette règle remonte au 24 juin 2020. Par ailleurs, une personne qui traverse irrégulièrement depuis les États-Unis et ne demande pas l'asile dans les 14 jours est également visée.",
              "C'est la portée rétroactive qui surprend le plus de gens. Une courte visite en 2022 ou 2023 peut toucher une demande faite aujourd'hui, même si vous avez quitté le Canada entre-temps."] },
        { h: "Que signifie une lettre d'irrecevabilité ?",
          p: ["Elle signifie que le ministère dispose de renseignements laissant croire que vous êtes visé par l'une des interdictions et vous donne l'occasion de répondre avant de décider. Ce n'est pas une décision définitive. Ce que vous répondez, et si vous répondez à temps, compte énormément.",
              "Les délais de réponse à ces lettres sont courts. N'attendez pas de voir ce qui arrive."] },
        { h: "Que reste-t-il si la demande est irrecevable ?",
          p: ["Les personnes privées d'audience peuvent tout de même demander un examen des risques avant renvoi. Il s'agit d'un processus écrit tranché par un agent plutôt que d'une audience devant la Commission, et il comporte moins de protections, notamment en matière de permis de travail et de couverture médicale."] },
      ],
      faqs: [
        { q: "Qu'est-ce que l'interdiction d'un an du projet de loi C-12 ?",
          a: "Une demande d'asile faite plus d'un an après votre première entrée au Canada n'est pas déférée à la Section de la protection des réfugiés. La règle s'applique rétroactivement aux entrées depuis le 24 juin 2020." },
        { q: "J'ai reçu une lettre disant que je pourrais être irrecevable. Que dois-je faire ?",
          a: "Traitez-la comme urgente. Ce n'est pas une décision définitive, le délai de réponse est court, et ce que vous déposez en réponse détermine la suite. Envoyez la lettre à un représentant autorisé le jour même." },
      ],
      sources: [C12, IRCC_REGS],
    },
    {
      slug: "pre-removal-risk-assessment",
      doc: "Avis d'ERAR",
      title: "On vous a offert un examen des risques avant renvoi",
      summary:
        "Un ERAR est tranché sur papier par un agent, et non à une audience. Ce que vous écrivez constitue l'ensemble du dossier, et les délais sont courts.",
      tldr:
        "Un examen des risques avant renvoi est une demande écrite visant à évaluer si vous seriez exposé à un risque advenant votre renvoi du Canada. Il est tranché par un agent sur les documents plutôt qu'à une audience devant la Commission, de sorte que la qualité et l'exhaustivité des observations écrites et de la preuve documentaire sur le pays portent toute la demande.",
      deadline: "Court. Le délai figure dans votre avis",
      audience: "Personnes avisées par l'ASFC qu'elles peuvent demander un ERAR",
      sections: [
        { h: "En quoi un ERAR diffère-t-il d'une audience ?",
          p: ["Il n'y a normalement pas d'audience. Un agent lit ce que vous déposez et décide. Vous n'avez pas l'occasion d'expliquer, de clarifier ou de répondre à des questions, ce qui signifie que chaque point doit être présenté par écrit du premier coup et appuyé par de la preuve."] },
        { h: "Qu'est-ce qui fait une demande solide ?",
          p: ["Une preuve documentaire récente et précise sur le pays, directement reliée à votre situation personnelle. Les rapports généraux sur les conditions du pays convainquent rarement un agent. Le lien entre ce qui se passe dans ce pays et ce qui vous arriverait constitue la demande."] },
        { h: "Pourquoi cela compte-t-il davantage maintenant ?",
          p: ["Parce que le projet de loi C-12 a retiré un grand nombre de personnes du processus d'audience pour les diriger vers celui-ci. Pour elles, l'évaluation écrite n'est pas un filet de sécurité. C'est l'ensemble du dossier."] },
      ],
      faqs: [
        { q: "Y a-t-il une audience pour un examen des risques avant renvoi ?",
          a: "Normalement non. Un ERAR est tranché par un agent sur la demande écrite, ce qui explique pourquoi les observations et la preuve sur le pays doivent être complètes au moment du dépôt." },
      ],
      sources: [C12, CBSA_REMOVALS],
    },
    {
      slug: "detention-review",
      doc: "Détention",
      title: "Une personne a été arrêtée à l'aéroport",
      summary:
        "La personne détenue n'a généralement pas de téléphone. Si vous êtes le proche qui fait cette recherche, c'est vous qui pouvez agir. Le premier contrôle arrive vite.",
      tldr:
        "Si une personne est détenue pour des motifs d'immigration au Canada, la Section de l'immigration contrôle la détention dans les 48 heures ou dans les meilleurs délais par la suite. Si la détention est maintenue, le contrôle suivant a lieu dans les sept jours, puis au moins tous les 30 jours. En 2025, l'ASFC a détenu 3 598 personnes, avec une durée médiane de cinq jours.",
      deadline: "48 heures jusqu'au premier contrôle",
      audience: "Proches d'une personne actuellement détenue",
      sections: [
        { h: "Que se passe-t-il dans les 48 premières heures ?",
          p: ["La Section de l'immigration contrôle les motifs de la détention dans les 48 heures suivant la détention, ou dans les meilleurs délais par la suite. Ce premier contrôle compte énormément et il arrive avant que la plupart des familles aient compris ce qui se passe.",
              "Si vous lisez ceci parce qu'un proche a été détenu, c'est vous qui pouvez agir. Lui, généralement, ne le peut pas."] },
        { h: "Que se passe-t-il ensuite ?",
          p: ["Si le maintien en détention est ordonné, un autre contrôle a lieu dans les sept jours. Ensuite, les contrôles ont lieu au moins tous les 30 jours tant que la personne demeure détenue. Un contrôle anticipé peut aussi être demandé s'il y a des faits nouveaux à présenter."] },
        { h: "Qu'est-ce qui fait réellement libérer quelqu'un ?",
          p: ["Un plan de mise en liberté crédible et documenté. Qui est la caution, ce qu'elle offre, où la personne habitera, quelles conditions elle acceptera. Se présenter sans ce plan en espérant plaider, c'est ainsi que les contrôles se perdent.",
              "En 2025, 1 380 personnes ont été libérées grâce à une solution de rechange à la détention, soit environ 38 % de toutes les personnes détenues."] },
      ],
      faqs: [
        { q: "À quelle vitesse un contrôle de détention a-t-il lieu au Canada ?",
          a: "La Section de l'immigration contrôle les motifs de la détention dans les 48 heures ou dans les meilleurs délais par la suite, puis dans les sept jours si la détention se poursuit, puis au moins tous les 30 jours." },
        { q: "Puis-je agir pour un membre de ma famille qui a été détenu ?",
          a: "Oui. Une personne détenue n'a souvent pas accès à un téléphone, de sorte qu'un proche est généralement celui qui mandate un représentant et rassemble le plan de mise en liberté." },
      ],
      sources: [IRB_DETENTION, CBSA_DETENTION],
    },
    {
      slug: "sponsorship-appeal-iad",
      doc: "Refus de parrainage",
      title: "Votre conjoint ou un membre de votre famille a été refusé",
      summary:
        "Le répondant est l'appelant à la Section d'appel de l'immigration. Les appels en parrainage sont passés de 2 495 dépôts en 2024 à 3 360 en 2025.",
      tldr:
        "Lorsqu'une demande de parrainage familial est refusée, c'est le répondant au Canada qui est l'appelant à la Section d'appel de l'immigration, et non le demandeur à l'étranger. Les appels en parrainage sont passés de 2 495 dépôts en 2024 à 3 360 en 2025. Sur l'ensemble des appels en immigration réglés en 2025, 1 426 sur 3 935 ont été accueillis.",
      deadline: "Des délais s'appliquent à compter de la date de la décision",
      audience: "Répondants au Canada dont la demande a été refusée",
      sections: [
        { h: "Qui fait réellement appel ?",
          p: ["Vous, en tant que répondant. Cela surprend les gens. Le demandeur est à l'étranger, la lettre de refus lui a été envoyée, mais le droit d'appel appartient au répondant au Canada."] },
        { h: "Sur quoi portent habituellement ces appels ?",
          p: ["Le plus souvent sur l'authenticité de la relation, ou sur une conclusion d'interdiction de territoire. Les refus reposent fréquemment sur des incohérences dans la preuve, des lacunes dans le dossier de communication, ou une entrevue qui s'est mal passée.",
              "Les appels en parrainage ont augmenté d'environ 35 % en une seule année."] },
        { h: "Qu'est-ce que la Section accueille ?",
          p: ["Sur l'ensemble des appels en immigration réglés en 2025, 1 426 sur 3 935 ont été accueillis. Le délai d'attente était d'environ six mois en décembre 2025."] },
      ],
      faqs: [
        { q: "Qui fait appel d'un parrainage familial refusé ?",
          a: "Le répondant au Canada est l'appelant à la Section d'appel de l'immigration. Le demandeur à l'étranger reçoit le refus, mais le droit d'appel appartient au répondant." },
        { q: "Combien de temps prend un appel en parrainage au Canada ?",
          a: "Le délai d'attente à la Section d'appel de l'immigration était d'environ six mois en décembre 2025, bien que les dossiers varient." },
      ],
      sources: [IRB_IAD_STATS, IRB_WAITS],
    },
    {
      slug: "removal-order",
      doc: "Convocation",
      title: "On vous a demandé de vous présenter pour le renvoi",
      summary:
        "Les renvois ont atteint 23 160 en 2025 et 14 897 durant les huit premiers mois de 2026. Les options se referment vite une fois la date fixée.",
      tldr:
        "Une convocation signifie que l'ASFC considère votre mesure de renvoi comme exécutoire et organise votre départ. Les renvois ont atteint 23 160 en 2025 et 14 897 durant les huit premiers mois de 2026, l'Inde et le Mexique étant les destinations les plus fréquentes. Les options se referment nettement une fois une date fixée.",
      deadline: "Agissez immédiatement, n'attendez pas la date",
      audience: "Personnes visées par une mesure de renvoi exécutoire",
      sections: [
        { h: "Que signifie une convocation ?",
          p: ["Que l'Agence considère votre mesure de renvoi comme exécutoire et organise votre départ. C'est une étape opérationnelle, et non une décision que l'on peut contester au comptoir."] },
        { h: "Que peut-on encore faire ?",
          p: ["Cela dépend entièrement de ce qui s'est déjà produit dans votre dossier et du temps qu'il reste. Certaines avenues n'existent qu'avant qu'une date soit fixée. C'est la seule catégorie où l'écart entre agir aujourd'hui et agir la semaine prochaine change le plus la réponse.",
              "Nous vous dirons clairement s'il reste quelque chose d'ouvert. Si rien ne l'est, nous le dirons plutôt que de percevoir des honoraires."] },
        { h: "Est-ce fréquent aujourd'hui ?",
          p: ["Les renvois ont fortement augmenté. Durant les huit premiers mois de 2026, l'ASFC a renvoyé 14 897 personnes, l'Inde avec 4 227 et le Mexique avec 2 282 formant les deux plus grands groupes."] },
      ],
      faqs: [
        { q: "Que dois-je faire si je reçois une convocation pour un renvoi ?",
          a: "Communiquez avec un représentant autorisé le jour même. Certaines options se referment une fois une date de renvoi fixée." },
      ],
      sources: [CBSA_REMOVALS],
    },
    {
      slug: "refugee-hearing",
      doc: "Avis de convocation",
      title: "Vous avez une audience à venir",
      summary:
        "259 085 demandes étaient en instance en août 2026 et une demande prenait environ 24 mois. L'attente est longue, puis l'audience est déterminante.",
      tldr:
        "Une demande d'asile prenait environ 24 mois entre le renvoi et la décision en décembre 2025, et 259 085 demandes étaient encore en instance en août 2026. L'audience devant la Section de la protection des réfugiés est généralement la seule occasion de témoigner de vive voix. La préparation porte sur la cohérence entre votre formulaire de fondement de la demande, vos documents et votre témoignage.",
      deadline: null,
      audience: "Demandeurs en attente ou en préparation d'audience",
      sections: [
        { h: "Quelle est la durée de l'attente ?",
          p: ["Environ 24 mois entre le renvoi et la décision en décembre 2025. Les demandes moins complexes étaient réglées en environ 16 mois. La Commission a indiqué que les délais continueront de croître, les arrivées dépassant sa capacité financée.",
              "L'inventaire s'élevait à 259 085 demandes en août 2026."] },
        { h: "Qu'est-ce qui décide une audience ?",
          p: ["La cohérence, plus que toute autre chose. Entre votre formulaire de fondement de la demande, les documents déposés et ce que vous dites le jour même. La plupart des refus reposent sur des incohérences plutôt que sur l'invraisemblance du récit.",
              "La préparation n'est pas du coaching. C'est s'assurer que le récit que vous livrez est celui que votre dossier appuie."] },
        { h: "Que devrais-je faire en attendant ?",
          p: ["Rassembler et faire traduire des documents, tenir vos coordonnées à jour auprès de la Commission, et faire déposer correctement tout changement de situation. Deux ans semblent du temps disponible. C'est du temps que la plupart des gens passent à ne rien faire, puis l'avis arrive."] },
      ],
      faqs: [
        { q: "Combien de temps prend une demande d'asile au Canada ?",
          a: "Environ 24 mois entre le renvoi et la décision en décembre 2025, les demandes moins complexes étant réglées en environ 16 mois." },
      ],
      sources: [IRB_WAITS, IRB_VOLUMES, IRB_RPD_STATS],
    },
  ],


  practiceIntro: {
    eyebrow: "Tout ce que ce permis couvre",
    h2: "Domaines de pratique",
    lede: "Un permis CRIC-CISR couvre l'ensemble du travail en immigration canadienne, en plus de la représentation devant la Commission de l'immigration et du statut de réfugié. Le travail devant la Commission est la spécialité. Le reste est aussi pris en charge.",
    flagshipTag: "Spécialité",
  },

  practiceGroups: [
    {
      key: "irb", flagship: true,
      title: "Devant la Commission de l'immigration et du statut de réfugié",
      blurb: "C'est la mention CRIC-CISR qui permet à un consultant de comparaître ici. La plupart des consultants ne le peuvent pas.",
      items: [
        { name: "Demandes d'asile", note: "Audiences devant la Section de la protection des réfugiés", slug: "refugee-hearing" },
        { name: "Appels des réfugiés", note: "Section d'appel des réfugiés, délai de 15 jours", slug: "refugee-appeal-rad" },
        { name: "Mise en état d'un appel", note: "Dossier de l'appelant et observations", slug: "appellants-record" },
        { name: "Contrôles de détention", note: "48 heures, 7 jours, puis tous les 30 jours", slug: "detention-review" },
        { name: "Enquêtes", note: "Section de l'immigration" },
        { name: "Appels en parrainage", note: "Section d'appel de l'immigration", slug: "sponsorship-appeal-iad" },
        { name: "Appels d'une mesure de renvoi", note: "Section d'appel de l'immigration" },
        { name: "Appels sur l'obligation de résidence", note: "Statut de RP perdu pour absence du Canada" },
      ],
    },
    {
      key: "enforcement",
      title: "Exécution de la loi, risque et renvoi",
      blurb: "Lorsque l'ASFC est déjà impliquée et que les délais sont les plus courts.",
      items: [
        { name: "Lettres d'irrecevabilité (C-12)", note: "Interdiction d'un an et de 14 jours", slug: "bill-c12-ineligibility" },
        { name: "Examen des risques avant renvoi", note: "Demande écrite, sans audience", slug: "pre-removal-risk-assessment" },
        { name: "Convocations pour renvoi", note: "Mesures de renvoi exécutoires", slug: "removal-order" },
        { name: "Demandes de report" },
        { name: "Conditions de présentation à l'ASFC" },
        { name: "Autorisation de revenir au Canada", note: "Après l'exécution d'une mesure de renvoi" },
      ],
    },
    {
      key: "family",
      title: "Parrainage familial",
      blurb: "Le répondant au Canada est le client, et en appel le répondant est l'appelant.",
      items: [
        { name: "Parrainage d'un conjoint ou partenaire", note: "Au Canada et à l'étranger" },
        { name: "Parents et grands-parents" },
        { name: "Enfants à charge" },
        { name: "Super visa" },
        { name: "Refus de parrainage", note: "Réponse et appel", slug: "sponsorship-appeal-iad" },
        { name: "Dossiers de preuve de la relation" },
      ],
    },
    {
      key: "pr",
      title: "Résidence permanente",
      blurb: "Voies économiques et discrétionnaires vers le statut.",
      items: [
        { name: "Entrée express", note: "Travailleurs qualifiés, CEC, métiers" },
        { name: "Programmes des candidats des provinces" },
        { name: "Demandes pour motifs d'ordre humanitaire" },
        { name: "Projets pilotes de l'Atlantique et en région rurale" },
        { name: "Travailleurs autonomes et gens d'affaires" },
        { name: "Renouvellement de carte de RP et titres de voyage" },
      ],
    },
    {
      key: "temporary",
      title: "Travail, études et séjour",
      blurb: "Obtenir le statut, le conserver, et le rétablir lorsqu'il expire.",
      items: [
        { name: "Permis de travail", note: "Avec ou sans EIMT" },
        { name: "Études d'impact sur le marché du travail", note: "Côté employeur" },
        { name: "Permis de travail postdiplôme" },
        { name: "Permis d'études et prolongations" },
        { name: "Visas de visiteur et AVE" },
        { name: "Rétablissement du statut", note: "Après l'expiration du statut" },
      ],
    },
    {
      key: "inadmissibility",
      title: "Interdiction de territoire et redressement",
      blurb: "Lorsqu'un élément du dossier bloque tout le reste.",
      items: [
        { name: "Permis de séjour temporaire" },
        { name: "Réhabilitation criminelle" },
        { name: "Réponses en interdiction de territoire médicale" },
        { name: "Allégations de fausses déclarations" },
        { name: "Réponses aux lettres d'équité procédurale" },
        { name: "Demandes de réexamen" },
      ],
    },
    {
      key: "citizenship",
      title: "Citoyenneté",
      blurb: "La dernière étape, et les problèmes qui y apparaissent.",
      items: [
        { name: "Demandes de citoyenneté" },
        { name: "Problèmes de calcul de résidence" },
        { name: "Interdictions et retards" },
        { name: "Preuve de citoyenneté" },
      ],
    },
  ],

  problemsIntro: {
    eyebrow: "Les problèmes, et ce que nous faisons concrètement",
    h2: "Des réponses honnêtes aux six choses qui tournent mal",
    lede: "Chacune est une variante du même problème. Le système est lent pendant deux ans, puis brutal pendant deux semaines.",
  },

  problems: [
    { n: "01", title: "Vous ne saviez pas que le délai avait commencé",
      problem: "Le délai d'appel de 15 jours court à partir du jour où les motifs écrits vous parviennent, et non de la date de l'audience ni de la date imprimée en haut. Les gens perdent régulièrement une semaine en supposant le contraire.",
      solution: "Envoyez une photo de la lettre et nous vous donnons votre date. Sans frais, sans engagement, sans appel de vente. Si la date est passée, nous vous le dirons aussi, parce que vous devez le savoir." },
    { n: "02", title: "Vous ne pouvez pas savoir qui est légitime",
      problem: "Les agents non autorisés sont répandus dans ce marché, et la plupart des gens qui arrivent ici se sont déjà fait avoir une fois ou connaissent quelqu'un à qui c'est arrivé.",
      solution: "Nous vous disons de nous vérifier plutôt que de nous faire confiance. Depuis le 15 juillet 2026, le registre public indique si un titulaire est en règle ainsi que tout antécédent disciplinaire, et un fonds d'indemnisation existe désormais pour les clients fraudés par un titulaire. Avec un consultant autorisé, cette protection existe. Avec un agent fantôme, rien n'existe." },
    { n: "03", title: "L'aide juridique ne paiera pas un consultant",
      problem: "Les certificats d'Aide juridique Ontario ne peuvent être facturés que par les avocats inscrits. Les appels exigent d'abord une évaluation du bien-fondé. Beaucoup de gens sont refusés, dépassent le seuil, ou ne peuvent pas attendre une ouverture de dossier dans une fenêtre de 15 jours.",
      solution: "Nous tarifons des tâches distinctes plutôt que seulement des dossiers complets. Une vérification de délai, un examen de décision, un dossier préparé, des observations rédigées. Vous pouvez acheter une petite partie, voir si nous sommes réels, et décider ensuite." },
    { n: "04", title: "La personne qui cherche n'est pas celle qui est en difficulté",
      problem: "Une personne détenue n'a pas de téléphone. Un demandeur peut ne pas lire l'anglais. Un répondant est l'appelant légal mais le refus se trouve au dossier de quelqu'un d'autre.",
      solution: "Vous pouvez ouvrir un dossier au nom d'un proche. Notre processus d'accueil est conçu pour le tiers, car dans les dossiers de détention et de parrainage, c'est presque toujours cette personne qui appelle." },
    { n: "05", title: "Vous ne pouvez pas lire votre propre décision",
      problem: "Un refus, une lettre d'équité ou une convocation est rédigé dans un anglais juridique dense, lu sous le stress, sur un téléphone, souvent dans une deuxième langue.",
      solution: "Un examen écrit de la décision en langage clair. Ce qu'est le document, quel est le délai, et quelles sont les options réalistes. Offert en français et en anglais." },
    { n: "06", title: "Vous pensez qu'un appel consiste à raconter l'histoire de nouveau",
      problem: "La plupart des gens s'attendent à une deuxième audience. Un appel à la Section d'appel des réfugiés est largement tranché sur papier, et c'est le dossier qui décide.",
      solution: "Nous travaillons là où le dossier se gagne réellement : trouver l'erreur dans la décision et construire le dossier correctement. En 2025, 3 045 appels sur 9 910 tranchés sur le fond ont été accueillis." },
  ],

  tiersIntro: {
    eyebrow: "Vous n'avez pas à vous engager pour un dossier complet",
    h2: "Achetez une petite partie et voyez si nous sommes réels",
    lede: "Si vous vous êtes déjà fait frauder, se faire demander un mandat complet par un inconnu sur Internet est le moment où vous partez. Nous ne commençons donc pas par là.",
  },

  tiers: [
    { tier: "Gratuit", offer: "Vérification de délai", detail: "Envoyez la lettre, recevez la date. Rien d'autre n'y est rattaché.", who: "Toute personne tenant un document daté" },
    { tier: "Forfait", offer: "Évaluation des options", detail: "Un entretien et un résumé écrit de ce qui vous est réellement offert.", who: "Personnes se demandant s'il faut agir" },
    { tier: "Forfait", offer: "Examen de la décision", detail: "Nous lisons la décision correctement et vous indiquons où sont les erreurs, s'il y en a.", who: "Personnes se demandant s'il faut faire appel" },
    { tier: "À la tâche", offer: "Travail ponctuel", detail: "Avis d'appel déposé, dossier préparé, observations rédigées. Une tâche à la fois.", who: "Personnes ne pouvant financer un dossier complet" },
    { tier: "Mandat", offer: "Représentation complète", detail: "SAR, SAI, ERAR, contrôles de détention et enquêtes, du début à la fin.", who: "Dossiers financés, souvent par la famille" },
  ],

  verify: {
    eyebrow: "Ne nous faites pas confiance. Vérifiez-nous.",
    h2: "Trois minutes qui vous protègent de tout le monde, y compris de nous",
    p: "N'importe qui peut ajouter des lettres après un nom sur un site Web. Le Collège des consultants en immigration et en citoyenneté tient un registre public et, depuis le 15 juillet 2026, il indique si le titulaire est en règle ainsi que tout antécédent disciplinaire. Vérifiez-nous avant d'envoyer un document ou de payer quoi que ce soit.",
    cta: "Ouvrir le registre public",
    steps: [
      "Ouvrez le registre public du Collège. C'est la seule liste faisant autorité des consultants autorisés au Canada.",
      "Cherchez Angad Sachdeva. Confirmez que la catégorie de permis indique CRIC-CISR, soit la catégorie autorisée à représenter des clients devant la Commission de l'immigration et du statut de réfugié.",
      "Vérifiez que le statut est en règle et lisez tout antécédent disciplinaire affiché.",
      "Faites de même pour toute autre personne que vous envisagez. Si une personne ne figure pas à ce registre, elle ne peut pas légalement vous représenter contre rémunération.",
    ],
  },

  about: {
    eyebrow: "Avec qui vous traiterez",
    h2: "Un consultant autorisé, et une limite claire à ce que ce permis permet",
    p1: "Angad Sachdeva détient un permis CRIC-CISR, la catégorie autorisée à représenter des clients devant la Commission de l'immigration et du statut de réfugié : demandes d'asile, appels des réfugiés, contrôles de détention, enquêtes et appels en immigration.",
    p2: "Il y a une chose que ce permis ne permet pas, et vous devriez l'entendre de nous plutôt que de l'apprendre plus tard.",
    limit: "Aucun consultant ni parajuriste ne peut vous représenter dans un contrôle judiciaire à la Cour fédérale. Seul un avocat le peut. Si votre dossier l'exige, nous vous le dirons et vous orienterons.",
  },

  contact: {
    eyebrow: "Le premier examen est sans frais",
    h2: "Envoyez-nous la lettre",
    lede: "Dites-nous ce que vous avez reçu et quand. Nous vous indiquerons votre délai et vos options réalistes. Si nous ne sommes pas les bonnes personnes, nous le dirons.",
    name: "Votre nom", email: "Courriel", phone: "Téléphone ou WhatsApp",
    phoneHelp: "Incluez l'indicatif du pays.",
    language: "Langue préférée",
    who: "De qui s'agit-il ?",
    whoOpts: ["De moi", "D'un proche ou d'un ami", "D'une personne actuellement détenue", "D'un client que je réfère"],
    matter: "Qu'avez-vous reçu ?",
    matterOpts: [
      "Demande d'asile rejetée, motifs écrits reçus",
      "Appel déposé, dossier à préparer",
      "Lettre indiquant une possible irrecevabilité (C-12)",
      "Avis d'examen des risques avant renvoi",
      "Une personne a été détenue",
      "Demande de parrainage refusée",
      "Convocation pour un renvoi",
      "Audience à venir",
      "Autre chose",
    ],
    choose: "Veuillez choisir",
    docDate: "Date du document",
    docDateHelp: "Ou la date de réception, si elle diffère.",
    province: "Province",
    provinceOpts: ["Ontario","Québec","Colombie-Britannique","Alberta","Manitoba","Saskatchewan","Nouvelle-Écosse","Nouveau-Brunswick","Terre-Neuve-et-Labrador","Île-du-Prince-Édouard","À l'extérieur du Canada"],
    rep: "Avez-vous déjà un représentant ?",
    repOpts: ["Non", "Oui, un avocat", "Oui, un consultant", "J'en avais un, mais plus maintenant"],
    upload: "Téléversez la lettre",
    uploadHelp: "Une photo nette de chaque page suffit. PDF, JPG ou PNG, jusqu'à 8 Mo au total.",
    message: "Autre chose à nous signaler",
    messagePlaceholder: "Dates, ce que vous avez déjà déposé, ce qui vous inquiète.",
    consent: "Je comprends que l'envoi de ce formulaire ne crée pas de relation de représentation, et qu'aucun conseil n'est donné avant la signature d'un mandat.",
    submit: "Envoyer et obtenir mon délai",
    sending: "Envoi en cours",
    note: "Nous répondons d'abord aux questions de délai, parce qu'elles ne peuvent pas attendre.",
    success: "Bien reçu. Nous répondons d'abord aux questions de délai, généralement le jour même. Vérifiez vos courriels indésirables si vous n'avez pas de nouvelles.",
    error: "L'envoi a échoué. Écrivez-nous directement, ou réessayez dans un instant.",
  },

  faqIntro: {
    eyebrow: "Les questions que les gens posent vraiment",
    h2: "Délais, recevabilité et ce qu'un consultant autorisé peut faire",
    lede: "Des réponses courtes et directes. Chacune renvoie à la source publiée dont elle provient.",
  },

  faqs: [
    { q: "De combien de temps est-ce que je dispose pour faire appel d'une demande d'asile rejetée au Canada ?",
      a: "Dans la plupart des cas, 15 jours à compter de la réception des motifs écrits pour déposer un avis d'appel auprès de la Section d'appel des réfugiés, puis un délai supplémentaire pour déposer le dossier de l'appelant." },
    { q: "Un consultant en immigration peut-il me représenter devant la CISR ?",
      a: "Oui, s'il détient un permis CRIC-CISR. C'est la catégorie autorisée à représenter des clients devant la Commission. Vous pouvez confirmer la catégorie de permis de quiconque au registre public du Collège." },
    { q: "Un consultant peut-il me représenter à la Cour fédérale ?",
      a: "Non. Ni un consultant ni un parajuriste ne peut vous représenter dans un contrôle judiciaire à la Cour fédérale. Seul un avocat le peut." },
    { q: "À quelle vitesse un contrôle de détention a-t-il lieu ?",
      a: "Dans les 48 heures suivant la détention ou dans les meilleurs délais, puis dans les sept jours si la détention se poursuit, puis au moins tous les 30 jours." },
    { q: "Qu'est-ce que l'interdiction d'un an du projet de loi C-12 ?",
      a: "Une demande d'asile faite plus d'un an après votre première entrée au Canada n'est pas déférée à la Section de la protection des réfugiés. Elle s'applique rétroactivement aux entrées depuis le 24 juin 2020." },
    { q: "L'aide juridique paiera-t-elle un consultant en immigration ?",
      a: "Non. Les certificats d'Aide juridique Ontario ne peuvent être facturés que par les avocats inscrits. C'est pourquoi nous tarifons des tâches distinctes." },
    { q: "Combien de temps prend une demande d'asile au Canada ?",
      a: "Environ 24 mois entre le renvoi et la décision en décembre 2025. La Commission a indiqué que les délais continueront de croître." },
    { q: "Qui fait appel d'un parrainage familial refusé ?",
      a: "Le répondant au Canada, et non le demandeur à l'étranger. Les appels en parrainage sont passés de 2 495 dépôts en 2024 à 3 360 en 2025." },
    { q: "Comment vérifier si un consultant en immigration est autorisé ?",
      a: "Cherchez son nom au registre public du Collège des consultants en immigration et en citoyenneté. Depuis le 15 juillet 2026, il indique aussi s'il est en règle et tout antécédent disciplinaire." },
    { q: "La vérification de délai gratuite est-elle vraiment gratuite ?",
      a: "Oui. Envoyez le document, nous confirmons la date. Cela ne crée aucune relation de représentation et ne vous engage à rien." },
  ],

  footer: {
    blurb: "Appels des réfugiés, contrôles de détention, examens des risques avant renvoi et appels en immigration devant la Commission de l'immigration et du statut de réfugié du Canada.",
    matters: "Dossiers", practice: "Le cabinet",
    regulated: "Réglementé par le Collège des consultants en immigration et en citoyenneté. Registre public :",
    registerLabel: "college-ic.ca",
    licence: "Numéro de permis", registeredName: "Nom inscrit", address: "Adresse",
    tbc: "À FOURNIR",
  },

  disclaimer:
    "Chaque dossier est différent. L'admissibilité et les recours possibles dépendent de votre situation. Aucun résultat n'est garanti. Les renseignements de ce site sont généraux et ne constituent pas un avis juridique sur votre dossier. Aucun consultant ne peut vous représenter dans un contrôle judiciaire à la Cour fédérale.",
  sourcesLabel: "Sources",
  lastUpdated: "Dernière révision",
};
