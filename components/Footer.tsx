import Link from "next/link";
import { site } from "@/lib/site";
import { categories } from "@/lib/courses";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-banner">
        <div className="container">
          Admissions Open · 4.9★ on Google · Free career counselling · <a href={site.phoneHref}>Call {site.phone}</a>
        </div>
      </div>

      <div className="container footer-grid">
        <div className="footer-about">
          <Link href="/" className="logo logo-light">
            <span className="logo-mark">tc</span>
            <span>
              <strong>{site.name}</strong>
              <small>Computer Education</small>
            </span>
          </Link>
          <p>
            {site.tagline}. Training students in {site.city} since {site.since} in Basic Computer, Accounting,
            CAD/CAM, Digital Marketing and Graphic Design.
          </p>
          <p>📍 {site.address}</p>
          <p>
            📞 <a href={site.phoneHref}>{site.phone}</a>
            <br />
            ✉️ <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>

        <div>
          <h4>Courses</h4>
          {categories.map((c) => (
            <Link key={c.id} href={`/courses#${c.id}`}>
              {c.name}
            </Link>
          ))}
        </div>

        <div>
          <h4>Programs</h4>
          <Link href="/certificate-programs">Certificate Programs</Link>
          <Link href="/after-12th">After 12th Courses</Link>
          <Link href="/certificate-programs#durations">45-Day Training</Link>
          <Link href="/certificate-programs#durations">6-Month Diploma</Link>
          <Link href="/certificate-programs#durations">Internship Programme</Link>
        </div>

        <div>
          <h4>Company</h4>
          <Link href="/about">About techcadd</Link>
          <Link href="/faq">FAQs</Link>
          <Link href="/about#placements">Placement Support</Link>
          <Link href="/contact">Enquire Now</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div>
          <h4>Our Branches</h4>
          {site.branches.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.fullName}. All rights reserved. Built in {site.city}, Punjab.</span>
        <span className="footer-social">
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={site.social.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </span>
      </div>

      <a className="whatsapp-float" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        💬
      </a>
    </footer>
  );
}
