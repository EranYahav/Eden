import type { FAQ } from "@/lib/types";

// Hairline list — no cards, plus marker rotates on open.
export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  if (!faqs.length) return null;
  return (
    <div className="max-w-prose mx-auto border-t border-line">
      {faqs.map((faq, i) => (
        <details key={i} className="group border-b border-line">
          <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none font-bold text-lg text-ink hover:text-ember-700 transition-colors duration-150">
            {faq.question}
            <span
              className="w-8 h-8 flex-shrink-0 rounded-[8px] border border-line text-ember-600 flex items-center justify-center text-lg group-open:rotate-45 group-open:bg-ember-600 group-open:text-white group-open:border-ember-600 transition-all duration-200"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <div className="pb-6 text-mauve leading-relaxed max-w-[60ch]">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
