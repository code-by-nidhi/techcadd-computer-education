import { site } from "@/lib/site";
import ArrowIcon from "@/components/ArrowIcon";

// "Schedule Virtual Counselling" banner, right after the enquiry form on /contact. This repo has no
// calendar/slot-booking backend (EnquiryForm itself just hands off to WhatsApp — see its own
// comment), so the CTA does the same: it opens WhatsApp with a pre-filled message rather than
// pretending to reserve an actual time slot.
export default function ContactSchedule() {
  const message = encodeURIComponent(
    "Hi, I'd like to book a free virtual counselling session. My preferred date/time: "
  );

  return (
    <div className="schedule-banner">
      <span className="schedule-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="schedule-body">
        <h3>Schedule Virtual Counselling</h3>
        <p>Book a free 1:1 virtual counselling session. Share your preferred date and time — a techcadd advisor will call you personally.</p>
      </div>
      <a
        href={`https://wa.me/${site.whatsapp}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="schedule-cta"
      >
        Book Counselling Session <ArrowIcon />
      </a>
    </div>
  );
}
