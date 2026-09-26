"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { courses, NOT_SURE_COURSE } from "@/lib/courses";
import { site } from "@/lib/site";
import ArrowIcon from "@/components/ArrowIcon";

type Captcha = { question: string; token: string };

// Real numbers only — this repo's already-established figures (see lib/aboutData.ts, lib/content.ts):
// 25,000+ students trained, 4.9★ / 750+ Google reviews, training since site.since (2016).
const steps = [
  "A senior career counsellor calls you back during office hours.",
  "They go through your background, your budget and where you want to end up — including whether a course is wrong for you.",
  "You get a course roadmap and a batch that fits your week, free, with no obligation to enrol.",
];

// Full-page "final CTA" form, right after the Schedule Virtual Counselling banner on /contact. Posts
// to /api/contact, which saves into its own MySQL table (contact_enquiries — see lib/db.ts); the
// header's "Book Demo" pop-up (DemoModal.tsx) uses /api/demo and the demo_requests table.
export default function ContactCtaForm() {
  const [captcha, setCaptcha] = useState<Captcha | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const loadCaptcha = useCallback(async () => {
    setCaptcha(null);
    try {
      const res = await fetch("/api/captcha", { cache: "no-store" });
      setCaptcha(await res.json());
    } catch {
      setError("Couldn't load the security question. Please check your connection.");
    }
  }, []);

  useEffect(() => {
    loadCaptcha();
  }, [loadCaptcha]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!captcha) return;
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(form)),
          captchaToken: captcha.token,
          page: window.location.pathname,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        if (body.field === "captcha") {
          (form.elements.namedItem("captchaAnswer") as HTMLInputElement).value = "";
          loadCaptcha();
        }
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("idle");
    }
  }

  return (
    <section className="section theme-dark contact-cta">
      <div className="container contact-cta-grid">
        <div className="contact-cta-copy" data-aos="fade-up">
          <h2>
            Take the first step towards <span className="contact-cta-highlight">your IT career</span> with {site.name}{" "}
            {site.city}
          </h2>

          <h3 className="contact-cta-subhead">What happens next?</h3>
          <ol className="contact-cta-steps">
            {steps.map((step, i) => (
              <li key={i}>
                <span className="contact-cta-step-num">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <p className="contact-cta-fallback">
            Fill in the form and a counsellor will get back to you during office hours. You can also call{" "}
            <a href={site.phoneHref}>{site.phone}</a> or write to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <div className="contact-cta-trust">
            <span className="contact-cta-trust-label">Trusted by learners across Punjab</span>
            <div className="contact-cta-trust-stats">
              <span>25,000+ students trained</span>
              <span>4.9★ on Google (750+ reviews)</span>
              <span>Training since {site.since}</span>
            </div>
          </div>
        </div>

        <div className="contact-cta-panel" data-aos="fade-up">
          {status === "sent" ? (
            <div className="contact-cta-done" role="status">
              <h3>Thank you! 🎉</h3>
              <p>Your enquiry is in. A counsellor will call you back during office hours.</p>
              <button type="button" className="contact-cta-submit" onClick={() => setStatus("idle")}>
                Send another
              </button>
            </div>
          ) : (
            <>
              <h3>Tell us your goal. We&apos;ll build the training around it.</h3>
              <form className="contact-cta-form" onSubmit={onSubmit}>
                <label className="contact-cta-field">
                  <input name="name" required minLength={2} maxLength={100} placeholder="Full Name*" aria-label="Full name" autoComplete="name" />
                </label>

                <label className="contact-cta-field contact-cta-field-phone">
                  <span className="contact-cta-phone-prefix">IN +91</span>
                  <input
                    name="phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    title="10-digit mobile number"
                    placeholder="Mobile Number*"
                    aria-label="Mobile number"
                    autoComplete="tel-national"
                  />
                </label>

                <label className="contact-cta-field">
                  <input name="email" type="email" maxLength={190} placeholder="Email Address" aria-label="Email address" autoComplete="email" />
                </label>

                <label className="contact-cta-field">
                  <select name="course" required defaultValue="" aria-label="Course of interest">
                    <option value="" disabled>
                      Select Your Course of Interest*
                    </option>
                    {courses.map((c) => (
                      <option key={c.slug} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                    <option value={NOT_SURE_COURSE}>{NOT_SURE_COURSE}</option>
                  </select>
                </label>

                <label className="contact-cta-field">
                  <textarea name="message" rows={3} maxLength={1000} placeholder="Your Message / Career Goals" aria-label="Message or career goals" />
                </label>

                <div className="contact-cta-captcha">
                  <span id="cta-captcha-label">Security Check</span>
                  <div className="contact-cta-captcha-row">
                    <output aria-live="polite">{captcha?.question ?? "…"}</output>
                    <button type="button" aria-label="New question" onClick={loadCaptcha}>
                      ↻
                    </button>
                  </div>
                  <input name="captchaAnswer" required inputMode="numeric" placeholder="Answer" aria-labelledby="cta-captcha-label" autoComplete="off" />
                </div>

                {error && (
                  <p className="contact-cta-error" role="alert">
                    {error}
                  </p>
                )}

                <button type="submit" className="contact-cta-submit" disabled={status === "sending" || !captcha}>
                  {status === "sending" ? "Sending…" : "Submit"} <ArrowIcon />
                </button>

                <p className="contact-cta-note">⚡ A counsellor replies during office hours — {site.hours}.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
