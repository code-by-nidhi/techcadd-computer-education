// Content for the redesigned /about ("story") page — components/StoryPage.tsx.
// Where real data already exists elsewhere (courses, whyUs, steps, accreditations), the page imports
// it directly instead of duplicating it here, so there's one source of truth per fact.

import { site } from "@/lib/site";

export const heroCopy = {
  eyebrow: "About techcadd",
  headline: "Practical tech skills, built for the jobs employers are actually hiring for.",
  text:
    "Since 2016, techcadd has trained students across Punjab in the software local offices, studios and " +
    "agencies use every day — not simplified classroom versions of it.",
};

// "What Makes techcadd Different" — a separate, richer 9-point set for the About page, distinct from
// the 4-point `whyUs` in lib/content.ts (which the homepage's WhyUs.tsx still uses as-is).
export const differentiators = {
  eyebrow: "The difference",
  heading: "What makes techcadd different?",
  points: [
    {
      icon: "briefcase",
      title: "Industry-Oriented Curriculum",
      text: "Training is designed around practical skills and technologies relevant to today's digital workplace.",
    },
    {
      icon: "laptop",
      title: "Hands-On Learning",
      text: "Students get opportunities to apply concepts rather than relying solely on theoretical instruction.",
    },
    {
      icon: "cpu",
      title: "Emerging Technology Programs",
      // Tech list adapted to techcadd's real, currently-taught tracks rather than the AI/cloud list
      // this repo doesn't teach — same substitution made elsewhere on this page.
      text: "Learners can explore domains including Tally & GST accounting, AutoCAD-based CAD/CAM design, graphic design and digital marketing.",
    },
    {
      icon: "layers",
      title: "Projects & Industrial Exposure",
      text: "Project-based learning and industrial training help students connect classroom concepts with practical applications.",
    },
    {
      icon: "users",
      title: "Experienced Trainers & Mentors",
      text: "Guidance from trainers and mentors helps learners understand technical concepts and their real-world applications.",
    },
    {
      icon: "compass",
      title: "Career Guidance",
      text: "Students can receive guidance related to course selection, skill development, resumes, interviews and career pathways.",
    },
    {
      icon: "rocket",
      title: "Placement Assistance",
      text: "techcadd provides placement assistance and career support to eligible learners; actual employment decisions remain with recruiting organizations.",
    },
    {
      icon: "building",
      title: "Modern Learning Infrastructure",
      text: "Technology-focused learning environments are designed to support practical training and hands-on work.",
    },
    {
      icon: "network",
      title: "Industry & Academic Engagement",
      text: "techcadd has participated in workshops, training initiatives and placement activities with educational institutions, strengthening the connection between academic learning and industry-oriented skills.",
    },
  ],
};

// "Building skills across technology domains" — real 5-category bento grid. Icon + grid-span (larger
// spans for categories with more real courses) live here; course lists themselves come straight from
// lib/courses.ts via coursesIn() in the component, so there's one source of truth.
export const learningEcosystem = {
  eyebrow: "What you can learn",
  heading: "Explore future-ready skills across technology domains",
  // Verb list adapted to techcadd's real 5 tracks rather than the AI/cybersecurity/cloud list this
  // repo doesn't teach — same substitution made throughout this page.
  text:
    "Whether a learner wants to master office and accounting software, draft and model in CAD, design " +
    "visual content, grow a business online or type professionally in Punjabi, techcadd provides " +
    "multiple learning pathways.",
  categoryIcons: {
    "basic-accounting": "cpu",
    "civil-mechanical": "compass",
    "graphic-design": "palette",
    "digital-marketing": "megaphone",
    "punjabi-typing": "keyboard",
  } as Record<string, string>,
  // Real counts, not the reference page's "15+ Domains / 100+ Courses" (this repo has 5 real
  // categories and ~25 real courses — see lib/courses.ts). Student/partner figures match the
  // verified stats already used in the hero (lib/content.ts).
  statsStrip: [
    { value: "5", label: "Domains" },
    { value: "25+", label: "Courses" },
    { value: "25,000+", label: "Students" },
    { value: "500+", label: "Hiring Partners" },
  ],
};

export const whoWeAre = {
  paragraphs: [
    "techcadd is a computer training and skill-development institute focused on bridging the gap between " +
      "classroom learning and what local employers actually need. The institute combines practical, hands-on " +
      "exposure with project-based learning and career-oriented training.",
    "From accounting and office software to CAD/CAM design, graphic design and digital marketing, techcadd " +
      "teaches the real, industry-standard tools professionals use — not simplified textbook versions — so " +
      "every graduate leaves ready to work, not just certified.",
  ],
  teachIntro: "Real, industry-standard software across five tracks — the exact tools local employers hire for.",
  // A representative spread across all 5 real categories, capped at 16 for a compact pill row —
  // see lib/courses.ts for the full catalog (linked from the "Technology domains" section below).
  featuredCourseSlugs: [
    "basic-computer-course",
    "tally-prime-gst",
    "gst-taxation",
    "ms-office-advanced-excel",
    "punjabi-typing",
    "autocad",
    "solidworks",
    "catia",
    "revit-architecture",
    "cnc-programming-cam",
    "graphic-design",
    "adobe-photoshop",
    "coreldraw",
    "digital-marketing",
    "seo",
    "google-ads-ppc",
  ],
};

