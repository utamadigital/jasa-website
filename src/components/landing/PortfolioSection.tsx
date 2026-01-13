"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { Card, MotionIn, PrimaryButton, SecondaryButton, Badge } from "./ui";
import { scrollToId } from "@/lib/utils";

type Item = {
  title: string;
  category: string;
  bullets: { k: string; v: string }[];
};

const ITEMS: Item[] = [
  {
    title: "Website Tour & Travel",
    category: "Business Website",
    bullets: [
      { k: "Tantangan", v: "Brand terlihat kurang meyakinkan & info tercecer." },
      { k: "Solusi", v: "Struktur halaman rapi + CTA WhatsApp jelas." },
      { k: "Hasil", v: "Lebih dipercaya dan lebih mudah closing via chat." },
    ],
  },
  {
    title: "Website Villa",
    category: "Hospitality",
    bullets: [
      { k: "Tantangan", v: "Butuh tampil premium & enak dilihat di mobile." },
      { k: "Solusi", v: "Desain clean + komposisi foto + CTA booking." },
      { k: "Hasil", v: "Tampilan naik kelas, pengunjung lebih betah." },
    ],
  },
  {
    title: "Website Pendidikan",
    category: "Landing + Form",
    bullets: [
      { k: "Tantangan", v: "Butuh pendaftaran mudah + info ringkas." },
      { k: "Solusi", v: "Landing fokus + section yang terstruktur." },
      { k: "Hasil", v: "Lebih jelas, mempermudah calon pendaftar." },
    ],
  },
  {
    title: "Jasa Kreatif",
    category: "Portfolio Website",
    bullets: [
      { k: "Tantangan", v: "Portofolio harus tampil rapi & mudah dipilih." },
      { k: "Solusi", v: "Grid portofolio + CTA inquiry." },
      { k: "Hasil", v: "Lebih profesional dan siap untuk iklan." },
    ],
  },
  {
    title: "UMKM Kuliner",
    category: "Menu + Order",
    bullets: [
      { k: "Tantangan", v: "Pengunjung bingung mau order lewat mana." },
      { k: "Solusi", v: "CTA order dominan + navigasi sederhana." },
      { k: "Hasil", v: "Arus ke WhatsApp lebih konsisten." },
    ],
  },
  {
    title: "Brand Lokal",
    category: "Company Profile",
    bullets: [
      { k: "Tantangan", v: "Butuh website singkat tapi meyakinkan." },
      { k: "Solusi", v: "Copy ringkas + section proof + CTA." },
      { k: "Hasil", v: "Brand terlihat lebih serius di mata pelanggan." },
    ],
  },
];

function Modal({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: Item | null;
}) {
  return (
    <AnimatePresence>
      {open && item && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
                <div>
                  <div className="text-lg font-semibold text-white">{item.title}</div>
                  <div className="mt-1 text-sm text-white/60">{item.category}</div>
                </div>
                <button
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/8"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="p-5">
                <div className="relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/6 to-white/[0.02]">
  <div aria-hidden className="absolute inset-0 opacity-[0.8]">
    <div className="absolute -top-10 left-1/2 h-28 w-72 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-2xl" />
    <div className="absolute -bottom-10 left-1/4 h-28 w-64 -translate-x-1/2 rounded-full bg-cyan-400/8 blur-2xl" />
  </div>
  <div className="relative flex h-full flex-col justify-between p-4">
    <div className="inline-flex items-center gap-2 self-start rounded-full bg-black/30 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/10">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300" />
      Preview (placeholder)
    </div>
    <div className="grid gap-2">
      <div className="h-3 w-3/4 rounded-full bg-white/10" />
      <div className="h-3 w-2/3 rounded-full bg-white/8" />
    </div>
  </div>
</div>
                <div className="mt-5 grid gap-3">
                  {item.bullets.map((b) => (
                    <div key={b.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-xs font-semibold text-white/70">{b.k}</div>
                      <div className="mt-1 text-sm text-white/85">{b.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <PrimaryButton onClick={() => { onClose(); scrollToId("contact"); }} className="w-full">
                    Konsultasi Gratis
                  </PrimaryButton>
                  <SecondaryButton onClick={onClose} className="w-full">
                    Tutup
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function PortfolioSection() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Item | null>(null);

  function openModal(it: Item) {
    setActive(it);
    setOpen(true);
  }

  return (
    <>
      <SectionShell
        id="portfolio"
        eyebrow="Portofolio"
        title="Beberapa Website yang Pernah Saya Kerjakan"
        subtitle="Setiap website dibuat sesuai karakter dan kebutuhan bisnis klien."
        className="py-14"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, idx) => (
            <MotionIn key={it.title} delay={0.02 * idx}>
              <Card className="overflow-hidden">
                <div className="h-40 border-b border-white/10 bg-gradient-to-b from-white/6 to-white/[0.02]" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-base font-semibold text-white">{it.title}</div>
                      <div className="mt-2">
                        <Badge className="text-white/75">{it.category}</Badge>
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/70">
                      contoh
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <button
                      onClick={() => openModal(it)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 hover:text-emerald-100"
                    >
                      Lihat Detail <span aria-hidden>→</span>
                    </button>
                    <button
                      onClick={() => scrollToId("contact")}
                      className="text-xs font-semibold text-white/70 hover:text-white"
                    >
                      Konsultasi
                    </button>
                  </div>
                </div>
              </Card>
            </MotionIn>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/75">
          Mau versi website seperti di atas untuk bisnismu?{" "}
          <button onClick={() => scrollToId("contact")} className="font-semibold text-emerald-200 hover:text-emerald-100">
            Konsultasi gratis →
          </button>
        </div>
      </SectionShell>

      <Modal open={open} item={active} onClose={() => setOpen(false)} />
    </>
  );
}
