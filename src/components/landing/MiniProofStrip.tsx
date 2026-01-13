"use client";

import { MotionIn, Card } from "./ui";

const items = [
  { title: "Domain & Hosting 1 Tahun", desc: "udah include sesuai paket" },
  { title: "SEO Friendly", desc: "struktur rapi & siap berkembang" },
  { title: "Support Setelah Launch", desc: "pendampingan setelah online" },
  { title: "Revisi Sesuai Paket", desc: "clear & terarah" },
];

export default function MiniProofStrip() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionIn>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((it) => (
              <Card key={it.title} className="p-4" hover={false}>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-2xl bg-emerald-500/12 text-emerald-200 ring-1 ring-emerald-400/15">
                    ✓
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/85">{it.title}</div>
                    <div className="mt-1 text-xs text-white/60">{it.desc}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </MotionIn>
      </div>
    </section>
  );
}
