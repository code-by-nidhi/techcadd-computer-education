// Central place for branch details. Update these if this site is for a different branch.
export const site = {
  name: "techcadd",
  fullName: "techcadd Computer Institute",
  tagline: "Your Skill & Technology Partner",
  since: 2007,
  city: "Jalandhar",
  phone: "+91 98881 22254",
  phoneHref: "tel:+919888122254",
  whatsapp: "919888122254",
  email: "info@techcadd.com",
  hours: "Mon–Sat, 9 AM – 7 PM",
  address: "2nd Floor, Crystal Plaza, SCS 78, Opposite PIMS Hospital, Jalandhar, Punjab 144001",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=techcadd+Crystal+Plaza+Jalandhar",
  social: {
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    linkedin: "https://www.linkedin.com/",
  },
  branches: ["Chandigarh", "Mohali", "Ludhiana", "Phagwara", "Jalandhar", "Amritsar", "Hoshiarpur"],
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", aboutMega: true },
  { label: "Courses", href: "/courses", dropdown: true },
  { label: "Certificate Programs", href: "/certificate-programs" },
  { label: "After 12th", href: "/after-12th" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

// Content for the "About" mega menu — left nav list; the first three also get a photo card on the right.
// Drop the real photos in public/about-menu/ using these exact filenames and they'll show up immediately.
export const aboutMenu = [
  {
    id: "about",
    label: "About techcadd",
    tag: "Story",
    meta: `Since ${site.since}`,
    text: `${site.tagline} — practical, job-focused computer education trusted across Punjab since ${site.since}.`,
    image: "/about-menu/about-techcadd.jpg",
    href: "/about",
    card: true,
  },
  {
    id: "mission",
    label: "Mission and Vision",
    tag: "Purpose",
    meta: "Our direction",
    text: "Industry-built curriculum, certified trainers and real projects — so every student leaves job-ready, not just certified.",
    image: "/about-menu/mission-vision.jpg",
    href: "/about",
    card: true,
  },
  {
    id: "accreditations",
    label: "Accreditations & Awards",
    tag: "Trust",
    meta: "Recognised",
    text: "Industry-recognised certification, a 4.9★ Google rating and 500+ hiring partners backing every batch we train.",
    href: "/about",
    card: false,
  },
  {
    id: "team",
    label: "Our Team",
    tag: "People",
    meta: "Trainers & mentors",
    text: "Learn from working accountants, designers, CAD engineers and marketers — practitioners first, instructors second.",
    image: "/about-menu/our-team.jpg",
    href: "/founder",
    card: true,
  },
];
