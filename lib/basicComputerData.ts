// Copy for the dedicated Basic Computer Course page (app/courses/basic-computer-course/page.tsx,
// rendered by components/BasicComputerPage.tsx). The section list follows the course-page reference
// (hero → overview → audience → case for it → syllabus → tools → certificate → careers → projects →
// loop → why techcadd → comparison → reviews → FAQ); the layout is deliberately its own.
import { site } from "./site";

export const bcSeo = {
  title: `Basic Computer Course in ${site.city} | 2-Month Beginner Program`,
  description: `Learn computers from zero at ${site.name} ${site.city}: Windows, internet, email, MS Word, Excel, PowerPoint and English/Punjabi typing, with a certificate and placement support.`,
};

export const bcHero = {
  tag: "Basic Computer",
  badge: "Beginner Friendly",
  title: `Best Basic Computer Course in ${site.city}`,
  text: `Go from never having used a computer to confidently handling Windows, the internet, email and MS Office — taught hands-on in the ${site.name} ${site.city} lab, one practical task at a time, not from slides.`,
  points: ["Daily lab practice", "Patient trainers", "Placement support", "Certificate included"],
  facts: [
    { label: "Duration", value: "2 Months" },
    { label: "Mode", value: "Classroom · Weekend · 1-on-1" },
    { label: "Eligibility", value: "Anyone, age 12+" },
    { label: "Includes", value: "Certificate + practice files" },
  ],
  stats: [
    { value: "25,000+", label: "Students trained", note: `since ${site.since}` },
    { value: "4.9★", label: "Google rating", note: "from our students" },
    { value: "100%", label: "Practical", note: "every class at a computer" },
  ],
};

export const bcOverview = {
  eyebrow: "Course overview",
  title: "Everything you need to use a computer with confidence",
  paragraphs: [
    `${site.name}'s Basic Computer Course in ${site.city} is built for people who are starting from zero — students, homemakers, job seekers, shopkeepers and senior citizens who want to stop depending on someone else for everyday computer work.`,
    "The first weeks cover the computer itself: switching on safely, the mouse and keyboard, Windows, folders and files. From there you move online — browsing, Gmail, filling online forms, paying bills and using government portals safely. The second month is MS Office: letters and a resume in Word, a household or shop budget in Excel, and a presentation in PowerPoint, with English and Punjabi typing practice running through the whole course.",
    "Every topic ends with something you have done yourself on a lab computer and a trainer has checked, so you leave with a folder of real work, a certificate and the confidence to keep going into Tally, Advanced Excel or a diploma.",
  ],
  getList: [
    "100% practical, one computer per student",
    "Step-by-step notes in simple English and Punjabi",
    "Daily typing practice with speed tracking",
    "Doubt clearing after every class",
    "Certificate + a folder of your own work",
  ],
  miniStats: [
    { value: "25K+", label: "Students" },
    { value: "4.9★", label: "Google rating" },
    { value: `${site.since}`, label: "Established" },
    { value: "7", label: "Modules" },
  ],
};

export const bcAudience = {
  eyebrow: "Eligibility",
  title: "Who can do this course",
  text: "There is no entry test and no age limit. Batches are mixed on purpose — what matters is practising a little every day, not what you knew before you walked in.",
  items: [
    { icon: "student", title: "School students (10th / 12th)", text: "Build the computer basics every college course and every job form now expects, before you need them." },
    { icon: "grad", title: "College students", text: "Type assignments, make presentations and handle online admissions and exam forms yourself." },
    { icon: "job", title: "Job seekers", text: "Most office, reception and data-entry vacancies list basic computer knowledge as the first requirement." },
    { icon: "home", title: "Homemakers", text: "Learn online banking, bill payments, video calls and help your children with school work." },
    { icon: "shop", title: "Shopkeepers & business owners", text: "Keep records in Excel, print bills and quotations, and stop paying someone for simple computer work." },
    { icon: "senior", title: "Senior citizens", text: "Patient, slow-paced 1-on-1 slots for email, WhatsApp Web, pension portals and staying in touch with family." },
  ],
};

