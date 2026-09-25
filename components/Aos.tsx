"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

// Starts AOS (Animate On Scroll) once for the whole site. Elements opt in with data-aos="fade-up"
// and friends; data-aos-delay staggers a row (AOS ships CSS for delays in steps of 50ms).
export default function Aos() {
  const pathname = usePathname();

  useEffect(() => {
    // A refresh half way down the page would otherwise restore that scroll position, which both drops
    // the visitor into the middle of a section and leaves AOS measuring from the wrong place. Start at
    // the top instead — unless the URL points at a specific section (#how-it-works and friends).
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    // AOS adds its aos-init / aos-animate classes straight to the DOM. This component sits in the
    // layout, which hydrates before the page segment inside loading.tsx's Suspense boundary, so
    // starting it here and now would rewrite nodes React has not hydrated yet — that is the
    // "tree hydrated but some attributes ... didn't match" report. Wait for the page to finish first.
    let cancelled = false;
    let timer = 0;
    let frame = 0;

    const start = () => {
      if (cancelled) return;
      AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true, // animate on the way in only, never replay on scroll back
        offset: 80,
        disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      });
      AOS.refreshHard();
    };
    const schedule = () => {
      // A longer delay plus a second animation frame gives streamed/Suspense-deferred segments more
      // time to finish hydrating before AOS starts writing aos-init/aos-animate classes — narrows
      // (can't fully close) the window where an above-the-fold data-aos node hydrates just as AOS
      // touches it, which is what causes React's "tree hydrated but attributes didn't match" warning.
      timer = window.setTimeout(() => {
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(start);
        });
      }, 200);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener("load", schedule);
    };
  }, []);

  // A client-side page change swaps the DOM under AOS, so positions have to be measured again.
  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);

  return null;
}
