import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { getServices } from "@/lib/content";
import ServiceIcon from "@/components/ServiceIcon";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { whatsappLink, serviceMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "השירותים שלנו",
  description:
    "ליווי זוגי, הדרכת הורים, ייעוץ כלכלי למשפחה והשרטוט — כל מה שהמשפחה צריכה תחת קורת גג אחת.",
  alternates: { canonical: "/services" },
};

// Differentiated treatment per service (same accent system as ServiceCard).
const ACCENT: Record<
  string,
  { chip: string; icon: string; bar: string; panel: string; check: string }
> = {
  heart: {
    chip: "bg-terracotta-100",
    icon: "text-terracotta-500",
    bar: "bg-terracotta-500",
    panel: "bg-terracotta-100/50",
    check: "text-terracotta-500",
  },
  sprout: {
    chip: "bg-sage-100",
    icon: "text-sage-700",
    bar: "bg-sage-600",
    panel: "bg-sage-100/60",
    check: "text-sage-700",
  },
  coins: {
    chip: "bg-sand",
    icon: "text-sage-700",
    bar: "bg-forest-900",
    panel: "bg-sand/60",
    check: "text-forest-900",
  },
  compass: {
    chip: "bg-terracotta-100",
    icon: "text-forest-900",
    bar: "bg-terracotta-500",
    panel: "bg-sage-100/60",
    check: "text-sage-700",
  },
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-10 max-w-2xl mx-auto">
        <p className="section-label justify-center">שירותים</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-forest-900 mb-4 leading-tight">
          כל המשפחה. תחת מטריה אחת.
        </h1>
        <p className="text-lg text-ink-soft leading-relaxed">
          בחרו את התחום שמדבר אליכם — או פשוט דברו איתנו ונעזור לכם למצוא את
          נקודת ההתחלה הנכונה.
        </p>
      </header>

      {/* Quick-jump nav */}
      <nav
        aria-label="קפיצה מהירה לשירות"
        className="flex flex-wrap justify-center gap-3 mb-16"
      >
        {services.map((s) => {
          const a = ACCENT[s.icon] ?? ACCENT.compass;
          return (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="inline-flex items-center gap-2 bg-white border border-sand rounded-full px-5 py-2.5 font-semibold text-forest-900 shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition-all"
            >
              <ServiceIcon name={s.icon} className={`w-5 h-5 ${a.icon}`} />
              {s.title}
            </a>
          );
        })}
      </nav>

      {/* Expanded service sections */}
      <div className="space-y-10 sm:space-y-14">
        {services.map((s, i) => {
          const a = ACCENT[s.icon] ?? ACCENT.compass;
          const wa = whatsappLink({
            service: s.routingKey,
            message: serviceMessage(s.routingKey, s.title),
          });
          const flipped = i % 2 === 1;
          return (
            <section key={s.slug} id={s.slug} className="scroll-mt-28">
              <ScrollReveal>
                <div className="relative overflow-hidden bg-white rounded-[28px] border border-sand shadow-soft">
                  <span
                    className={`absolute top-0 right-0 h-1.5 w-full ${a.bar}`}
                    aria-hidden="true"
                  />
                  <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 p-8 sm:p-12">
                    {/* Intro side */}
                    <div className={flipped ? "lg:order-2" : ""}>
                      <div className="flex items-center gap-4 mb-6">
                        <span
                          className={`w-16 h-16 rounded-2xl ${a.chip} flex items-center justify-center flex-shrink-0`}
                        >
                          <ServiceIcon
                            name={s.icon}
                            className={`w-8 h-8 ${a.icon}`}
                          />
                        </span>
                        <span
                          className="text-5xl font-extrabold text-sand select-none leading-none"
                          aria-hidden="true"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 mb-3 leading-tight">
                        {s.title}
                      </h2>
                      <p className="text-lg font-semibold text-sage-700 mb-4 leading-relaxed">
                        {s.tagline}
                      </p>
                      {s.summary && (
                        <p className="text-ink-soft leading-relaxed mb-8">
                          {s.summary}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          href={`/services/${s.slug}`}
                          className="btn-primary"
                        >
                          לכל הפרטים
                          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        </Link>
                        <WhatsAppCTA
                          href={wa}
                          label="שאלו אותנו בוואטסאפ"
                          service={s.routingKey}
                          variant="ghost"
                        />
                      </div>
                    </div>

                    {/* Details side */}
                    <div
                      className={`space-y-5 ${flipped ? "lg:order-1" : ""}`}
                    >
                      {s.forWhom && s.forWhom.length > 0 && (
                        <div className="bg-cream rounded-[20px] p-6 border border-sand">
                          <p className="section-label">למי זה מתאים</p>
                          <ul className="space-y-2.5">
                            {s.forWhom.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-ink"
                              >
                                <Check
                                  className={`w-5 h-5 ${a.check} flex-shrink-0 mt-1`}
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {s.outcomes && s.outcomes.length > 0 && (
                        <div className={`rounded-[20px] p-6 ${a.panel}`}>
                          <p className="section-label">מה תרוויחו</p>
                          <ul className="space-y-2.5">
                            {s.outcomes.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-forest-900 font-semibold"
                              >
                                <Sparkles
                                  className={`w-5 h-5 ${a.check} flex-shrink-0 mt-1`}
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </section>
          );
        })}
      </div>

      {/* Closing CTA */}
      <ScrollReveal>
        <div className="relative overflow-hidden bg-forest-900 rounded-[28px] p-10 sm:p-14 text-center mt-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
            לא בטוחים מאיפה להתחיל?
          </h2>
          <p className="text-cream/70 mb-8 leading-relaxed max-w-lg mx-auto">
            שלחו לנו הודעה — נבין יחד מה מתאים לכם, בלי התחייבות ובלי לחץ.
          </p>
          <div className="flex justify-center">
            <WhatsAppCTA href={whatsappLink()} label="דברו איתנו בוואטסאפ" />
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
