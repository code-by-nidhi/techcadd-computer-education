// Central place for branch details. Update these if this site is for a different branch.
export const site = {
  name: "techcadd",
  fullName: "techcadd Computer Institute",
  tagline: "Your Skill & Technology Partner",
  since: 2016,
  city: "Jalandhar",
  phone: "+91 98881 22254",
  phoneHref: "tel:+919888122254",
  whatsapp: "919888122254",
  email: "info@techcadd.com",
  hours: "Mon–Sat, 9 AM – 7 PM",
  address: "Opp. All India Radio Station, Near Bus Stand, New Jawahar Nagar, Jawahar Nagar, Jalandhar, Punjab 144001",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=techcadd+New+Jawahar+Nagar+Jalandhar",
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

// The About mega menu (components/Header.tsx) and every /about/[slug] page are generated from
// lib/aboutData.ts — see aboutMenuItems there.
