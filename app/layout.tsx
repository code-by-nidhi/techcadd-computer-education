import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Aos from "@/components/Aos";
import { site } from "@/lib/site";
import "./globals.css";

// next/font emits font-family: "Inter", "Inter Fallback" (a size-adjusted local fallback, so text doesn't jump on load).
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${site.fullName} ${site.city} | Computer, Tally, CAD, Digital Marketing & Graphic Design Courses`,
    template: `%s | ${site.fullName} ${site.city}`,
  },
  description: `${site.fullName}, ${site.city} — practical training in Basic Computer & Accounting (Tally & GST), Punjabi Typing, Civil / Mechanical CAD, Graphic Designing and Digital Marketing with certification and placement support.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // AOS.init writes data-aos-easing / -duration / -delay onto <body>, and browser extensions
    // (Grammarly, password managers, translators) add their own attributes to <html>/<body> before
    // React hydrates. suppressHydrationWarning only covers this element's own attributes, not children.
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {/* AOS hides [data-aos] elements in CSS, so keep them visible when scripts don't run. The markup
            has to go in as raw HTML: a browser with scripting on parses noscript content as plain text,
            so a <style> child here would not match on hydration. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>[data-aos]{opacity:1!important;transform:none!important}</style>`,
          }}
        />
        <Aos />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
