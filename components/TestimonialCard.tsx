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
      className={`rounded-[18px] p-7 flex flex-col h-full border ${
        dark
          ? "bg-white/10 backdrop-blur-md border-white/20"
          : "bg-white border-line"
      }`}
    >
      <Quote
        className={`w-6 h-6 mb-4 ${dark ? "text-champagne-100" : "text-ember-500"}`}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <blockquote
        className={`flex-1 leading-relaxed ${dark ? "text-white/85" : "text-ink"}`}
      >
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6 pt-4 border-t border-inherit flex items-center justify-between gap-3">
        <span className={`font-bold ${dark ? "text-white" : "text-ink"}`}>
          {testimonial.author}
        </span>
        {testimonial.result && (
          <span
            className={`text-xs font-bold px-3 py-1 rounded-[8px] ${
              dark
                ? "bg-white/15 text-champagne-100"
                : "bg-ember-50 text-ember-700"
            }`}
          >
            {testimonial.result}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
