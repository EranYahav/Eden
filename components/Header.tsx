"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import WhatsAppCTA from "@/components/WhatsAppCTA";

function LogoMark() {
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9" aria-hidden="true">
      <path d="M4 20 Q20 4 36 20 Q28 15 20 20 Q12 15 4 20 Z" fill="var(--sage-600)" />
      <path d="M20 20 Q28 15 36 20 Q32 17 28 16 Q24 14 20 20 Z" fill="var(--terracotta-500)" />
      <rect x="18.5" y="19" width="3" height="15" rx="1.5" fill="var(--forest-900)" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const wa = whatsappLink();

  return (
    <>
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo (right in RTL) */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <LogoMark />
          <span className="font-extrabold text-forest-900 leading-none text-lg">
            {SITE.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-soft hover:text-sage-700 font-semibold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block flex-shrink-0">
          <WhatsAppCTA href={wa} label="דברו איתנו" className="!px-5 !py-2.5" />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="md:hidden p-2 text-forest-900"
          aria-label="פתח תפריט"
        >
          <Menu className="w-7 h-7" />
        </button>
      </div>
    </header>

    {/* Mobile drawer — rendered outside <header> so it isn't trapped by the
        header's backdrop-blur (backdrop-filter makes the header the containing
        block for fixed children, which clipped this overlay to the top strip). */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-cream md:hidden flex flex-col">
          <div className="h-16 px-4 flex items-center justify-between border-b border-sand">
            <span className="font-extrabold text-forest-900 text-lg">
              {SITE.name}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-2 text-forest-900"
              aria-label="סגור תפריט"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-xl font-bold text-forest-900 py-3 border-b border-sand"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6">
              <WhatsAppCTA href={wa} label="דברו איתנו בוואטסאפ" className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
