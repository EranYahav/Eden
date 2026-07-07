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
          background: "linear-gradient(180deg, #F1E9DC 0%, #FAF6EF 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <svg viewBox="0 0 520 300" width="360" height="210">
          <path d="M60 150 Q260 30 460 150 Q360 115 260 150 Q160 115 60 150 Z" fill="#556B5A" />
          <path d="M260 150 Q360 115 460 150 Q425 128 390 118 Q310 92 260 150 Z" fill="#C67B54" />
          <rect x="256" y="148" width="8" height="110" rx="4" fill="#1E3A31" />
          <circle cx="230" cy="205" r="18" fill="#1E3A31" />
          <path d="M206 285 q0 -50 24 -50 q24 0 24 50 Z" fill="#1E3A31" />
          <circle cx="290" cy="210" r="15" fill="#3E4F44" />
          <path d="M272 285 q0 -42 18 -42 q18 0 18 42 Z" fill="#3E4F44" />
        </svg>
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: "#1E3A31",
            marginTop: 20,
            direction: "rtl",
          }}
        >
          {SITE.name}
        </div>
        <div style={{ fontSize: 36, color: "#55524C", marginTop: 8, direction: "rtl" }}>
          {SITE.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
