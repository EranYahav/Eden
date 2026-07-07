// Central site configuration — brand, contact, nav, coaches.
// Edit here to change global facts in one place.

export const SITE = {
  name: "המטריה המשפחתית",
  tagline: "כל המשפחה. תחת מטריה אחת.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mitriafamily.co.il",
  locale: "he_IL",
  email: "sivanarazi2@gmail.com",
  spotifyShowUrl: "", // TODO: fill with the Spotify show URL for the podcast hub
  instagramUrl: "", // TODO: fill Instagram profile URL
} as const;

// Coaches. WhatsApp routing (Issue 3 mapping — confirmed in CEO review):
//   finance / blueprint -> Eden (052-5205281)
//   couples / parenting -> Sivan (052-8559050)
// Change a number here and every routed CTA updates.
export const COACHES = {
  eden: {
    slug: "eden",
    name: "עדן פוגירו",
    role: "יועץ כלכלי למשפחה ומומחה להשקעות נדל\"ן בארה\"ב",
    whatsapp: "972525205281", // 052-5205281
    email: "edenpogiro@gmail.com",
  },
  sivan: {
    slug: "sivan",
    name: "סיון ארזי פוגירו",
    role: "מנטורית רב-תחומית לזוגיות, הורות וניהול חיים",
    whatsapp: "972528559050", // 052-8559050
    email: "sivanarazi2@gmail.com",
  },
} as const;

export type CoachKey = keyof typeof COACHES;

// Fallback number for ambiguous inquiries (general contact) — Sivan by default.
export const FALLBACK_WHATSAPP = COACHES.sivan.whatsapp;

export const NAV = [
  { href: "/", label: "בית" },
  { href: "/services", label: "שירותים" },
  { href: "/our-story", label: "הסיפור שלנו" },
  { href: "/testimonials", label: "המלצות" },
  { href: "/contact", label: "צור קשר" },
] as const;
