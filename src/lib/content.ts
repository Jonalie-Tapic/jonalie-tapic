/**
 * All site copy in one place. Items marked PLACEHOLDER in docs/content-matrix.md
 * must be confirmed by Jonalie before launch.
 */

export interface NavItem {
  id: string;
  label: string;
}

export interface Photo {
  src: string;
  alt: string;
}

export const site = {
  name: "Jonalie",
  role: "Virtual Assistant",
  tagline: "General admin & operations support",
  url: "https://jonalie.example.com",
  email: "hello@example.com",
  bookingUrl: "#contact",
  linkedin: "#",
  hours: "US, AU & UK business hours",
  response: "within one business day",
  availability: "2 client spots open this quarter",
} as const;

export const nav: NavItem[] = [
  { id: "services", label: "Services" },
  { id: "work", label: "Results" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "rates", label: "Rates" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export const photos = {
  standing: {
    src: "/images/jonalie-standing.jpg",
    alt: "Jonalie standing in a bright glass-walled office, wearing a navy suit and smiling",
  },
  portrait: {
    src: "/images/jonalie-portrait.jpg",
    alt: "Portrait of Jonalie in a navy blazer and glasses, smiling",
  },
  desk: {
    src: "/images/jonalie-desk.jpg",
    alt: "Jonalie seated at her desk in a navy blazer, hands resting on the table",
  },
  atLaptop: {
    src: "/images/jonalie-laptop.jpg",
    alt: "Jonalie at her laptop, chin resting on her hand, smiling",
  },
  overShoulder: {
    src: "/images/jonalie-over-shoulder.jpg",
    alt: "Jonalie glancing over her shoulder in an open-plan office",
  },
  // Supporting placeholders (Unsplash)
  flatlay: {
    src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=75&auto=format&fit=crop",
    alt: "Laptop, notebook and coffee on a tidy desk",
  },
  notebook: {
    src: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=75&auto=format&fit=crop",
    alt: "Handwritten to-do list in an open notebook",
  },
  typing: {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=75&auto=format&fit=crop",
    alt: "Hands typing on a laptop",
  },
} satisfies Record<string, Photo>;

export const hero = {
  eyebrow: "Virtual Assistant · General Admin & Operations",
  headingStart: "Your inbox, calendar & admin,",
  headingEmphasis: "quietly handled.",
  subheading:
    "I'm Jonalie. I look after the admin for founders, coaches and small-business owners who've outgrown doing everything themselves, so you can get back to the work only you can do.",
  primaryCta: "Book a free discovery call",
  secondaryCta: "See what I take off your plate",
  assurances: ["Replies within 1 business day", "NDA before any access", "US · AU · UK hours"],
  tasks: [
    { label: "Inbox triaged to zero", time: "8:42 am" },
    { label: "Tuesday's clash rescheduled", time: "9:15 am" },
    { label: "Invoices sent & chased", time: "11:30 am" },
    { label: "Flights to Singapore booked", time: "2:05 pm" },
    { label: "Weekly summary in Slack", time: "4:50 pm" },
  ],
};

export const tools = [
  "Google Workspace",
  "Microsoft 365",
  "Notion",
  "Asana",
  "ClickUp",
  "Trello",
  "Slack",
  "Canva",
  "HubSpot",
  "QuickBooks Online",
  "Xero",
  "Calendly",
  "Zoom",
  "Dubsado",
];

export const stats = [
  { value: 5, suffix: "+", label: "Years in admin & operations support" },
  { value: 30, suffix: "+", label: "Founders & teams supported" },
  { value: 12, suffix: "hrs", label: "Average returned to a client each week" },
  { value: 24, suffix: "h", label: "Longest I'll keep you waiting for a reply" },
];

export interface Service {
  title: string;
  summary: string;
  tasks: string[];
}

export const services: Service[] = [
  {
    title: "Get my inbox under control",
    summary: "Daily triage, drafted replies in your voice, filters and folders that stay tidy.",
    tasks: ["Daily inbox-zero triage", "Drafting & sending replies", "Newsletter & spam clean-up", "Priority flags for what needs you"],
  },
  {
    title: "Keep my calendar sane",
    summary: "Meetings booked, clashes caught before they happen, and your focus time protected.",
    tasks: ["Scheduling across time zones", "Meeting prep & agendas", "Protected focus blocks", "Reminders & follow-ups"],
  },
  {
    title: "Handle the client paperwork",
    summary: "Onboarding packs, contracts out for signature, CRM kept up to date, nobody forgotten.",
    tasks: ["Client onboarding flows", "Proposals & contracts", "CRM data entry & hygiene", "Follow-up sequences"],
  },
  {
    title: "Chase the invoices",
    summary: "Invoices raised, payments chased politely, receipts organised before your bookkeeper asks.",
    tasks: ["Invoicing in QuickBooks / Xero", "Payment reminders", "Expense & receipt filing", "Monthly bookkeeping prep"],
  },
  {
    title: "Plan the travel & events",
    summary: "Flights, hotels and itineraries sorted, and a plan B ready before anything goes wrong.",
    tasks: ["Flights, hotels & transfers", "Day-by-day itineraries", "Event & webinar logistics", "Vendor coordination"],
  },
  {
    title: "Turn chaos into systems",
    summary: "SOPs, templates and a tidy shared drive, so the business runs the same way every time.",
    tasks: ["Written SOPs & checklists", "Shared drive restructure", "Notion / Asana set-up", "Reports & spreadsheets"],
  },
];

export interface Scenario {
  situation: string;
  response: string;
  steps: string[];
  outcome: string;
}

export const scenarios: Scenario[] = [
  {
    situation: "I'm answering emails at 11pm, again.",
    response: "We agree what I can answer for you, what I draft for your OK, and what only you should see.",
    steps: ["Label & filter system set up in week one", "Twice-daily triage in your time zone", "A 5-minute 'needs you' digest each morning"],
    outcome: "Most clients open their inbox to under 10 emails that genuinely need them.",
  },
  {
    situation: "I double-booked a client call last week.",
    response: "I own the calendar. You stop being the one who has to remember.",
    steps: ["One booking link with your real rules built in", "Buffers, focus time & time zones handled", "Prep notes attached to every meeting"],
    outcome: "No more clashes, and every meeting starts with context.",
  },
  {
    situation: "I'm owed money but hate chasing it.",
    response: "Invoices go out on schedule and I follow up politely, so you never have to have that conversation.",
    steps: ["Invoice schedule mapped to your clients", "Friendly 3-step reminder sequence", "Monthly paid / outstanding summary"],
    outcome: "Late payments get caught in days rather than months.",
  },
  {
    situation: "Everything lives in my head.",
    response: "I watch how you do things, write it down, and turn it into a system someone else could follow.",
    steps: ["Screen-recorded walkthroughs of your processes", "Clear written SOPs in Notion or Google Docs", "A shared drive you can actually find things in"],
    outcome: "Holidays stop being scary, because the business no longer depends on your memory.",
  },
];

export interface CaseStudy {
  client: string;
  sector: string;
  situation: string;
  work: string[];
  metric: string;
  metricLabel: string;
  image: Photo;
}

export const caseStudies: CaseStudy[] = [
  {
    client: "Leadership coach",
    sector: "Solo practice · 40 active clients",
    situation: "Session bookings, reschedules and invoices were eating her Mondays, and two clients a month were slipping through the cracks.",
    work: ["Rebuilt booking flow in Calendly + Dubsado", "Automated reminders & invoices", "Weekly client-status report"],
    metric: "9 hrs",
    metricLabel: "back every week",
    image: photos.notebook,
  },
  {
    client: "E-commerce founder",
    sector: "DTC skincare brand · 6 staff",
    situation: "1,400 unread emails, supplier threads buried under customer questions, and no idea what was urgent.",
    work: ["Inbox restructured with labels & templates", "Supplier tracker in Notion", "Daily 'needs you' digest"],
    metric: "1,400 → 0",
    metricLabel: "inbox cleared in 11 days",
    image: photos.typing,
  },
  {
    client: "Boutique consultancy",
    sector: "3 partners · international clients",
    situation: "Partners spread over three time zones, travel booked last-minute, and proposals sent a week after the meeting.",
    work: ["Shared calendar rules across time zones", "Travel booked 3+ weeks ahead", "Proposal template & 48-hour turnaround"],
    metric: "48 hrs",
    metricLabel: "from meeting to proposal",
    image: photos.flatlay,
  },
];

export const processSteps = [
  {
    title: "Discovery call",
    duration: "20 minutes · free",
    body: "You tell me what's piling up. I'll tell you honestly whether I'm the right fit and what I'd take on first.",
  },
  {
    title: "Proposal & NDA",
    duration: "Within 2 days",
    body: "A clear scope, hours and price in writing. I sign an NDA before you share a single password.",
  },
  {
    title: "Handover fortnight",
    duration: "Weeks 1–2",
    body: "Secure access via a password manager, short screen-recordings from you, and I write the SOPs as I learn.",
  },
  {
    title: "Your weekly rhythm",
    duration: "Ongoing",
    body: "A shared task board, a Friday summary of what's done and what's next, and one check-in a week. You stop having to chase anything.",
  },
];

export const about = {
  heading: "Hi, I'm Jonalie.",
  lead: "I'm the calm, organised person behind a lot of very busy people.",
  body: [
    "Before going independent I spent years in office administration, the kind of role where you're the one who knows where everything is, who remembers the client's name, and who notices the contract hasn't come back.",
    "Now I do the same work remotely for a small number of clients. Keeping the list short is deliberate. It means I know your business well enough to act before you have to ask.",
  ],
  principles: [
    { title: "Discreet", body: "Your inbox and your clients' details go no further than me. NDA as standard." },
    { title: "Proactive", body: "I flag problems early and bring a suggested fix with them." },
    { title: "Systematic", body: "Everything I learn about your business gets written down, so nothing lives only in my head." },
  ],
  credentials: [
    "Certified Virtual Assistant training",
    "Google Workspace administration",
    "Bookkeeping fundamentals (QuickBooks Online)",
    "Fluent written & spoken English",
  ],
};

export interface Package {
  name: string;
  /** Typical scope, as a guide only. Final hours are agreed per client. */
  scope: string;
  bestFor: string;
  includes: string[];
  recommended?: boolean;
}

/** Rates are quoted per client after the discovery call. No prices are published. */
export const pricing = {
  label: "To be discussed",
  detail: "Quoted around your needs",
};

export const packages: Package[] = [
  {
    name: "Essentials",
    scope: "Light, ongoing support",
    bestFor: "Taking the daily inbox and calendar off your plate.",
    includes: ["Inbox & calendar management", "Friday summary", "Replies within 1 business day"],
  },
  {
    name: "Right Hand",
    scope: "Regular support across your admin",
    bestFor: "Founders who want one person across all their admin.",
    includes: ["Everything in Essentials", "Invoicing & client paperwork", "SOPs written as we go", "Weekly 20-min check-in"],
    recommended: true,
  },
  {
    name: "Operations Partner",
    scope: "Dedicated, high-volume support",
    bestFor: "Small teams that need admin and light operations run end-to-end.",
    includes: ["Everything in Right Hand", "Projects & systems set-up", "Travel & event logistics", "Same-day priority replies"],
  },
];

/** What shapes a quote, so "to be discussed" never reads as "expensive and evasive". */
export const pricingNotes = [
  "Your quote depends on hours per month, the tools involved, and how much time-zone overlap you need.",
  "Monthly retainers and one-off projects are both welcome.",
  "You get a written quote after our free call, with no obligation to go ahead.",
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Within a fortnight I stopped checking my inbox on weekends. Jonalie doesn't just do the task, she tells me what she noticed while doing it.",
    name: "Sarah Whitfield",
    role: "Founder, Whitfield Coaching",
  },
  {
    quote:
      "She rebuilt our whole client onboarding in Notion without being asked twice. The Friday summary alone is worth the retainer.",
    name: "Marcus Tan",
    role: "Managing Partner, Northline Advisory",
  },
  {
    quote: "Calm, fast and genuinely discreet. I trust her with things I wouldn't hand to most employees.",
    name: "Elena Ruiz",
    role: "Owner, Casa Verde Skincare",
  },
];

export const faqs = [
  {
    q: "What time zone do you work in?",
    a: "I cover US, AU and UK business hours by arrangement. We agree fixed overlap hours when we start, so you always know when I'm online and how soon you'll hear back.",
  },
  {
    q: "How do you keep my accounts and data secure?",
    a: "I sign an NDA before any access. Passwords are shared through a password manager (1Password, Bitwarden or LastPass), never by email or chat. I use two-factor authentication everywhere, and your access can be revoked in one click.",
  },
  {
    q: "What if I don't know what to delegate yet?",
    a: "That's normal, and it's what the discovery call is for. Keep a rough list of everything you do for one week and we'll go through it together. Most people find 8–15 hours they can hand over straight away.",
  },
  {
    q: "What happens to hours I don't use?",
    a: "We agree how unused hours are handled when we set up your plan. You also get an hours tracker every Friday, so there are no surprises on the invoice.",
  },
  {
    q: "How much do you charge?",
    a: "Every business needs something different, so I quote per client instead of using a fixed price list. After our free discovery call I send a written quote based on the hours, tasks and tools involved. It's yours to consider, with no pressure to go ahead.",
  },
  {
    q: "Is there a long contract?",
    a: "No. We start with a 2-month minimum so the handover has time to pay off. After that it's month-to-month with 30 days' notice.",
  },
  {
    q: "How do we communicate day to day?",
    a: "Whatever you already use: Slack, email, WhatsApp or a shared Asana or Notion board. There's a short weekly check-in and a written summary every Friday.",
  },
];
