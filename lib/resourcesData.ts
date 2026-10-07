import { site } from "@/lib/site";

// Content for /resources (app/resources/page.tsx), taken from the live reference pages
// techcaddjalandhar.com/tools and /tools/free-modules. The four interactive tools themselves aren't
// rebuilt in this repo — their cards open the live tool on the reference site (see TOOLS_BASE).
const TOOLS_BASE = "https://techcaddjalandhar.com/tools";

export const resourcesSeo = {
  title: "Free Tools & Resources",
  description:
    "Free career tools, learning modules and starter toolkits from techcadd — built around the same courses and training formats we actually run.",
};

// Left-hand link list of the header's Resources dropdown — the same options, in the same order, as
// the reference site's Resources menu. Only FAQ exists on this site; the rest open on the reference
// site in a new tab.
const REF = "https://techcaddjalandhar.com";
export type ResourceMenuLink = { label: string; href: string; external: boolean; isNew?: boolean };

export const resourceMenuLinks: ResourceMenuLink[] = [
  { label: "Find My Career Track", href: `${TOOLS_BASE}/career-track-finder`, external: true, isNew: true },
  { label: "Training Matcher", href: `${TOOLS_BASE}/training-matcher`, external: true, isNew: true },
  { label: "Salary Estimator", href: `${TOOLS_BASE}/salary-estimator`, external: true, isNew: true },
  { label: "Placements & Salaries", href: `${REF}/placements`, external: true, isNew: true },
  { label: "Compare Courses", href: `${REF}/compare`, external: true },
  { label: "Free Career Counselling", href: `${REF}/career-counselling`, external: true },
  { label: "1:1 Mentorship", href: `${REF}/mentorship`, external: true },
  { label: "AI Marketing", href: `${REF}/ai-marketing`, external: true },
  { label: "Freelancing", href: `${REF}/freelancing`, external: true },
  { label: "Why techcadd", href: `${REF}/why-techcadd`, external: true },
  { label: "Blogs", href: `${REF}/blogs`, external: true },
  { label: "Pages", href: `${REF}/pages`, external: true },
  { label: "Events", href: `${REF}/events`, external: true },
  { label: "Gallery", href: `${REF}/gallery`, external: true },
  { label: "FAQ", href: "/faq", external: false },
  { label: "Reviews", href: `${REF}/reviews`, external: true },
  { label: "College Partnerships", href: `${REF}/college-partnerships`, external: true },
];

export const resourcesHero = {
  badge: "Free Tools",
  title: "Free tools",
  highlight: "to plan your next move.",
  text: "Free, interactive and built around the same courses and training formats we actually run — no generic advice, just your matched option.",
};

/** `image` (public/resources) is the poster shown on the tool's card in the header's Resources dropdown. */
export type ResourceTool = { tag: string; title: string; text: string; cta: string; href: string; external: boolean; image?: string };

export const resourceTools: ResourceTool[] = [
  {
    tag: "4 Questions · 2 Minutes",
    title: "Find My IT / CAD Career Track",
    text: "Background, goal and preferred mode — answer three questions and see your curriculum roadmap instantly, free.",
    cta: "Find my track",
    href: `${TOOLS_BASE}/career-track-finder`,
    external: true,
    image: "/resources/career-track-finder.webp",
  },
  {
    tag: "Instant Match",
    title: "6-Week & 6-Month Training Matcher",
    text: "University, branch and semester — see your matched live project track and duration instantly.",
    cta: "Match my training",
    href: `${TOOLS_BASE}/training-matcher`,
    external: true,
    image: "/resources/training-matcher.webp",
  },
  {
    tag: "Punjab & NCR",
    title: "Tech Salary & Career Growth Estimator",
    text: "Fresher vs 2-year salary ranges by role, plus where our graduates actually get hired.",
    cta: "Estimate my salary",
    href: `${TOOLS_BASE}/salary-estimator`,
    external: true,
    image: "/resources/salary-estimator.webp",
  },
  {
    tag: "Interactive Payback",
    title: "Course ROI & Salary Growth Calculator",
    text: "Calculate your course investment payback period, 3-year projected earnings, and monthly 0% EMI options.",
    cta: "Calculate my ROI",
    href: `${TOOLS_BASE}/roi-calculator`,
    external: true,
  },
  {
    tag: "100% Free Open Learning",
    title: "Free Learning Modules & Starter Toolkits",
    text: "Access free primers for Digital Marketing, Full Stack Web Development, Python AI, and Cybersecurity.",
    cta: "Access free modules",
    href: "#free-modules",
    external: false,
  },
];

export const freeModulesHeader = {
  eyebrow: "100% Free Open Educational Resources",
  heading: "Free Tech Learning Modules & Starter Toolkits",
  text:
    "Experience techcadd's hands-on teaching pedagogy before enrolling. Access free crash course primers, " +
    "syllabus checklists, and lab roadmaps for Digital Marketing, Full Stack Web Development, Python AI, and Cybersecurity.",
  ticks: [
    "No Credit Card Required",
    "Instant Lesson Access",
    "Verified 2026 Industry Syllabi",
    `Live Demo Available at our ${site.city} Campus`,
  ],
};

