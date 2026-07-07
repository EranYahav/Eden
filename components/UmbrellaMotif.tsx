// Illustrated umbrella/shelter motif (chosen over stock photography in the
// design review — avoids the "fake stock family" trust problem).
export default function UmbrellaMotif({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 520 460"
      className={className}
      role="img"
      aria-label="מטריה המגינה על משפחה"
    >
      {/* soft background hills */}
      <circle cx="120" cy="360" r="150" fill="var(--sand-100)" />
      <circle cx="410" cy="380" r="120" fill="var(--terracotta-100)" opacity="0.7" />

      {/* umbrella canopy — alternating sage / terracotta panels */}
      <g>
        <path d="M60 190 Q260 40 460 190 Q360 150 260 190 Q160 150 60 190 Z" fill="var(--sage-600)" />
        <path d="M60 190 Q160 150 260 190 L260 190 Q210 120 130 150 Q95 165 60 190 Z" fill="var(--sage-700)" />
        <path d="M260 190 Q360 150 460 190 Q425 165 390 150 Q310 120 260 190 Z" fill="var(--terracotta-500)" />
        <path d="M160 170 Q210 120 260 190 Q210 155 160 170 Z" fill="var(--sage-100)" opacity="0.9" />
        <path d="M260 190 Q310 120 360 170 Q310 155 260 190 Z" fill="var(--terracotta-100)" />
      </g>

      {/* pole */}
      <rect x="256" y="188" width="8" height="150" rx="4" fill="var(--forest-900)" />
      <path d="M264 335 q18 6 18 24" stroke="var(--forest-900)" strokeWidth="8" fill="none" strokeLinecap="round" />

      {/* family silhouettes under the umbrella */}
      <g fill="var(--forest-900)">
        <circle cx="205" cy="250" r="20" />
        <path d="M180 340 q0 -55 25 -55 q25 0 25 55 Z" />
        <circle cx="300" cy="248" r="22" />
        <path d="M272 345 q0 -60 28 -60 q28 0 28 60 Z" />
      </g>
      <g fill="var(--sage-700)">
        <circle cx="245" cy="272" r="14" />
        <path d="M228 340 q0 -38 17 -38 q17 0 17 38 Z" />
        <circle cx="335" cy="286" r="12" />
        <path d="M321 340 q0 -32 14 -32 q14 0 14 32 Z" />
      </g>
    </svg>
  );
}
