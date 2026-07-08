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
    <div>
      <header className="scene-night starfield horizon grain relative overflow-hidden">
        <div className="relative z-10 max-w-prose mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
          <p className="eyebrow eyebrow-light">הסיפור שלנו</p>
          <h1 className="text-4xl sm:text-6xl text-white leading-[1.15]">
            כל המשפחה. תחת מטריה אחת.
          </h1>
        </div>
      </header>
      <article className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="prose-rtl">{content}</div>
        <div className="mt-12">
          <WhatsAppCTA href={whatsappLink()} label="דברו איתנו בוואטסאפ" />
        </div>
      </article>
    </div>
  );
}
