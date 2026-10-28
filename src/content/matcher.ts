import type { Service } from "./types";

export type MatchCase = {
  /** Short label on the picker button. */
  t: string;
  /** The clock badge: a figure where one is published, a word where it is not. */
  c: string;
  urgent: boolean;
  /** What the document actually is. */
  is: string;
  /** What clock, if any, is running, and from when. */
  clock: string;
  /** What this practice would do about it. */
  do: string;
  /** The matter page to send them to, where one exists. */
  slug?: Service["slug"];
};

export const MATCHER: Record<"en" | "fr", MatchCase[]> = {
  en: [
    { t: "My refugee claim was refused", c: "15 days", urgent: true, slug: "refugee-appeal-rad",
      is: "The Refugee Protection Division has rejected your claim and issued written reasons. If you have a right of appeal, the Refugee Appeal Division is the next step.",
      clock: "15 days from the day the written reasons reached you to file a Notice of Appeal. Not from your hearing, and not from the date printed on the decision.",
      do: "We confirm the date free, read the decision for errors, and tell you honestly whether an appeal is arguable. If it is, we build the appellant's record, which is where appeals are actually won. In 2025, 3,045 of 9,910 appeals decided on the merits were allowed." },
    { t: "I filed an appeal but have not perfected it", c: "30 days", urgent: true, slug: "appellants-record",
      is: "Filing the Notice of Appeal only starts the appeal. Perfecting it means filing the appellant's record: the decision, your evidence, and written submissions on the errors.",
      clock: "The RAD Rules set 30 days. A 2020 practice notice extended that period, so the operative figure has to be confirmed against the current notice for your file.",
      do: "We prepare the record properly and decide what new evidence, if any, actually qualifies. An unperfected appeal can be declared abandoned, so this is the step people lose on." },
    { t: "I got a letter saying I may be ineligible", c: "Urgent", urgent: true, slug: "bill-c12-ineligibility",
      is: "A Bill C-12 procedural fairness letter. The department has information suggesting you fall within the one-year bar or the 14-day bar, and is giving you a chance to respond before deciding.",
      clock: "Short, and set out in your letter. Bill C-12 took effect 26 March 2026 and reaches back to 24 June 2020, so a short visit years ago can affect a claim made now. Around 30,000 people were written to.",
      do: "We work out which bar they say applies, assemble your entry and exit history against it, and file the response. If the claim is barred, a pre-removal risk assessment may still be open to you." },
    { t: "Someone has been detained", c: "48 hours", urgent: true, slug: "detention-review",
      is: "CBSA is holding someone for immigration reasons. The detained person usually has no phone, so if you are reading this, you are the one who can act.",
      clock: "The Immigration Division reviews the detention within 48 hours, or as soon as possible after. Then within 7 days, then at least every 30 days.",
      do: "We take instructions from you, not the detainee. What wins a review is a documented release plan: a credible bondsperson, a confirmed address, agreed conditions. In 2025, 1,380 people were released on an alternative to detention." },
    { t: "I must report for removal", c: "Act today", urgent: true, slug: "removal-order",
      is: "A direction to report means CBSA considers your removal order enforceable and is arranging your departure. It is an operational step, not a decision you can argue at the counter.",
      clock: "Immediate. Some options exist only before a removal date is fixed, so the gap between acting today and next week changes the answer more here than anywhere else.",
      do: "We tell you plainly whether anything remains open, including a deferral request where one is arguable. If nothing is open, we say so rather than take a fee." },
    { t: "A sponsorship application was refused", c: "Appeal window", urgent: false, slug: "sponsorship-appeal-iad",
      is: "A family sponsorship was refused. The sponsor in Canada is the appellant at the Immigration Appeal Division, not the applicant abroad. That is probably you.",
      clock: "Deadlines run from the date of the decision. The IAD wait was about six months as at December 2025, which is long enough to prepare properly and short enough that starting late hurts.",
      do: "Most refusals turn on the genuineness of the relationship or an admissibility finding. We build the evidence across the whole relationship rather than the start of it. Of all immigration appeals finalised in 2025, 1,426 of 3,935 were allowed." },
    { t: "I have a hearing coming up", c: "Prepare now", urgent: false, slug: "refugee-hearing",
      is: "You are waiting for, or preparing, a hearing at the Refugee Protection Division. This is usually the one chance to give oral evidence.",
      clock: "No immediate deadline, but a claim took about 24 months from referral to decision as at December 2025, and 259,085 claims were pending in August 2026. The notice arrives after a long silence.",
      do: "Preparation is consistency, not coaching. Between your Basis of Claim form, your documents and your testimony. Most refusals turn on inconsistency rather than on the story itself being implausible." },
    { t: "I am not sure what I received", c: "Free check", urgent: false,
      is: "Immigration paperwork is dense, and it often does not say plainly what it is or what it starts.",
      clock: "Unknown until someone reads it. That is exactly the problem, and why people lose a week.",
      do: "Send a photo of every page. We tell you what the document is and what date it starts, at no charge and with nothing attached. If we are not the right people, we say so and point you to who is." },
  ],
  fr: [
    { t: "Ma demande d'asile a été refusée", c: "15 jours", urgent: true, slug: "refugee-appeal-rad",
      is: "La Section de la protection des réfugiés a rejeté votre demande et rendu des motifs écrits. Si vous avez un droit d'appel, la Section d'appel des réfugiés est l'étape suivante.",
      clock: "15 jours à compter du jour où les motifs écrits vous sont parvenus pour déposer un avis d'appel. Pas à compter de votre audience, ni de la date imprimée sur la décision.",
      do: "Nous confirmons la date gratuitement, lisons la décision pour y repérer les erreurs et vous disons honnêtement si un appel est défendable. En 2025, 3 045 appels sur 9 910 tranchés au fond ont été accueillis." },
    { t: "J'ai déposé un appel sans le mettre en état", c: "30 jours", urgent: true, slug: "appellants-record",
      is: "Déposer l'avis d'appel ne fait qu'ouvrir l'appel. Le mettre en état signifie déposer le dossier de l'appelant : la décision, vos éléments de preuve et vos observations écrites sur les erreurs.",
      clock: "Les Règles de la SAR prévoient 30 jours. Un avis de pratique de 2020 a prolongé ce délai ; le chiffre applicable doit être confirmé selon l'avis en vigueur.",
      do: "Nous préparons le dossier correctement et déterminons quels nouveaux éléments de preuve sont recevables. Un appel non mis en état peut être déclaré abandonné." },
    { t: "J'ai reçu une lettre d'inéligibilité possible", c: "Urgent", urgent: true, slug: "bill-c12-ineligibility",
      is: "Une lettre d'équité procédurale liée au projet de loi C-12. Le ministère dispose d'informations indiquant que vous tombez sous l'interdiction d'un an ou celle de 14 jours.",
      clock: "Court, et précisé dans votre lettre. Le projet de loi C-12 est entré en vigueur le 26 mars 2026 et remonte au 24 juin 2020. Environ 30 000 personnes ont reçu une lettre.",
      do: "Nous déterminons quelle interdiction est invoquée, réunissons votre historique d'entrées et de sorties, et déposons la réponse. Si la demande est barrée, un examen des risques avant renvoi reste possible." },
    { t: "Une personne a été détenue", c: "48 heures", urgent: true, slug: "detention-review",
      is: "L'ASFC détient une personne pour des motifs d'immigration. La personne détenue n'a généralement pas de téléphone : si vous lisez ceci, c'est vous qui pouvez agir.",
      clock: "La Section de l'immigration contrôle la détention dans les 48 heures, ou dès que possible ensuite. Puis dans les 7 jours, puis au moins tous les 30 jours.",
      do: "Nous prenons vos instructions, pas celles de la personne détenue. Ce qui emporte un contrôle, c'est un plan de mise en liberté documenté : une caution crédible, une adresse confirmée, des conditions acceptées." },
    { t: "Je dois me présenter en vue d'un renvoi", c: "Agir aujourd'hui", urgent: true, slug: "removal-order",
      is: "Une convocation signifie que l'ASFC considère votre mesure de renvoi exécutoire et organise votre départ. C'est une étape opérationnelle, pas une décision discutable au comptoir.",
      clock: "Immédiat. Certaines options n'existent qu'avant la fixation d'une date de renvoi.",
      do: "Nous vous disons clairement s'il reste une voie ouverte, y compris une demande de report lorsqu'elle est défendable. S'il n'y en a aucune, nous le disons plutôt que de prendre des honoraires." },
    { t: "Un parrainage a été refusé", c: "Délai d'appel", urgent: false, slug: "sponsorship-appeal-iad",
      is: "Un parrainage familial a été refusé. C'est le répondant au Canada qui est l'appelant devant la Section d'appel de l'immigration, pas le demandeur à l'étranger.",
      clock: "Les délais courent à compter de la date de la décision. L'attente à la SAI était d'environ six mois en décembre 2025.",
      do: "La plupart des refus portent sur l'authenticité de la relation ou sur une interdiction de territoire. Sur l'ensemble des appels en immigration tranchés en 2025, 1 426 sur 3 935 ont été accueillis." },
    { t: "J'ai une audience à venir", c: "Préparer maintenant", urgent: false, slug: "refugee-hearing",
      is: "Vous attendez ou préparez une audience devant la Section de la protection des réfugiés. C'est en général la seule occasion de témoigner de vive voix.",
      clock: "Aucun délai immédiat, mais une demande prenait environ 24 mois en décembre 2025, et 259 085 demandes étaient en instance en août 2026.",
      do: "La préparation, c'est la cohérence, pas l'apprentissage par cœur : entre votre formulaire de fondement de la demande, vos documents et votre témoignage." },
    { t: "Je ne sais pas ce que j'ai reçu", c: "Vérification gratuite", urgent: false,
      is: "Les documents d'immigration sont denses et indiquent rarement clairement ce qu'ils sont ni ce qu'ils déclenchent.",
      clock: "Inconnu tant que personne ne l'a lu. C'est exactement le problème, et la raison pour laquelle on perd une semaine.",
      do: "Envoyez une photo de chaque page. Nous vous disons de quel document il s'agit et quelle date il fait courir, sans frais ni engagement." },
  ],
};
