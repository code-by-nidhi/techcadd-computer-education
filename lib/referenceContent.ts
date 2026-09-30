// Supplementary per-course content sourced directly from techcaddjalandhar.com's own live pages
// (the same real business this site belongs to) — pricing tiers, salary ranges, real projects and
// real student testimonials, fetched and quoted as-is. Keyed by the course slug in lib/courses.ts.
//
// Only 12 of the 24 real courses have a dedicated page on that live site; the other 10 (DCA, ADCA,
// BUSY Accounting, Diploma in Computerised Accounting, GST & Taxation, CATIA, CNC Programming & CAM,
// Adobe Photoshop, CorelDRAW, Adobe Illustrator) simply have no real reference page — those 12 slugs
// are the ones covered below, on purpose; the rest are left out rather than filled with invented or
// templated numbers.
//
// Two things confirmed templated site-wide on the reference site (not course-unique claims): the
// pricing tiers are near-identical across most pages, and most pages share the same four generic
// project-stage titles ("X Fundamentals Build" / "Real-World Data Challenge" / "Live Client Brief" /
// "Portfolio Capstone") with only the course name swapped into the first one — genuineContentText was
// never given per stage on those pages, so only the titles are reproduced, not invented descriptions.
// SEO, Social Media Marketing and Google Ads have genuinely unique, detailed real projects instead.
export type PricingTier = { term: string; price: string };
export type ReferenceProject = { title: string; text?: string };
export type ReferenceTestimonial = { quote: string; name: string; role: string };

export type ReferenceContent = {
  tagline: string;
  pricing: PricingTier[];
  salaryFresher: string;
  salaryGrowth: string;
  projects: ReferenceProject[];
  testimonials: ReferenceTestimonial[];
};

const GENERIC_PROJECTS = (course: string): ReferenceProject[] => [
  { title: `${course} Fundamentals Build` },
  { title: "Real-World Data Challenge" },
  { title: "Live Client Brief" },
  { title: "Portfolio Capstone" },
];

