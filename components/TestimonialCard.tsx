import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";

export default function TestimonialCard({
  testimonial,
  variant = "light",
}: {
  testimonial: Testimonial;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <figure
      className={`rounded-[20px] p-7 flex flex-col h-full ${
        dark
          ? "bg-white/5 border border-white/10"
          : "bg-white border border-sand shadow-soft"
      }`}
    >
      <Quote
        className={`w-7 h-7 mb-3 ${dark ? "text-terracotta-500" : "text-sage-600"}`}
        aria-hidden="true"
      />
      <blockquote
        className={`flex-1 leading-relaxed ${dark ? "text-cream/90" : "text-ink"}`}
      >
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between gap-3">
        <span className={`font-bold ${dark ? "text-white" : "text-forest-900"}`}>
          {testimonial.author}
        </span>
        {testimonial.result && (
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              dark ? "bg-terracotta-500/20 text-terracotta-100" : "bg-sage-100 text-sage-700"
            }`}
          >
            {testimonial.result}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
