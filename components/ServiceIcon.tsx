import { Heart, Sprout, Coins, Compass, type LucideIcon } from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  heart: Heart,
  sprout: Sprout,
  coins: Coins,
  compass: Compass,
};

export default function ServiceIcon({
  name,
  className = "w-6 h-6",
}: {
  name: string;
  className?: string;
}) {
  const Icon = MAP[name] ?? Compass;
  return <Icon className={className} aria-hidden="true" />;
}
