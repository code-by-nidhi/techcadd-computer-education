// Content for the redesigned /about/mission-vision page (components/MissionVisionPage.tsx).
//
// The live reference page (techcaddjalandhar.com/about/mission-vision) was checked while building this,
// but its hero and "commitments" copy describe AI/ML/data-science/generative-AI programs and listed a
// different set of five commitments than the four the request itself gave verbatim — neither matches
// this repo's real, already-confirmed course catalog (lib/courses.ts has no AI/ML/data-science courses)
// or the four commitments the request asked to keep unchanged. So: the four commitments below are used
// exactly as given (verbatim, no wording changed); the hero/vision/mission copy reuses this repo's own
// existing, real Mission & Vision content (lib/aboutData.ts "mission-vision" entry) instead of the
// reference page's AI-focused copy, since that's the accurate description of what techcadd actually
// teaches. The CTA heading/buttons match across the request, the reference page and this repo's
// existing LeadCta copy, so those are used with confidence. `missionPillars` (added afterwards) was
// then given directly, verbatim, by the request that added it — it's the same "commitments" list the
// reference page returned, now explicitly confirmed as wanted content rather than treated as unreliable.
export const missionVisionSeo = {
  title: "Mission & Vision",
  description: "techcadd's mission and vision — practical, job-focused computer education for Punjab.",
};

export const missionVisionHero = {
  label: "Purpose",
  heading: "Mission & Vision",
  description:
    "Our mission is simple: teach the exact software and workflows local employers hire for, so every " +
    "graduate walks into their first day of work already knowing the job.",
};

// The reference page's live "commitments" list — given directly, verbatim, by the request that added
// this section (matches what that same page returned when checked while building the page above).
export const missionPillarsHeader = {
  badge: "Our Mission",
  heading: "Bridging Education with Industry",
  text:
    "Our mission is to build a strong training ecosystem where learners can access advanced " +
    "technology, practical exposure, and industry-relevant skills that prepare them for real-world " +
    "opportunities.",
};

export const missionPillars = [
  {
    title: "Make Technology Accessible",
    text: "Provide learners with relevant and accessible technology education.",
    icon: "access",
  },
  {
    title: "Prioritize Practical Learning",
    text: "Go beyond theory through projects, hands-on training, and real-world exposure.",
    icon: "practical",
  },
  {
    title: "Build Industry-Ready Talent",
    text: "Develop skills that align with evolving industry requirements and employment opportunities.",
    icon: "talent",
  },
  {
    title: "Encourage Continuous Upskilling",
    text: "Help learners adapt to emerging technologies and continuously upgrade their capabilities.",
    icon: "upskill",
  },
  {
    title: "Expand the Learning Ecosystem",
    text: "Build a wider network through centres and collaborations so advanced technology education reaches more learners.",
    icon: "ecosystem",
  },
];

// The reference page's live "Vision" section — heading/subheading/description match what that page
// returned when checked earlier; the 5 orbit points, the "Future-ready by 2030" goal and the footnote
// were then given directly, verbatim, by the request (screenshot) that added this section.
export const visionHeader = {
  badge: "Our Vision",
  heading: "Building India's Future-Ready Technology Workforce",
  text:
    "techcadd envisions contributing to an India where skilled engineers, technology professionals, " +
    "and digitally capable young people are prepared to participate confidently in the evolving " +
    "technology economy.",
};

export const visionGoal = { badge: "Our Vision", label: "Future-ready by 2030" };

export const visionPoints = [
  "Creating future-ready technology professionals",
  "Promoting practical and industry-oriented education",
  "Encouraging innovation and continuous learning",
  "Supporting India's digital transformation",
  "Building a trusted name in software, services, and technology education",
];

export const visionFootnote =
  "The organisation's publicly stated vision is to help make India a hub of well-trained engineers " +
  "and technical professionals and establish a globally trusted name in software and services.";

// The reference page's live "Our Future" section — the badge and heading don't name any specific
// technology so they're used verbatim, but the given paragraph names "Artificial Intelligence, Cloud
// Computing, Cyber Security, Data Science, Automation" as fields techcadd is evolving into; this repo's
// real, already-confirmed course catalog (lib/courses.ts) teaches none of those, so the paragraph below
// names the real fields (Civil/Mechanical CAD, Graphic Design, Digital Marketing) and the real,
// already-established branch-expansion fact instead, keeping the same "staying current" framing.
export const ourFuture = {
  badge: "Our Future",
  heading: "From learning technology to creating technology.",
  text:
    "techcadd aims to keep evolving with the emerging tools and platforms in the fields it already " +
    "trains in — Civil & Mechanical design, Graphic Design and Digital Marketing — while expanding its " +
    "branch network across Punjab, helping learners stay relevant as the software employers use keeps " +
    "changing.",
};

