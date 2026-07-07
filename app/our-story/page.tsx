import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getPage } from "@/lib/content";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JourneyStations from "@/components/JourneyStations";
import { whatsappLink } from "@/lib/whatsapp";

export async function generateMetadata(): Promise<Metadata> {
  const page = getPage("our-story");
  return {
    title: page?.metaTitle ? { absolute: page.metaTitle } : "הסיפור שלנו",
    description:
      page?.metaDescription ??
      "הסיפור של המטריה המשפחתית — למה הקמנו אותה ובמה אנחנו מאמינים.",
    alternates: { canonical: "/our-story" },
  };
}

export default async function OurStoryPage() {
  const page = getPage("our-story");
  const { content } = page
    ? await compileMDX({
        source: page.content,
        components: { JourneyStations },
        options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
      })
    : { content: null };

  return (
    <div className="bg-gradient-to-b from-sand to-cream">
      <article className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="section-label">הסיפור שלנו</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-forest-900 mb-8 leading-tight">
          כל המשפחה. תחת מטריה אחת.
        </h1>
        <div className="prose-rtl">{content}</div>
        <div className="mt-12">
          <WhatsAppCTA href={whatsappLink()} label="דברו איתנו בוואטסאפ" />
        </div>
      </article>
    </div>
  );
}
