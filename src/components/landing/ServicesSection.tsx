"use client";

import { SectionShell } from "./SectionShell";
import { Card, MotionIn } from "./ui";
import { scrollToId } from "@/lib/utils";

const services = [
  { title: "Web Bisnis", desc: "Profil bisnis yang terlihat profesional dan meningkatkan kepercayaan calon klien.", icon: "🏢" },
  { title: "Toko Online", desc: "Website penjualan dengan tampilan rapi, alur jelas, dan mudah dikelola.", icon: "🛒" },
  { title: "Web Personal", desc: "Personal branding untuk profesional, freelancer, dan praktisi jasa.", icon: "👤" },
  { title: "Landing Page", desc: "Satu halaman yang fokus menghasilkan leads & chat WhatsApp.", icon: "⚡" },
];

export default function ServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="Layanan"
      title="Layanan Website Sesuai Kebutuhan Bisnismu"
      subtitle="Setiap website dibuat dengan tujuan yang jelas - bukan asal jadi."
      className="py-14"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, idx) => (
          <MotionIn key={s.title} delay={0.03 * idx}>
            <Card className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="text-2xl">{s.icon}</div>
                <div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/70">
                  siap
                </div>
              </div>
              <div className="mt-4 text-base font-semibold text-white">{s.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.desc}</p>
              <button
                onClick={() => scrollToId("contact")}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 hover:text-emerald-100"
              >
                Konsultasi gratis <span aria-hidden>→</span>
              </button>
            </Card>
          </MotionIn>
        ))}
      </div>

      <div className="mt-8 text-sm text-white/70">
        Bingung menentukan kebutuhan?{" "}
        <button onClick={() => scrollToId("contact")} className="font-semibold text-emerald-200 hover:text-emerald-100">
          Konsultasi gratis →
        </button>
      </div>
    </SectionShell>
  );
}
