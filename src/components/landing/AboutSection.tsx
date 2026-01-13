"use client";

import { SectionShell } from "./SectionShell";
import { Card, MotionIn, PrimaryButton } from "./ui";
import { scrollToId } from "@/lib/utils";

export default function AboutSection({ content }: { content?: any }) {
  const a = content?.about || {};

  const eyebrow = a.eyebrow || "Tentang Saya";
  const title = a.title || "Bukan Sekadar Web Designer, Tapi Partner Digital untuk Bisnismu";
  const subtitle =
    a.subtitle ||
    "Fokus saya bukan hanya membuat website yang terlihat bagus, tapi website yang berfungsi: mudah dipahami, cepat, dan membantu calon pelanggan percaya.";
  const desc =
    a.desc ||
    "Saya Febrian Budi Utama, web designer & WordPress specialist. Saya sering membantu UMKM, jasa profesional, dan bisnis kreatif yang ingin tampil lebih rapi, lebih serius, dan siap berkembang secara online.";

  const bullets: string[] =
    a.bullets || [
      "Spesialis WordPress & website bisnis",
      "Fokus performa, struktur, dan kejelasan pesan",
      "Proses kerja jelas & komunikatif",
      "Support setelah website online",
    ];

  const ctaLabel = a.ctaLabel || "Konsultasi Gratis";
  const ctaHref = a.ctaHref || "#contact";
  const helperText = a.helperText || "Gratis • Tanpa komitmen • Dibantu pilih paket";

  const imgUrl =
    a.profileImageUrl ||
    "https://utamadigital.id/wp-content/uploads/2025/11/Gemini_Generated_Image_u2hihwu2hihwu2hi.png";

  const profileLabel = a.profileLabel || "Foto / Profil";
  const profileName = a.profileName || "Febrian Budi Utama";
  const profileRole = a.profileRole || "Web Designer • Web Specialist";
  const focusTitle = a.focusTitle || "Fokus";
  const focusText = a.focusText || "Website yang menghasilkan leads";
  const nicheTitle = a.nicheTitle || "Niche";
  const nicheText = a.nicheText || "UMKM • Jasa • Kreatif • Corporate";

  return (
    <SectionShell id="about" eyebrow={eyebrow} title={title} subtitle={subtitle} className="py-14">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <MotionIn>
          <div className="text-sm leading-relaxed text-white/75">
            <p>{desc}</p>

            <ul className="mt-5 grid gap-3">
              {bullets.slice(0, 6).map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-emerald-200">
                    ✓
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <PrimaryButton onClick={() => scrollToId(ctaHref)}>{ctaLabel}</PrimaryButton>
              <div className="text-xs text-white/55">{helperText}</div>
            </div>
          </div>
        </MotionIn>

        <MotionIn delay={0.06}>
          <Card className="relative overflow-hidden p-5">
            <div aria-hidden className="absolute inset-0">
              <div className="absolute -top-20 right-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/6 to-white/[0.02] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold text-white/70">{profileLabel}</div>
                  <div className="text-xs text-white/45">Trust builder</div>
                </div>

                {/* Photo */}
                <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
                  <img
                    src={imgUrl}
                    alt={profileName}
                    className="h-56 w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Name + role */}
                <div className="mt-4">
                  <div className="text-sm font-semibold text-white">{profileName}</div>
                  <div className="mt-0.5 text-xs text-white/60">{profileRole}</div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs font-semibold text-white/80">{focusTitle}</div>
                  <div className="mt-1 text-sm font-semibold text-white">{focusText}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs font-semibold text-white/80">{nicheTitle}</div>
                  <div className="mt-1 text-sm font-semibold text-white">{nicheText}</div>
                </div>
              </div>
            </div>
          </Card>
        </MotionIn>
      </div>
    </SectionShell>
  );
}
