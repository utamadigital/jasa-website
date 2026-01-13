"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToId } from "@/lib/utils";
import { Badge, MotionIn, PrimaryButton, SecondaryButton, Card } from "./ui";

function RotatingWord({ words }: { words: string[] }) {
  const safeWords = words?.length ? words : ["mendatangkan pelanggan"];
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % safeWords.length), 2800);
    return () => clearInterval(t);
  }, [safeWords.length]);

  return (
    <span className="relative inline-block align-baseline">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={safeWords[i]}
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="font-semibold text-emerald-200"
        >
          {safeWords[i]}
        </motion.span>
      </AnimatePresence>

      {/* neon underline */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-emerald-300/0 via-emerald-300/70 to-emerald-300/0"
        initial={{ opacity: 0.25, scaleX: 0.75 }}
        animate={{ opacity: 0.65, scaleX: 1 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
      />
    </span>
  );
}

/**
 * Anti-mainstream background:
 * - Animated conic "aurora ring"
 * - Slow-moving mesh gradients
 * - Subtle grain + vignette
 * (All in pure CSS, very smooth)
 */
function PremiumHeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <style>{`
        @keyframes floatA {
          0% { transform: translate3d(-6%, -10%, 0) scale(1); }
          50% { transform: translate3d(6%, 2%, 0) scale(1.05); }
          100% { transform: translate3d(-6%, -10%, 0) scale(1); }
        }
        @keyframes floatB {
          0% { transform: translate3d(10%, -6%, 0) scale(1); }
          50% { transform: translate3d(-8%, 6%, 0) scale(1.06); }
          100% { transform: translate3d(10%, -6%, 0) scale(1); }
        }
        @keyframes spinSlow {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes sweep {
          0% { transform: translateX(-40%) skewX(-12deg); opacity: .0; }
          20% { opacity: .35; }
          55% { opacity: .18; }
          100% { transform: translateX(140%) skewX(-12deg); opacity: 0; }
        }
        .grain {
          background-image:
            radial-gradient(circle at 20% 30%, rgba(255,255,255,.06), transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,.05), transparent 35%),
            radial-gradient(circle at 40% 90%, rgba(255,255,255,.05), transparent 35%),
            repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0, rgba(255,255,255,.03) 1px, transparent 1px, transparent 3px);
          mix-blend-mode: overlay;
          opacity: .08;
        }
      `}</style>

      {/* Mesh gradient blobs */}
      <div
        className="absolute -left-28 -top-40 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 35%, rgba(52,211,153,0.30), transparent 55%), radial-gradient(circle at 70% 65%, rgba(34,211,238,0.22), transparent 58%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.10), transparent 60%)",
          animation: "floatA 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-40 -top-24 h-[620px] w-[620px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(34,211,238,0.24), transparent 60%), radial-gradient(circle at 70% 70%, rgba(52,211,153,0.18), transparent 58%), radial-gradient(circle at 40% 65%, rgba(255,255,255,0.10), transparent 62%)",
          animation: "floatB 20s ease-in-out infinite",
        }}
      />

      {/* Aurora ring */}
      <div
        className="absolute left-1/2 top-[38%] h-[980px] w-[980px] rounded-full opacity-[0.55]"
        style={{
          transform: "translate(-50%, -50%)",
          background:
            "conic-gradient(from 180deg, rgba(52,211,153,.0), rgba(52,211,153,.35), rgba(34,211,238,.25), rgba(255,255,255,.12), rgba(52,211,153,.22), rgba(52,211,153,.0))",
          filter: "blur(26px)",
          animation: "spinSlow 28s linear infinite",
          maskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 72%)",
        }}
      />

      {/* Light sweep */}
      <div
        className="absolute top-0 left-0 h-full w-[40%] opacity-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.10) 35%, rgba(34,211,238,0.10) 55%, transparent 100%)",
          filter: "blur(10px)",
          animation: "sweep 8.5s ease-in-out infinite",
        }}
      />

      {/* Subtle grain */}
      <div className="grain absolute inset-0" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_15%,rgba(2,6,23,0.15),rgba(2,6,23,0.55)_55%,rgba(2,6,23,0.88)_100%)]" />
    </div>
  );
}

function MiniValuePill({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="text-xs font-semibold text-white/80">{title}</div>
      <div className="mt-0.5 text-[12px] leading-relaxed text-white/60">{desc}</div>
    </div>
  );
}