export const bcCase = {
  eyebrow: "The case for it",
  title: "Why two months here are worth it",
  feature: {
    tag: "Access",
    title: "Timings that fit your day",
    text: `Students reach the ${site.city} centre from Model Town, Urban Estate, Adarsh Nagar, Basti Bawa Khel and Rama Mandi, with weekend learners coming in from Phagwara, Kapurthala, Nakodar and Adampur. Morning, evening, weekend and 1-on-1 slots all exist so school, college, work or home never has to stop — every class is one hour of teaching plus lab time.`,
    slots: ["Morning", "Afternoon", "Evening", "Weekend", "1-on-1"],
  },
  cards: [
    {
      tag: "Demand",
      title: "Every job starts at a computer",
      text: "From shop billing to hospital reception, almost every local vacancy now asks for basic computer skills. It is the one skill that makes every other skill usable.",
    },
    {
      tag: "Method",
      title: "Your hands on the mouse",
      text: "You do not watch the trainer's screen — the trainer watches yours. Every task is done by you, checked, and repeated until it sticks.",
    },
    {
      tag: "Independence",
      title: "Stop asking for help",
      text: "Filling a form, sending a document, booking a ticket or printing a bill — the course is measured by what you can now do on your own.",
    },
    {
      tag: "Next step",
      title: "A foundation that stacks",
      text: "The course is the first step into Tally Prime, Advanced Excel, DCA or Punjabi typing for government exams — each goes faster because the basics are already done.",
    },
  ],
};

export const bcWhyNow = {
  eyebrow: "Why now",
  title: "Everything has moved online. Your skills should too.",
  points: [
    "Admissions, job applications, bank KYC and government schemes are now filled in online — often only online.",
    "Entry-level office roles in Punjab start around ₹8,000 – ₹15,000 a month, and computer skills are the first line on the job ad.",
    "Two months of daily practice is enough to go from zero to confident.",
  ],
};

export const bcSyllabus = {
  eyebrow: "Syllabus",
  title: "What you will learn, week by week",
  text: "The course moves in the order you actually use a computer: first the machine, then the internet, then the office tools, with typing practice every single day.",
  phases: [
    {
      id: "01",
      name: "Computer Fundamentals",
      weeks: "Weeks 1–2",
      summary: "Get comfortable with the machine itself — no fear, no guesswork.",
      topics: [
        "Parts of a computer, switching on/off safely",
        "Using the mouse and keyboard properly",
        "Windows desktop, Start menu and taskbar",
        "Settings, display and printers",
      ],
      outcome: "Operate a Windows PC confidently on your own",
    },
    {
      id: "02",
      name: "Files, Folders & Shortcuts",
      weeks: "Week 3",
      summary: "Keep your work organised and find anything in seconds.",
      topics: [
        "Creating, renaming, copying and moving files",
        "Folders, drives and pen drives",
        "Keyboard shortcuts that save hours",
        "Zip files, recycle bin and basic safety",
      ],
      outcome: "An organised folder system you set up yourself",
    },
    {
      id: "03",
      name: "Internet, Email & Online Services",
      weeks: "Weeks 4–5",
      summary: "Use the internet the safe and useful way.",
      topics: [
        "Browsing and searching with Chrome",
        "Creating and using a Gmail account, attachments",
        "Online forms, government portals and bill payments",
        "Google Drive, Docs and online safety / fraud awareness",
      ],
      outcome: "Send email, fill online forms and use Google Drive",
    },
    {
      id: "04",
      name: "MS Word",
      weeks: "Week 6",
      summary: "Type and format documents that look professional.",
      topics: [
        "Typing, editing and formatting text",
        "Letters, applications and a resume",
        "Tables, images, headers and page setup",
        "Printing and saving as PDF",
      ],
      outcome: "Your own resume and a formal letter",
    },
    {
      id: "05",
      name: "MS Excel",
      weeks: "Week 7",
      summary: "Handle numbers, lists and simple calculations.",
      topics: [
        "Rows, columns, cells and formatting",
        "SUM, AVERAGE, MIN, MAX and simple formulas",
        "Sorting, filtering and basic charts",
        "Printing sheets neatly",
      ],
      outcome: "A monthly budget or shop stock sheet",
    },
    {
      id: "06",
      name: "MS PowerPoint",
      weeks: "Week 8",
      summary: "Present ideas clearly with slides.",
      topics: [
        "Slides, layouts and themes",
        "Images, shapes and simple animation",
        "Presenting and sharing a slideshow",
      ],
      outcome: "A 6–8 slide presentation you deliver",
    },
    {
      id: "07",
      name: "English & Punjabi Typing",
      weeks: "Every day",
      summary: "Build speed and accuracy alongside every module.",
      topics: [
        "Correct finger placement and home row",
        "English typing speed drills",
        "Punjabi (Gurmukhi) typing basics in Raavi",
        "Weekly speed tests with progress tracking",
      ],
      outcome: "Measurable typing speed on your certificate",
    },
  ],
};

