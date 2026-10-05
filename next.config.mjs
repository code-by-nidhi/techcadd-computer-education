// Every course's ORIGINAL slug (before any "-training-in-jalandhar" / "-course-in-jalandhar" rename)
// mapped to its final, current slug — see lib/courses.ts. Unrenamed courses just map to themselves.
// /courses/[slug] only ever used these original slugs before that route was replaced.
const ORIGINAL_TO_FINAL = {
  "basic-computer-course": "basic-computer-course-in-jalandhar",
  "ms-office-advanced-excel": "advanced-excel-training-in-jalandhar",
  dca: "dca-course-in-jalandhar",
  adca: "adca-course-in-jalandhar",
  "tally-prime-gst": "tally-prime-training-in-jalandhar",
  "busy-accounting": "busy-accounting-training-in-jalandhar",
  "computerised-accounting-diploma": "computerised-accounting-course-in-jalandhar",
  "gst-taxation": "gst-taxation-training-in-jalandhar",
  "punjabi-typing": "punjabi-typing",
  "english-punjabi-typing": "english-punjabi-typing",
  autocad: "autocad-training-in-jalandhar",
  solidworks: "solidworks-training-in-jalandhar",
  catia: "catia-training-in-jalandhar",
  "revit-architecture": "revit-architecture-training-in-jalandhar",
  "3ds-max": "3ds-max-training-in-jalandhar",
  "cnc-programming-cam": "cnc-programming-cam-training-in-jalandhar",
  "digital-marketing": "digital-marketing-training-in-jalandhar",
  seo: "seo-training-in-jalandhar",
  "social-media-marketing": "social-media-marketing-training-in-jalandhar",
  "google-ads-ppc": "google-ads-ppc-training-in-jalandhar",
  "graphic-design": "graphic-design-course-in-jalandhar",
  "adobe-photoshop": "adobe-photoshop-training-in-jalandhar",
  coreldraw: "coreldraw-training-in-jalandhar",
  "adobe-illustrator": "adobe-illustrator-training-in-jalandhar",
};

// /internship-training/[slug] (the route before /courses/[slug]) briefly used an intermediate slug scheme for these 5 courses (before
// this final rename) — those URLs were live for a while and need their own redirect too.
const INTERMEDIATE_TO_FINAL = {
  "dca-course": "dca-course-in-jalandhar",
  "adca-course": "adca-course-in-jalandhar",
  "tally-prime-with-gst": "tally-prime-training-in-jalandhar",
  "busy-accounting-software": "busy-accounting-training-in-jalandhar",
  "diploma-in-computerised-accounting": "computerised-accounting-course-in-jalandhar",
};

// Category landing pages briefly lived at the bare category id (e.g. /internship-training/civil-
// mechanical) before getting their own "-courses-in-jalandhar" slug — redirect those old URLs too.
// Only basic-accounting and civil-mechanical are safe to redirect this way: graphic-design and
// digital-marketing double as real pre-rename course slugs (see ORIGINAL_TO_FINAL above) and correctly
// keep resolving to their course page instead, and punjabi-typing is itself a real course slug too
// (getCourse() is checked before category lookup on that route, so its bare id never actually served
// the category page in the first place — nothing to redirect there).
const CATEGORY_TO_SLUG = {
  "basic-accounting": "basic-accounting-courses-in-jalandhar",
  "civil-mechanical": "civil-mechanical-courses-in-jalandhar",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Every slug a course or category page has ever been served under, mapped to its current slug.
    const OLD_TO_CURRENT = Object.entries({ ...ORIGINAL_TO_FINAL, ...INTERMEDIATE_TO_FINAL, ...CATEGORY_TO_SLUG }).filter(
      ([original, current]) => original !== current,
    );

    return [
      // Founder content moved into the /about/[slug] system (lib/aboutData.ts); this keeps the old URL working.
      { source: "/founder", destination: "/about/founder", permanent: true },

      // Course and category pages live at /courses/[slug]. They spent a while at
      // /internship-training/[slug], and under older slugs on both prefixes, so every old slug must
      // land on the CURRENT slug directly (a wildcard rule can't do this since most slugs changed
      // name, not just prefix).
      ...OLD_TO_CURRENT.flatMap(([original, current]) => [
        { source: `/courses/${original}`, destination: `/courses/${current}`, permanent: true },
        { source: `/internship-training/${original}`, destination: `/courses/${current}`, permanent: true },
      ]),

      // Any other /internship-training URL already uses a current slug — only the prefix changes.
      { source: "/internship-training/:slug", destination: "/courses/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
