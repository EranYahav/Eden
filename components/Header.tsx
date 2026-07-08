"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import WhatsAppCTA from "@/components/WhatsAppCTA";

// Geometric mark: shelter arc over ascending bars (growth under cover).
function LogoMark({ dark = false }: { dark?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9" aria-hidden="true">
      <path
        d="M6 21 A14 14 0 0 1 34 21"
        fill="none"
        stroke="var(--champagne-400)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <rect x="11" y="25" width="4" height="9" rx="1" fill="var(--ember-300)" />
      <rect x="18" y="22" width="4" height="12" rx="1" fill="var(--ember-500)" />
      <rect x="25" y="19" width="4" height="15" rx="1" fill={dark ? "#FFFFFF" : "var(--abyss-900)"} />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const wa = whatsappLink();

  return (
    <>
      {/* Night-glass header — carries the journey mood on every page */}
      <header className="sticky top-0 z-50 bg-abyss-950/75 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo (right in RTL) */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <LogoMark dark />
            <span className="font-display text-white leading-none text-lg">
              {SITE.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/65 hover:text-champagne-100 font-medium transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block flex-shrink-0">
            <WhatsAppCTA href={wa} label="דברו איתנו" className="!px-5 !py-2" />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden p-2 text-white"
            aria-label="פתח תפריט"
          >
            <Menu className="w-7 h-7" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile drawer — inverted night panel, display-type links */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-abyss-950 md:hidden flex flex-col aurora">
          <div className="relative h-16 px-4 flex items-center justify-between border-b border-white/10">
            <span className="flex items-center gap-2.5">
              <LogoMark dark />
              <span className="font-display text-white text-lg">{SITE.name}</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-2 text-white"
              aria-label="סגור תפריט"
            >
              <X className="w-7 h-7" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="relative flex flex-col p-6 gap-1">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 font-display text-2xl text-white py-4 border-b border-white/10"
              >
                <span className="text-ember-300 text-sm" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            ))}
            <div className="mt-8">
              <WhatsAppCTA href={wa} label="דברו איתנו בוואטסאפ" className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