export const bcTools = {
  eyebrow: "Software you will use",
  title: "Real tools, installed on every lab computer",
  text: "Everything below is used in class on your own computer — not just shown on a projector.",
  tools: [
    { name: "Windows", logo: "windows.svg", use: "Operating system" },
    { name: "MS Word", logo: "word.png", use: "Documents & resumes" },
    { name: "MS Excel", logo: "excel.png", use: "Sheets & formulas" },
    { name: "PowerPoint", logo: "powerpoint.svg", use: "Presentations" },
    { name: "Outlook", logo: "outlook.svg", use: "Email & calendar" },
    { name: "Google Workspace", logo: "google-workspace.svg", use: "Gmail, Drive, Docs" },
    { name: "Punjabi Typing", logo: "punjabi.png", use: "Raavi / Gurmukhi" },
  ],
};

export const bcCertificate = {
  eyebrow: "Certification",
  title: "Get certified in Basic Computer",
  text: "Finish the course and your practical tasks to receive a techcadd certificate you can attach to any job or admission form — verifiable online.",
  items: [
    { title: "Course certificate", text: "Accepted by employers across Punjab" },
    { title: "Typing speed record", text: "Your tested speed, in writing" },
    { title: "Work folder", text: "Resume, letters, sheets and slides you made" },
    { title: "Placement support", text: "Resume help and job-drive updates" },
  ],
};

export const bcCareers = {
  eyebrow: "Future scope",
  title: "Where this course takes you",
  text: "Indicative starting pay for entry-level roles in Punjab. Actual offers depend on the employer, your typing speed and how you interview.",
  roles: [
    { title: "Computer Operator", pay: "₹9k – 15k", text: "Offices, clinics, schools and government contractors" },
    { title: "Data Entry Operator", pay: "₹8k – 14k", text: "Back offices, BPOs and record-keeping teams" },
    { title: "Office Assistant", pay: "₹10k – 16k", text: "Letters, files, email and day-to-day office work" },
    { title: "Receptionist / Front Desk", pay: "₹9k – 15k", text: "Hospitals, hotels, showrooms and institutes" },
  ],
  hiring: ["Hospitals & clinics", "Schools & coaching centres", "Showrooms & retail", "CA & tax offices", "Export houses", "Government contractors"],
  qa: [
    {
      q: "What jobs can I get after a basic computer course?",
      a: "Computer operator, data entry operator, office assistant, receptionist and billing roles. Pairing it with good typing speed makes you a much stronger candidate.",
    },
    {
      q: "Is it useful if I don't want a job?",
      a: "Yes. Online banking, bill payments, forms, email and helping children with school work are reason enough — many of our students join just for independence.",
    },
    {
      q: "Does it help for government jobs?",
      a: "Many Punjab government posts (clerk, data entry, steno) require computer knowledge and a typing test. This course plus our Punjabi typing course covers both.",
    },
    {
      q: "What should I learn after this?",
      a: "Most students move on to Tally Prime with GST, MS Office & Advanced Excel, or the 6-month DCA. The tools overlap, so the next course goes faster.",
    },
  ],
};

export const bcProjects = {
  eyebrow: "Practical work",
  title: "Real tasks you will complete",
  items: [
    { n: "01", title: "Your professional resume", text: "Type, format and export a clean one-page resume in MS Word — ready to send.", tags: ["MS Word", "PDF"] },
    { n: "02", title: "Monthly budget sheet", text: "Track income and expenses with formulas and a simple chart in Excel.", tags: ["MS Excel", "Charts"] },
    { n: "03", title: "Online task day", text: "Create a Gmail account, send attachments, fill a real online form and upload documents to Drive.", tags: ["Gmail", "Drive"] },
    { n: "04", title: "Final presentation", text: "Build and present a short slideshow on a topic of your choice to the batch.", tags: ["PowerPoint", "Presenting"] },
  ],
};

export const bcLoop = {
  eyebrow: "How every class works",
  title: "See it. Do it. Own it.",
  text: "Every topic follows the same three steps, so nothing is left as theory.",
  steps: [
    { title: "See it", text: "The trainer demonstrates one task, slowly, on the big screen.", example: "Creating a folder" },
    { title: "Do it", text: "You repeat it on your own computer while the trainer checks your screen.", example: "Saving your resume" },
    { title: "Own it", text: "A short practice task at the end proves you can do it without help.", example: "Emailing it as a PDF" },
  ],
};

