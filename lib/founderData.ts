import { site } from "@/lib/site";

// Content for /about/founder (components/FounderPage.tsx), taken from the live reference page
// techcaddjalandhar.com/about/founder. Photos live in public/founder. The one figure not taken from
// that page is "students trained": it says 5,000+, this site's established number is 25,000+.
export const founderHero = {
  name: "Gourav Gupta",
  role: `Founder, ${site.name}`,
  titleLines: ["Inspiring Careers,", "Building Skills,", "Creating Futures."],
  lead: "Empowering students with practical skills, industry exposure, and the confidence to build successful careers in technology.",
  tags: ["Founder", "Educator", "Mentor"],
  portrait: "/founder/portrait.webp",
  portraitAlt: "Gourav Gupta, founder of techcadd, speaking to students with a microphone",
};

export const founderMeet = {
  ghost: "ABOUT",
  heading: "Meet Gourav Gupta",
  image: "/about-menu/founder.jpg",
  imageAlt: "Gourav Gupta, founder of techcadd, smiling in a white shirt",
  paragraphs: [
    "Every successful journey begins with a dream, but only a few are built through relentless hard work, courage and the determination to never give up.",
    "Gourav Gupta is an entrepreneur, mentor and career coach whose life journey is a powerful example of resilience, self-belief and the transformative power of education. From facing financial challenges and driving an auto to complete his engineering education, to building an organization from the ground up, his story reflects a simple yet powerful belief: your circumstances may shape your beginning, but your determination shapes your future.",
    "Today, he is recognized for his entrepreneurial vision, commitment to skill-based education and passion for helping students and aspiring professionals discover their potential.",
  ],
  quote: "A certificate proves attendance. A portfolio proves capability. We build the second one.",
  cta: { label: "Explore the courses", href: "/courses" },
  stats: [
    { value: String(site.since), label: `${site.name} founded in ${site.city}` },
    { value: "25,000+", label: "Students trained" },
    { value: String(site.branches.length), label: "Centres across Punjab" },
    { value: "100%", label: "Placement assistance" },
  ],
};

export const founderGallery = [
  { src: "/founder/stage-1.webp", alt: "Gourav Gupta on stage in a large auditorium, with a robot on the stage floor beside him", tall: true },
  { src: "/founder/stage-2.webp", alt: "Gourav Gupta walking across the stage in front of a packed auditorium", tall: false },
  { src: "/founder/stage-3.webp", alt: "Gourav Gupta addressing a full hall of students from the stage", tall: false },
  { src: "/founder/stage-4.webp", alt: "Gourav Gupta raising his hand to the audience during a talk", tall: false },
];

export const founderRoles = {
  heading: "Four roles, one purpose",
  items: [
    { icon: "rocket", kicker: "Start small, think big", title: "Self-made entrepreneur", text: "Built techcadd from the ground up — putting up flex banners, doing offline branding and reaching students himself." },
    { icon: "compass", kicker: "Career direction", title: "Career coach", text: "Guides students on education, technical fields and career pathways, and on the move from education to work." },
    { icon: "target", kicker: "Goal setting & growth", title: "Mentor", text: "Helps young professionals build clarity, confidence and a growth mindset, and overcome self-doubt." },
    { icon: "mic", kicker: "Lessons from his journey", title: "Public speaker & motivator", text: "College talks, career guidance seminars and motivational sessions built on his own story of struggle and success." },
  ],
};

export type FounderChapter = {
  tab: string;
  badge: string;
  caption: string;
  photo: string;
  title: string;
  paragraphs: string[];
  points?: string[];
  highlight?: string;
};

