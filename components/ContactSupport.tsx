"use client";

import { useState } from "react";
import { site } from "@/lib/site";

// "Support & Assistance" — a tabbed support panel inserted right after the Hero on /contact. This
// repo only has one branch's contact details (see lib/site.ts) — no separate phone/email per
// department exists anywhere in the data, so every tab intentionally points at the same real phone,
// email and campus address rather than inventing department-specific numbers.
const supportTabs = [
  {
    id: "student",
    label: "Student Support",
    icon: "student",
    title: "Student Desk",
    subtitle: "Student Support",
    description: "Academic help, class schedules, assignments and day-to-day student queries.",
  },
  {
    id: "college",
    label: "College Support",
    icon: "college",
    title: "College Desk",
    subtitle: "College Support",
    description: "College coordination, attendance records and examination assistance.",
  },
  {
    id: "placement",
    label: "Placement Cell",
    icon: "placement",
    title: "Placement Desk",
    subtitle: "Placement Cell",
    description: "Interview preparation, placement drives, career guidance and recruiter support.",
  },
  {
    id: "franchise",
    label: "Franchise Enquiry",
    icon: "franchise",
    title: "Franchise Desk",
    subtitle: "Franchise Enquiry",
    description: "Business opportunities, franchise support and partnership enquiries.",
  },
] as const;

export default function ContactSupport() {
  const [active, setActive] = useState(0);
  const tab = supportTabs[active];

  return (
    <section className="section support-section">
      <div className="container">
        <div className="section-heading" data-aos="fade-up">
          <span className="eyebrow">Support</span>
          <h2>Support &amp; Assistance</h2>
          <p>Get personalised support for your educational journey.</p>
        </div>

        <div className="support-panel" data-aos="fade-up">
          <div className="support-tabs" role="tablist" aria-label="Support categories">
            {supportTabs.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`support-tab ${i === active ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="support-tab-icon" aria-hidden="true">
                  <SupportIcon icon={t.icon} />
                </span>
                <span className="support-tab-label">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="support-content" key={tab.id} role="tabpanel">
            <div className="support-content-avatar" aria-hidden="true">
              <SupportIcon icon={tab.icon} />
            </div>
            <div className="support-content-body">
              <span className="support-content-subtitle">{tab.subtitle}</span>
              <h3>{tab.title}</h3>
              <p>{tab.description}</p>

              <ul className="support-contact-list">
                <li>
                  <span className="support-contact-label">Phone</span>
                  <a href={site.phoneHref}>{site.phone}</a>
                </li>
                <li>
                  <span className="support-contact-label">Email</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <span className="support-contact-label">Location</span>
                  <span>{site.address}</span>
                </li>
              </ul>

              <div className="support-actions">
                <a href={site.phoneHref} className="support-action support-action-call">
                  <SupportIcon icon="phone" /> Call Now
                </a>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="support-action support-action-whatsapp"
                >
                  <SupportIcon icon="chat" /> WhatsApp
                </a>
                <a href={`mailto:${site.email}`} className="support-action support-action-email">
                  <SupportIcon icon="mail" /> Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    student: "M12 3 2 8l10 5 10-5-10-5Z M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5",
    college: "M4 21V9l8-5 8 5v12M4 21h16M9 21v-6h6v6M9 12h.01M15 12h.01",
    placement: "M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Z M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 13h16",
    franchise: "M3 9 5 3h14l2 6M4 9v11a1 1 0 0 0 1 1h4v-6h6v6h4a1 1 0 0 0 1-1V9M4 9h16",
    phone: "M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 9 9 0 0 0 2.8.45 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 9 9 0 0 0 .45 2.8 1 1 0 0 1-.25 1Z",
    chat: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z",
    mail: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 0 8 7 8-7",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[icon] ?? paths.student} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
