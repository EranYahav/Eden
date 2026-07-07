import Link from "next/link";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { getPage, getServices, getTestimonials, getTeam } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import ServiceRail from "@/components/ServiceRail";
import TestimonialCard from "@/components/TestimonialCard";
import FAQAccordion from "@/components/FAQAccordion";
import ScrollReveal from "@/components/ScrollReveal";
import type { FAQ } from "@/lib/types";

export default async function HomePage() {
  const home = getPage("home");
  const services = getServices();
  const testimonials = getTestimonials();
  const team = getTeam();
  const fm = (home?.data ?? {}) as Record<string, string>;
  const faqs = (home?.data?.faqs as FAQ[]) ?? [];

  const { content: whyBody } = home
    ? await compileMDX({
        source: home.content,
        options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
      })
    : { content: null };

  const wa = whatsappLink();

  return (
    <>
      {/* ─── Hero (full-bleed, editorial) ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sand to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src="/hero-illustration.png"
              alt="משפחה מתחת למטריה — אבא, אמא וילדים"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 1024px) 90vw, 620px"
              className="w-full max-w-xl mx-auto h-auto"
            />
          </div>
          <ScrollReveal className="order-1 lg:order-2">
            {fm.heroKicker && <p className="section-label">{fm.heroKicker}</p>}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-900 leading-[1.12] mb-4">
              {fm.heroHeadline ?? "מכיבוי שריפות — לסיסטם שמנהל את החיים"}
            </h1>
            <span
              className="block w-16 h-1.5 rounded-full bg-terracotta-500 mb-6"
              aria-hidden="true"
            />
            <p className="text-lg sm:text-xl text-ink-soft leading-relaxed mb-8 max-w-xl">
              {fm.heroSubhead}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <WhatsAppCTA href={wa} label="דברו איתנו בוואטסאפ" />
              <Link href="/services" className="btn-ghost">
                לשירותים שלנו
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Services rail (directly under hero) ─── */}
      <ServiceRail
        services={services}
        title={fm.servicesTitle ?? "איך נוכל לעזור לכם?"}
      />

      {/* ─── Why / Root cause ─── */}
      {home && (
        <ScrollReveal
          as="section"
          className="max-w-prose mx-auto px-4 sm:px-6 py-20"
        >
          <p className="section-label">
            {fm.whyTitle ?? "למה עד היום לא הצלחתם לבד?"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-900 mb-6 leading-tight">
            {fm.rootCauseTitle ?? "הסיבה האמיתית"}
          </h2>
          <div className="prose-rtl">{whyBody}</div>
        </ScrollReveal>
      )}

      {/* ─── Proof ─── */}
      {testimonials.length > 0 && (
        <section className="bg-forest-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="section-label justify-center !text-terracotta-500">
                המלצות
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {fm.proofTitle ?? "משפחות מספרות"}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {testimonials.map((t) => (
                <TestimonialCard key={t.slug} testimonial={t} variant="dark" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Coaches ─── */}
      {team.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <p className="section-label justify-center">הצוות</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-900 leading-tight">
              {fm.coachesTitle ?? "מי אנחנו"}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {team.map((m) => (
              <Link
                key={m.slug}
                href={`/team/${m.slug}`}
                className="group flex items-center gap-4 bg-white rounded-[20px] border border-sand shadow-soft hover:shadow-lift transition-all p-5"
              >
                {m.photo ? (
                  <span className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-sage-100">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </span>
                ) : (
                  <span className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center text-3xl font-extrabold flex-shrink-0">
                    {m.name.charAt(0)}
                  </span>
                )}
                <div>
                  <h3 className="font-extrabold text-forest-900 group-hover:text-sage-700 transition-colors">
                    {m.name}
                  </h3>
                  <p className="text-ink-soft text-sm leading-snug">{m.role}</p>
                  {m.tagline && (
                    <p className="mt-1.5 text-sage-700 text-sm font-medium leading-snug">
                      {m.tagline}
                    </p>
                  )}
                </div>
                <ArrowLeft className="w-5 h-5 text-sage-600 mr-auto group-hover:-translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── FAQ ─── */}
      {faqs.length > 0 && (
        <section className="bg-sand/50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="section-label justify-center">שאלות נפוצות</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-900 leading-tight">
                {fm.faqTitle ?? "שאלות נפוצות"}
              </h2>
            </div>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>
      )}

      {/* ─── Closing CTA ─── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="relative overflow-hidden bg-sage-600 rounded-[28px] p-10 sm:p-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
            מוכנים לעשות את הצעד הראשון?
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed max-w-lg mx-auto">
            שיחה קצרה, בלי התחייבות. נבין מה מטריד אתכם ונראה יחד איך אפשר
            לעזור.
          </p>
          <div className="flex justify-center">
            <WhatsAppCTA
              href={wa}
              label="דברו איתנו בוואטסאפ"
              className="!bg-white !text-sage-700 hover:!bg-cream"
            />
          </div>
        </div>
      </section>
    </>
  );
}
