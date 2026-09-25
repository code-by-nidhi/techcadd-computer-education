import { site } from "@/lib/site";
import ArrowIcon from "@/components/ArrowIcon";

// "Find Us" — /contact only, right before the footer. The map is a real, live Google Maps embed
// (no API key needed for the q=...&output=embed form) pointed at the real address in lib/site.ts —
// so whatever rating/review count it shows is Google's own current live data, not something typed
// in here. Everything else below reuses the same real phone/email/address/WhatsApp as the rest of
// the page.
export default function ContactMap() {
  const mapQuery = encodeURIComponent(`${site.fullName} ${site.address}`);

  return (
    <section className="section find-us">
      <div className="container find-us-grid">
        <div className="find-us-map" data-aos="fade-up">
          <iframe
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            title={`${site.fullName} location on Google Maps`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="find-us-panel" data-aos="fade-up">
          <div className="find-us-info">
            <div className="find-us-card">
              <span className="find-us-icon" aria-hidden="true">
                <FindUsIcon icon="pin" />
              </span>
              <div>
                <span className="find-us-label">Address</span>
                <p>{site.address}</p>
                <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
                  Get Directions →
                </a>
              </div>
            </div>

            <div className="find-us-card">
              <span className="find-us-icon" aria-hidden="true">
                <FindUsIcon icon="phone" />
              </span>
              <div>
                <span className="find-us-label">Phone</span>
                <p>
                  <a href={site.phoneHref}>{site.phone}</a>
                </p>
                <a href={site.phoneHref} className="link-arrow">
                  Call Now →
                </a>
              </div>
            </div>

            <div className="find-us-card">
              <span className="find-us-icon" aria-hidden="true">
                <FindUsIcon icon="mail" />
              </span>
              <div>
                <span className="find-us-label">Email</span>
                <p>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
                <a href={`mailto:${site.email}`} className="link-arrow">
                  Send Email →
                </a>
              </div>
            </div>

            <div className="find-us-card">
              <span className="find-us-icon" aria-hidden="true">
                <FindUsIcon icon="clock" />
              </span>
              <div>
                <span className="find-us-label">Office Hours</span>
                <p>{site.hours}</p>
              </div>
            </div>
          </div>

          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="find-us-whatsapp">
            <span className="find-us-whatsapp-icon" aria-hidden="true">
              <WhatsAppLogo />
            </span>
            <span className="find-us-whatsapp-text">
              <strong>Chat on WhatsApp</strong>
              <span>Get instant replies during office hours</span>
            </span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

function FindUsIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    pin: "M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    phone: "M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 9 9 0 0 0 2.8.45 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 9 9 0 0 0 .45 2.8 1 1 0 0 1-.25 1Z",
    mail: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 0 8 7 8-7",
    clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 7v5l3.5 2",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[icon] ?? paths.pin} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// The real WhatsApp glyph (filled, not stroked like the icons above) — recognisable brand mark
// rather than a generic chat bubble, since this button's whole point is "this opens WhatsApp".
function WhatsAppLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.01 2C6.48 2 2 6.48 2 12c0 1.77.46 3.45 1.32 4.94L2 22l5.2-1.3A9.96 9.96 0 0 0 12.01 22C17.53 22 22 17.52 22 12S17.53 2 12.01 2Zm5.78 14.13c-.24.68-1.4 1.3-1.93 1.35-.52.05-1 .25-3.38-.7-2.86-1.14-4.7-4.05-4.85-4.24-.14-.19-1.16-1.55-1.16-2.96s.73-2.1 1-2.39c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.38-.24.64-.14.26.1 1.65.78 1.94.92.28.14.47.21.54.33.07.12.07.7-.17 1.38Z" />
    </svg>
  );
}
