import type { Dict } from "./types";

const IRB_FILING = { label: "IRB, Filing a refugee appeal", url: "https://www.irb-cisr.gc.ca/en/filing-refugee-appeal/filing-a-refugee-appeal/Pages/index.aspx" };
const IRB_PRACTICE = { label: "IRB, Practice notice on perfecting an appeal", url: "https://irb-cisr.gc.ca/en/legal-policy/procedures/Pages/practice-notice-extending-time-perfecting-appeal.aspx" };
const IRB_DETENTION = { label: "IRB, Detention review process", url: "https://irb.gc.ca/en/legal-policy/procedures/pages/ProcessRevMot.aspx" };
const IRB_RAD_STATS = { label: "IRB, Refugee appeal statistics 2025", url: "https://www.irb-cisr.gc.ca/en/statistics/appeals/Pages/RADStat2025.aspx" };
const IRB_RPD_STATS = { label: "IRB, Refugee claim statistics 2025", url: "https://www.irb-cisr.gc.ca/en/statistics/protection/Pages/RPDStat2025.aspx" };
const IRB_IAD_STATS = { label: "IRB, Immigration appeal statistics", url: "https://irb.gc.ca/en/statistics/immigration-appeals/Pages/index.aspx" };
const IRB_VOLUMES = { label: "IRB, Recent trends and volume reports", url: "https://irb.gc.ca/en/statistics/Pages/volume-reports.aspx" };
const IRB_WAITS = { label: "IRB, Appearance before CIMM, March 2026", url: "https://www.irb-cisr.gc.ca/en/transparency/proactive-disclosure/Pages/cimm-mar-2026.aspx" };
const CBSA_REMOVALS = { label: "CBSA, Removal statistics", url: "https://www.cbsa-asfc.gc.ca/agency-agence/reports-rapports/security-securite/removals-renvois-eng.html" };
const CBSA_DETENTION = { label: "CBSA, Detention statistics", url: "https://www.cbsa-asfc.gc.ca/security-securite/detent/qstat-eng.html" };
const C12 = { label: "Strengthening Canada's Immigration System and Borders Act", url: "https://en.wikipedia.org/wiki/Strengthening_Canada%27s_Immigration_System_and_Borders_Act" };
const IRCC_REGS = { label: "IRCC, Proposed asylum regulations, June 2026", url: "https://www.canada.ca/en/immigration-refugees-citizenship/news/2026/06/canada-proposes-new-regulations-to-modernize-the-asylum-process-and-support-timely-decisions.html" };
const LAO = { label: "Legal Aid Ontario, refugee roster billing and coverage", url: "https://www.legalaid.on.ca/lawyers-legal-professionals/for-refugee-and-immigration-lawyers/practical-tips-for-refugee-roster-lawyers-billing-coverage-certificates/" };
const STEPS = { label: "Steps to Justice, find a licensed representative", url: "https://stepstojustice.ca/steps/refugee-law/1-find-a-licensed-representative-to-help-you/" };

