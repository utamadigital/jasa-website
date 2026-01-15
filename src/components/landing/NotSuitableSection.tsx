
"use client";
import { MotionIn } from "./ui";

export default function NotSuitableSection() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <MotionIn>
          <h2 className="text-xl font-semibold text-white">Website ini tidak cocok jika:</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
            <li>Hanya mencari harga termurah</li>
            <li>Tidak ingin diskusi kebutuhan bisnis</li>
            <li>Ingin website instan tanpa revisi</li>
          </ul>
        </MotionIn>
      </div>
    </section>
  );
}
