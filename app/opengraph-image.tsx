import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "המטריה המשפחתית — כל המשפחה תחת מטריה אחת";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0F0A16",
          backgroundImage:
            "radial-gradient(circle at 50% 110%, rgba(242,102,72,.5), transparent 55%), radial-gradient(circle at 80% 10%, rgba(227,185,120,.25), transparent 50%)",
          fontFamily: "sans-serif",
        }}
      >
        <svg viewBox="0 0 200 160" width="280" height="224">
          <path
            d="M20 90 A80 80 0 0 1 180 90"
            fill="none"
            stroke="#E3B978"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <rect x="48" y="104" width="16" height="40" rx="4" fill="#F5A98C" />
          <rect x="80" y="92" width="16" height="52" rx="4" fill="#F26648" />
          <rect x="112" y="80" width="16" height="64" rx="4" fill="#D94E33" />
          <rect x="144" y="68" width="16" height="76" rx="4" fill="#FFFFFF" />
        </svg>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#FFFFFF",
            marginTop: 28,
            direction: "rtl",
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            fontSize: 34,
            color: "rgba(255,255,255,.7)",
            marginTop: 10,
            direction: "rtl",
          }}
        >
          {SITE.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