export const en: Dict = {
  locale: "en",
  meta: {
    title: "Refugee Appeals, Detention Reviews and Immigration Appeals in Canada",
    description:
      "Licensed RCIC-IRB representation before the Immigration and Refugee Board. Refused refugee claim, RAD appeal, Bill C-12 ineligibility, detention review, sponsorship appeal and removal. Free deadline check.",
    keywords: [
      "refugee claim refused Canada", "RAD appeal deadline", "notice of appeal 15 days",
      "Bill C-12 ineligibility letter", "pre-removal risk assessment", "detention review Canada",
      "sponsorship appeal IAD", "direction to report removal", "RCIC-IRB consultant",
    ],
  },

  nav: [
    { label: "Deadline checker", href: "/deadline-checker" },
    { label: "What happened", href: "/services" },
    { label: "How we help", href: "/how-we-help" },
    { label: "Verify us", href: "/verify" },
    { label: "About", href: "/about" },
  ],

  cta: {
    primary: "Check my deadline",
    secondary: "Send us the letter",
    send: "Send and get my deadline",
    checkDeadline: "Check my deadline",
    verify: "Open the public register",
    call: "Call the practice",
  },

  hero: {
    eyebrow: "Refugee appeals · Detention · Sponsorship appeals",
    h1a: "You waited two years for an answer.",
    h1b: "Now you have fifteen days.",
    sub: "A refused refugee claim starts a 15-day clock the moment you receive the written reasons. A detention review happens within 48 hours. Most people lose days deciding what the letter means. Find your deadline first. Decide second.",
    trust: ["Licensed RCIC-IRB", "Authorised before the IRB", "Deadline check costs nothing"],
  },

  checker: {
    title: "What is my deadline?",
    hint: "General timelines only, not legal advice on your file. Your own deadline can differ.",
    whatLabel: "What did you receive?",
    dateLabel: "Date you received it",
    prompt: "Enter the date you received it and we will count the days.",
    passed:
      "This date has passed. That does not always end the matter, but it changes what has to be argued. Contact us today.",
    varies: "Deadlines vary for this one.",
    variesBody:
      "Ineligibility letters, sponsorship refusals and directions to report each run on their own timeline, and some are very short. Send us the document today rather than working it out yourself. We will confirm the date at no charge.",
    days: "days", hrs: "hrs", min: "min", sec: "sec",
    by: "is the date by which you have",
    notAdvice: "This tool gives general timelines and is not advice on your file.",
    options: [
      { value: "rad15", label: "Refugee claim refused — written reasons" },
      { value: "rad30", label: "Notice of Appeal filed — record still to come" },
      { value: "det48", label: "Someone was detained — first review" },
      { value: "det7", label: "Detention continued at the first review" },
      { value: "det30", label: "Detention continuing — further reviews" },
      { value: "other", label: "Something else (C-12 letter, sponsorship refusal, direction to report)" },
    ],
    rules: {
      rad15: { days: 15, label: "to file your Notice of Appeal with the Refugee Appeal Division",
        cite: "Counted from the day you received the written reasons. Source: Immigration and Refugee Board, Filing a refugee appeal." },
      rad30: { days: 30, label: "to perfect the appeal by filing the appellant's record",
        cite: "The RAD Rules set 30 days. A 2020 practice notice extended this period, so the operative figure must be confirmed against the current notice for your file." },
      det48: { hours: 48, label: "until the first detention review before the Immigration Division",
        cite: "The Immigration Division reviews the reasons for detention within 48 hours of detention, or as soon as possible afterwards." },
      det7: { days: 7, label: "until the second detention review",
        cite: "If continued detention is ordered at the first review, the next hearing takes place within seven days." },
      det30: { days: 30, label: "until the next detention review",
        cite: "After the seven day review, hearings are held at least once every 30 days while the person remains detained. An earlier review can be requested on new facts." },
    },
  },

  stats: [
    { value: "259,085", count: 259085, label: "Refugee claims still pending at the Board, August 2026", source: IRB_VOLUMES },
    { value: "24", count: 24, label: "Months a claim took from referral to decision, December 2025", source: IRB_WAITS },
    { value: "15", count: 15, label: "Days to file a Notice of Appeal once reasons are received", source: IRB_FILING },
    { value: "31%", count: 31, label: "Of appeals decided on the merits were allowed in 2025", source: IRB_RAD_STATS },
  ],

  mattersIntro: {
    eyebrow: "Start with the document in your hand",
    h2: "What happened to you?",
    lede: "People do not search for an immigration consultant. They search for the words printed on the letter. Find yours.",
  },

  services: [
    {
      slug: "refugee-appeal-rad",
      doc: "Notice of Decision",
      title: "Your refugee claim was refused",
      summary:
        "If you have a right to appeal, the Refugee Appeal Division is the next step. The clock runs from the day you received the written reasons, not the day of your hearing.",
      tldr:
        "If the Refugee Protection Division refused your claim and you have a right of appeal, you generally have 15 days from receiving the written reasons to file a Notice of Appeal with the Refugee Appeal Division, and a further period to file your appellant's record. The appeal is largely decided on paper. In 2025, 3,045 of 9,910 appeals decided on the merits were allowed.",
      deadline: "15 days to file the Notice of Appeal",
      audience: "People whose claim was refused by the RPD in the last two weeks",
      sections: [
        { h: "When does the 15 days actually start?",
          p: ["It starts on the day the written reasons reach you, not the date printed at the top of the decision and not the day of your hearing. This single misunderstanding is the most common reason people lose days they cannot get back.",
              "If you are not certain which date applies, send us the envelope, the covering letter and the decision. Confirming the date costs nothing."] },
        { h: "Do I have a right to appeal at all?",
          p: ["Not every refused claimant does. Certain categories are excluded from the Refugee Appeal Division by statute, and the correct next step for those people is different. Establishing which situation you are in is the first thing we do, because an appeal filed in the wrong forum wastes the only time you have."] },
        { h: "What decides an appeal?",
          p: ["The appellant's record. An appeal to the RAD is largely a paper case rather than a second hearing, so the written record is where it is won or lost. Most people expect to tell their story again to someone new. That is not usually what happens.",
              "Our work is finding the error in the decision and building the record around it."] },
        { h: "What are the real chances?",
          p: ["In 2025 the Board finalised 10,955 appeals. Of the 9,910 decided on the merits, 6,865 were dismissed and 3,045 were allowed, which is roughly 31%. We will tell you honestly where your file sits in that picture. No outcome is guaranteed and nobody can promise you one."] },
      ],
      faqs: [
        { q: "How long do I have to appeal a refused refugee claim in Canada?",
          a: "In most cases you have 15 days from receiving the written reasons to file a Notice of Appeal with the Refugee Appeal Division, and a further period to perfect the appeal by filing your appellant's record." },
        { q: "Is a RAD appeal a new hearing?",
          a: "Usually not. The Refugee Appeal Division decides most appeals on the written record rather than by holding a new oral hearing, which is why the appellant's record matters more than anything else." },
        { q: "What happens if I miss the 15 day deadline?",
          a: "A missed deadline does not always end the matter, but it changes what has to be argued and adds a step. Contact a licensed representative the same day you realise the date has passed." },
      ],
      sources: [IRB_FILING, IRB_RAD_STATS, IRB_PRACTICE],
    },
    {
      slug: "appellants-record",
      doc: "Appellant's record",
      title: "Your appeal is filed but not perfected",
      summary:
        "An appeal is largely a paper case. The record is where it is won or lost, and a late or thin record is the most common avoidable failure.",
      tldr:
        "Filing a Notice of Appeal only starts the appeal. To perfect it you must file an appellant's record containing the decision, the evidence relied on and written submissions. The RAD Rules set 30 days, and a 2020 practice notice extended that period, so the operative figure must be confirmed against the current notice. An unperfected appeal can be declared abandoned.",
      deadline: "30 days under the Rules, confirm the practice notice",
      audience: "People who filed a Notice of Appeal and now have to build the case",
      sections: [
        { h: "What is perfecting an appeal?",
          p: ["Filing the Notice of Appeal starts the appeal. Perfecting it means filing the appellant's record: the decision, the evidence you rely on, and written submissions setting out the errors you say the Board made. Without that record there is nothing for the Division to act on, and the appeal can be declared abandoned."] },
        { h: "How long do I have to perfect it?",
          p: ["The RAD Rules set 30 days. A practice notice issued in 2020 extended that period and was stated to remain in force until further notice. Because that figure depends on a notice that can change, we confirm the operative deadline against the current notice for every file rather than quoting a number from memory."] },
        { h: "Can I file new evidence?",
          p: ["Only in limited circumstances. New evidence at the RAD is governed by statutory conditions, and submitting documents that do not meet them wastes space in the record and credibility with the panel. Deciding what qualifies is a legal judgement, not an administrative one."] },
      ],
      faqs: [
        { q: "What is an appellant's record at the Refugee Appeal Division?",
          a: "It is the document package that makes your appeal arguable: the decision under appeal, the evidence you rely on, and written submissions identifying the errors in the decision. Filing it is what perfects the appeal." },
        { q: "Can I submit new evidence on a refugee appeal?",
          a: "Only in limited circumstances set by statute. New evidence must meet specific conditions, so whether a document qualifies is a legal question that should be assessed before it goes into the record." },
      ],
      sources: [IRB_PRACTICE, IRB_FILING],
    },
    {
      slug: "bill-c12-ineligibility",
      doc: "Ineligibility letter",
      title: "You were told you may be ineligible",
      summary:
        "Bill C-12 took effect on 26 March 2026 and reaches back to 24 June 2020. A short visit years ago can affect a claim made now. Around 30,000 people were written to.",
      tldr:
        "The Strengthening Canada's Immigration System and Borders Act received royal assent on 26 March 2026. It bars referral to the Refugee Protection Division where a claim is made more than one year after first entry, applied retroactively to 24 June 2020, and where an irregular border entrant claims 14 or more days after entry. Around 30,000 people were notified they may be ineligible. Those barred may still be able to seek a pre-removal risk assessment.",
      deadline: "Check your letter and send it the same day",
      audience: "People who received a procedural fairness letter about eligibility",
      sections: [
        { h: "What changed under Bill C-12?",
          p: ["Two new bars. A claim made more than one year after your first entry into Canada is not referred to the Refugee Protection Division, and that rule reaches back to 24 June 2020. Separately, someone who crosses irregularly from the United States and does not claim within 14 days is also barred.",
              "The retroactive reach is what catches most people. A short visit in 2022 or 2023 can affect a claim made now, even if you left Canada in between."] },
        { h: "What does an ineligibility letter mean?",
          p: ["It means the department has information suggesting you fall within one of the bars and is giving you a chance to respond before deciding. It is not a final decision. What you send back, and whether you send it in time, matters a great deal.",
              "Response windows on these letters are short. Do not wait to see what happens."] },
        { h: "What is left if the claim is barred?",
          p: ["People barred from a hearing may still be able to seek a pre-removal risk assessment. That is a written process decided by an officer rather than a hearing before the Board, and it carries fewer of the supports attached to a claim, including work permits and medical coverage.",
              "That difference is precisely why the written submissions carry so much weight."] },
      ],
      faqs: [
        { q: "What is the one year bar under Bill C-12?",
          a: "A refugee claim made more than one year after your first entry into Canada is not referred to the Refugee Protection Division. The rule applies retroactively to entries from 24 June 2020, so an earlier visit can affect a claim made now." },
        { q: "I received a letter saying I may be ineligible for a refugee hearing. What should I do?",
          a: "Treat it as urgent. It is not a final decision, the response window is short, and what you file in response shapes what happens next. Send the letter to a licensed representative the day you receive it." },
      ],
      sources: [C12, IRCC_REGS],
    },
    {
      slug: "pre-removal-risk-assessment",
      doc: "PRRA notification",
      title: "You were offered a pre-removal risk assessment",
      summary:
        "A PRRA is decided on paper by an officer, not at a hearing. What you write is the entire case, and the timelines attached to it are short.",
      tldr:
        "A pre-removal risk assessment is a written application assessing whether you would face risk if removed from Canada. It is decided by an officer on the documents rather than at a hearing before the Immigration and Refugee Board, so the quality and completeness of the written submissions and country evidence carries the whole application. Timelines are short and set out in the notification you receive.",
      deadline: "Short. The timeline is set out in your notification",
      audience: "People notified by CBSA that they may apply for a PRRA",
      sections: [
        { h: "How is a PRRA different from a refugee hearing?",
          p: ["There is normally no hearing. An officer reads what you file and decides. You do not get to explain, clarify or answer questions, which means every point has to be made in writing the first time and supported by evidence.",
              "This is the opposite of a hearing, where a member can ask you to expand on something. On a PRRA, silence in the file is simply silence."] },
        { h: "What makes a strong application?",
          p: ["Current, specific country evidence tied directly to your personal circumstances. Generic conditions reports rarely move an officer. The link between what is happening in that country and what would happen to you is the application."] },
        { h: "Why does this matter more now?",
          p: ["Because Bill C-12 moved a large group of people out of the hearing process and into this one. For them, the written assessment is not a backstop. It is the whole case."] },
      ],
      faqs: [
        { q: "Is there a hearing for a pre-removal risk assessment?",
          a: "Normally not. A PRRA is decided by an officer on the written application, which is why the submissions and the country evidence have to be complete when filed." },
      ],
      sources: [C12, CBSA_REMOVALS],
    },
    {
      slug: "detention-review",
      doc: "Detention",
      title: "Someone was stopped at the airport",
      summary:
        "The detained person usually has no phone. If you are the relative making this search, you are the one who can act. The first review comes fast.",
      tldr:
        "If someone is detained for immigration reasons in Canada, the Immigration Division reviews the detention within 48 hours or as soon as possible afterwards. If detention is continued, the next review is within seven days, and after that at least once every 30 days. An earlier review can be requested if there are new facts. In 2025 the CBSA detained 3,598 people, with a median stay of five days.",
      deadline: "48 hours to the first detention review",
      audience: "Family members of someone currently detained",
      sections: [
        { h: "What happens in the first 48 hours?",
          p: ["The Immigration Division reviews the reasons for the detention within 48 hours of detention, or as soon as possible afterwards. That first review matters enormously and it arrives before most families have worked out what is happening.",
              "If you are reading this because a relative was detained, you are the one who can act. They usually cannot."] },
        { h: "What happens after that?",
          p: ["If continued detention is ordered, there is a further review within seven days. After that, reviews happen at least once every 30 days for as long as the person remains detained. A review can also be requested earlier if there are new facts to put forward."] },
        { h: "What actually gets someone released?",
          p: ["A credible, documented release plan. Who the bondsperson is, what they are offering, where the person will live, what conditions they will accept. Arriving without that plan and hoping to argue is how reviews are lost.",
              "In 2025, 1,380 people were released from detention on an alternative to detention, about 38% of all persons detained."] },
      ],
      faqs: [
        { q: "How quickly is a detention review held in Canada?",
          a: "The Immigration Division reviews the reasons for detention within 48 hours of detention or as soon as possible afterwards, then within seven days if detention continues, and then at least once every 30 days." },
        { q: "Can I act for a family member who has been detained?",
          a: "Yes. A detained person often has no access to a phone, so a relative is usually the one who instructs a representative and gathers the release plan. We take instructions from family members in detention matters." },
      ],
      sources: [IRB_DETENTION, CBSA_DETENTION],
    },
    {
      slug: "sponsorship-appeal-iad",
      doc: "Sponsorship refusal",
      title: "Your spouse or family member was refused",
      summary:
        "A sponsor is the appellant at the Immigration Appeal Division. Sponsorship appeals rose from 2,495 filings in 2024 to 3,360 in 2025, the fastest growing category in the system.",
      tldr:
        "When a family sponsorship application is refused, the sponsor in Canada is the appellant at the Immigration Appeal Division, not the applicant abroad. Sponsorship appeals rose from 2,495 filings in 2024 to 3,360 in 2025. Of all immigration appeals finalised in 2025, 1,426 of 3,935 were allowed. The IAD wait time was about six months as of December 2025.",
      deadline: "Deadlines apply from the date of the decision",
      audience: "Sponsors in Canada whose application was refused",
      sections: [
        { h: "Who actually appeals?",
          p: ["You do, as the sponsor. This surprises people. The applicant is abroad, the refusal letter went to them, but the right of appeal sits with the sponsor in Canada. That also means the person who instructs us and pays is usually the person reading this page."] },
        { h: "What are sponsorship appeals usually about?",
          p: ["Most commonly the genuineness of the relationship, or an admissibility finding. Refusals frequently turn on inconsistencies in the evidence, gaps in the communication record, or an interview that went badly. Each calls for a different response.",
              "Sponsorship appeals grew about 35% in a single year, which means the Division is seeing more of these than ever."] },
        { h: "What does the Division allow?",
          p: ["Of all immigration appeals finalised in 2025, 1,426 of 3,935 were allowed. The wait was about six months as of December 2025, which is long enough to prepare properly and short enough that starting late hurts."] },
      ],
      faqs: [
        { q: "Who appeals a refused family sponsorship, the sponsor or the applicant?",
          a: "The sponsor in Canada is the appellant at the Immigration Appeal Division. The applicant abroad receives the refusal, but the right of appeal belongs to the sponsor." },
        { q: "How long does a sponsorship appeal take in Canada?",
          a: "The Immigration Appeal Division wait time was about six months as of December 2025, though individual files vary." },
      ],
      sources: [IRB_IAD_STATS, IRB_WAITS],
    },
    {
      slug: "removal-order",
      doc: "Direction to report",
      title: "You were told to report for removal",
      summary:
        "Removals reached 23,160 in 2025 and 14,897 in the first eight months of 2026. Options narrow quickly once a removal date is set.",
      tldr:
        "A direction to report means the CBSA considers your removal order enforceable and is arranging your departure. Removals reached 23,160 in 2025 and 14,897 in the first eight months of 2026, with India and Mexico the most common destinations. Options narrow sharply once a date is set, so the time between receiving the direction and the reporting date is what determines what remains possible.",
      deadline: "Act immediately, do not wait for the date",
      audience: "People with an enforceable removal order",
      sections: [
        { h: "What does a direction to report mean?",
          p: ["That the Agency considers your removal order enforceable and is arranging your departure. It is an operational step, not a decision you can argue with at the counter."] },
        { h: "What can still be done?",
          p: ["It depends entirely on what has already happened in your file and how much time is left. Some avenues exist only before a date is fixed. This is the single category where the gap between acting today and acting next week changes the answer most.",
              "We will tell you plainly whether anything remains open. If nothing does, we will say that rather than take a fee."] },
        { h: "How common is this now?",
          p: ["Removals have risen sharply. In the first eight months of 2026 the CBSA removed 14,897 people, with India at 4,227 and Mexico at 2,282 the two largest groups."] },
      ],
      faqs: [
        { q: "What should I do if I get a direction to report for removal?",
          a: "Contact a licensed representative the same day. Some options close once a removal date is fixed, so the time between receiving the direction and the reporting date determines what remains available." },
      ],
      sources: [CBSA_REMOVALS],
    },
    {
      slug: "refugee-hearing",
      doc: "Notice to appear",
      title: "You have a refugee hearing coming up",
      summary:
        "259,085 claims were pending in August 2026 and a claim took about 24 months from referral to decision. The wait is long, and then the hearing is everything.",
      tldr:
        "A refugee claim took about 24 months from referral to decision as of December 2025, and 259,085 claims were still pending in August 2026. The hearing before the Refugee Protection Division is usually the one opportunity to give oral evidence. Preparation is about consistency between your Basis of Claim form, your documents and your testimony, because inconsistency is what most refusals turn on.",
      deadline: null,
      audience: "Claimants waiting for or preparing a hearing",
      sections: [
        { h: "How long is the wait?",
          p: ["About 24 months from referral to decision as of December 2025. Less complex claims were finalised in around 16 months. The Board has said wait times will continue to grow because intake exceeds its funded capacity.",
              "The inventory stood at 259,085 claims in August 2026."] },
        { h: "What decides a hearing?",
          p: ["Consistency, more than anything else. Between your Basis of Claim form, the documents you filed, and what you say on the day. Most refusals turn on inconsistency rather than on the underlying story being implausible.",
              "Preparation is not coaching. It is making sure the account you give is the account your file supports."] },
        { h: "What should I be doing while I wait?",
          p: ["Gathering and translating documents, keeping your contact details current with the Board, and making sure any change in your circumstances is properly filed. Two years feels like time you have. It is time most people spend doing nothing, and then the notice arrives."] },
      ],
      faqs: [
        { q: "How long does a refugee claim take in Canada?",
          a: "About 24 months from referral to decision as of December 2025, with less complex claims finalised in around 16 months. The Board has said wait times will continue to grow." },
      ],
      sources: [IRB_WAITS, IRB_VOLUMES, IRB_RPD_STATS],
    },
  ],


  practiceIntro: {
    eyebrow: "Everything this licence covers",
    h2: "Full practice areas",
    lede: "An RCIC-IRB licence covers the whole range of Canadian immigration work, plus representation before the Immigration and Refugee Board. The Board work is the specialism. The rest is handled too.",
    flagshipTag: "Specialism",
  },

  practiceGroups: [
    {
      key: "irb", flagship: true,
      title: "Before the Immigration and Refugee Board",
      blurb: "The RCIC-IRB endorsement is what permits a consultant to appear here. Most consultants cannot.",
      items: [
        { name: "Refugee claims", note: "Refugee Protection Division hearings and preparation", slug: "refugee-hearing" },
        { name: "Refugee appeals", note: "Refugee Appeal Division, 15 day deadline", slug: "refugee-appeal-rad" },
        { name: "Perfecting an appeal", note: "Appellant's record and submissions", slug: "appellants-record" },
        { name: "Detention reviews", note: "48 hours, 7 days, then every 30 days", slug: "detention-review" },
        { name: "Admissibility hearings", note: "Immigration Division" },
        { name: "Sponsorship appeals", note: "Immigration Appeal Division", slug: "sponsorship-appeal-iad" },
        { name: "Removal order appeals", note: "Immigration Appeal Division" },
        { name: "Residency obligation appeals", note: "Lost PR status for time outside Canada" },
      ],
    },
    {
      key: "enforcement",
      title: "Enforcement, risk and removal",
      blurb: "Where CBSA is already involved and the timelines are shortest.",
      items: [
        { name: "Bill C-12 ineligibility letters", note: "One year bar and 14 day bar", slug: "bill-c12-ineligibility" },
        { name: "Pre-removal risk assessment", note: "Written application, no hearing", slug: "pre-removal-risk-assessment" },
        { name: "Directions to report", note: "Enforceable removal orders", slug: "removal-order" },
        { name: "Deferral requests" },
        { name: "CBSA reporting conditions" },
        { name: "Authorization to Return to Canada", note: "After a removal order was enforced" },
      ],
    },
    {
      key: "family",
      title: "Family sponsorship",
      blurb: "The sponsor in Canada is the client, and in an appeal the sponsor is the appellant.",
      items: [
        { name: "Spousal and partner sponsorship", note: "Inland and overseas" },
        { name: "Parents and grandparents" },
        { name: "Dependent children" },
        { name: "Super visa" },
        { name: "Sponsorship refusals", note: "Response and appeal", slug: "sponsorship-appeal-iad" },
        { name: "Relationship evidence packages" },
      ],
    },
    {
      key: "pr",
      title: "Permanent residence",
      blurb: "Economic and discretionary routes to status.",
      items: [
        { name: "Express Entry", note: "Federal Skilled Worker, CEC, Trades" },
        { name: "Provincial Nominee Programs" },
        { name: "Humanitarian and compassionate applications" },
        { name: "Atlantic and rural pilots" },
        { name: "Self-employed and business streams" },
        { name: "PR card renewal and travel documents" },
      ],
    },
    {
      key: "temporary",
      title: "Work, study and visitor status",
      blurb: "Getting status, keeping it, and fixing it when it lapses.",
      items: [
        { name: "Work permits", note: "LMIA based and LMIA exempt" },
        { name: "Labour Market Impact Assessments", note: "Employer side" },
        { name: "Post-graduation work permits" },
        { name: "Study permits and extensions" },
        { name: "Visitor visas and eTAs" },
        { name: "Restoration of status", note: "After status has lapsed" },
      ],
    },
    {
      key: "inadmissibility",
      title: "Inadmissibility and recovery",
      blurb: "When something in the file is blocking everything else.",
      items: [
        { name: "Temporary resident permits" },
        { name: "Criminal rehabilitation" },
        { name: "Medical inadmissibility responses" },
        { name: "Misrepresentation allegations" },
        { name: "Procedural fairness letter responses" },
        { name: "Reconsideration requests" },
      ],
    },
    {
      key: "citizenship",
      title: "Citizenship",
      blurb: "The last step, and the problems that surface at it.",
      items: [
        { name: "Citizenship applications" },
        { name: "Residency calculation issues" },
        { name: "Prohibitions and delays" },
        { name: "Proof of citizenship" },
      ],
    },
  ],

  problemsIntro: {
    eyebrow: "The problems, and what we actually do about them",
    h2: "Honest answers to the six things that go wrong",
    lede: "Every one of these is a version of the same problem. The system is slow for two years, then brutal for two weeks.",
  },

  problems: [
    { n: "01", title: "You did not know the clock had started",
      problem: "The 15-day appeal deadline runs from the day the written reasons reach you, not the hearing date and not the date printed at the top. People routinely lose a week assuming otherwise.",
      solution: "Send a photo of the letter and we tell you your date. No charge, no commitment, no sales call. If the date has passed we tell you that too, because you still need to know." },
    { n: "02", title: "You cannot tell who is legitimate",
      problem: "Unlicensed agents are widespread in this market, and most people arriving here have already been burned once or know someone who was.",
      solution: "We tell you to verify us rather than trust us. Since 15 July 2026 the public register shows whether a licensee is in good standing and any disciplinary history, and a compensation fund now exists for clients defrauded by a licensee. Use a licensed consultant and that protection exists. Use a ghost agent and nothing does." },
    { n: "03", title: "Legal aid will not pay for a consultant",
      problem: "Legal Aid Ontario certificates can only be billed by roster lawyers. Appeals need a merit assessment first. Many people are refused, are over the threshold, or cannot wait for an intake inside a 15-day window.",
      solution: "We price discrete pieces of work rather than only full files. A deadline check, a decision review, a record prepared, submissions written. You can buy one small piece, see whether we are real, and decide from there." },
    { n: "04", title: "The person searching is not the person in trouble",
      problem: "A detained person has no phone. A claimant may not read English. A sponsor is the legal appellant but the refusal landed on someone else's file.",
      solution: "You can start a file on behalf of a relative. Our intake is built for the third party, because in detention and sponsorship matters that is almost always who is calling." },
    { n: "05", title: "You cannot read your own decision",
      problem: "A refusal, a fairness letter or a direction to report is dense legal English, read under stress, on a phone, often in a second language.",
      solution: "A written decision review in plain language. What the document is, what the deadline is, and what the realistic options are. Available in English and French." },
    { n: "06", title: "You think an appeal means telling the story again",
      problem: "Most people expect a second hearing. An appeal to the Refugee Appeal Division is largely decided on paper, and the record decides it.",
      solution: "We work where the case is actually won: finding the error in the decision and building the record properly. In 2025, 3,045 of 9,910 appeals decided on the merits were allowed." },
  ],

  tiersIntro: {
    eyebrow: "You do not have to commit to a full file",
    h2: "Buy one small piece and see whether we are real",
    lede: "If you have been defrauded before, being asked for a full retainer by a stranger on the internet is the moment you walk away. So we do not start there.",
  },

  tiers: [
    { tier: "Free", offer: "Deadline triage", detail: "Send the letter, get the date back. Nothing else attached.", who: "Anyone holding a document with a date on it" },
    { tier: "Fixed fee", offer: "Options assessment", detail: "A conversation and a written summary of what is actually available to you.", who: "People deciding whether to act at all" },
    { tier: "Fixed fee", offer: "Decision review", detail: "We read the decision properly and tell you where the errors are, if there are any.", who: "People deciding whether to appeal" },
    { tier: "Per task", offer: "Discrete work", detail: "Notice of Appeal filed, record prepared, submissions written. One task at a time.", who: "People who cannot fund a full file" },
    { tier: "Retainer", offer: "Full representation", detail: "RAD, IAD, PRRA, detention review and admissibility hearings, start to finish.", who: "Funded files, often family funded" },
  ],

  verify: {
    eyebrow: "Do not trust us. Verify us.",
    h2: "Three minutes that protect you from everyone, including us",
    p: "Anyone can put letters after a name on a website. The College of Immigration and Citizenship Consultants keeps a public register, and since 15 July 2026 it shows good standing and disciplinary history. Check us on it before you send a document or pay anything.",
    cta: "Open the public register",
    steps: [
      "Open the College public register. It is the only authoritative list of licensed consultants in Canada.",
      "Search Angad Sachdeva. Confirm the licence class reads RCIC-IRB, which is the class permitted to represent clients before the Immigration and Refugee Board.",
      "Check the status is in good standing and read any disciplinary history shown.",
      "Do the same for anyone else you are considering. If a person is not on that register, they cannot lawfully represent you for a fee.",
    ],
  },

  about: {
    eyebrow: "Who you will be dealing with",
    h2: "A licensed consultant, and a clear limit on what that licence allows",
    p1: "Angad Sachdeva holds an RCIC-IRB licence, the class authorised to represent clients before the Immigration and Refugee Board: refugee claims, refugee appeals, detention reviews, admissibility hearings and immigration appeals.",
    p2: "There is one thing that licence does not allow, and you should hear it from us rather than find out later.",
    limit: "No consultant and no paralegal can represent you in a judicial review at the Federal Court. Only a lawyer can. If your matter needs that, we will say so and refer you.",
  },

  contact: {
    eyebrow: "No charge for the first look",
    h2: "Send us the letter",
    lede: "Tell us what you received and when. We will tell you your deadline and what your realistic options are. If we are not the right people, we will say so.",
    name: "Your name", email: "Email", phone: "Phone or WhatsApp",
    phoneHelp: "Include the country code.",
    language: "Preferred language",
    who: "Who is this about?",
    whoOpts: ["Myself", "A family member or friend", "Someone who is currently detained", "A client I am referring"],
    matter: "What did you receive?",
    matterOpts: [
      "Refugee claim refused, written reasons received",
      "Appeal filed, record still to prepare",
      "Letter saying I may be ineligible (Bill C-12)",
      "Pre-removal risk assessment notice",
      "Someone has been detained",
      "Sponsorship application refused",
      "Direction to report for removal",
      "Upcoming refugee hearing",
      "Something else",
    ],
    choose: "Please choose",
    docDate: "Date on the document",
    docDateHelp: "Or the date it reached you, if different.",
    province: "Province",
    provinceOpts: ["Ontario","Quebec","British Columbia","Alberta","Manitoba","Saskatchewan","Nova Scotia","New Brunswick","Newfoundland and Labrador","Prince Edward Island","Outside Canada"],
    rep: "Do you already have a representative?",
    repOpts: ["No", "Yes, a lawyer", "Yes, a consultant", "I did, but not any more"],
    upload: "Upload the letter",
    uploadHelp: "A clear photo of every page is fine. PDF, JPG or PNG, up to 8 MB in total.",
    message: "Anything else we should know",
    messagePlaceholder: "Dates, what you have already filed, anything you are worried about.",
    consent: "I understand that sending this form does not create a representative relationship, and that no advice is given until a retainer is signed.",
    submit: "Send and get my deadline",
    sending: "Sending",
    note: "We reply to deadline questions first, because they cannot wait.",
    success: "Received. We reply to deadline questions first, usually the same day. Check your junk folder if you do not hear from us.",
    error: "That did not send. Please email us directly, or try again in a moment.",
  },

  faqIntro: {
    eyebrow: "Questions people actually ask",
    h2: "Deadlines, eligibility and what a licensed consultant can do",
    lede: "Short, direct answers. Each one links to the published source it comes from.",
  },

  faqs: [
    { q: "How long do I have to appeal a refused refugee claim in Canada?",
      a: "In most cases, 15 days from receiving the written reasons to file a Notice of Appeal with the Refugee Appeal Division, then a further period to file your appellant's record. The clock runs from when the reasons reach you, not from your hearing date." },
    { q: "Can an immigration consultant represent me at the Immigration and Refugee Board?",
      a: "Yes, if they hold an RCIC-IRB licence. That is the licence class authorised to represent clients before the Board. You can confirm anyone's licence class on the College public register." },
    { q: "Can a consultant represent me at the Federal Court?",
      a: "No. Neither a consultant nor a paralegal can represent you in a judicial review at the Federal Court. Only a lawyer can." },
    { q: "How quickly is a detention review held?",
      a: "Within 48 hours of detention or as soon as possible afterwards, then within seven days if detention continues, then at least once every 30 days." },
    { q: "What is the Bill C-12 one year bar?",
      a: "A refugee claim made more than one year after your first entry into Canada is not referred to the Refugee Protection Division. It applies retroactively to entries from 24 June 2020, so an earlier visit can affect a claim made now." },
    { q: "Will legal aid pay for an immigration consultant?",
      a: "No. Legal Aid Ontario certificates can only be billed by roster lawyers, and consultants cannot bill them. That is why we price discrete pieces of work rather than only full retainers." },
    { q: "How long does a refugee claim take in Canada?",
      a: "About 24 months from referral to decision as of December 2025. Less complex claims were finalised in around 16 months, and the Board has said wait times will continue to grow." },
    { q: "Who appeals a refused family sponsorship?",
      a: "The sponsor in Canada, not the applicant abroad. Sponsorship appeals rose from 2,495 filings in 2024 to 3,360 in 2025." },
    { q: "How do I check whether an immigration consultant is licensed?",
      a: "Search their name on the College of Immigration and Citizenship Consultants public register. Since 15 July 2026 it also shows whether they are in good standing and any disciplinary history." },
    { q: "Is a free deadline check really free?",
      a: "Yes. Send the document, we confirm the date. It creates no representative relationship and commits you to nothing." },
  ],

  footer: {
    blurb: "Refugee appeals, detention reviews, pre-removal risk assessments and immigration appeals before the Immigration and Refugee Board of Canada.",
    matters: "Matters", practice: "Practice",
    regulated: "Regulated by the College of Immigration and Citizenship Consultants. Public register:",
    registerLabel: "college-ic.ca",
    licence: "Licence number", registeredName: "Registered name", address: "Address",
    tbc: "TO BE SUPPLIED",
  },

  disclaimer:
    "Every case is different. Eligibility and available remedies depend on your circumstances. No outcome is guaranteed. The information on this site is general and is not legal advice on your file. No consultant may represent you in a judicial review at the Federal Court.",
  sourcesLabel: "Sources",
  lastUpdated: "Last reviewed",
};
