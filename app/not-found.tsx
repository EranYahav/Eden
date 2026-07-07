import Link from "next/link";
import UmbrellaMotif from "@/components/UmbrellaMotif";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <UmbrellaMotif className="w-52 mx-auto mb-6" />
      <h1 className="text-3xl font-extrabold text-forest-900 mb-3">
        הדף לא נמצא
      </h1>
      <p className="text-ink-soft mb-8">
        נראה שהעמוד שחיפשתם לא קיים — אבל אתם עדיין תחת המטריה.
      </p>
      <Link href="/" className="btn-primary">
        חזרה לעמוד הבית
      </Link>
    </div>
  );
}
