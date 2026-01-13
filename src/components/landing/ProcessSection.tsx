"use client";

import { SectionShell } from "./SectionShell";
import { MotionIn, Card } from "./ui";

const steps = [
  {
    n: "01",
    title: "Konsultasi & Perencanaan",
    desc: "Diskusi kebutuhan, tujuan website, dan rekomendasi paket terbaik.",
    out: "Output: brief & arah desain",
  },
  {
    n: "02",
    title: "Desain & Pengembangan",
    desc: "Website mulai dikerjakan. Kamu bisa review dan beri masukan terarah.",
    out: "Output: preview + revisi",
  },
  {
    n: "03",
    title: "Revisi, Launching & Support",
    desc: "Website online + pendampingan sesuai paket setelah launching.",
    out: "Output: live + support",
  },
];

export default function ProcessSection() {
  return (
    <SectionShell
      id="process"
      eyebrow="Proses"
      title="Proses Kerja yang Jelas & Terarah"
      subtitle="Kamu tahu apa yang dikerjakan, kapan selesai, dan hasil akhirnya."
      className="py-14"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {steps.map((s, idx) => (
          <MotionIn key={s.n} delay={0.03 * idx}>
            <Card className="relative p-6">
              <div aria-hidden className="absolute right-6 top-6 text-4xl font-black text-white/10">
                {s.n}
              </div>
              <div className="text-base font-semibold text-white">{s.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.desc}</p>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/75">
                {s.out}
              </div>
            </Card>
          </MotionIn>
        ))}
      </div>
    </SectionShell>
  );
}
