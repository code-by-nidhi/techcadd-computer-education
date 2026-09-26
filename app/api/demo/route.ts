import { saveDemoRequest } from "@/lib/db";
import { handleEnquiry } from "@/lib/enquiry";

// Saves a "Book Demo" enquiry from the header pop-up into the demo_requests table.
export function POST(request: Request) {
  return handleEnquiry(request, saveDemoRequest, "demo request");
}
