// SAMPLE DATA for the landing page. Replace with real listings (or an API call) later.
// Contact details use reserved example domains / fictional numbers.

import type { CategorySlug } from "@/config/site";

export type Country = "US" | "UK";

export interface Job {
  id: string;
  title: string;
  employer: string;
  category: CategorySlug;
  country: Country;
  city: string; // e.g. "London" or "Boston, MA"
  pay: string; // display string, e.g. "£11.50/hr"
  hours: string; // e.g. "15–20 hrs/week"
  description: string;
  contact: { email?: string; phone?: string; website?: string };
  featured?: boolean;
  postedAt: string; // ISO date
}

export const jobs: Job[] = [
  {
    id: "barista-daily-grind",
    title: "Barista (Part-Time)",
    employer: "The Daily Grind Cafe",
    category: "cafes",
    country: "UK",
    city: "London",
    pay: "£11.50/hr",
    hours: "15–20 hrs/week",
    description: "Make great coffee, serve customers and keep the counter tidy. Weekend availability preferred.",
    contact: { email: "jobs@dailygrind.example.com", phone: "+44 20 7946 0123" },
    featured: true,
    postedAt: "2026-11-10",
  },
  {
    id: "library-assistant-boston",
    title: "Library Assistant",
    employer: "Boston University",
    category: "campus",
    country: "US",
    city: "Boston, MA",
    pay: "$16/hr",
    hours: "10–15 hrs/week",
    description: "Help students find resources, shelve returns and staff the front desk during evening shifts.",
    contact: { email: "library-jobs@university.example.edu", website: "https://example.edu/careers" },
    featured: true,
    postedAt: "2026-11-09",
  },
  {
    id: "retail-maple-street",
    title: "Retail Sales Associate",
    employer: "Maple Street Clothing",
    category: "retail",
    country: "UK",
    city: "Manchester",
    pay: "£10.75/hr",
    hours: "12–18 hrs/week",
    description: "Assist customers on the shop floor, run the till and help with visual merchandising.",
    contact: { email: "careers@maplestreet.example.com", phone: "+44 161 496 0456" },
    featured: true,
    postedAt: "2026-11-08",
  },
  {
    id: "maths-tutor-brightmind",
    title: "Maths Tutor",
    employer: "BrightMind Tutoring",
    category: "tutoring",
    country: "US",
    city: "Chicago, IL",
    pay: "$22/hr",
    hours: "8–12 hrs/week",
    description: "Tutor high-school students in algebra and calculus, in person or online. Strong maths background required.",
    contact: { email: "tutors@brightmind.example.com", phone: "+1 312 555 0148" },
    featured: true,
    postedAt: "2026-11-08",
  },
  {
    id: "delivery-rider-london",
    title: "Delivery Rider",
    employer: "QuickBite Deliveries",
    category: "delivery",
    country: "UK",
    city: "Leeds",
    pay: "£12.00/hr",
    hours: "Flexible",
    description: "Deliver food orders around the city centre by bike. Choose your own shifts.",
    contact: { website: "https://quickbite.example.com/riders" },
    postedAt: "2026-11-07",
  },
  {
    id: "campus-tour-guide",
    title: "Campus Tour Guide",
    employer: "University of Texas",
    category: "campus",
    country: "US",
    city: "Austin, TX",
    pay: "$15/hr",
    hours: "6–10 hrs/week",
    description: "Lead tours for prospective students and families. Great communication skills needed.",
    contact: { email: "admissions-jobs@university.example.edu" },
    postedAt: "2026-11-06",
  },
  {
    id: "server-bistro",
    title: "Weekend Server",
    employer: "Harbour Bistro",
    category: "cafes",
    country: "US",
    city: "Seattle, WA",
    pay: "$18/hr + tips",
    hours: "12–16 hrs/week",
    description: "Serve guests during busy weekend brunch and dinner shifts. Experience a plus, not required.",
    contact: { phone: "+1 206 555 0172", email: "hiring@harbourbistro.example.com" },
    postedAt: "2026-11-05",
  },
  {
    id: "stock-assistant",
    title: "Stock Assistant",
    employer: "BookNook",
    category: "retail",
    country: "UK",
    city: "Edinburgh",
    pay: "£11.00/hr",
    hours: "8–12 hrs/week",
    description: "Receive deliveries, restock shelves and help keep the shop organised. Early morning shifts.",
    contact: { email: "work@booknook.example.co.uk" },
    postedAt: "2026-11-04",
  },
];

export const featuredJobs = jobs.filter((j) => j.featured);
