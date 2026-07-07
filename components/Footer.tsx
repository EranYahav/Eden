import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { COACHES, NAV, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-cream/90 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <h2 className="font-extrabold text-white text-xl mb-2">{SITE.name}</h2>
          <p className="text-cream/70 leading-relaxed max-w-xs">
            {SITE.tagline} ליווי זוגי, הורי וכלכלי למשפחה — תחת קורת גג אחת.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">ניווט</h3>
          <ul className="space-y-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream/70 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">יצירת קשר</h3>
          <ul className="space-y-2 text-cream/70">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span dir="ltr">052-5205281</span> · עדן
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span dir="ltr">052-8559050</span> · סיון
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" aria-hidden="true" />
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-white transition-colors"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-sm text-cream/70 flex flex-wrap gap-x-4 gap-y-1 justify-between">
          <span>
            © {new Date().getFullYear()} {SITE.name}. כל הזכויות שמורות.
          </span>
          <Link href="/privacy" className="hover:text-white transition-colors">
            מדיניות פרטיות
          </Link>
        </div>
      </div>
    </footer>
  );
}
