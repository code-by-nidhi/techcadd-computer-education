import { site } from "@/lib/site";

export type AboutCard = {
  icon?: "iso" | "msme" | "startup";
  title: string;
  badge?: string;
  authority?: string;
  text: string;
  benefits?: string[];
};

export type AboutTrustCard = {
  ratingValue: string;
  ratingCount: string;
  text: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export type AboutSection = {
  id?: string;
  eyebrow?: string;
  heading: string;
  body?: string[];
  points?: string[];
  /** Renders as a centered card grid instead of body/points — see components/AboutBlocks.tsx.
   *  "feature" (default) is a simple title+text card; "certification" adds an icon, badge, authority and benefits. */
  cards?: AboutCard[];
  cardStyle?: "feature" | "certification";
  /** Renders a single centered trust/review card instead of body/points/cards. */
  trustCard?: AboutTrustCard;
};

export type AboutStat = { value: string; label: string };

export type AboutGalleryItem = { image: string; caption: string };

export type AboutPageData = {
  slug: string;
  href: string; // canonical URL — "story" resolves to /about instead of /about/story
  /** Shown in the mega menu / breadcrumbs when this entry isn't the page's own title. */
  navLabel: string;
  navBadge: string;
  navMeta: string;
  navImage: string;
  inMenu: boolean; // whether this entry appears in the About mega menu
  title: string;
  subtitle: string;
  heroBadge: string;
  heroDescription: string;
  heroImage: string;
  sections: AboutSection[];
  stats: AboutStat[];
  gallery: AboutGalleryItem[];
  seo: { title: string; description: string };
  /** Closing section before the footer. "banner" (default) is the standard dark CtaBanner;
   *  "lead" is the bigger phone-capture CTA + CtaStrip — see app/about/[slug]/page.tsx. */
  finalCta?: "banner" | "lead";
};

// Centralized content for every /about/[slug] page, and the source the About mega menu is generated
// from (see components/Header.tsx). Add a new entry here and it shows up in the menu automatically —
// no new page files or menu wiring required.
export const aboutData: Record<string, AboutPageData> = {
  story: {
    slug: "story",
    href: "/about",
    navLabel: "About techcadd",
    navBadge: "Story",
    navMeta: `Since ${site.since}`,
    navImage: "/about-menu/about-techcadd.jpg",
    inMenu: true,
    title: `About ${site.fullName}`,
    subtitle: `${site.tagline} — training students since ${site.since}.`,
    heroBadge: "Who we are",
    heroDescription:
      `Since ${site.since}, ${site.name} has trained students across Punjab in the computer skills that local ` +
      `businesses hire for — office software, accounting, CAD/CAM design, digital marketing and graphic design.`,
    heroImage: "/about-menu/about-techcadd.jpg",
    sections: [
      {
        eyebrow: "Who we are",
        heading: "Practical computer education, built around real work",
        body: [
          `Every course is taught on the actual software used in the industry, in small batches, with daily ` +
            `practicals and live projects. Our goal is simple: when you finish, you should be ready to work.`,
        ],
      },
      {
        eyebrow: "Why techcadd?",
        heading: "What makes us different",
        points: [
          "Industry-Built Curriculum — real software (Tally, AutoCAD, Adobe, Google Ads), updated as job requirements change",
          "Certified Trainers — working accountants, designers, CAD engineers and marketers, not just instructors",
          "Placement Support — 500+ hiring partners, resume help, mock interviews and regular placement drives",
          "Flexible Batches — morning, evening and weekend batches, 45-day to 12-month formats, EMI options",
        ],
      },
      {
        id: "placements",
        eyebrow: "Placement support",
        heading: "From classroom to career",
        body: [
          "Our placement cell works with 500+ hiring partners — CA firms, architects, manufacturers, agencies " +
            "and print houses — taking students from counselling through to placement drives.",
        ],
        points: [
          "Day 1 — Career counselling: talk to a counsellor and pick the track that fits your goal and qualification",
          "Core Term — Classroom & lab: small batches, daily practicals and doubt sessions",
          "Final Phase — Live projects: real assignments for your portfolio, plus an internship letter",
          "Completion — Placement drives: certificate, mock interviews and drives with hiring partners",
        ],
      },
      {
        eyebrow: "Our branches",
        heading: "Across Punjab & Chandigarh",
        points: site.branches,
      },
    ],
    stats: [
      { value: "25,000+", label: "Students trained" },
      { value: "2 Decades", label: "Of training experience" },
      { value: "500+", label: "Hiring partners" },
      { value: "4.9★", label: "Google rating" },
    ],
    gallery: [
      { image: "/about-menu/about-techcadd.jpg", caption: "Classroom & lab sessions" },
      { image: "/about-menu/mission-vision.jpg", caption: "Student orientation" },
      { image: "/about-menu/our-team.jpg", caption: "Our trainers" },
    ],
    seo: {
      title: "About Us",
      description: `${site.tagline} — practical, job-focused computer education trusted across Punjab since ${site.since}.`,
    },
  },

  "mission-vision": {
    slug: "mission-vision",
    href: "/about/mission-vision",
    navLabel: "Mission and Vision",
    navBadge: "Purpose",
    navMeta: "Our direction",
    navImage: "/about-menu/mission-vision.jpg",
    inMenu: true,
    title: "Mission & Vision",
    subtitle: "Industry-built courses, certified trainers and real projects — so every student leaves job-ready.",
    heroBadge: "Purpose",
    heroDescription:
      "Our mission is simple: teach the exact software and workflows local employers hire for, so every " +
      "graduate walks into their first day of work already knowing the job.",
    heroImage: "/about-menu/mission-vision.jpg",
    sections: [
      {
        eyebrow: "Mission",
        heading: "Job-ready from day one",
        body: [
          "We built techcadd around one belief: a certificate should mean something. Every course runs on the " +
            "real software employers use — Tally, AutoCAD, SolidWorks, Adobe, Google Ads — not simplified " +
            "training versions, so what you practise in the lab is exactly what you'll do at work.",
        ],
      },
      {
        eyebrow: "Vision",
        heading: "The region's most trusted skilling partner",
        body: [
          "We want to be the first name Punjab's students, parents and employers think of for practical, " +
            "verifiable computer skills — backed by ISO-certified processes, real hiring partnerships and " +
            "trainers who still work in the field they teach.",
        ],
      },
      {
        eyebrow: "How we deliver it",
        heading: "The pillars behind every course",
        points: [
          "Industry-Built Curriculum — syllabus built around real workflows, reviewed as job requirements change",
          "Certified Trainers — small batches, daily doubt-clearing, one-on-one attention",
          "Placement Support — 500+ hiring partners, resume help, mock interviews and placement drives",
          "Flexible Batches — morning, evening and weekend formats with EMI options",
        ],
      },
    ],
    stats: [
      { value: "25,000+", label: "Students trained" },
      { value: "500+", label: "Hiring partners" },
      { value: "4.9★", label: "Google rating" },
    ],
    gallery: [
      { image: "/about-menu/mission-vision.jpg", caption: "Orientation & counselling" },
      { image: "/about-menu/about-techcadd.jpg", caption: "Daily practicals" },
    ],
    seo: {
      title: "Mission & Vision",
      description: "techcadd's mission and vision — practical, job-focused computer education for Punjab.",
    },
  },

  "accreditations-awards": {
    slug: "accreditations-awards",
    href: "/about/accreditations-awards",
    navLabel: "Accreditations & Awards",
    navBadge: "Trust",
    navMeta: "Recognised",
    navImage: "/about-menu/iso-certified.jpg",
    inMenu: true,
    title: "Accreditations & Awards",
    subtitle: "Recognised for the training, not just for saying so.",
    heroBadge: "Trust",
    heroDescription:
      "techcadd's credentials are verifiable, not just claimed — ISO-certified quality management, MSME " +
      "registration and Startup India recognition back every course we run.",
    heroImage: "/about-menu/iso-certified.jpg",
    sections: [
      {
        eyebrow: "Why it matters",
        heading: "Why accreditation matters for your career",
        body: ["Not all certificates are equal. Here's why TechCadd's accreditation gives your certificate real weight."],
        cards: [
          {
            title: "Employer Trust",
            text: "Recruiters and established IT companies verify an institute's credentials before treating its certificate as a hiring signal. TechCadd's certifications and registrations strengthen employer confidence.",
          },
          {
            title: "Loan & Education Finance",
            text: "Recognized institutions are often preferred by banks and financial organizations when evaluating education financing and training-related support.",
          },
          {
            title: "Quality Assurance",
            text: "Accreditation reflects a commitment to maintaining quality standards, updated curriculum, instructor excellence, and continuous improvement.",
          },
          {
            title: "Government & Institutional Recognition",
            text: "Industry-recognized certifications can improve acceptance in training, employment, and professional development opportunities.",
          },
        ],
      },
      {
        eyebrow: "Our Certifications",
        heading: "Three credentials, verifiable against their issuers",
        body: ["All accreditations below are current and verifiable through their respective issuing authorities."],
        cardStyle: "certification",
        cards: [
          {
            icon: "iso",
            title: "ISO 9001:2015 Certified",
            badge: "Since 2022",
            authority: "International Organization for Standardization",
            text:
              "TechCadd follows internationally recognised quality management practices to ensure consistent " +
              "training standards, curriculum excellence, student support, and continuous institutional improvement.",
            benefits: [
              "External quality audits",
              "Standardised training processes",
              "Curriculum review mechanisms",
              "Continuous quality improvement",
            ],
          },
          {
            icon: "msme",
            title: "MSME Registered",
            badge: "Since 2019",
            authority: "Ministry of Micro, Small & Medium Enterprises, Government of India",
            text:
              "TechCadd operates as a registered educational enterprise under MSME, strengthening institutional " +
              "credibility and supporting participation in skill-development initiatives.",
            benefits: [
              "Government-recognised institution",
              "Public-sector acceptance",
              "Skill-development partnership eligibility",
              "Verified Udyam registration",
            ],
          },
          {
            icon: "startup",
            title: "Startup India Recognised",
            badge: "Since 2020",
            authority: "Department for Promotion of Industry and Internal Trade (DPIIT)",
            text:
              "Recognition under Startup India reflects TechCadd's contribution to innovation, technology " +
              "education, entrepreneurship, and workforce development.",
            benefits: [
              "DPIIT-recognised institution",
              "Innovation ecosystem participation",
              "Collaboration opportunities",
              "Startup ecosystem credibility",
            ],
          },
        ],
      },
      {
        eyebrow: "Trust & Reviews",
        heading: "Trusted by hundreds of students across Punjab",
        body: [
          "Our reviews are publicly available and verifiable on Google. We do not collect or curate reviews on " +
            "our own platform.",
        ],
        trustCard: {
          ratingValue: "4.9",
          ratingCount: "750+",
          text: "From 750+ verified reviews on Google — publicly visible and checkable directly on our Google Business Profile.",
          primaryCta: { label: "Read the Reviews", href: site.mapUrl },
          secondaryCta: { label: "View Google Profile", href: site.mapUrl },
        },
      },
    ],
    // No separate stats/gallery here — "Our Certifications" above already covers ISO/MSME/Startup India
    // in more detail, and the old recap + placeholder-image gallery were redundant.
    stats: [],
    gallery: [],
    seo: {
      title: "Accreditations & Awards",
      description:
        "techcadd is ISO 9001:2015 certified, MSME registered and Startup India recognised — verifiable " +
        "credentials, not just claims.",
    },
    finalCta: "lead",
  },

  "our-team": {
    slug: "our-team",
    href: "/about/our-team",
    navLabel: "Our Team",
    navBadge: "People",
    navMeta: "Trainers & mentors",
    navImage: "/about-menu/our-team.jpg",
    inMenu: true,
    title: "Our Team",
    subtitle: "Learn from working accountants, designers, CAD engineers and marketers — practitioners first, instructors second.",
    heroBadge: "People",
    heroDescription:
      "Every trainer at techcadd still works in the field they teach, so what you learn in the lab is what " +
      "they're doing in their own jobs this week.",
    heroImage: "/about-menu/our-team.jpg",
    sections: [
      {
        eyebrow: "Certified trainers",
        heading: "Practitioners first, instructors second",
        body: [
          "Small batches and daily doubt-clearing sessions mean you get one-on-one time with trainers who are " +
            "actively working accountants, CAD engineers, designers and digital marketers — not people reading " +
            "off a slide deck.",
        ],
      },
      {
        eyebrow: "Coverage",
        heading: "Trainers across every track we teach",
        points: [
          "Accounting — Tally Prime, BUSY, GST returns and Advanced Excel",
          "Civil / Mechanical CAD — AutoCAD, SolidWorks, CATIA, Revit, 3ds Max, Fusion 360",
          "Digital Marketing — Google Ads, Meta Ads, Analytics, SEO",
          "Graphic Design — Photoshop, Illustrator, CorelDRAW, InDesign",
        ],
      },
      {
        eyebrow: "Support",
        heading: "Placement cell",
        body: [
          "Our placement cell works alongside the training team with 500+ hiring partners — CA firms, " +
            "architects, manufacturers, agencies and print houses — running resume reviews, mock interviews " +
            "and regular placement drives.",
        ],
      },
    ],
    stats: [
      { value: "500+", label: "Hiring partners" },
      { value: "25,000+", label: "Students trained" },
    ],
    gallery: [
      { image: "/about-menu/our-team.jpg", caption: "Our trainers" },
      { image: "/about-menu/about-techcadd.jpg", caption: "Daily practicals" },
    ],
    seo: {
      title: "Our Team",
      description: "Meet techcadd's trainers — working accountants, CAD engineers, designers and marketers.",
    },
  },

  founder: {
    slug: "founder",
    href: "/about/founder",
    navLabel: "Our Founder",
    navBadge: "Founder",
    navMeta: "Gourav Gupta",
    navImage: "/about-menu/founder.jpg",
    inMenu: false, // has its own Footer link; kept out of the mega menu's 4-card row
    title: "Gourav Gupta",
    subtitle: `Founder of ${site.fullName} — entrepreneur, mentor and career coach.`,
    heroBadge: "Founder",
    heroDescription:
      "Every successful journey begins with a dream, but only a few are built through relentless hard work, " +
      "courage and the determination to never give up.",
    heroImage: "/about-menu/founder.jpg",
    sections: [
      {
        eyebrow: "About the founder",
        heading: "From an auto rickshaw to an academy",
        body: [
          "Gourav Gupta is an entrepreneur, mentor and career coach whose life journey is a powerful example " +
            "of resilience, self-belief and the transformative power of education. From facing financial " +
            "challenges and driving an auto to complete his engineering education, to building an organization " +
            "from the ground up, his story reflects a simple yet powerful belief: your circumstances may shape " +
            "your beginning, but your determination shapes your future.",
          "Today, he is recognized for his entrepreneurial vision, commitment to skill-based education and " +
            "passion for helping students and aspiring professionals discover their potential.",
        ],
      },
    ],
    stats: [],
    gallery: [],
    seo: {
      title: "Our Founder — Gourav Gupta",
      description: `Gourav Gupta, founder of ${site.fullName} — entrepreneur, mentor and career coach.`,
    },
  },
};

export const aboutMenuItems = Object.values(aboutData).filter((item) => item.inMenu);

export function getAboutEntry(slug: string) {
  return Object.values(aboutData).find((item) => item.slug === slug);
}