function PreviewStack({ content }: { content: any }) {
  const items =
    content?.hero?.previewCards || [
      { k: "UMKM", t: "Landing + WhatsApp CTA", d: "Orang cepat paham & langsung chat." },
      { k: "Company", t: "Company Profile rapi", d: "Cocok untuk partner/tender." },
      { k: "Kreatif", t: "Portofolio terlihat mahal", d: "Karya kamu tampil meyakinkan." },
    ];

  return (
    <div className="relative">
      {/* floating dots */}
      <div className="pointer-events-none absolute -left-6 -top-6 h-16 w-16 rounded-full bg-emerald-300/10 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 -bottom-8 h-20 w-20 rounded-full bg-cyan-300/10 blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 16, rotate: -0.4 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-semibold text-white/70">Preview deliverables</div>
          <Badge className="border-emerald-300/20 bg-emerald-300/10 text-emerald-100">
            Conversion-ready
          </Badge>
        </div>

        <div className="mt-4 grid gap-3">
          {items.slice(0, 3).map((it: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.05 * idx, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 items-center rounded-full border border-white/10 bg-white/5 px-2 text-[11px] font-semibold text-white/70">
                  {it.k}
                </span>
                <span className="text-sm font-semibold text-white/85">{it.t}</span>
              </div>
              <div className="mt-1 text-[12.5px] leading-relaxed text-white/60">{it.d}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-300/10 via-white/[0.03] to-cyan-300/10 p-3">
          <div className="flex items-center gap-2 text-xs text-white/70">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
            Struktur + CTA disusun untuk bikin orang cepat percaya & cepat chat
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroSection({ content }: { content: any }) {
  const c = content?.hero || {};
  const badge = c.badge || "WordPress Specialist • Website untuk UMKM & profesional kreatif";
  const line1 = c.headlineLine1 || "Website bukan sekadar tampilan.";
  const prefix = c.headlineLine2Prefix || "Tapi alat untuk";
  const words: string[] = c.rotatingWords || ["mendatangkan lead", "naikin trust", "brand terlihat serius"];
  const desc =
    c.desc ||
    "Saya bantu pemilik bisnis dan profesional kreatif membangun website yang cepat, rapi, SEO-ready, dan dirancang untuk meningkatkan kepercayaan calon pelanggan.";

  const bullets: string[] =
    c.bullets || [
      "Desain modern & mobile-friendly",
      "Struktur SEO dasar (siap diiklankan & dicari Google)",
      "Integrasi WhatsApp / CTA pelanggan",
      "Website mudah dikelola sendiri (WordPress)",
    ];

  const primary = c.primaryCta || { label: "Konsultasi Gratis Sekarang", href: "#contact" };
  const secondary = c.secondaryCta || { label: "Lihat Paket & Harga", href: "#paket" };

  const mini = c.miniValues || [
    { title: "Cepat", desc: "Live 3–7 hari" },
    { title: "Rapi", desc: "Struktur jelas" },
    { title: "Siap jualan", desc: "CTA WhatsApp" },
  ];

  return (
    <section id="home" className="relative">
      <PremiumHeroBackground />

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:pt-12 lg:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left */}
          <div className="lg:col-span-7">
            <MotionIn className="inline-block">
              <Badge className="border-white/10 bg-white/5 text-white/75">
                {badge}
              </Badge>
            </MotionIn>

            <MotionIn delay={0.05}>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.06] tracking-[-0.02em] text-white sm:text-5xl">
                {line1}{" "}
                <span className="text-white/70">{prefix} </span>
                <RotatingWord words={words} />
                <span className="text-white/70">.</span>
              </h1>
            </MotionIn>

            <MotionIn delay={0.12}>
              <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-white/70">
                {desc}
              </p>
            </MotionIn>

            <div className="mt-6 grid max-w-2xl gap-3">
              {bullets.slice(0, 4).map((b, i) => (
                <MotionIn key={i} delay={0.16 + i * 0.05}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.75)]" />
                    </span>
                    <div className="text-[14.5px] leading-relaxed text-white/80">{b}</div>
                  </div>
                </MotionIn>
              ))}
            </div>

            <MotionIn delay={0.34}>
  <div
    className="
      mt-7
      grid grid-cols-2 gap-3
      sm:flex sm:flex-wrap sm:items-center sm:gap-3
    "
  >
    <PrimaryButton
      onClick={() => scrollToId(primary.href)}
      className="h-11 w-full px-5"
    >
      {primary.label}
    </PrimaryButton>

    <SecondaryButton
      onClick={() => scrollToId(secondary.href)}
      className="h-11 w-full px-5"
    >
      {secondary.label}
    </SecondaryButton>

    {/* helper text: full width di mobile, inline di desktop */}
    <div className="col-span-2 text-xs text-white/55 sm:col-auto">
      Gratis • Tanpa komitmen • Dibantu pilih paket yang tepat
    </div>
  </div>
</MotionIn>


            <MotionIn delay={0.42}>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {mini.slice(0, 3).map((it: any, idx: number) => (
                  <MiniValuePill key={idx} title={it.title} desc={it.desc} />
                ))}
              </div>
            </MotionIn>
          </div>

          {/* Right */}
          <div className="lg:col-span-5 lg:-mt-6">
  <PreviewStack content={content} />
</div>
        </div>

        {/* Soft divider into next section */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
