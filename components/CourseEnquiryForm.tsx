"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type Captcha = { question: string; token: string };

// The enquiry form pinned to the right of every course page (see the .bc-side column in
// components/CoursePage.tsx). Fields follow the "Ask about <course>" form on techcaddjalandhar.com:
// name, phone, the course (pre-filled and read-only), a message and the maths security check.
// Posts to /api/contact like the /contact page form. `course` must be a value that API accepts (a
// real course title, or the "not sure" option); `label` is what the read-only field shows.
export default function CourseEnquiryForm({ course, label }: { course: string; label: string }) {
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
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          course,
          // Program pages post the generic course option, so keep the page's own name in the message.
          message: course === label ? data.message : `[${label}] ${data.message ?? ""}`.trim(),
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
      loadCaptcha();
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("idle");
    }
  }

  return (
    <div className="ce-card">
      <span className="ce-badge">Course Information</span>
      <h2>Ask about {label}</h2>
      <p className="ce-lead">A counsellor will call you back about batch timings, fees and EMI options.</p>

      {status === "sent" ? (
        <div className="ce-done" role="status">
          <strong>Thank you!</strong>
          <p>Your enquiry is in. Expect a call within working hours.</p>
          <button type="button" className="ce-submit" onClick={() => setStatus("idle")}>
            Send another
          </button>
        </div>
      ) : (
        <form className="ce-form" onSubmit={onSubmit}>
          <div className="ce-row">
            <label>
              <span>Your Name</span>
              <input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Enter your full name" />
            </label>
            <label>
              <span>Phone Number</span>
              <input
                name="phone"
                type="tel"
                required
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                maxLength={10}
                title="10-digit mobile number"
                autoComplete="tel-national"
                placeholder="10-digit mobile number"
              />
            </label>
          </div>
          <label>
            <span>Course or Service</span>
            <input value={label} readOnly aria-readonly="true" tabIndex={-1} />
          </label>
          <label>
            <span>Your Message</span>
            <textarea name="message" rows={2} maxLength={900} placeholder="Ask about batch timings, fees or anything else" />
          </label>
          <div className="ce-captcha">
            <span id="ce-captcha-label">Security Check</span>
            <div>
              <output aria-live="polite">{captcha?.question ?? "…"}</output>
              <input name="captchaAnswer" required inputMode="numeric" autoComplete="off" placeholder="Answer" aria-labelledby="ce-captcha-label" />
              <button type="button" aria-label="Get a new question" title="Get a new question" onClick={loadCaptcha}>
                ↻
              </button>
            </div>
          </div>
          {error && (
            <p className="ce-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="ce-submit" disabled={status === "sending" || !captcha}>
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>
          <p className="ce-note">We never share your number. Expect a call within working hours.</p>
        </form>
      )}
    </div>
  );
}
