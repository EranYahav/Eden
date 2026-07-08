// Abstract shelter motif in the KAV brand language — arc over ascending bars.
export default function UmbrellaMotif({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 160"
      className={className}
      role="img"
      aria-label="קשת המגינה על עמודים צומחים — סמל המטריה המשפחתית"
    >
      <path
        d="M20 90 A80 80 0 0 1 180 90"
        fill="none"
        stroke="var(--ember-600)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <rect x="48" y="104" width="16" height="40" rx="4" fill="var(--champagne-400)" />
      <rect x="80" y="92" width="16" height="52" rx="4" fill="var(--ember-300)" />
      <rect x="112" y="80" width="16" height="64" rx="4" fill="var(--ember-500)" />
      <rect x="144" y="68" width="16" height="76" rx="4" fill="var(--abyss-900)" />
    </svg>
  );
}