export const learningFlow = {
  eyebrow: "From classroom to practical experience",
  steps: [
    { num: "01", icon: "learn", title: "Learn", text: "Understand the concepts and fundamentals." },
    { num: "02", icon: "practice", title: "Practice", text: "Apply knowledge through hands-on exercises and guided learning." },
    { num: "03", icon: "build", title: "Build", text: "Work on projects and practical applications." },
    { num: "04", icon: "grow", title: "Grow", text: "Develop professional confidence and career-oriented skills." },
  ],
  badge: "Live Projects • Industrial Training • Internships",
  text:
    "This practical orientation is reflected in techcadd's publicly described offerings, which include live " +
    "projects, industrial training programs and internship opportunities.",
};

export const skillEcosystem = {
  eyebrow: "More Than Training",
  heading: "A skill-building ecosystem.",
  paragraphs: [
    "At techcadd, technology education is designed to go beyond textbooks and conventional " +
      "classroom learning. The focus is on helping learners learn, implement and grow by combining " +
      "conceptual understanding with practical application.",
    // Trailing technology list adapted to techcadd's real, currently-taught tracks (Tally/GST, CAD/CAM,
    // graphic design, digital marketing) rather than the AI/cloud list this repo doesn't teach.
    "Students can work on assignments, projects, industrial training and internship-oriented " +
      "learning experiences that help them understand how technology is applied in real-world " +
      "environments — through practical workshops and training activities in areas such as Tally & " +
      "GST accounting, AutoCAD-based CAD/CAM design, graphic design and digital marketing.",
  ],
  highlight: "learn, implement and grow",
  images: ["/about-menu/about-techcadd.jpg", "/about-menu/mission-vision.jpg", "/about-menu/our-team.jpg"],
};

export const whyItMatters = [
  {
    title: "Software changes fast",
    text: "The tools employers use are updated constantly — training that doesn't keep pace becomes useless quickly.",
  },
  {
    title: "Employers expect current skills",
    text: "Recruiters test what you can actually do in the software, not what a certificate claims you learned.",
  },
  {
    title: "A certificate should mean something",
    text: "ISO-audited curriculum review and verifiable credentials back every certificate techcadd issues.",
  },
];

export const audiences = [
  { icon: "🎓", title: "Students", text: "After 10th or 12th, building a practical skill alongside school." },
  { icon: "📜", title: "Graduates", text: "Job-ready skills the degree alone didn't cover." },
  { icon: "💼", title: "Working Professionals", text: "Upskilling on evenings and weekends without quitting the day job." },
  { icon: "🔄", title: "Career Switchers", text: "A structured, practical route into a new field." },
  { icon: "🚀", title: "Entrepreneurs", text: "Skills to run accounts, design and marketing in-house." },
];

export const ourApproach = {
  eyebrow: "Our approach",
  heading: "Practical. Future-Focused. Career-Oriented.",
  highlight: "Career-Oriented.",
  text: "techcadd's approach is built around three principles.",
  pillars: [
    { title: "Relevance", text: "Learn technologies and skills that connect with evolving industry requirements." },
    { title: "Application", text: "Turn concepts into practical skills through projects, exercises and hands-on learning." },
    { title: "Growth", text: "Develop the mindset and adaptability required to keep learning in a rapidly changing technology landscape." },
  ],
};

export const industryEngagement = {
  eyebrow: "Industry engagement",
  heading: "Connecting education with industry",
  paragraphs: [
    "A major part of techcadd's broader ecosystem is its engagement with educational institutions and " +
      "industry-oriented initiatives. Public records show techcadd participating in campus placement " +
      "activities and technology workshops with educational institutions, providing students with " +
      "opportunities for industry interaction and practical exposure.",
    "These interactions help strengthen the bridge between what students learn and how technology is " +
      "applied professionally.",
  ],
  image: "/about-menu/industry-partnerships.jpg",
};

export const industryPartners = [
  {
    name: "I.K. Gujral Punjab Technical University",
    text: "Campus placement drive run with the university's students.",
  },
  {
    name: "Alpine Girl's (AIIT) College",
    text: "On-campus workshops and skill sessions for students.",
  },
  {
    name: "Quest Group of Institutions",
    text: "A technology workshop run in collaboration with the institution.",
  },
];

