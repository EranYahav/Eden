import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import type { Service } from "@/lib/types";

// Differentiated treatment per service (icon tint + accent) to avoid the
// "three identical icon-in-circle cards" slop pattern flagged in design review.
const ACCENT: Record<string, { chip: string; icon: string; bar: string }> = {
  heart: { chip: "bg-terracotta-100", icon: "text-terracotta-500", bar: "bg-terracotta-500" },
  sprout: { chip: "bg-sage-100", icon: "text-sage-700", bar: "bg-sage-600" },
  coins: { chip: "bg-sand", icon: "text-sage-700", bar: "bg-forest-900" },
  compass: { chip: "bg-terracotta-100", icon: "text-forest-900", bar: "bg-terracotta-500" },
};

export default function ServiceCard({ service }: { service: Service }) {
  const a = ACCENT[service.icon] ?? ACCENT.compass;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col bg-white rounded-[20px] border border-sand shadow-soft hover:shadow-lift transition-all hover:-translate-y-0.5 overflow-hidden"
    >
      <span className={`absolute top-0 right-0 h-1 w-full ${a.bar}`} aria-hidden="true" />
      <div className="p-7 flex flex-col flex-1">
        <span
          className={`w-14 h-14 rounded-2xl ${a.chip} flex items-center justify-center mb-5`}
        >
          <ServiceIcon name={service.icon} className={`w-7 h-7 ${a.icon}`} />
        </span>
        <h3 className="text-xl font-extrabold text-forest-900 mb-2">
          {service.title}
        </h3>
        <p className="text-ink-soft leading-relaxed flex-1">{service.tagline}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sage-700 font-bold group-hover:gap-2.5 transition-all">
          לפרטים נוספים
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
