// All landing-page copy and content lives here so changes don't require touching components.

export const site = {
  // Logo renders as `${brandFirst}${brandSecond}` with the second part in gold.
  brandFirst: "Student",
  brandSecond: "Gigs",
  tagline: "Connecting students to shifts across the USA & UK. Find flexible part-time work that fits around your studies.",
  // Optional: drop an image into /public (e.g. /images/hero.jpg) and set it here.
  heroImage: undefined as string | undefined,
  social: {
    instagram: "#",
    x: "#",
    tiktok: "#",
  },
};

export const brandName = `${site.brandFirst}${site.brandSecond}`;

export const navLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/post-job", label: "Post a Job" },
  { href: "/about", label: "About" },
];

export const heroStats = [
  { value: "2,400+", label: "Active Listings" },
  { value: "850+", label: "Employers" },
  { value: "USA & UK", label: "Countries" },
  { value: "Free", label: "For Students" },
];

export type CategorySlug = "cafes" | "campus" | "retail" | "tutoring" | "delivery";

export interface Category {
  slug: CategorySlug;
  name: string;
  icon: string;
  count: number;
  /** Tailwind gradient used when no image is set. */
  gradient: string;
  /** Optional photo in /public, shown under the colour overlay. */
  image?: string;
  /** Grid span on desktop (bento layout). */
  span: string;
}

export const categories: Category[] = [
  {
    slug: "cafes",
    name: "Cafes & Restaurants",
    icon: "☕",
    count: 142,
    gradient: "from-amber-500/90 via-amber-600/85 to-orange-700/80",
    span: "md:col-span-2",
  },
  {
    slug: "campus",
    name: "Campus Jobs",
    icon: "🎓",
    count: 89,
    gradient: "from-orange-500/90 to-orange-700/85",
    span: "",
  },
  {
    slug: "retail",
    name: "Retail & Customer Service",
    icon: "🛍️",
    count: 217,
    gradient: "from-pink-600/90 to-rose-700/85",
    span: "",
  },
  {
    slug: "tutoring",
    name: "Tutoring & Academic Help",
    icon: "📚",
    count: 63,
    gradient: "from-yellow-500/90 to-amber-600/85",
    span: "",
  },
  {
    slug: "delivery",
    name: "Delivery & Logistics",
    icon: "🚴",
    count: 98,
    gradient: "from-rose-500/90 to-red-700/85",
    span: "",
  },
];

export const howItWorks = [
  {
    title: "Browse Listings",
    body: "Filter by category, location, and country. Find shifts that match your availability and skills.",
  },
  {
    title: "Contact the Employer Directly",
    body: "Each listing shows the employer's contact details — email, phone, or website. No middleman, no waiting.",
  },
  {
    title: "Start Your Shift",
    body: "Agree on hours, show up, and get paid. It's that straightforward.",
  },
];

export const footerLinks = {
  "For Students": [
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/jobs?country=US", label: "USA Jobs" },
    { href: "/jobs?country=UK", label: "UK Jobs" },
    { href: "/#how-it-works", label: "How It Works" },
  ],
  "For Employers": [
    { href: "/post-job", label: "Post a Job" },
    { href: "/about", label: "About Us" },
    { href: "mailto:hello@example.com", label: "Contact" },
  ],
};
