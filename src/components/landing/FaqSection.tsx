"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { Card, MotionIn, SecondaryButton, PrimaryButton } from "./ui";
import { scrollToId } from "@/lib/utils";

const faqs = [
  { q: "Berapa lama pembuatan website?", a: "Rata-rata 7–14 hari kerja tergantung paket dan kesiapan materi (logo, konten, foto, dsb)." },
  { q: "Apakah harga sudah termasuk domain & hosting?", a: "Ya. Domain + hosting termasuk 1 tahun sesuai paket." },
  { q: "Apakah website bisa saya kelola sendiri?", a: "Bisa. Website dibuat dengan WordPress yang user-friendly. Saya juga bisa kasih panduan basic." },
  { q: "Apakah website sudah SEO friendly?", a: "Ya, struktur SEO dasar diterapkan: heading rapi, struktur halaman jelas, dan pondasi yang bagus untuk berkembang." },
  { q: "Apakah bisa request desain sesuai brand?", a: "Bisa. Kita sesuaikan warna, gaya, dan kebutuhan bisnismu (referensi boleh dikirim)." },
  { q: "Bagaimana sistem pembayaran?", a: "Umumnya pembayaran dilakukan di awal sesuai kesepakatan. Untuk project tertentu bisa dibicarakan." },
  { q: "Kalau masih ragu memilih paket?", a: "Tenang. Konsultasi gratis—saya bantu rekomendasikan paket paling pas untuk target bisnismu." },
  { q: "Kalau belum punya konten/foto, gimana?", a: "Bisa tetap jalan. Kita rapikan struktur dulu, lalu konten menyusul. Saya bantu arahin kebutuhan konten yang efektif." },
];

function AccordionItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <Card hover={false} className="p-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="text-sm font-semibold text-white/85">{q}</div>
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70">
          {open ? "–" : "+"}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-relaxed text-white/70">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default function FaqSection() {
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  return (
    <SectionShell
      id="faq"
      eyebrow="FAQ"
      title="Pertanyaan yang Sering Ditanyakan"
      subtitle="Jawaban singkat biar kamu makin yakin sebelum mulai."
      className="py-14"
    >
      <div className="grid gap-3">
        {faqs.map((f, idx) => (
          <MotionIn key={f.q} delay={0.01 * idx}>
            <AccordionItem
              q={f.q}
              a={f.a}
              open={openIdx === idx}
              onToggle={() => setOpenIdx((v) => (v === idx ? null : idx))}
            />
          </MotionIn>
        ))}
      </div>

      <MotionIn>
        <div className="mt-8 flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-white/75">
            Masih ada pertanyaan? Konsultasi gratis, dibantu dari awal.
          </div>
          <div className="flex gap-2">
            <PrimaryButton onClick={() => scrollToId("contact")}>Konsultasi Gratis</PrimaryButton>
            <SecondaryButton onClick={() => scrollToId("pricing")}>Lihat Paket</SecondaryButton>
          </div>
        </div>
      </MotionIn>
    </SectionShell>
  );
}
