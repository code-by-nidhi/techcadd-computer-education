export type CategoryId = "basic-computer" | "accounting" | "cad-cam" | "digital-marketing" | "graphic-design";

export type Category = {
  id: CategoryId;
  name: string;
  blurb: string;
  icon: string;
};

export type Course = {
  slug: string;
  title: string;
  category: CategoryId;
  duration: string;
  level: string;
  summary: string;
  highlights: string[];
  modules: string[];
  tools: string[];
  careers: string[];
};

export const categories: Category[] = [
  {
    id: "basic-computer",
    name: "Basic Computer",
    blurb: "Computer fundamentals, MS Office and typing for everyday work",
    icon: "💻",
  },
  {
    id: "accounting",
    name: "Accounting",
    blurb: "Tally Prime, GST and computerised accounts that offices run on",
    icon: "📊",
  },
  {
    id: "cad-cam",
    name: "CAD/CAM",
    blurb: "2D drafting, 3D modelling and CNC programming for design careers",
    icon: "📐",
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    blurb: "Search, social, paid media and storefronts that convert",
    icon: "📈",
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    blurb: "Branding, print and social creatives built in industry tools",
    icon: "🎨",
  },
];

export const courses: Course[] = [
  // Basic Computer
  {
    slug: "basic-computer-course",
    title: "Basic Computer Course",
    category: "basic-computer",
    duration: "2 Months",
    level: "Beginner",
    summary:
      "Start from zero and become confident with computers, the internet, email and MS Office for home, study and office use.",
    highlights: ["No prior knowledge needed", "Daily hands-on practice", "Typing practice included"],
    modules: [
      "Computer fundamentals & Windows",
      "File management & keyboard shortcuts",
      "Internet, email & online services",
      "MS Word – letters, resumes & documents",
      "MS Excel – basic sheets & formulas",
      "MS PowerPoint – presentations",
      "English & Punjabi typing",
    ],
    tools: ["Windows", "MS Word", "MS Excel", "MS PowerPoint", "Google Workspace"],
    careers: ["Office Assistant", "Data Entry Operator", "Receptionist", "Computer Operator"],
  },
  {
    slug: "ms-office-advanced-excel",
    title: "MS Office & Advanced Excel",
    category: "basic-computer",
    duration: "2 Months",
    level: "Beginner – Intermediate",
    summary:
      "Master Word, Excel and PowerPoint the way offices use them, including advanced Excel formulas, pivot tables and MIS reports.",
    highlights: ["MIS reporting projects", "Advanced formulas & lookups", "Office-ready templates"],
    modules: [
      "Professional document formatting in Word",
      "Excel formulas, functions & named ranges",
      "VLOOKUP, XLOOKUP, INDEX-MATCH",
      "Pivot tables & pivot charts",
      "Conditional formatting & data validation",
      "Dashboards & MIS reports",
      "Macros basics",
      "Business presentations in PowerPoint",
    ],
    tools: ["MS Word", "MS Excel", "MS PowerPoint", "Outlook"],
    careers: ["MIS Executive", "Back Office Executive", "Office Coordinator", "Data Entry Operator"],
  },
  {
    slug: "dca",
    title: "Diploma in Computer Applications (DCA)",
    category: "basic-computer",
    duration: "6 Months",
    level: "Beginner",
    summary:
      "A complete foundation diploma covering computer fundamentals, MS Office, accounting basics and internet skills.",
    highlights: ["Diploma certificate", "Covers Office + Tally basics", "Ideal after 10th / 12th"],
    modules: [
      "Computer fundamentals & operating systems",
      "MS Word, Excel & PowerPoint",
      "Internet & email",
      "Tally Prime basics",
      "Typing (English & Punjabi)",
      "Basic Photoshop",
      "Project work",
    ],
    tools: ["Windows", "MS Office", "Tally Prime", "Photoshop"],
    careers: ["Computer Operator", "Office Assistant", "Data Entry Operator", "Billing Executive"],
  },
  {
    slug: "adca",
    title: "Advanced Diploma in Computer Applications (ADCA)",
    category: "basic-computer",
    duration: "12 Months",
    level: "Beginner – Intermediate",
    summary:
      "An extended one-year diploma combining office tools, accounting, design basics and web basics for well-rounded computer skills.",
    highlights: ["1-year diploma", "Accounting + design + office", "Internship letter"],
    modules: [
      "Everything in DCA",
      "Advanced Excel & MIS",
      "Tally Prime with GST",
      "CorelDRAW & Photoshop",
      "HTML & web basics",
      "Final project",
    ],
    tools: ["MS Office", "Tally Prime", "CorelDRAW", "Photoshop", "HTML"],
    careers: ["Computer Operator", "Accounts Assistant", "DTP Operator", "Office Executive"],
  },

  // Accounting
  {
    slug: "tally-prime-gst",
    title: "Tally Prime with GST",
    category: "accounting",
    duration: "3 Months",
    level: "Beginner – Intermediate",
    summary:
      "Learn complete business accounting in Tally Prime — vouchers, inventory, GST, TDS and payroll — with real company data.",
    highlights: ["Real company case studies", "GST return practice", "Payroll & TDS"],
    modules: [
      "Accounting fundamentals & golden rules",
      "Company creation & ledgers",
      "Voucher entry – sales, purchase, payment, receipt",
      "Inventory management",
      "GST setup, invoicing & returns",
      "TDS & payroll",
      "Bank reconciliation",
      "Final accounts & MIS reports",
    ],
    tools: ["Tally Prime", "MS Excel", "GST Portal"],
    careers: ["Accountant", "Accounts Executive", "GST Assistant", "Billing Executive"],
  },
  {
    slug: "busy-accounting",
    title: "BUSY Accounting Software",
    category: "accounting",
    duration: "2 Months",
    level: "Beginner",
    summary:
      "Handle billing, inventory and GST-compliant accounting in BUSY, widely used by traders, distributors and manufacturers.",
    highlights: ["Trading & distribution workflows", "GST billing", "Stock & batch management"],
    modules: [
      "BUSY setup & masters",
      "Sales, purchase & billing",
      "Inventory, batches & godowns",
      "GST invoicing & reports",
      "Outstanding & ledger management",
      "Reports & data backup",
    ],
    tools: ["BUSY", "MS Excel"],
    careers: ["Billing Executive", "Accounts Assistant", "Store Accountant"],
  },
  {
    slug: "computerised-accounting-diploma",
    title: "Diploma in Computerised Accounting",
    category: "accounting",
    duration: "6 Months",
    level: "Beginner – Advanced",
    summary:
      "A complete accounting career track: Tally Prime, BUSY, GST, income tax basics and Advanced Excel for accounts professionals.",
    highlights: ["Diploma certificate", "Tally + BUSY + Excel", "Internship letter"],
    modules: [
      "Financial accounting principles",
      "Tally Prime with GST",
      "BUSY accounting",
      "GST returns – GSTR-1, GSTR-3B",
      "Income tax & TDS basics",
      "Advanced Excel for accountants",
      "Live accounting project",
    ],
    tools: ["Tally Prime", "BUSY", "MS Excel", "GST Portal", "Income Tax Portal"],
    careers: ["Accountant", "Tax Assistant", "Accounts Executive", "Audit Assistant"],
  },
  {
    slug: "gst-taxation",
    title: "GST & Taxation",
    category: "accounting",
    duration: "2 Months",
    level: "Intermediate",
    summary:
      "Practical GST and income tax training — registration, invoicing, return filing and ITR preparation on the live portals.",
    highlights: ["Live portal practice", "Return filing workflow", "ITR preparation"],
    modules: [
      "GST concepts & registration",
      "Input tax credit",
      "GSTR-1, GSTR-3B & annual returns",
      "E-way bills & e-invoicing",
      "Income tax basics",
      "ITR filing & TDS returns",
    ],
    tools: ["GST Portal", "Income Tax Portal", "Tally Prime", "MS Excel"],
    careers: ["GST Practitioner Assistant", "Tax Assistant", "Accounts Executive"],
  },

  // CAD/CAM
  {
    slug: "autocad",
    title: "AutoCAD",
    category: "cad-cam",
    duration: "2 Months",
    level: "Beginner – Intermediate",
    summary:
      "Create accurate 2D drawings and 3D models for civil, mechanical and electrical projects in AutoCAD.",
    highlights: ["Civil & mechanical drawings", "Layouts & plotting", "Portfolio drawings"],
    modules: [
      "Interface, units & drawing setup",
      "Draw & modify commands",
      "Layers, blocks & attributes",
      "Dimensioning & annotation",
      "Layouts, viewports & plotting",
      "Isometric drawing",
      "3D modelling basics",
    ],
    tools: ["AutoCAD"],
    careers: ["CAD Draughtsman", "Design Assistant", "Site Draughtsman"],
  },
  {
    slug: "solidworks",
    title: "SolidWorks",
    category: "cad-cam",
    duration: "2 Months",
    level: "Intermediate",
    summary:
      "Model parts, build assemblies and produce manufacturing drawings in SolidWorks for mechanical design roles.",
    highlights: ["Part & assembly modelling", "Sheet metal & weldments", "Manufacturing drawings"],
    modules: [
      "Sketching & constraints",
      "Part modelling features",
      "Assemblies & mates",
      "Sheet metal",
      "Weldments",
      "Surface modelling basics",
      "Detailing & drawings",
    ],
    tools: ["SolidWorks"],
    careers: ["Mechanical Design Engineer", "CAD Engineer", "Product Designer"],
  },
  {
    slug: "catia",
    title: "CATIA",
    category: "cad-cam",
    duration: "2 Months",
    level: "Intermediate",
    summary:
      "Learn CATIA for automotive and aerospace design — part design, surfaces, assemblies and drafting.",
    highlights: ["Automotive-style projects", "Surface design", "Assembly & drafting"],
    modules: [
      "Sketcher workbench",
      "Part design",
      "Generative shape design (surfaces)",
      "Assembly design",
      "Drafting",
      "Sheet metal design",
    ],
    tools: ["CATIA V5"],
    careers: ["Design Engineer", "CAD Engineer", "Automotive Designer"],
  },
  {
    slug: "revit-architecture",
    title: "Revit Architecture",
    category: "cad-cam",
    duration: "2 Months",
    level: "Intermediate",
    summary:
      "Design buildings with BIM in Revit — walls, floors, roofs, sheets and schedules for architecture and civil projects.",
    highlights: ["BIM workflow", "Complete building project", "Sheets & schedules"],
    modules: [
      "BIM concepts & Revit interface",
      "Levels, grids, walls & floors",
      "Doors, windows & components",
      "Roofs, stairs & railings",
      "Families",
      "Rendering & walkthroughs",
      "Sheets, schedules & documentation",
    ],
    tools: ["Revit", "AutoCAD"],
    careers: ["BIM Modeller", "Architectural Draughtsman", "Civil CAD Designer"],
  },
  {
    slug: "3ds-max",
    title: "3ds Max (Interior & Exterior)",
    category: "cad-cam",
    duration: "3 Months",
    level: "Intermediate",
    summary:
      "Model, light and render photo-realistic interiors and elevations with 3ds Max and V-Ray.",
    highlights: ["Interior & exterior renders", "V-Ray lighting", "Portfolio renders"],
    modules: [
      "Modelling fundamentals",
      "Interior modelling",
      "Exterior elevations",
      "Materials & textures",
      "Lighting & cameras",
      "Rendering with V-Ray",
      "Walkthrough animation",
    ],
    tools: ["3ds Max", "V-Ray", "AutoCAD", "Photoshop"],
    careers: ["3D Visualiser", "Interior Designer", "Architectural Renderer"],
  },
  {
    slug: "cnc-programming-cam",
    title: "CNC Programming & CAM",
    category: "cad-cam",
    duration: "2 Months",
    level: "Intermediate",
    summary:
      "Write G & M code and generate toolpaths with CAM software for CNC turning and milling machines.",
    highlights: ["G & M codes", "Turning & milling", "CAM toolpaths"],
    modules: [
      "CNC machine basics",
      "G & M codes",
      "CNC turning programming",
      "CNC milling programming",
      "Tooling & cutting parameters",
      "CAM toolpath generation",
      "Simulation & post-processing",
    ],
    tools: ["Mastercam", "Fusion 360 CAM", "CNC Simulator"],
    careers: ["CNC Programmer", "CNC Operator", "CAM Engineer"],
  },

  // Digital Marketing
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "digital-marketing",
    duration: "4 Months",
    level: "Beginner – Advanced",
    summary:
      "A complete digital marketing course — SEO, social media, Google Ads, Meta Ads, email and analytics — with live campaigns.",
    highlights: ["Live campaigns with real budgets", "Google & Meta certifications prep", "Freelancing guidance"],
    modules: [
      "Digital marketing fundamentals",
      "Website building with WordPress",
      "Search engine optimisation (SEO)",
      "Google Ads (Search, Display, YouTube)",
      "Social media marketing",
      "Meta (Facebook & Instagram) Ads",
      "Email & WhatsApp marketing",
      "Google Analytics & Search Console",
      "Content & influencer marketing",
    ],
    tools: ["Google Ads", "Meta Ads Manager", "Google Analytics", "Search Console", "WordPress", "Canva"],
    careers: ["Digital Marketing Executive", "SEO Executive", "Social Media Manager", "PPC Specialist", "Freelancer"],
  },
  {
    slug: "seo",
    title: "Search Engine Optimisation (SEO)",
    category: "digital-marketing",
    duration: "2 Months",
    level: "Beginner – Intermediate",
    summary:
      "Rank websites on Google with on-page, off-page, technical and local SEO — practised on live websites.",
    highlights: ["Live website practice", "Local SEO & Google Business Profile", "Audit reports"],
    modules: [
      "How search engines work",
      "Keyword research",
      "On-page SEO",
      "Technical SEO",
      "Off-page SEO & link building",
      "Local SEO",
      "SEO audits & reporting",
    ],
    tools: ["Google Search Console", "Google Analytics", "Ahrefs / SEMrush", "Screaming Frog"],
    careers: ["SEO Executive", "SEO Analyst", "Content Strategist"],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    category: "digital-marketing",
    duration: "2 Months",
    level: "Beginner",
    summary:
      "Grow brands on Instagram, Facebook, YouTube and LinkedIn with content planning, reels and paid promotion.",
    highlights: ["Content calendars", "Reels & short video", "Paid promotions"],
    modules: [
      "Social media strategy",
      "Content planning & calendars",
      "Instagram & Facebook growth",
      "YouTube channel management",
      "LinkedIn marketing",
      "Meta Ads basics",
      "Insights & reporting",
    ],
    tools: ["Meta Business Suite", "Canva", "YouTube Studio", "CapCut"],
    careers: ["Social Media Executive", "Content Creator", "Community Manager"],
  },
  {
    slug: "google-ads-ppc",
    title: "Google Ads & PPC",
    category: "digital-marketing",
    duration: "1.5 Months",
    level: "Intermediate",
    summary:
      "Plan, launch and optimise paid campaigns on Google Search, Display, YouTube and Shopping.",
    highlights: ["Live ad account practice", "Conversion tracking", "Google Ads certification prep"],
    modules: [
      "Account structure & bidding",
      "Search campaigns",
      "Display & YouTube campaigns",
      "Shopping & Performance Max",
      "Conversion tracking",
      "Optimisation & reporting",
    ],
    tools: ["Google Ads", "Google Tag Manager", "Google Analytics"],
    careers: ["PPC Executive", "Performance Marketer", "Google Ads Specialist"],
  },

  // Graphic Design
  {
    slug: "graphic-design",
    title: "Graphic Design",
    category: "graphic-design",
    duration: "4 Months",
    level: "Beginner – Advanced",
    summary:
      "Become a job-ready graphic designer with Photoshop, Illustrator, CorelDRAW and InDesign — logos, branding, print and social media.",
    highlights: ["Portfolio of 20+ designs", "Branding & print projects", "Freelancing guidance"],
    modules: [
      "Design principles, colour & typography",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "CorelDRAW",
      "Adobe InDesign",
      "Logo & brand identity",
      "Print & packaging design",
      "Social media creatives",
      "Portfolio building",
    ],
    tools: ["Photoshop", "Illustrator", "CorelDRAW", "InDesign", "Canva"],
    careers: ["Graphic Designer", "Brand Designer", "DTP Operator", "Freelance Designer"],
  },
  {
    slug: "adobe-photoshop",
    title: "Adobe Photoshop",
    category: "graphic-design",
    duration: "1.5 Months",
    level: "Beginner",
    summary:
      "Edit photos, retouch portraits and design posters, banners and social posts in Photoshop.",
    highlights: ["Photo retouching", "Posters & banners", "Social media designs"],
    modules: [
      "Interface & tools",
      "Selections & layers",
      "Masks & adjustment layers",
      "Photo retouching & restoration",
      "Text effects & compositing",
      "Posters, banners & social creatives",
    ],
    tools: ["Photoshop"],
    careers: ["Photo Editor", "Graphic Designer", "Studio Designer"],
  },
  {
    slug: "coreldraw",
    title: "CorelDRAW",
    category: "graphic-design",
    duration: "1.5 Months",
    level: "Beginner",
    summary:
      "Design visiting cards, flex banners, brochures and logos in CorelDRAW for the print industry.",
    highlights: ["Print-ready files", "Flex & signage", "Logo design"],
    modules: [
      "Interface & drawing tools",
      "Shapes, curves & nodes",
      "Text & typography",
      "Colour & fills",
      "Visiting cards, letterheads & brochures",
      "Flex, banners & signage",
      "Print preparation",
    ],
    tools: ["CorelDRAW"],
    careers: ["DTP Operator", "Print Designer", "Flex Designer"],
  },
  {
    slug: "adobe-illustrator",
    title: "Adobe Illustrator",
    category: "graphic-design",
    duration: "1.5 Months",
    level: "Beginner – Intermediate",
    summary:
      "Create logos, icons, illustrations and vector artwork in Adobe Illustrator.",
    highlights: ["Vector logos", "Icons & illustration", "Brand assets"],
    modules: [
      "Vector basics & artboards",
      "Pen tool mastery",
      "Shape builder & pathfinder",
      "Typography",
      "Logo design",
      "Icons & illustrations",
      "Exporting for print & web",
    ],
    tools: ["Illustrator"],
    careers: ["Logo Designer", "Illustrator", "Graphic Designer"],
  },
];

export const getCategory = (id: CategoryId) => categories.find((c) => c.id === id)!;
export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const coursesIn = (id: CategoryId) => courses.filter((c) => c.category === id);

// Flagship course per category, shown in the "Featured Courses" section.
export const featuredSlugs = [
  "basic-computer-course",
  "tally-prime-gst",
  "autocad",
  "digital-marketing",
  "graphic-design",
];
