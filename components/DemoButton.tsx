"use client";

import type { ReactNode } from "react";

// Opens the header's Book Demo pop-up from anywhere on a page.
export default function DemoButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("open-demo"))}>
      {children}
    </button>
  );
}
