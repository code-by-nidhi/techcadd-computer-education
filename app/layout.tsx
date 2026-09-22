import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
