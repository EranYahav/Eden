import type { Metadata } from "next";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { COACHES, SITE } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "צור קשר",
  description:
    "דברו איתנו בוואטסאפ, בטלפון או במייל — או השאירו פנייה ונחזור אליכם.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center mb-14 max-w-2xl mx-auto">
        <p className="section-label justify-center">צור קשר</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-forest-900 mb-4 leading-tight">
          בואו נדבר
        </h1>
        <p className="text-lg text-ink-soft leading-relaxed">
          הכי פשוט — הודעת וואטסאפ. אבל אפשר גם למלא את הטופס ונחזור אליכם.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Direct channels */}
        <div className="space-y-4">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-sage-600 text-white rounded-2xl p-5 shadow-soft hover:shadow-lift transition-all"
          >
            <MessageCircle className="w-7 h-7 flex-shrink-0" />
            <div>
              <p className="font-extrabold">וואטסאפ</p>
              <p className="text-white/90 text-sm">הדרך המהירה ביותר להתחיל</p>
            </div>
          </a>

          {Object.values(COACHES).map((c) => (
            <div
              key={c.slug}
              className="bg-white rounded-2xl border border-sand p-5 shadow-soft"
            >
              <p className="font-extrabold text-forest-900 mb-2">{c.name}</p>
              <p className="text-ink-soft text-sm mb-3">{c.role}</p>
              <div className="flex flex-col gap-2 text-ink-soft">
                <a
                  href={`https://wa.me/${c.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-sage-700"
                >
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">
                    {c.whatsapp.replace("972", "0").replace(/(\d{3})(\d{7})/, "$1-$2")}
                  </span>
                </a>
                <a
                  href={`mailto:${c.email}`}
                  className="flex items-center gap-2 hover:text-sage-700"
                >
                  <Mail className="w-4 h-4" />
                  {c.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-sand/50 rounded-[20px] p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-forest-900 mb-5">
            השאירו פנייה ונחזור אליכם
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
