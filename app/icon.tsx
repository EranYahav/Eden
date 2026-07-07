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
          background: "#FAF6EF",
        }}
      >
        <svg viewBox="0 0 40 40" width="52" height="52">
          <path d="M4 20 Q20 4 36 20 Q28 15 20 20 Q12 15 4 20 Z" fill="#556B5A" />
          <path d="M20 20 Q28 15 36 20 Q32 17 28 16 Q24 14 20 20 Z" fill="#C67B54" />
          <rect x="18.5" y="19" width="3" height="15" rx="1.5" fill="#1E3A31" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
