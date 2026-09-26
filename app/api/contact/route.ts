import { saveContactEnquiry } from "@/lib/db";
import { handleEnquiry } from "@/lib/enquiry";

// Saves the /contact page enquiry form (components/ContactCtaForm.tsx) into the contact_enquiries table.
export function POST(request: Request) {
  return handleEnquiry(request, saveContactEnquiry, "contact enquiry");
}
