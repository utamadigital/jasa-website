"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { cn } from "@/lib/utils";
import { Card, Badge } from "./ui";

type Slide = {
  key: string;
  label: string;
  tag?: string;
  title: string;
  desc?: string;
  bullets?: string[];
};

export default function AudienceSlidesSection({
  content,
}: {
  content: any;
}) {
  const data = content?.audienceSlides;
  const slides: Slide[] = data?.slides || [];
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (i > slides.length - 1) setI(0);
  }, [i, slides.length]);

  if (!slides.length) return null;

  const active = slides[i];

  function go(next: number) {
    if (next < 0) next = slides.length - 1;
    if (next > slides.length - 1) next = 0;
    setI(next);
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 24 : -24, y: 6, scale: 0.995 }),
    center: { opacity: 1, x: 0, y: 0, scale: 1 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -24 : 24, y: -6, scale: 0.995 }),
  };

  return (
    <SectionShell
      id="untuk-siapa"
      eyebrow={data?.eyebrow || "Untuk siapa?"}
      title={data?.title || "Website yang disesuaikan dengan jenis bisnismu"}
      subtitle={data?.subtitle || "Pilih yang paling mirip dengan bisnismu."}
      className="py-12 sm:py-16"
    >
      <div className="grid gap-4">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {slides.map((s, idx) => {
            const activeTab = idx === i;
            return (
              <button
                key={s.key || idx}
                onClick={() => setI(idx)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                  activeTab
                    ? "border-emerald-300/35 bg-emerald-300/10 text-emerald-100 shadow-[0_0_0_1px_rgba(52,211,153,0.25)]"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/8 hover:text-white/85"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    activeTab ? "bg-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.6)]" : "bg-white/25"
                  )}
                />
                {s.label}
                {s.tag ? (
                  <span
                    className={cn(
                      "ml-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                      activeTab
                        ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
                        : "border-white/10 bg-white/5 text-white/55"
                    )}
                  >
                    {s.tag}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Slide */}
        <div className="relative">
          <Card className="overflow-hidden p-0" hover={false}>
            <div className="relative">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl" />
                <div className="absolute -right-24 -bottom-24 h-56 w-56 rounded-full bg-cyan-300/8 blur-3xl" />
              </div>

              <div className="relative p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <Badge className="border-white/10 bg-white/5 text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.65)]" />
                    {active.tag || "Segment"}
                  </Badge>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => go(i - 1)}
                      className="h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.03] text-white/75 hover:bg-white/[0.06]"
                      aria-label="Sebelumnya"
                      type="button"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => go(i + 1)}
                      className="h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.03] text-white/75 hover:bg-white/[0.06]"
                      aria-label="Berikutnya"
                      type="button"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <AnimatePresence mode="wait" initial={false} custom={1}>
                    <motion.div
                      key={active.key}
                      custom={1}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.12}
                      onDragEnd={(_, info) => {
                        const swipe = Math.abs(info.offset.x) * info.velocity.x;
                        if (swipe < -800) go(i + 1);
                        else if (swipe > 800) go(i - 1);
                      }}
                    >
                      <div className="grid gap-4 sm:grid-cols-5 sm:items-start">
                        <div className="sm:col-span-2">
                          <div className="text-xs font-semibold text-white/60">Cocok untuk</div>
                          <div className="mt-1 text-lg font-semibold text-white sm:text-xl">
                            {active.title}
                          </div>
                          {active.desc ? (
                            <p className="mt-2 text-sm leading-relaxed text-white/70">
                              {active.desc}
                            </p>
                          ) : null}

                          <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-100">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
                            Tinggal sesuaikan isi & CTA untuk jenis bisnismu
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <div className="grid gap-2">
                            {(active.bullets || []).map((b, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                              >
                                <div className="mt-0.5 h-8 w-8 shrink-0 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 grid place-items-center">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
                                </div>
                                <div className="text-sm leading-relaxed text-white/80">{b}</div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-1.5">
                              {slides.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setI(idx)}
                                  className={cn(
                                    "h-2 w-2 rounded-full transition",
                                    idx === i
                                      ? "bg-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.7)]"
                                      : "bg-white/20 hover:bg-white/35"
                                  )}
                                  aria-label={`Slide ${idx + 1}`}
                                  type="button"
                                />
                              ))}
                            </div>

                            <div className="text-xs text-white/55">
                              Swipe / drag untuk ganti
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </SectionShell>
  );
}
