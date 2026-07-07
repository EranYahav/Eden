import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { SITE } from "@/lib/site";
import { organizationLd } from "@/lib/seo";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "/" },
  title: {
    default: "המטריה המשפחתית — ליווי זוגי, הורי וכלכלי למשפחה",
    template: "%s | המטריה המשפחתית",
  },
  description:
    "כל המשפחה תחת מטריה אחת: ליווי זוגי, הדרכת הורים וילדים וייעוץ כלכלי למשפחה. לא עוד כיבוי שריפות — מערכת חיים.",
  openGraph: {
    siteName: "המטריה המשפחתית",
    locale: "he_IL",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={assistant.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
        />
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.tagged-events.js"
            strategy="afterInteractive"
          />
        ) : null}
      </head>
      <body className="font-assistant bg-cream text-ink flex flex-col min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-[100] focus:bg-sage-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:font-bold focus:shadow-lift"
        >
          דלג לתוכן הראשי
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
