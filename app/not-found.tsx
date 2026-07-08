import Link from "next/link";
import UmbrellaMotif from "@/components/UmbrellaMotif";

export default function NotFound() {
  return (
    <div className="scene-night starfield horizon grain relative overflow-hidden -mb-24">
      <div className="relative z-10 max-w-lg mx-auto px-4 py-28 min-h-[70svh] flex flex-col items-center justify-center text-center">
        <UmbrellaMotif className="w-44 mx-auto mb-8" />
        <h1 className="text-3xl sm:text-4xl text-white mb-3">הדף לא נמצא</h1>
        <p className="text-white/70 mb-8">
          נראה שהעמוד שחיפשתם לא קיים — אבל אתם עדיין תחת המטריה.
        </p>
        <Link href="/" className="btn-primary">
          חזרה לעמוד הבית
        </Link>
      </div>
    </div>
  );
}
