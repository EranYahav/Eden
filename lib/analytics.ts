// Lightweight analytics wrapper. No-op if Plausible isn't loaded.
// Usage: track("whatsapp_click", { service: "couples" })

type Props = Record<string, string | number | boolean>;

export function track(event: string, props?: Props): void {
  if (typeof window === "undefined") return;
  const plausible = (window as unknown as {
    plausible?: (e: string, opts?: { props?: Props }) => void;
  }).plausible;
  if (typeof plausible === "function") {
    plausible(event, props ? { props } : undefined);
  }
}