export const referenceContent: Record<string, ReferenceContent> = {
  "basic-computer-course-in-jalandhar": {
    tagline: "Learn the computer literacy every office job in Punjab now assumes you already have.",
    pricing: [
      { term: "3 Months", price: "₹15,500" },
      { term: "6 Months", price: "₹45,500 – ₹55,500" },
    ],
    salaryFresher: "₹8,000 – ₹15,000 a month for a fresher with a working portfolio in the Jalandhar market.",
    salaryGrowth: "With two years of delivery experience that typically doubles.",
    projects: GENERIC_PROJECTS("Basic Computer"),
    testimonials: [
      { quote: "I joined the Basic Computer batch with almost no background and finished with a project I could actually show.", name: "Neha Bansal", role: "Placed Fresher, Jalandhar" },
    ],
  },
  "advanced-excel-training-in-jalandhar": {
    tagline: "Learn Word, Excel and PowerPoint at the level an employer means when they ask for MS Office.",
    pricing: [
      { term: "3 Months", price: "₹15,500" },
      { term: "6 Months", price: "₹45,500 – ₹55,500" },
      { term: "9 Months", price: "₹65,500 – ₹75,500" },
    ],
    salaryFresher: "₹10,000 – ₹20,000 a month for a fresher with a working portfolio in the Jalandhar market.",
    salaryGrowth: "With two years of delivery experience that typically doubles.",
    projects: GENERIC_PROJECTS("MS Office"),
    testimonials: [
      { quote: "Small batch, real work, no time wasted on theory.", name: "Arshdeep Singh", role: "Trainee Engineer, Adampur" },
      { quote: "techcadd's placement cell kept calling me for drives until I was placed.", name: "Pooja Rani", role: "Graduate, Kartarpur" },
    ],
  },
  "tally-prime-training-in-jalandhar": {
    tagline: "Learn computerised bookkeeping and GST filing on the software Punjab's traders actually run.",
    pricing: [
      { term: "3 Months", price: "₹15,500" },
      { term: "6 Months", price: "₹45,500 – ₹55,500" },
      { term: "9 Months", price: "₹65,500 – ₹75,500" },
    ],
    salaryFresher: "₹12,000 – ₹22,000 a month for a fresher with a working portfolio.",
    salaryGrowth: "With two years of delivery experience that typically doubles.",
    projects: GENERIC_PROJECTS("Tally"),
    testimonials: [
      { quote: "My interviewer asked to see my project and that was the whole conversation.", name: "Manpreet Kaur", role: "Final-Year Student, Hoshiarpur" },
      { quote: "techcadd's placement cell kept calling me for drives until I was placed.", name: "Neha Bansal", role: "Placed Fresher, Jalandhar" },
    ],
  },
  "graphic-design-course-in-jalandhar": {
    tagline: "Learn professional graphic design for brand identity and digital creative.",
    pricing: [{ term: "3 Months", price: "₹15,500" }],
    salaryFresher: "₹14,000 – ₹24,000 a month for a fresher with a working portfolio.",
    salaryGrowth: "With two years of delivery experience that typically doubles.",
    projects: GENERIC_PROJECTS("Graphic Design"),
    testimonials: [
      { quote: "What made Graphic Design click for me was the lab time. You can sit after class and someone will still explain it until you get it.", name: "Arshdeep Singh", role: "Trainee Engineer, Adampur" },
    ],
  },
  "autocad-training-in-jalandhar": {
    tagline: "Learn 2D drafting and 3D modelling for civil, mechanical and architectural work.",
    pricing: [
      { term: "3 Months", price: "₹15,500" },
      { term: "6 Months", price: "₹45,500 – ₹55,500" },
      { term: "9 Months", price: "₹65,500 – ₹75,500" },
    ],
    salaryFresher: "₹12,000 – ₹25,000 a month for a fresher with a working portfolio.",
    salaryGrowth: "With two years of delivery experience that typically doubles.",
    projects: GENERIC_PROJECTS("AutoCAD"),
    testimonials: [
      { quote: "Small batch, real work, no time wasted on theory nobody uses.", name: "Arshdeep Singh", role: "Trainee Engineer, Adampur" },
      { quote: "Trainers correct your work daily rather than just moving to the next slide.", name: "Sandeep Kaur", role: "Placed Fresher, Phillaur" },
    ],
  },
  "solidworks-training-in-jalandhar": {
    tagline: "Learn parametric 3D modelling and assemblies for mechanical product design.",
    pricing: [
      { term: "3 Months", price: "₹15,500" },
      { term: "6 Months", price: "₹45,500 – ₹55,500" },
      { term: "9 Months", price: "₹65,500 – ₹75,500" },
    ],
    salaryFresher: "₹14,000 – ₹28,000 a month for a fresher with a working portfolio.",
    salaryGrowth: "With two years of delivery experience that typically doubles.",
    projects: GENERIC_PROJECTS("SolidWorks"),
    testimonials: [
      { quote: "My interviewer asked to see my project and that was the whole conversation.", name: "Neha Bansal", role: "Placed Fresher, Jalandhar" },
    ],
  },
  "3ds-max-training-in-jalandhar": {
    tagline: "Learn 3D modelling, lighting and photoreal rendering for architecture and product visuals.",
    pricing: [
      { term: "3 Months", price: "₹15,500" },
      { term: "6 Months", price: "₹45,500 – ₹55,500" },
      { term: "9 Months", price: "₹65,500 – ₹75,500" },
    ],
    salaryFresher: "₹14,000 – ₹28,000 a month for a fresher with a working portfolio.",
    salaryGrowth: "Typically doubles within two years; freelancers can earn more.",
    projects: GENERIC_PROJECTS("3ds Max"),
    testimonials: [
      { quote: "Small batch, real work, no time wasted on theory nobody uses.", name: "Karan Mehta", role: "B.Tech Student, Jalandhar" },
      { quote: "techcadd's placement cell kept calling me for drives until I was placed.", name: "Sandeep Kaur", role: "Placed Fresher, Phillaur" },
    ],
  },
  "revit-architecture-training-in-jalandhar": {
    tagline: "Learn building information modelling for architecture, structure and MEP coordination.",
    pricing: [
      { term: "3 Months", price: "₹15,500" },
      { term: "6 Months", price: "₹45,500 – ₹55,500" },
      { term: "9 Months", price: "₹65,500 – ₹75,500" },
    ],
    salaryFresher: "₹15,000 – ₹30,000 a month for a fresher with a working portfolio.",
    salaryGrowth: "With two years of delivery experience that typically doubles.",
    projects: GENERIC_PROJECTS("Revit"),
    testimonials: [
      { quote: "techcadd's placement cell kept calling me for drives until I was placed.", name: "Anjali Verma", role: "Career Switcher, Jalandhar Cantt" },
    ],
  },
  "digital-marketing-training-in-jalandhar": {
    tagline: "Learn the full paid, organic and analytics stack that brings a business customers online.",
    pricing: [
      { term: "3 Months", price: "₹18,500 – ₹25,500" },
      { term: "6 Months (Certificate)", price: "₹45,500 – ₹55,500" },
      { term: "9 Months (Diploma)", price: "₹65,500 – ₹75,500" },
    ],
    salaryFresher: "₹15,000 – ₹28,000 a month for a fresher with a working portfolio.",
    salaryGrowth: "With two years of delivery experience that typically doubles.",
    projects: [
      { title: "Digital Marketing Fundamentals Build", text: "Marketing funnels, positioning and WordPress basics." },
      { title: "Real-World Data Challenge", text: "Google Ads and Meta Ads worked with genuinely messy inputs." },
      { title: "Live Client Brief", text: "A real requirement pulled from techcadd's own delivery pipeline." },
      { title: "Portfolio Capstone", text: "A self-specified project covering retention marketing." },
    ],
    testimonials: [
      { quote: "The trainers correct your work daily rather than just moving to the next slide.", name: "Neha Bansal", role: "Placed Fresher, Jalandhar" },
      { quote: "My interviewer asked to see my project and that was the whole conversation.", name: "Pooja Rani", role: "Graduate, Kartarpur" },
    ],
  },
  "seo-training-in-jalandhar": {
    tagline: "Rank it. Prove it. Keep it. A programme on one live domain: design the imagery, build the site, then rank it across on-page, technical, local and off-page SEO.",
    pricing: [{ term: "3 Months (13 Weeks)", price: "₹15,500" }],
    salaryFresher: "₹15,000 – ₹28,000 a month for a fresher in Punjab.",
    salaryGrowth: "Punjab/Tricity fresher ₹1.8–3 LPA rising to ₹3.5–6 LPA after two years.",
    projects: [
      { title: "Live Site With a Complete Web Image Set", text: "Built in WordPress and Elementor." },
      { title: "100-Keyword Matrix & Dated Ranking Record", text: "Tracked with Semrush and Rank Math." },
      { title: "Map Pack Build & Live Outreach Campaign", text: "Run on Google Business Profile and Ahrefs." },
      { title: "Capstone: Complete Client Engagement Pack", text: "Delivered with Screaming Frog and Looker Studio." },
    ],
    testimonials: [
      { quote: "We ranked an actual client site, not a demo. My interviewer asked for proof and I just opened Search Console on my phone.", name: "Sourav Mehta", role: "SEO Executive, Jalandhar" },
      { quote: "I now run Google Business Profile optimisation for three clinics as a side service.", name: "Yuvraj Sandhu", role: "Local SEO Specialist, Kapurthala" },
    ],
  },
  "social-media-marketing-training-in-jalandhar": {
    tagline: "Make it, post it, then put money behind it — content creation and Meta Ads, from your own shoot to a live paid campaign.",
    pricing: [{ term: "4 Months (17 Weeks)", price: "Contact counsellor for current fee" }],
    salaryFresher: "₹14,000 – ₹26,000 a month for a Social Media Executive role in Punjab.",
    salaryGrowth: "Punjab/Tricity fresher ₹1.8–3.2 LPA rising to ₹3.5–6 LPA after two years.",
    projects: [
      { title: "Brand Design Set & Commercial Creative", text: "A ten-piece Canva set plus five retouched commercial creatives." },
      { title: "Five-Format Video Set From Your Own Footage", text: "Self-shot footage edited into five short-form videos." },
      { title: "UGC Pack, Media Kit & a Live Brand Campaign", text: "Three UGC videos, a media kit and twenty logged brand approaches." },
      { title: "Capstone: One Brand, End to End", text: "A month of content, shot and scheduled, plus a live optimised Meta campaign." },
    ],
    testimonials: [
      { quote: "The thirty-day content calendar we built for a real account is what got me hired.", name: "Anahita Sood", role: "Social Media Executive, Kapurthala" },
      { quote: "I started pitching brands with my three UGC videos before the programme even ended.", name: "Zara Kapoor", role: "UGC Creator, Jalandhar" },
    ],
  },
  "google-ads-ppc-training-in-jalandhar": {
    tagline: "Buy the right clicks, prove the result — from the auction to a managed account, spending a real budget across Search, Shopping, Display and YouTube.",
    pricing: [{ term: "2 Months (9 Weeks)", price: "Contact counsellor for current fee" }],
    salaryFresher: "Punjab/Tricity fresher ₹1.8–3.2 LPA.",
    salaryGrowth: "Typically rises to ₹3.5–6 LPA after two years.",
    projects: [
      { title: "Break-Even Model & Full Creative Pack", text: "A pricing calculator plus a display banner set." },
      { title: "300-Keyword Research File & Editor-Built Account", text: "Built in Google Ads Editor." },
      { title: "Measurement Stack & Live Search Campaigns", text: "Real budget, real search campaigns." },
      { title: "Capstone: Account Audit & Client Report", text: "A full account audit delivered as a client report." },
    ],
    testimonials: [
      { quote: "Real ad spend, real mistakes, real corrections. YouTube does not give you that.", name: "Abhinav Kalra", role: "PPC Executive, Jalandhar" },
      { quote: "I now audit accounts for two immigration consultancies as freelance work.", name: "Ravneet Bhatia", role: "Freelance Google Ads Consultant, Nakodar" },
    ],
  },
};
