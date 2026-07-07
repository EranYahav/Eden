import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Check } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getServices, getServiceBySlug } from "@/lib/content";
import { whatsappLink, serviceMessage } from "@/lib/whatsapp";
import { serviceLd, faqLd, breadcrumbLd } from "@/lib/seo";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import ServiceIcon from "@/components/ServiceIcon";
import FAQAccordion from "@/components/FAQAccordion";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle ?? `${service.title} | המטריה המשפחתית` },
    description: service.metaDescription ?? service.tagline,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service.metaTitle ?? service.title,
      description: service.metaDescription ?? service.tagline,
      type: "article",
      locale: "he_IL",
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const { content: body } = await compileMDX({
    source: service.content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  const wa = whatsappLink({
    service: service.routingKey,
    message: serviceMessage(service.routingKey, service.title),
  });

  const jsonLd = serviceLd(service);
  const faq = faqLd(service.faqs ?? []);
  const crumbs = breadcrumbLd([
    { name: "בית", path: "/" },
    { name: "שירותים", path: "/services" },
    { name: service.title, path: `/services/${slug}` },
  ]);

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      {faq && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      )}

      {/* Hero */}
      <section className="bg-gradient-to-b from-sand to-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
          <nav className="flex items-center gap-1 text-ink-soft text-sm mb-6">
            <Link href="/" className="hover:text-sage-700">בית</Link>
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            <Link href="/services" className="hover:text-sage-700">שירותים</Link>
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            <span className="text-forest-900 font-semibold">{service.title}</span>
          </nav>
          <span className="w-16 h-16 rounded-2xl bg-white shadow-soft flex items-center justify-center mb-5">
            <ServiceIcon name={service.icon} className="w-8 h-8 text-sage-700" />
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-forest-900 mb-4 leading-tight">
            {service.title}
          </h1>
          <p className="text-lg sm:text-xl text-ink-soft leading-relaxed max-w-2xl">
            {service.tagline}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {/* For whom */}
        {service.forWhom && service.forWhom.length > 0 && (
          <section>
            <p className="section-label">למי זה מתאים</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.forWhom.map((item) => (
                <li key={item} className="flex items-start gap-2 text-ink">
                  <Check className="w-5 h-5 text-sage-600 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Body */}
        <section className="prose-rtl max-w-prose">{body}</section>

        {/* Outcomes */}
        {service.outcomes && service.outcomes.length > 0 && (
          <section className="bg-sage-100 rounded-[20px] p-8">
            <p className="section-label">מה תרוויחו</p>
            <ul className="space-y-3">
              {service.outcomes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-forest-900 font-semibold">
                  <Check className="w-5 h-5 text-sage-700 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ */}
        {service.faqs && service.faqs.length > 0 && (
          <section>
            <p className="section-label">שאלות נפוצות</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 mb-6 leading-tight">
              כל מה שרציתם לדעת על {service.title}
            </h2>
            <FAQAccordion faqs={service.faqs} />
          </section>
        )}

        {/* CTA */}
        <section className="relative overflow-hidden bg-forest-900 rounded-[28px] p-10 sm:p-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
            רוצים לשמוע עוד על {service.title}?
          </h2>
          <p className="text-cream/70 mb-8 leading-relaxed max-w-lg mx-auto">
            שלחו לנו הודעה בוואטסאפ — נחזור אליכם עם כל מה שצריך לדעת, בלי
            התחייבות.
          </p>
          <div className="flex justify-center">
            <WhatsAppCTA href={wa} label="דברו איתנו בוואטסאפ" service={service.routingKey} />
          </div>
        </section>
      </div>
    </article>
  );
}
