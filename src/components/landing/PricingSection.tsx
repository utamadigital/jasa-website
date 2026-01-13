"use client";

import * as React from "react";
import { SectionShell } from "./SectionShell";
import { Card, MotionIn, PrimaryButton, SecondaryButton, Badge } from "./ui";
import { scrollToId } from "@/lib/utils";

type Plan = {
  id: "basic" | "business" | "premium";
  name: string;
  price: string;
  note: string;
  highlight?: boolean;
  badge?: { primary: string; secondary?: string };
  features: string[];
};

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "Rp 999.000",
    note: "Cocok untuk UMKM baru & personal bisnis.",
    features: [
      "3 halaman utama (Home, Tentang, Kontak)",
      "Domain & hosting 1 tahun",
      "Desain responsif (mobile & desktop)",
      "SEO dasar",
      "Support teknis 14 hari",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "Rp 1.999.000",
    note: "Paket paling seimbang untuk bisnis yang ingin terlihat serius.",
    highlight: true,
    badge: { primary: "Best Value", secondary: "Paling Populer" },
    features: [
      "Hingga 8 halaman",
      "Desain custom sesuai brand",
      "Integrasi WhatsApp / CTA",
      "SEO dasar + struktur rapi",
      "Support teknis 30 hari",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "Rp 3.499.000",
    note: "Untuk brand yang ingin hasil maksimal & fitur lebih fleksibel.",
    features: [
      "Fitur custom sesuai kebutuhan",
      "Optimasi kecepatan & SEO lanjutan",
      "Panduan pengelolaan website",
      "Support teknis 60 hari",
    ],
  },
];

export default function PricingSection() {
  const [selected, setSelected] = React.useState<Plan["id"]>("business");

  function pick(id: Plan["id"]) {
    setSelected(id);
  }

  return (
    <SectionShell
      id="pricing"
      eyebrow="Paket Website"
      title="Pilih Paket Website yang Paling Sesuai dengan Kebutuhanmu"
      subtitle="Transparan, jelas, tanpa biaya tersembunyi."
      className="py-14"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {PLANS.map((p, idx) => {
          const isSel = selected === p.id;
          return (
            <MotionIn key={p.id} delay={0.03 * idx}>
              <button
                type="button"
                onClick={() => pick(p.id)}
                className="text-left focus:outline-none"
                aria-label={`Select plan ${p.name}`}
              >
                <Card
                  className={[
                    "relative p-6",
                    p.highlight ? "bg-white/[0.055]" : "",
                    isSel ? "ring-2 ring-emerald-300/70 shadow-[0_0_0_1px_rgba(16,185,129,0.35),0_0_40px_rgba(16,185,129,0.22)]" : "",
                  ].join(" ")}
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
  <div className="flex flex-wrap items-center gap-2">
    {p.badge && (
      <>{p.badge.secondary && (
          <Badge className="bg-cyan-400/15 text-cyan-50 ring-1 ring-cyan-300/35 shadow-[0_0_18px_rgba(34,211,238,0.28)]">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
            {p.badge.secondary}
          </Badge>
        )}
      </>
    )}
  </div>

  <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-2.5 py-1 text-[11px] font-semibold ring-1 ring-white/10">
    {isSel ? (
      <>
        <span className="inline-flex h-2 w-2 items-center justify-center">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.9)]" />
        </span>
        <span className="text-emerald-100">Terpilih</span>
      </>
    ) : (
      <span className="text-white/70">Pilih</span>
    )}
  </div>
</div>

<div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white/80">{p.name}</div>
                      <div className="mt-2 text-2xl font-semibold text-white">{p.price}</div>
                      <div className="mt-2 text-sm leading-relaxed text-white/65">{p.note}</div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-start gap-3 text-sm text-white/75">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-xl bg-emerald-500/12 text-emerald-200 ring-1 ring-emerald-400/15">
                          ✓
                        </span>
                        <span className="leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-2">
                    <PrimaryButton onClick={() => scrollToId("contact")} className="w-full">
                      Pilih Paket {p.name} → Konsultasi
                    </PrimaryButton>
</div>
                </Card>
              </button>
            </MotionIn>
          );
        })}
      </div>

      <MotionIn delay={0.05}>
        <div className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-3">
          {[
            { t: "Harga transparan", d: "jelas dari awal" },
            { t: "Bisa diskusi sebelum mulai", d: "dibantu pilih paket" },
            { t: "Revisi sesuai paket", d: "clear & terarah" },
          ].map((x) => (
            <div key={x.t} className="flex items-start gap-3">
              <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-2xl bg-white/5 text-emerald-200 ring-1 ring-white/10">
                ✓
              </div>
              <div>
                <div className="text-sm font-semibold text-white/85">{x.t}</div>
                <div className="mt-1 text-xs text-white/60">{x.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-white/55">
          Tip: Klik paket untuk menandai “terpilih”, lalu klik tombol konsultasi untuk mulai.
        </div>
      </MotionIn>
    </SectionShell>
  );
}
