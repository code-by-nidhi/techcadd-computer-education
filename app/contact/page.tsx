import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/Sections";
import EnquiryForm from "@/components/EnquiryForm";
import ContactSupport from "@/components/ContactSupport";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <PageHero crumb="Contact" title="Contact Us" text="Talk to a counsellor today — free career counselling, no registration fee." />

      <ContactSupport />

      <section className="section">
        <div className="container detail-grid">
          <div className="contact-cards">
            <div className="card">
              <h3>📍 Visit us</h3>
              <p>{site.address}</p>
              <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
                Get directions →
              </a>
            </div>
            <div className="card">
              <h3>📞 Call / WhatsApp</h3>
              <p>
                <a href={site.phoneHref}>{site.phone}</a>
              </p>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="link-arrow">
                Chat on WhatsApp →
              </a>
            </div>
            <div className="card">
              <h3>✉️ Email</h3>
              <p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <div className="card">
              <h3>🕘 Timings</h3>
              <p>{site.hours}</p>
            </div>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
