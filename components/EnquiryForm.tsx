"use client";

import { FormEvent, useState } from "react";
import { courses } from "@/lib/courses";
import { site } from "@/lib/site";

// No backend yet: the enquiry is sent to the branch WhatsApp number with the details pre-filled.
export default function EnquiryForm({ defaultCourse = "" }: { defaultCourse?: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [
      "New course enquiry",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Course: ${data.get("course") || "Need counselling"}`,
      data.get("message") ? `Message: ${data.get("message")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setSent(true);
  }

  return (
    <form className="enquiry-form" onSubmit={onSubmit}>
      <h3>Book a free demo class</h3>
      <label>
        Full name
        <input name="name" required placeholder="Your name" />
      </label>
      <label>
        Phone number
        <input name="phone" type="tel" required pattern="[0-9+ ]{10,15}" placeholder="10-digit mobile number" />
      </label>
      <label>
        Course
        <select name="course" defaultValue={defaultCourse}>
          <option value="">Not sure – help me choose</option>
          {courses.map((c) => (
            <option key={c.slug} value={c.title}>
              {c.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        Message (optional)
        <textarea name="message" rows={3} placeholder="Preferred batch timing, questions…" />
      </label>
      <button type="submit" className="btn btn-primary btn-block">
        Send Enquiry
      </button>
      {sent && <p className="form-note">Thanks! Complete the message in WhatsApp and our counsellor will call you back.</p>}
    </form>
  );
}
