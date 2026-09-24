"use client";

import { FormEvent, useState } from "react";

// Quick phone-only capture: submitting opens the header's Book Demo modal with the number pre-filled,
// so the real submission (name, course, captcha) still goes through the one existing /api/demo flow.
export default function LeadForm() {
  const [phone, setPhone] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-demo", { detail: { phone } }));
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <input
        type="tel"
        inputMode="numeric"
        pattern="[6-9][0-9]{9}"
        maxLength={10}
        placeholder="Enter your mobile number"
        aria-label="Mobile number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit">Book Demo</button>
    </form>
  );
}