export type FreeModule = {
  category: string;
  duration: string;
  title: string;
  text: string;
  lessons: string[];
  outcome: string;
};

export const freeModules: FreeModule[] = [
  {
    category: "Marketing & Growth",
    duration: "2.5 Hours",
    title: "7-Day Digital Marketing & SEO Jumpstart Primer",
    text: "Learn the fundamentals of high-intent keyword research, Google Business Profile ranking in Punjab cities, and how to structure your first high-converting Meta Ad campaign.",
    lessons: [
      "How Search Engines Rank Local Businesses in 2026",
      "Finding $5,000/mo Buyer Keywords with Free Tools",
      "On-Page SEO Checklist & Schema Markup Basics",
      "Launching Your First Meta & Instagram Ad Campaign",
      "Google Business Profile (GMB) 3-Pack Optimization",
    ],
    outcome: "Master local business SEO and launch a live lead campaign with verified ROI metrics.",
  },
  {
    category: "Web Engineering",
    duration: "3.5 Hours",
    title: "Modern Full-Stack JavaScript & React 19 Starter Kit",
    text: "From zero HTML/CSS to building your first interactive React 19 component with Tailwind CSS, clean Git commits, and free cloud hosting on Vercel.",
    lessons: [
      "Modern HTML5 Semantic Tags & CSS Flexbox/Grid",
      "Modern JavaScript (ES6+): Arrow Functions, Promises & Fetch",
      "Introduction to React 19, Components & State Hooks",
      "Styling like a Pro with Tailwind CSS",
      "Deploying Your Web Portfolio to Vercel with Git",
    ],
    outcome: "Publish a live, responsive portfolio website on your own custom subdomain.",
  },
  {
    category: "Data & Artificial Intelligence",
    duration: "3 Hours",
    title: "Python 3, Data Analytics & First AI Chatbot Primer",
    text: "Learn Python programming essentials, manipulate real business data in Pandas, and build a working AI chatbot connecting to OpenAI and Claude APIs.",
    lessons: [
      "Python Fundamentals: Variables, Lists, Loops & Functions",
      "Data Cleaning & Analysis with Pandas & Jupyter Notebooks",
      "Visualizing Business Metrics with Matplotlib & Seaborn",
      "What are LLMs, Embeddings & Vector Databases?",
      "Writing Your First Python Script to Query the OpenAI API",
    ],
    outcome: "Analyze real datasets and build an interactive AI chatbot running on your machine.",
  },
  {
    category: "Cybersecurity",
    duration: "2 Hours",
    title: "Cybersecurity Fundamentals & Ethical Hacking Defense Kit",
    text: "Understand how malicious hackers penetrate networks, how to use Kali Linux for defensive security audits, and how to secure cloud environments.",
    lessons: [
      "The Hacker Mindset: Reconnaissance & Vulnerability Scanning",
      "Kali Linux Command Line & Essential Networking Tools",
      "How Wi-Fi Passwords & Passkeys Work (and Fail)",
      "Preventing Web App Exploits (SQL Injection & XSS)",
      "Building a Career in Indian & Global Cybersecurity",
    ],
    outcome: "Conduct a basic vulnerability scan and understand career paths in defense and pen-testing.",
  },
];

// Same pre-filled WhatsApp request the reference page's "Request Free Access" buttons send.
export function moduleWhatsAppHref(title: string) {
  const message = `Hello techcadd! I would like to access the free resources and lesson materials for "${title}". Please send details.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const capstones = {
  eyebrow: "From Beginner to Builder",
  heading: "Capstone Projects Built in techcadd Comprehensive Batches",
  text: "Once you complete the free starter kits, step into our ISO 9001:2015 certified diplomas where you build commercial production applications and performance marketing engines.",
  projects: [
    {
      category: "Digital Marketing & CRO",
      title: "Hyper-Local Performance Marketing & Lead Generation Engine",
      text: "Students build a complete multi-tier performance funnel for a real enterprise. Includes audience segmentation, conversion rate optimization (CRO) landing pages, UTM hygiene, attribution modeling, and automated CRM lead syncing.",
      outcome: "Generated 1,420+ qualified leads at ₹84 CPL with 4.2x ROAS across Punjab and NCR markets",
    },
    {
      category: "Full-Stack Web Engineering",
      title: "Production Next.js & MERN Stack Multi-Vendor E-Commerce Platform",
      text: "An enterprise-grade e-commerce application featuring real-time inventory management, secure payments, JWT authentication with refresh token rotation, search indexation, and automated tax invoicing.",
      outcome: "98/100 Google Lighthouse Core Web Vitals score with sub-200ms API response times",
    },
  ],
};