export const founderJourney = {
  eyebrow: "The journey behind techcadd",
  heading: "From driving an auto to building techcadd",
  text: "Scroll through the story, one chapter at a time.",
  chapters: [
    {
      tab: "The start",
      badge: "Where it began",
      caption: "Before techcadd · Driving an auto through engineering",
      photo: "/founder/journey-start.webp",
      title: "A Journey Built on Struggle and Self-Belief",
      paragraphs: [
        "Gourav Gupta's journey was far from easy. Pursuing engineering education while facing financial hardships demanded extraordinary commitment and sacrifice. To support himself and continue his studies, he drove an auto while completing his engineering education.",
        "For him, education was not merely a qualification. It was a pathway to independence, growth and a better future.",
        "Balancing work, studies and personal responsibilities taught him lessons that no textbook could offer: discipline, patience, resilience and the courage to keep moving forward, even when the circumstances were difficult.",
      ],
      highlight: "His journey stands as a reminder that where you begin does not define where you can go.",
    },
    {
      tab: "2016",
      badge: "Chapter 01",
      caption: "2016 · Building techcadd from the ground up",
      photo: "/founder/journey-2016.webp",
      title: "2016: Building techcadd from the Ground Up",
      paragraphs: [
        "The early days of techcadd were a testament to Gourav Gupta's hands-on approach, entrepreneurial spirit and unwavering belief in his vision.",
        "In the initial phase of building techcadd, he personally took responsibility for tasks that many would overlook. From putting up flex banners and carrying out offline branding to working on the ground to create awareness, he was involved in every aspect of building the organization.",
        "There were no shortcuts—only hard work, persistence and a willingness to do whatever it took to turn a vision into reality.",
        "Every banner installed, every conversation with a prospective student and every small step toward building the brand became part of a larger journey.",
        "Over time, this commitment helped shape techcadd into an organization focused on technical education, industry-relevant skills and opportunities for learners.",
      ],
      highlight: "He did not simply build a business; he built it through experience, sacrifice and the belief that meaningful impact begins with taking the first step.",
    },
    {
      tab: "2018",
      badge: "Chapter 02",
      caption: "2018 · A career coach and mentor",
      photo: "/founder/journey-2018.webp",
      title: "2018: More Than an Entrepreneur—A Career Coach and Mentor",
      paragraphs: [
        "Gourav Gupta believes that education should do more than provide a certificate. It should build confidence, develop practical skills and empower individuals to create meaningful careers.",
        "As a career coach and mentor, he is passionate about helping students and young professionals:",
      ],
      points: [
        "Discover their strengths, interests and career potential.",
        "Make informed decisions about education and career pathways.",
        "Develop industry-relevant skills and a growth-oriented mindset.",
        "Overcome self-doubt and challenges with confidence.",
        "Understand the importance of practical learning and continuous development.",
        "Transform their ambitions into clear, achievable goals.",
      ],
      highlight: "His approach to mentorship is rooted in practical guidance, empathy, discipline and the belief that every individual deserves the opportunity to grow.",
    },
    {
      tab: "2020",
      badge: "Chapter 03",
      caption: "2020 · The philosophy behind his success",
      photo: "/founder/journey-2020.webp",
      title: "2020: The Philosophy Behind His Success",
      paragraphs: [
        "Gourav Gupta's story is not about overnight success. It is about showing up every day, embracing challenges and continuing to work toward a bigger vision.",
        "His personal and professional philosophy is built around a few core principles:",
      ],
      points: [
        "Education is a powerful tool for transformation. Knowledge, skills and continuous learning can open doors to new opportunities.",
        "Hard work creates possibilities. Success is often the result of consistent effort, even when progress seems slow.",
        "Your starting point does not determine your destination. Financial challenges, limited resources or difficult beginnings do not have to define your future.",
        "Practical experience matters. Real-world exposure, hands-on learning and the willingness to take responsibility are essential for professional growth.",
        "Success becomes meaningful when it inspires others. The true impact of a journey lies not only in what you achieve, but also in the lives you positively influence.",
      ],
    },
    {
      tab: "2023",
      badge: "Chapter 04",
      caption: "2023 · His vision as a career coach",
      photo: "/founder/journey-2023.webp",
      title: "2023: His Vision as a Career Coach",
      paragraphs: [
        "Gourav Gupta envisions a future where students and young professionals have access to the right guidance, practical skills and opportunities to build successful careers.",
        "Through his work as a mentor and career coach, he aims to bridge the gap between academic education and industry expectations. His focus is on encouraging learners to think beyond conventional career paths, develop confidence in their abilities and prepare themselves for a changing professional world.",
      ],
      highlight: "He believes that every individual has untapped potential—and the right guidance, combined with consistent effort, can help turn that potential into achievement.",
    },
    {
      tab: "2026",
      badge: "Chapter 05",
      caption: "2026 · An inspiration for every dreamer",
      photo: "/founder/portrait.webp",
      title: "2026: An Inspiration for Every Dreamer",
      paragraphs: [
        "From driving an auto to complete his engineering education, to personally building the foundations of techcadd through offline branding and hands-on effort, Gourav Gupta's journey is a story of perseverance, humility and determination.",
        "His life demonstrates that success is not defined by where you start, but by the courage to keep going.",
        "Gourav Gupta is not just building an organization. He is inspiring individuals to believe in themselves, pursue their ambitions and build a future they can be proud of.",
      ],
      highlight: "“Your circumstances may decide where you begin, but your hard work, learning and determination can shape where you go.”",
    },
  ] as FounderChapter[],
};

export const founderClosing = {
  heading: "A Leader Who Inspires Beyond the Workplace",
  paragraphs: [
    "From his early struggles while completing engineering education to building techcadd through hands-on effort, Gourav Gupta's journey continues to inspire the people associated with him.",
    "These words of appreciation reflect the values he strives to bring to his professional relationships: trust, mentorship, perseverance, innovation and the belief that every individual has the potential to achieve more.",
  ],
  quote: "“True leadership is not just about building an organization; it is about building people who believe they can achieve extraordinary things.”",
};

