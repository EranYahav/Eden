"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import type { Service } from "@/lib/types";

// Per-service accent — mirrors ServiceCard so the rail reads as the same family.
const ACCENT: Record<string, { chip: string; icon: string; bar: string }> = {
  heart: { chip: "bg-terracotta-100", icon: "text-terracotta-500", bar: "bg-terracotta-500" },
  sprout: { chip: "bg-sage-100", icon: "text-sage-700", bar: "bg-sage-600" },
  coins: { chip: "bg-sand", icon: "text-sage-700", bar: "bg-forest-900" },
  compass: { chip: "bg-terracotta-100", icon: "text-forest-900", bar: "bg-terracotta-500" },
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Manual, swipeable services rail. No autoplay. RTL-correct: uses
// scrollIntoView({inline:"start"}) and Math.abs(scrollLeft) so the logic is
// agnostic to the browser's RTL scrollLeft sign convention.
export default function ServiceRail({
  services,
  title,
}: {
  services: Service[];
  title: string;
}) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [overflow, setOverflow] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setOverflow(max > 1);
    setAtStart(pos <= 1);
    setAtEnd(pos >= max - 1);
    const stride = el.scrollWidth / Math.max(services.length, 1);
    setActive(Math.min(services.length - 1, Math.round(pos / stride)));
  }, [services.length]);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(services.length - 1, index));
    const item = itemRefs.current[clamped];
    if (!item) return;
    item.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      inline: "start",
      block: "nearest",
    });
  }, [services.length]);

  if (services.length === 0) return null;

  return (
    <section className="bg-sand/50 py-20" aria-labelledby="services-rail-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="section-label">שירותים</p>
            <h2
              id="services-rail-title"
              className="text-3xl sm:text-4xl font-extrabold text-forest-900 leading-tight"
            >
              {title}
            </h2>
          </div>
          {/* Arrows — hidden when nothing overflows (desktop, all 4 fit) */}
          {overflow && (
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                disabled={atStart}
                aria-label="הקודם"
                className="w-11 h-11 rounded-full bg-white border border-sand shadow-soft flex items-center justify-center text-forest-900 transition-all hover:shadow-lift disabled:opacity-30 disabled:cursor-default"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                disabled={atEnd}
                aria-label="הבא"
                className="w-11 h-11 rounded-full bg-white border border-sand shadow-soft flex items-center justify-center text-forest-900 transition-all hover:shadow-lift disabled:opacity-30 disabled:cursor-default"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <ul
          ref={trackRef}
          role="group"
          aria-roledescription="קרוסלה"
          aria-label="השירותים שלנו"
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((s, i) => {
            const a = ACCENT[s.icon] ?? ACCENT.compass;
            return (
              <li
                key={s.slug}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="snap-start flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_calc(25%-18px)] min-w-0"
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex flex-col h-full bg-white rounded-[20px] border border-sand shadow-soft hover:shadow-lift transition-all hover:-translate-y-0.5 overflow-hidden"
                >
                  <span className={`absolute bottom-0 right-0 h-1 w-full ${a.bar}`} aria-hidden="true" />
                  <div className="p-7 flex flex-col flex-1">
                    <span className={`w-14 h-14 rounded-2xl ${a.chip} flex items-center justify-center mb-5`}>
                      <ServiceIcon name={s.icon} className={`w-7 h-7 ${a.icon}`} />
                    </span>
                    <h3 className="text-xl font-extrabold text-forest-900 mb-2">{s.title}</h3>
                    <p className="text-ink-soft leading-relaxed flex-1">{s.tagline}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sage-700 font-bold group-hover:gap-2.5 transition-all">
                      לפרטים נוספים
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Dots — reflect snap position */}
        {overflow && (
          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="ניווט בין השירותים">
            {services.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`מעבר לשירות ${i + 1}`}
                aria-current={i === active}
                className={`h-2.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-sage-600" : "w-2.5 bg-sage-600/30 hover:bg-sage-600/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
