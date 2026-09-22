import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CategoryId, featuredSlugs, getCategory, getCourse } from "@/lib/courses";
import { courseItem } from "@/lib/listing";
import ArrowIcon from "./ArrowIcon";
import ScrollProgress from "./ScrollProgress";

// Home "Featured courses", after techcaddludhiana.com's Popular Courses: a dark panel that pins to
// the screen while the row of tall course cards slides sideways as you scroll (three cards in view).
// On small screens, or with reduced motion, it becomes a swipeable carousel instead.
const VISIBLE = 3;

// Card gradient per track (the reference uses photos; logos stand in for them here).
const tones: Record<CategoryId, string> = {
  "basic-accounting": "fc-tone-blue",
  "punjabi-typing": "fc-tone-orange",
  "civil-mechanical": "fc-tone-red",
  "graphic-design": "fc-tone-pink",
  "digital-marketing": "fc-tone-green",
};

// Course photos (public/courses, 3:4). A card with a photo shows it full-bleed instead of the logo tile.
const photos: Record<string, string> = {
  "basic-computer-course": "/courses/basic-computer.webp",
  "ms-office-advanced-excel": "/courses/ms-office-excel.webp",
  "tally-prime-gst": "/courses/tally-gst.webp",
  "punjabi-typing": "/courses/punjabi-typing.webp",
  autocad: "/courses/autocad.webp",
  "3ds-max": "/courses/3ds-max.webp",
  "graphic-design": "/courses/graphic-design.webp",
  "digital-marketing": "/courses/digital-marketing.webp",
};

export default function HomeFeatured() {
  const featured = featuredSlugs.map((s) => getCourse(s)!);
  const steps = Math.max(featured.length - VISIBLE, 0);

  return (
    <section className="fc" id="featured-courses">
      <ScrollProgress className="fc-scroll" style={{ "--steps": steps } as CSSProperties}>
        <div className="fc-stage">
          <div className="container fc-heading">
            <p className="fc-eyebrow">
              <span className="fc-dot" aria-hidden="true" />
              Featured courses
            </p>
            <h2>
              The programs learners <span className="fc-accent">choose most</span>
            </h2>
          </div>

          <div className="fc-cards">
            <div className="fc-viewport">
              <div className="fc-track">
                {featured.map((course) => {
                  const { icon } = courseItem(course);
                  const photo = photos[course.slug];
                  return (
                    <Link
                      key={course.slug}
                      href={`/courses/${course.slug}`}
                      className={`fc-card ${tones[course.category]}${photo ? " has-photo" : ""}`}
                    >
                      {photo ? (
                        <Image className="fc-card-photo" src={photo} alt="" fill sizes="(min-width: 861px) 400px, 62vw" />
                      ) : (
                        <span className="fc-card-media" aria-hidden="true">
                          {icon.logo ? (
                            <Image src={`/logos/${icon.logo}.png`} alt="" width={120} height={120} />
                          ) : (
                            <span style={{ color: icon.color }}>{icon.text}</span>
                          )}
                        </span>
                      )}
                      <span className="fc-card-tag">{getCategory(course.category).name}</span>
                      <span className="fc-card-name">{course.title}</span>
                      <span className="fc-card-meta">
                        {course.duration} · {course.level}
                      </span>
                      <span className="fc-card-cta">
                        Explore course <ArrowIcon />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="container fc-foot">
            <Link href="/courses" className="fc-all">
              Browse all courses
              <span aria-hidden="true">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </ScrollProgress>
    </section>
  );
}
