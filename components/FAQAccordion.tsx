import type { FAQ } from "@/lib/types";

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  if (!faqs.length) return null;
  return (
    <div className="max-w-prose mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <details
          key={i}
          className="group bg-white rounded-2xl border border-sand shadow-soft overflow-hidden"
        >
          <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-bold text-forest-900 hover:text-sage-700 transition-colors">
            {faq.question}
            <span className="w-7 h-7 flex-shrink-0 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center text-lg font-bold group-open:rotate-45 transition-transform">
              +
            </span>
          </summary>
          <div className="px-6 pb-5 text-ink-soft leading-relaxed border-t border-sand pt-4">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
