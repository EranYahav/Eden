import type { Metadata } from "next";
import { getTestimonials } from "@/lib/content";
import TestimonialCard from "@/components/TestimonialCard";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "המלצות",
  description:
    "משפחות מספרות על הליווי בהמטריה המשפחתית — זוגיות, הורות וכלכלה.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  const testimonials = getTestimonials();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-14 max-w-2xl mx-auto">
        <p className="section-label justify-center">המלצות</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-forest-900 mb-4 leading-tight">
          משפחות מספרות
        </h1>
        <p className="text-lg text-ink-soft leading-relaxed">
          מילים של משפחות שבחרו לבנות מערכת — ולא להמשיך לכבות שריפות.
        </p>
      </header>

      {testimonials.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.slug} testimonial={t} />
          ))}
        </div>
      ) : (
        <p className="text-center text-ink-soft">המלצות יתווספו בקרוב.</p>
      )}

      <div className="text-center mt-14">
        <WhatsAppCTA href={whatsappLink()} label="רוצים להיות הסיפור הבא? דברו איתנו" />
      </div>
    </div>
  );
}
