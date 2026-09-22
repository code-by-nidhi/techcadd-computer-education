import { NextResponse } from "next/server";
import { checkCaptcha } from "@/lib/captcha";
import { courses, NOT_SURE_COURSE } from "@/lib/courses";
import { saveDemoRequest } from "@/lib/db";
import { site } from "@/lib/site";

const allowedCourses = new Set([NOT_SURE_COURSE, ...courses.map((c) => c.title)]);

// Saves a "Book Demo" enquiry from the header pop-up.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return fail("Invalid request.");

  const course = String(body.course ?? "");
  const name = String(body.name ?? "").trim().replace(/\s+/g, " ");
  const phone = String(body.phone ?? "").replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");

  if (!allowedCourses.has(course)) return fail("Please select a course.");
  if (name.length < 2 || name.length > 100) return fail("Please enter your full name.");
  if (!/^[6-9]\d{9}$/.test(phone)) return fail("Please enter a valid 10-digit mobile number.");
  if (!checkCaptcha(String(body.captchaToken ?? ""), String(body.captchaAnswer ?? ""))) {
    return fail("That answer doesn't match. Please try the new question.", "captcha");
  }

  try {
    await saveDemoRequest({ course, name, phone, page: String(body.page ?? "").slice(0, 255) });
  } catch (err) {
    console.error("Saving demo request failed:", err);
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
