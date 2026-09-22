"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/content";
import { courses, NOT_SURE_COURSE } from "@/lib/courses";
import { site } from "@/lib/site";

type Captcha = { question: string; token: string };

const quote = testimonials[0];
const initials = quote.name.split(" ").map((w) => w[0]).join("");

// "Book Demo" pop-up opened from the header. Enquiries are saved to MySQL through /api/demo.
export default function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
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

  // A native <dialog> gives focus trapping and Esc-to-close for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setStatus("idle");
      setError("");
      loadCaptcha();
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, loadCaptcha]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!captcha) return;
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/demo", {
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
    <dialog
      ref={dialogRef}
      className="demo-modal"
      aria-labelledby="demo-title"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()} // click on the backdrop
    >
      <div className="demo-grid">
        <div className="demo-info">
          <h2 id="demo-title">👋 Still exploring? Let us help</h2>
          <p>Talk to a counsellor and we&apos;ll map the shortest route from where you are to the job you want.</p>

          <figure className="demo-quote">
            <blockquote>&ldquo;{quote.quote}&rdquo;</blockquote>
            <figcaption className="demo-person">
              <span aria-hidden="true">{initials}</span>
              <span>
                <strong>{quote.name}</strong>
                <small>
                  {quote.role} · {quote.course}
                </small>
              </span>
            </figcaption>
          </figure>

          <div className="demo-rating">
            <svg className="demo-rating-g" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FBBC05" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
              <path fill="#EA4335" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
              <path fill="#34A853" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
              <path fill="#4285F4" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
            </svg>
            Google Verified
            <svg className="demo-rating-check" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"
              />
            </svg>
            <span className="stars" role="img" aria-label="Rated 5 out of 5">★★★★★</span>
          </div>

          <p className="demo-mail">
            You can also share your requirements at <a href={`mailto:${site.email}`}>{site.email}</a>, and our team
            will get back to you right away.
          </p>
        </div>

        <div className="demo-form-panel">
          <button type="button" className="demo-close" aria-label="Close" onClick={onClose}>
            ✕
          </button>

          {status === "sent" ? (
            <div className="demo-done" role="status">
              <h3>Thank you! 🎉</h3>
              <p>Your demo request is booked. Our counsellor will call you shortly to fix a time.</p>
              <button type="button" className="demo-submit" onClick={onClose}>
                Close
              </button>
            </div>
          ) : (
            <>
              <h3>Tell us your goal. We&apos;ll code it into reality.</h3>
              <form className="demo-form" onSubmit={onSubmit}>
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
                <input name="name" required minLength={2} maxLength={100} placeholder="Full Name*" aria-label="Full name" autoComplete="name" />
                <input
                  name="phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  title="10-digit mobile number"
                  placeholder="Contact Number (10 Digits)*"
                  aria-label="Contact number"
                  autoComplete="tel-national"
                />

                <div className="demo-captcha">
                  <span id="captcha-label">Security verification</span>
                  <output aria-live="polite">{captcha?.question ?? "…"}</output>
                  <button type="button" aria-label="New question" onClick={loadCaptcha}>
                    ↻
                  </button>
                </div>
                <input name="captchaAnswer" required inputMode="numeric" placeholder="Answer" aria-labelledby="captcha-label" autoComplete="off" />

                <p className="demo-promise">
                  <span aria-hidden="true">✔</span> Expert response within 5 minutes.
                </p>
                {error && (
                  <p className="demo-error" role="alert">
                    {error}
                  </p>
                )}
                <button type="submit" className="demo-submit" disabled={status === "sending" || !captcha}>
                  {status === "sending" ? "Sending…" : "Submit →"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
