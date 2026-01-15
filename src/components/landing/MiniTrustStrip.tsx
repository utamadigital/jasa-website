
"use client";

import { MotionIn } from "./ui";

export default function MiniTrustStrip() {
  const items = [
    "20+ website bisnis",
    "Siap untuk iklan Meta & Google",
    "Respon WhatsApp cepat",
    "Tanpa kontrak & langganan",
  ];

  return (
    <MotionIn>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/70">
        {items.map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            ✓ {t}
          </span>
        ))}
      </div>
    </MotionIn>
  );
}
