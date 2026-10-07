import type { Metadata } from "next";
import Link from "next/link";
import { CtaStrip, LeadCta, ListingHero, SectionHeading } from "@/components/Sections";
import {
  capstones,
  freeModules,
  freeModulesHeader,
  moduleWhatsAppHref,
  resourcesHero,
  resourcesSeo,
  resourceTools,
} from "@/lib/resourcesData";

export const metadata: Metadata = { title: resourcesSeo.title, description: resourcesSeo.description };

// /resources — free tools hub, free learning modules and capstone projects. See lib/resourcesData.ts
// for where the copy comes from and why the interactive tools open on the reference site.
export default function ResourcesPage() {
  return (
    <>
      <ListingHero
        pattern="zigzag"
        badge={resourcesHero.badge}
        title={resourcesHero.title}
        highlight={resourcesHero.highlight}
        text={resourcesHero.text}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {resourceTools.map((tool, i) => {
              const body = (
                <>
                  <span className="chip">{tool.tag}</span>
                  <h3>{tool.title}</h3>
                  <p>{tool.text}</p>
                  <span className="link-arrow">{tool.cta} →</span>
                </>
              );
              return tool.external ? (
                <a
                  key={tool.title}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card course-card"
                  suppressHydrationWarning
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
                  {body}
                </a>
              ) : (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="card course-card"
                  suppressHydrationWarning
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
                  {body}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="free-modules" className="section anchor theme-dark">
        <div className="container">
          <SectionHeading eyebrow={freeModulesHeader.eyebrow} title={freeModulesHeader.heading} text={freeModulesHeader.text} />
          <ul className="res-ticks">
            {freeModulesHeader.ticks.map((tick) => (
              <li key={tick}>✓ {tick}</li>
            ))}
          </ul>

          <div className="res-grid">
            {freeModules.map((mod, i) => (
              <article key={mod.title} className="card res-module" suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 60}>
                <div className="res-module-meta">
                  <span className="chip">{mod.category}</span>
                  <span>Duration: {mod.duration}</span>
                </div>
                <h3>{mod.title}</h3>
                <p>{mod.text}</p>
                <h4>Included Structured Lessons:</h4>
                <ol className="res-lessons">
                  {mod.lessons.map((lesson, n) => (
                    <li key={lesson}>
                      Lesson {n + 1}: {lesson}
                    </li>
                  ))}
                </ol>
                <p className="res-outcome">
                  <strong>Practical Outcome:</strong> {mod.outcome}
                </p>
                <a href={moduleWhatsAppHref(mod.title)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Request Free Access on WhatsApp
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={capstones.eyebrow} title={capstones.heading} text={capstones.text} />
          <div className="res-grid">
            {capstones.projects.map((project, i) => (
              <article key={project.title} className="card res-module" suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="chip">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <p className="res-outcome">
                  <strong>Outcome:</strong> {project.outcome}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LeadCta dark />
      <CtaStrip />
    </>
  );
}
