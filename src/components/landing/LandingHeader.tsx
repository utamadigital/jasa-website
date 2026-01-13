"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn, scrollToId } from "@/lib/utils";
import { LogoMark, PrimaryButton } from "./ui";

const NAV = [
  { label: "Home", id: "home" },
  { label: "Tentang", id: "about" },
  { label: "Layanan", id: "services" },
  { label: "Paket", id: "pricing" },
  { label: "Proses", id: "process" },
  { label: "Portofolio", id: "portfolio" },
  { label: "Testimoni", id: "testimonials" },
  { label: "FAQ", id: "faq" },
];

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <LogoMark className="h-10 w-10" />
      <div className="leading-tight">
        <div className="text-sm font-semibold text-white">Febrian</div>
        <div className="text-xs text-white/60">Web Designer</div>
      </div>
    </div>
  );
}

export default function LandingHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 10);
  });

  function go(id: string) {
    setOpen(false);
    scrollToId(id);
  }

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b border-transparent transition",
          scrolled ? "border-white/10 bg-slate-950/60 backdrop-blur" : "bg-transparent"
        )}
      >
        <div className={cn("mx-auto max-w-6xl px-4 sm:px-6 lg:px-8")}>
          <div className={cn("flex items-center justify-between py-4", scrolled && "py-3")}>
            <button
              onClick={() => go("home")}
              className="rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/15"
              aria-label="Go to home"
            >
              <BrandMark />
            </button>

            <nav className="hidden items-center gap-6 md:flex">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className="text-sm font-medium text-white/70 transition hover:text-white focus:outline-none"
                >
                  {n.label}
                </button>
              ))}
            </nav>

            <div className="hidden md:block">
              <PrimaryButton
                onClick={() => go("contact")}
                className="px-4 py-2.5 text-sm"
              >
                Konsultasi Gratis
              </PrimaryButton>
            </div>

            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/85"
              onClick={() => setOpen((s) => !s)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <span className="text-lg leading-none">{open ? "×" : "≡"}</span>
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden overflow-hidden"
              >
                <div className="pb-5">
                  <div className="mt-2 grid gap-2 rounded-2xl border border-white/10 bg-white/5 p-3">
                    {NAV.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => go(n.id)}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold text-white/80 hover:bg-white/5"
                      >
                        <span>{n.label}</span>
                        <span className="text-white/40">→</span>
                      </button>
                    ))}
                    <PrimaryButton onClick={() => go("contact")} className="mt-2 w-full">
                      Konsultasi Gratis
                    </PrimaryButton>
                    <div className="text-xs text-white/55">
                      Gratis • Tanpa komitmen • Dibantu pilih paket
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
