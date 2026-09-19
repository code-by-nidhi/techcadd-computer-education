import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${site.fullName} ${site.city} | Computer, Tally, CAD, Digital Marketing & Graphic Design Courses`,
    template: `%s | ${site.fullName} ${site.city}`,
  },
  description: `${site.fullName}, ${site.city} — practical training in Basic Computer, Accounting (Tally & GST), CAD/CAM, Digital Marketing and Graphic Design with certification and placement support.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