export const awardsRecognition = {
  eyebrow: "Awards, recognition & accreditation",
  heading: "Recognition built through learning, innovation and industry engagement",
  text:
    "techcadd's credibility is supported not only by its training programs but also by its participation " +
    "in industry-academia initiatives, campus placements, workshops, technology events and institutional " +
    "collaborations.",
  cards: [
    {
      icon: "shield",
      title: "ISO 9001:2015 Certified",
      text: "Certified since 2022 by the International Organization for Standardization, with annual external audits.",
    },
    {
      icon: "link",
      title: "Industry-Academia Engagement",
      text: "techcadd has participated in institutional initiatives and placement activities, including a joint campus placement drive hosted by I.K. Gujral Punjab Technical University in November 2025.",
    },
    {
      icon: "cap",
      title: "Academic Collaboration",
      text: "Publicly available information also records techcadd's collaboration with educational institutions for skill development, workshops and experiential learning initiatives.",
    },
    {
      icon: "spark",
      title: "Technology & Innovation Initiatives",
      text: "techcadd has participated in AI and robotics-focused initiatives, including demonstrations involving its AI robotic dog Chi-Chi at educational and technology events.",
    },
  ],
  footnote: "The recognitions above are drawn from publicly available information, institutional announcements and techcadd's own published profiles.",
};

// Every year 2016-2026 now has its own milestone card. 2016/2019/2020/2022/2026 keep this repo's
// original, independently-verified phrasing (MSME/DPIIT/ISO detail, the real 2026 branch list).
// 2017/2018/2024/2025 are institute-specific facts supplied directly by the site owner, not sourced
// from a public listing. 2021 and 2023 replace the requested "Web Dev/Python/Cloud/Data Science" and
// "AI/ML/Cyber Security/DevOps" copy — this repo's real course catalog (lib/courses.ts) has neither;
// it only teaches Basic & Accounting, Punjabi Typing, Civil/Mechanical CAD, Graphic Design and Digital
// Marketing, so those two entries were swapped for real expansions in that actual catalog instead.
export const journey = [
  { year: "2016", title: "Founded in Jalandhar", text: "techcadd started with a vision to bridge the gap between education and industry through practical, hands-on technology training.", icon: "foundation" },
  { year: "2017", title: "Industrial Training Programs", text: "Introduced structured 45-day and 6-month industrial training programs for students.", icon: "training" },
  { year: "2018", title: "Placement Support Cell", text: "Established a dedicated placement assistance and career guidance cell for every batch.", icon: "growth" },
  { year: "2019", title: "MSME Registered", text: "Registered with the Ministry of MSME, Government of India — strengthening institutional credibility and recognition.", icon: "certificate" },
  { year: "2020", title: "Startup India Recognised", text: "Recognised by DPIIT, Government of India under Startup India, for its contribution to skill development and technology education.", icon: "certificate" },
  { year: "2021", title: "Design & Marketing Programs Added", text: "Expanded the course portfolio with Graphic Design and Digital Marketing programs — Photoshop, CorelDRAW, SEO and social media marketing among them.", icon: "expansion" },
  { year: "2022", title: "ISO 9001:2015 Certified", text: "Achieved ISO 9001:2015 certification for training quality — externally audited every year since.", icon: "certificate" },
  { year: "2023", title: "Engineering & CAD Programs Expanded", text: "Strengthened the Civil & Mechanical track with industry-standard CAD tools, including AutoCAD, SolidWorks and Revit Architecture.", icon: "expansion" },
  { year: "2024", title: "25,000+ Students Trained", text: "Reached a major milestone in student training and career development.", icon: "growth" },
  { year: "2025", title: "500+ Hiring Partners", text: "Expanded industry partnerships and placement opportunities across multiple sectors.", icon: "expansion" },
  { year: "2026", title: "7 Branches Across Punjab", text: "Operating across Chandigarh, Mohali, Ludhiana, Jalandhar, Amritsar, Phagwara and Hoshiarpur — with a placement network to match.", icon: "expansion" },
];

export const ourJourneyHeader = {
  eyebrow: "Our Journey",
  heading: "A Decade of Building Careers",
  text:
    "From a single training centre to a multi-branch technology education ecosystem, techcadd has " +
    "continuously evolved to create practical learning opportunities and career pathways for students.",
};

export const belief = {
  eyebrow: "Our belief",
  lines: ["Technology changes.", "Skills evolve.", "Learning never stops."],
  highlight: "Learning never stops.",
  text:
    "We believe that meaningful technology education should not end when a course ends. It should give " +
    "learners the knowledge to understand, the skills to build, the confidence to perform and the " +
    "curiosity to keep growing.",
  today: {
    eyebrow: "techcadd today",
    // Reuses the same real "learn, implement and grow" phrase from the Skill-Building Ecosystem section.
    tagline: ["Learn.", "Implement.", "Grow."],
    text:
      "With a focus on practical technology education, emerging skills, industry engagement and career " +
      "development, techcadd continues its journey towards creating a stronger ecosystem of future-ready " +
      "technology professionals.",
    signatureLabel: site.tagline,
    signatureTagline: "Where Your Tech Journey Begins.",
  },
};
