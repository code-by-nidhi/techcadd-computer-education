import { site } from "@/lib/site";

// "Meet the Team" intro section, added just after the Hero on /about/our-team (see
// components/TeamIntro.tsx). The request's reference page (techcaddjalandhar.com/about/team) was
// checked: its real team-intro copy is "Trainers, mentors and counsellors... the team behind every
// batch, every project review and every placement drive" — "Industry Experts" is grounded the same
// way this page's own real hero description already frames trainers: "Every trainer at techcadd
// still works in the field they teach." All 4 stats below are this repo's real, already-established
// numbers (25,000+/500+/7/10, not "10+" — 2016 founding to today is exactly 10 years).
//
// The reference page (and the screenshots that came with these requests) shows a grid of 12 named
// team members with real photos — confirmed there are genuinely no photo files anywhere in this
// repo (public/about-menu doesn't exist; only course thumbnails and software logos do). Asked how to
// proceed given that hard blocker; the answer was to build the exact card design now with generic
// placeholder art, labelled by real role — not specific invented names — and swap in real photos
// later. "Placement Expert" and "Career Coach" are both real, already-established terms this repo
// uses elsewhere (the "Support"/placement-cell section, and the founder's own "mentor and career
// coach" byline) — not invented for this card set.
export const teamIntro = {
  badge: "Our People",
  heading: "Meet the experts behind techcadd",
  text: "The trainers, mentors, counsellors and industry professionals who guide students from learning to employment.",
  primaryCta: { label: "Meet Our Trainers", href: "#trainers" },
  secondaryCta: { label: "Talk to a Counsellor", href: site.phoneHref },
  stats: [
    { value: "25,000+", label: "Students Trained" },
    { value: "500+", label: "Hiring Partners" },
    { value: "7", label: "Branches" },
    { value: "10", label: "Years Experience" },
  ],
  previewCards: [
    { role: "Trainer" },
    { role: "Mentor" },
    { role: "Counsellor" },
    { role: "Industry Expert" },
    { role: "Placement Expert" },
    { role: "Career Coach" },
  ],
};
