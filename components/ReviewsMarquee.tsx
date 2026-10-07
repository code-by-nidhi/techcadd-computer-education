import { referenceContent } from "@/lib/referenceContent";

// An automatic slider of student reviews (used on /about/accreditations-awards, under the Google
// rating card). The reviews are the testimonials already held in lib/referenceContent.ts, pooled
// across courses. Several courses carry the same quote (sometimes under another name, or with a
// word changed), so repeats are dropped by the quote's wording, keeping the first of each. Same card and marquee styles as the course pages' review row
// (.bc-review / .bc-marquee): the list is rendered twice and slides by half its width, so it loops
// seamlessly; hovering pauses it.
const reviews = (() => {
  const seen = new Set<string>();
  return Object.values(referenceContent)
    .flatMap((c) => c.testimonials)
    .filter((t) => {
      const key = t.quote.toLowerCase().replace(/^the /, "").replace(/[^a-z]+/g, " ").trim().split(" ").slice(0, 8).join(" ");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 14);
})();

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

export default function ReviewsMarquee() {
  const card = (r: (typeof reviews)[number], i: number, copy: boolean) => (
    <article key={`${i}-${copy ? "b" : "a"}`} className="bc-review" aria-hidden={copy || undefined}>
      <div className="bc-review-top">
        <span className="bc-stars" role="img" aria-label="5 out of 5 stars">
          ★★★★★
        </span>
      </div>
      <p>“{r.quote}”</p>
      <div className="bc-review-who">
        <span aria-hidden="true">{initials(r.name)}</span>
        <div>
          <strong>{r.name}</strong>
          <small>{r.role}</small>
        </div>
      </div>
    </article>
  );

  return (
    <section className="section theme-light reviews-marquee" aria-label="Student reviews">
      <div className="container">
        <div className="section-heading" suppressHydrationWarning data-aos="fade-up">
          <span className="eyebrow">Student reviews</span>
          <h2>What our students say</h2>
        </div>
      </div>
      <div className="bc-marquee">
        <div className="bc-marquee-track">
          {reviews.map((r, i) => card(r, i, false))}
          {reviews.map((r, i) => card(r, i, true))}
        </div>
      </div>
    </section>
  );
}
