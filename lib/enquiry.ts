import { NextResponse } from "next/server";
import { checkCaptcha } from "./captcha";
import { courses, NOT_SURE_COURSE } from "./courses";
import type { Enquiry } from "./db";
import { site } from "./site";

const allowedCourses = new Set([NOT_SURE_COURSE, ...courses.map((c) => c.title)]);

// Shared by /api/demo (Book Demo pop-up) and /api/contact (contact page form): validates the posted
// JSON and the captcha, then hands the clean enquiry to `save` (one table per form, see lib/db.ts).
export async function handleEnquiry(request: Request, save: (e: Enquiry) => Promise<void>, label: string) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return fail("Invalid request.");

  const course = String(body.course ?? "");
  const name = String(body.name ?? "").trim().replace(/\s+/g, " ");
  const phone = String(body.phone ?? "").replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
  const email = String(body.email ?? "").trim().slice(0, 190);
  const message = String(body.message ?? "").trim().slice(0, 1000);

  if (!allowedCourses.has(course)) return fail("Please select a course.");
  if (name.length < 2 || name.length > 100) return fail("Please enter your full name.");
  if (!/^[6-9]\d{9}$/.test(phone)) return fail("Please enter a valid 10-digit mobile number.");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Please enter a valid email address.");
  if (!checkCaptcha(String(body.captchaToken ?? ""), String(body.captchaAnswer ?? ""))) {
    return fail("That answer doesn't match. Please try the new question.", "captcha");
  }

  try {
    await save({ course, name, phone, email, message, page: String(body.page ?? "").slice(0, 255) });
  } catch (err) {
    console.error(`Saving ${label} failed:`, err);
    return NextResponse.json(
      { error: `We couldn't save your request right now. Please call us on ${site.phone}.` },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}

function fail(error: string, field?: string) {
  return NextResponse.json({ error, field }, { status: 400 });
}