export const bcWhy = {
  eyebrow: `Why ${site.name}`,
  title: `Why students choose ${site.name}`,
  text: `There are many places to learn computers in ${site.city}. What differs is who teaches, how much time you actually spend at a keyboard, and whether anyone answers the phone after you have paid.`,
  items: [
    { title: "Patient, experienced trainers", text: "Trainers used to teaching complete beginners — no question is too basic." },
    { title: "One student, one computer", text: "No sharing and no watching. You practise every minute of lab time." },
    { title: "Small batches", text: "Small enough that the trainer sees your screen every single class." },
    { title: "Simple bilingual notes", text: "Step-by-step notes in English and Punjabi to revise at home." },
    { title: "Placement support", text: `Resume help, mock interviews and job drives with 500+ hiring partners.` },
    { title: "Trusted since " + site.since, text: "25,000+ students trained across Punjab, rated 4.9★ on Google." },
  ],
};

export const bcCompare = {
  eyebrow: "Compare",
  title: `How ${site.name} compares`,
  text: "Questions worth asking before you join any computer course, including this one.",
  rows: [
    { feature: "Practice time", us: "One computer per student, every class", them: "Shared computers or theory classes" },
    { feature: "Batch size", us: "Small batches with individual attention", them: "Large, crowded batches" },
    { feature: "Syllabus", us: "Windows, internet, Office and typing", them: "Often only MS Office" },
    { feature: "Typing", us: "English + Punjabi practice daily", them: "Rarely included" },
    { feature: "Notes", us: "Simple bilingual step-by-step notes", them: "Photocopied or none" },
    { feature: "Timings", us: "Morning, evening, weekend, 1-on-1", them: "Fixed single slot" },
    { feature: "Doubt support", us: "Daily doubt clearing after class", them: "Limited or none" },
    { feature: "Certificate", us: "Verifiable certificate + work folder", them: "Varies" },
  ],
  note: "The right-hand column describes what is commonly offered in the market, not any particular institute.",
};

// TODO: replace with real Google reviews before going live (same note as lib/content.ts testimonials).
export const bcReviews = [
  { name: "Manpreet Kaur", role: "Homemaker · Jalandhar", text: "I had never used a computer. In two months I was paying bills online and sending emails to my son abroad. The trainer never lost patience." },
  { name: "Arjun Sharma", role: "Class 12 Student · Model Town", text: "Learned Word, Excel and typing before college started. Now I make my own assignments and presentations." },
  { name: "Gurdeep Singh", role: "Shop Owner · Basti Bawa Khel", text: "I keep my stock and udhaar records in Excel now. Simple, practical and worth every rupee." },
  { name: "Neha Arora", role: "Receptionist · Hospital", text: "The course and the typing practice got me my first job at a hospital front desk." },
  { name: "Balwinder Singh", role: "Retired · Urban Estate", text: "The 1-on-1 slot was perfect for me. I now use email, WhatsApp Web and my pension portal myself." },
  { name: "Simran Kaur", role: "Data Entry Operator · Phagwara", text: "Weekend batch, small group and real practice. My typing speed doubled by the end." },
];

export const bcFaqs = [
  { q: "Do I need any computer knowledge before joining?", a: "No. The course starts from how to switch on a computer and use the mouse. It is designed for complete beginners." },
  { q: "What is the duration and class timing?", a: "The course runs for 2 months. Morning, afternoon, evening and weekend batches are available, plus 1-on-1 slots on request." },
  { q: "Is there an age limit?", a: "No. We teach school students, working adults, homemakers and senior citizens — often in the same batch." },
  { q: "Will I get a certificate?", a: "Yes. You receive a techcadd certificate on completing the course and practical tasks, which can be verified online." },
  { q: "Is Punjabi typing included?", a: "Yes. English and Punjabi (Gurmukhi) typing practice is part of the course. For government typing tests, we also offer a dedicated Punjabi typing course." },
  { q: "Can I attend a demo class first?", a: "Yes. Book a free demo class, see the lab and meet the trainer before you decide." },
  { q: "What should I learn after this course?", a: "Popular next steps are Tally Prime with GST, MS Office & Advanced Excel, or the 6-month DCA diploma." },
];
