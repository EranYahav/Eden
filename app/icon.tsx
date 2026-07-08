import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1122",
          borderRadius: 14,
        }}
      >
        <svg viewBox="0 0 40 40" width="48" height="48">
          <path
            d="M6 21 A14 14 0 0 1 34 21"
            fill="none"
            stroke="#E3B978"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <rect x="11" y="25" width="4" height="9" rx="1" fill="#F5A98C" />
          <rect x="18" y="22" width="4" height="12" rx="1" fill="#F26648" />
          <rect x="25" y="19" width="4" height="15" rx="1" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
