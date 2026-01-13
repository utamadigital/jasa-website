"use client";

import { motion } from "framer-motion";
import { PrimaryButton, SecondaryButton, SoftGlow, MotionIn, Card } from "./ui";
import { scrollToId } from "@/lib/utils";

export default function FinalCtaSection() {
  return (
    <section id="contact" className="relative overflow-hidden py-16">
      <SoftGlow />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionIn>
          <Card className="relative overflow-hidden p-8 sm:p-10" hover={false}>
            <div aria-hidden className="absolute inset-0">
              <div className="absolute -top-24 left-1/2 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-emerald-500/18 blur-3xl" />
              <div className="absolute -bottom-24 right-0 h-64 w-[36rem] rounded-full bg-cyan-500/12 blur-3xl" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75">
                Closing • Konsultasi gratis
              </div>

              <h2 className="mt-4 text-balance text-2xl font-semibold text-white sm:text-3xl">
                Siap Punya Website yang Terlihat Serius & Meyakinkan?
              </h2>

              <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
                Konsultasi gratis untuk menentukan solusi terbaik bagi bisnismu. Tanpa paksaan, tanpa biaya—dibantu dari awal.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <PrimaryButton onClick={() => alert("Ganti ini dengan link WA / form kamu ya!")}>
                  Konsultasi Gratis Sekarang
                </PrimaryButton>
                <SecondaryButton onClick={() => scrollToId("pricing")}>Lihat Paket</SecondaryButton>
              </div>

              <div className="mt-3 text-xs text-white/55">
                Tanpa biaya • Tanpa paksaan • Dibantu dari awal
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { t: "Cepat & rapi", d: "nyaman dibaca di mobile" },
                  { t: "CTA jelas", d: "arahin pengunjung untuk action" },
                  { t: "Support", d: "pendampingan setelah online" },
                ].map((x) => (
                  <div key={x.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-sm font-semibold text-white/85">{x.t}</div>
                    <div className="mt-1 text-xs text-white/60">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </MotionIn>
      </div>

      <div aria-hidden className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