export const founderTestimonials = {
  eyebrow: "Testimonials & Words of Appreciation",
  heading: "What People Say About",
  headingAccent: "Gourav Gupta",
  paragraphs: [
    "A leader's true impact is reflected not only in the organization they build, but also in the people they inspire, guide and empower.",
    "Gourav Gupta's journey as an entrepreneur, mentor and career coach has touched the lives of colleagues, franchise partners and professionals who have worked alongside him. Here are a few words of appreciation from people associated with his professional journey.",
  ],
  items: [
    { name: "Asmita Sehgal", role: "Senior Manager, techcadd", image: "/team/cutouts/asmita-mam.webp", quote: "Working with Gourav Sir has been a truly meaningful experience. His journey, from overcoming personal and professional struggles to building techcadd, is a constant source of inspiration. What I admire most is his ability to trust people, understand their challenges and encourage them to grow. His leadership goes beyond business—it is about empowering people and helping them believe in their own potential." },
    { name: "Harrachneet Kaur", role: "Relationship Manager, techcadd", image: "/team/cutouts/richi-mam.webp", quote: "Gourav Sir's dedication, positive attitude and vision have always inspired me. He leads by example and motivates everyone around him to give their best. His belief in people and his ability to guide them through challenges make him a truly inspiring leader. Working with him has been a valuable learning experience." },
    { name: "Daljeet Singh", role: "Franchise Owner, Ludhiana", image: "/team/cutouts/daljeet-sir.webp", quote: "Gourav Gupta Sir's entrepreneurial journey is a reflection of determination, hard work and strong vision. His guidance and commitment have been an inspiration throughout our association. He understands the challenges of building a business and encourages his partners to move forward with confidence. His journey motivates us to dream bigger and work harder." },
    { name: "Alam", role: "Franchise Owner, Amritsar", image: "/team/cutouts/alam-sir.webp", quote: "What makes Gourav Sir stand out is his passion for education, his dedication to his vision and his willingness to support people around him. His journey teaches us that success comes through persistence and continuous effort. His guidance and entrepreneurial mindset have been a source of motivation and learning." },
    { name: "Amit", role: "IT Technical Head", image: "/team/cutouts/amit-sir.webp", quote: "Gourav Sir is a visionary leader who understands the importance of technology, innovation and continuous learning. His commitment to building a strong organization and encouraging professional development is truly admirable. His journey reminds us that with the right mindset, discipline and dedication, challenges can become opportunities for growth." },
    { name: "Shiv", role: "AI Engineer", image: "/team/cutouts/shiv-sir.webp", quote: "Gourav Sir's vision for technology and skill-based education is inspiring. He encourages innovation, learning and the development of future-ready skills. His journey demonstrates the importance of perseverance and self-belief. Being associated with his vision motivates me to keep learning, improving and contributing meaningfully." },
    { name: "Eakumpreet Singh", role: "Generative AI Engineer", image: "", quote: "Gourav Sir's journey is a powerful example of how determination and a clear vision can create meaningful success. His focus on emerging technologies, innovation and professional growth inspires young professionals like us. His leadership encourages us to explore new possibilities, strengthen our skills and build a better future." },
  ],
};

// Instagram reels from the reference page's "Life at techcadd" carousel, embedded by reel id.
export const founderReels = {
  eyebrow: "On Instagram",
  heading: "Life at techcadd,",
  headingAccent: "reel by reel",
  text: "Classroom sessions, student projects and placement days — browse with the arrows, tap a reel to play it.",
  ids: ["DRXM4TqE0cJ", "DRuqlw_k7rE", "DR7A8aDk_UI", "DSNg9j5k3AY", "DSxbHVbk0D8", "DVSgB2ME4e0", "DQMjtZ5k-0h"],
  more: { label: "See more", href: "https://www.instagram.com/techcadd__jalandhar" },
};

export const founderConnect = {
  heading: "Connect with Gourav Gupta",
  paragraphs: [
    "Looking for career guidance, mentorship or inspiration to take the next step in your professional journey?",
    "Follow Gourav Gupta for insights on career development, entrepreneurship, skill-based education, personal growth and the mindset required to turn challenges into opportunities.",
  ],
  motto: "Learn. Grow. Believe. Achieve.",
  links: [
    { label: "Follow on Instagram", href: "https://www.instagram.com/gouravgupta0/" },
    { label: "Connect on LinkedIn", href: "https://www.linkedin.com/in/gouravguptatechcadd/" },
  ],
  signoff: "Gourav Gupta — Inspiring careers. Empowering dreams. Building futures.",
};
