import type { CoachKey } from "@/lib/site";

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  metaTitle?: string;
  metaDescription?: string;
  icon: "heart" | "sprout" | "coins" | "compass";
  routingKey: string; // maps to whatsapp routing (finance/couples/parenting/blueprint)
  order: number;
  forWhom?: string[];
  outcomes?: string[];
  faqs?: FAQ[];
  content: string; // MDX body
}

export interface Testimonial {
  slug: string;
  author: string; // first name / initial only (privacy)
  service?: string;
  quote: string;
  result?: string;
  order: number;
  content: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  coachKey: CoachKey;
  photo?: string;
  credentials?: string[];
  order: number;
  content: string;
}

export interface PageDoc {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  content: string;
  data: Record<string, unknown>;
}
