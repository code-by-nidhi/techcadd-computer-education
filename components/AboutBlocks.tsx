import Link from "next/link";
import type { AboutCard, AboutGalleryItem, AboutPageData, AboutSection, AboutStat, AboutTrustCard } from "@/lib/aboutData";
import SpotlightCard from "./SpotlightCard";

// Reusable building blocks every /about/[slug] page is assembled from — see app/about/[slug]/page.tsx
// and app/about/page.tsx. Keeping these generic is what lets a new lib/aboutData.ts entry become a
// full page without writing any new markup.

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.label}>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
          {i < items.length - 1 && " / "}
        </span>
      ))}
    </nav>
  );
}

export function AboutHero({
  data,
  crumbs,
}: {
  data: AboutPageData;
  crumbs: { label: string; href?: string }[];
}) {
  return (
    <section className="page-hero about-hero">
      <div className="container about-hero-inner">
        <div data-aos="fade-up">
          <Breadcrumbs items={crumbs} />
          <span className="eyebrow eyebrow-light">{data.heroBadge}</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
        </div>
        <div
          className="about-hero-media"
          style={{ backgroundImage: `url(${data.heroImage})` }}
          data-aos="fade-left"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export function AboutSections({ sections }: { sections: AboutSection[] }) {
  return (
    <>
      {sections.map((s, i) => (
        <section
          key={s.heading}
          id={s.id}
          className={`section ${s.id ? "anchor" : ""} ${i % 2 === 1 ? "section-alt" : ""}`}
        >
          <div className="container">
            <div className="section-heading" data-aos="fade-up">
              {s.eyebrow && <span className="eyebrow">{s.eyebrow}</span>}
              <h2>{s.heading}</h2>
              {(s.cards || s.trustCard) && s.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {s.trustCard ? (
              <div className="trust-card-wrap">
                <TrustCard data={s.trustCard} />
              </div>
            ) : s.cards ? (
              <div className={`about-card-grid ${s.cardStyle === "certification" ? "about-card-grid-cert" : ""}`}>
                {s.cards.map((card, ci) =>
                  s.cardStyle === "certification" ? (
                    <CertificationCard key={card.title} card={card} delay={ci * 80} />
                  ) : (
                    <SpotlightCard
                      key={card.title}
                      className="about-feature-card"
                      data-aos="fade-up"
                      data-aos-delay={ci * 80}
                    >
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                    </SpotlightCard>
                  )
                )}
              </div>
            ) : (
              <>
                {s.body?.map((paragraph) => (
                  <p key={paragraph} data-aos="fade-up">
                    {paragraph}
                  </p>
                ))}
                {s.points && (
                  <ul className="ticks" data-aos="fade-up">
                    {s.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </section>
      ))}
    </>
  );
}

function CertificationCard({ card, delay }: { card: AboutCard; delay: number }) {
  return (
    <SpotlightCard className="cert-card" data-aos="fade-up" data-aos-delay={delay}>
      <span className="cert-card-icon">
        <CertIcon icon={card.icon} />
      </span>
      <div className="cert-card-head">
        <h3>{card.title}</h3>
        {card.badge && <span className="cert-card-badge">{card.badge}</span>}
      </div>
      {card.authority && <p className="cert-card-authority">{card.authority}</p>}
      <p className="cert-card-text">{card.text}</p>
      {card.benefits && (
        <ul className="ticks cert-card-benefits">
          {card.benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      )}
    </SpotlightCard>
  );
}

function CertIcon({ icon }: { icon?: AboutCard["icon"] }) {
  const paths: Record<string, string> = {
    iso: "M12 3 4 6.5V12c0 4.8 3.4 8.6 8 9.9 4.6-1.3 8-5.1 8-9.9V6.5L12 3Z M8.5 12l2.5 2.5L16 9",
    msme: "M4 21V9l8-6 8 6v12M9 21v-7h6v7M4 12h16",
    startup: "M6 18 18 6M18 6h-6M18 6v6",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[icon ?? "iso"]} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrustCard({ data }: { data: AboutTrustCard }) {
  return (
    <SpotlightCard className="trust-card" data-aos="zoom-in">
      <GoogleLogo />
      <strong className="trust-rating">
        {data.ratingValue}
        <span className="stars" role="img" aria-label={`Rated ${data.ratingValue} out of 5`}>
          ★★★★★
        </span>
      </strong>
      <p>{data.text}</p>
      <div className="trust-actions">
        <a href={data.primaryCta.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          {data.primaryCta.label}
        </a>
        <a href={data.secondaryCta.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          {data.secondaryCta.label}
        </a>
      </div>
    </SpotlightCard>
  );
}

function GoogleLogo() {
  return (
    <svg className="google-logo" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FBBC05" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#EA4335" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#34A853" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#4285F4" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

export function AboutStats({ stats }: { stats: AboutStat[] }) {
  if (!stats.length) return null;
  return (
    <section className="section">
      <div className="container">
        <div className="duration-grid" data-aos="fade-up">
          {stats.map((s) => (
            <div key={s.label} className="card duration-card">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutGallery({ gallery }: { gallery: AboutGalleryItem[] }) {
  if (!gallery.length) return null;
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="about-gallery">
          {gallery.map((item, i) => (
            <figure key={item.caption} className="about-gallery-item" data-aos="fade-up" data-aos-delay={i * 80}>
              <span className="about-gallery-img" style={{ backgroundImage: `url(${item.image})` }} />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
