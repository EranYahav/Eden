import type { Metadata } from "next";
import { getServices } from "@/lib/content";
import ServiceCard from "@/components/ServiceCard";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "השירותים שלנו",
  description:
    "ליווי זוגי, הדרכת הורים, ייעוץ כלכלי למשפחה והשרטוט — כל מה שהמשפחה צריכה תחת קורת גג אחת.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-14 max-w-2xl mx-auto">
        <p className="section-label justify-center">שירותים</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-forest-900 mb-4 leading-tight">
          כל המשפחה. תחת מטריה אחת.
        </h1>
        <p className="text-lg text-ink-soft leading-relaxed">
          בחרו את התחום שמדבר אליכם — או פשוט דברו איתנו ונעזור לכם למצוא את
          נקודת ההתחלה הנכונה.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>

      <div className="text-center mt-14">
        <WhatsAppCTA href={whatsappLink()} label="לא בטוחים מאיפה להתחיל? דברו איתנו" />
      </div>
    </div>
  );
}
