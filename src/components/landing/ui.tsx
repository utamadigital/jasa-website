"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-10 w-10", className)}>
      <div
        className="absolute inset-0 p-[2px]"
        style={{
          clipPath:
            "polygon(50% 3%, 90% 25%, 90% 75%, 50% 97%, 10% 75%, 10% 25%)",
        }}
      >
        <div className={`h-full w-full rounded-[18px] bg-gradient-to-br from-emerald-300 to-cyan-300 ${compact ? "px-3 py-2 text-xs" : "px-4 py-3"}`} />
      </div>

      <div
        className="absolute inset-[2px] grid place-items-center bg-slate-950"
        style={{
          clipPath:
            "polygon(50% 3%, 90% 25%, 90% 75%, 50% 97%, 10% 75%, 10% 25%)",
        }}
      >
        <span className="text-[15px] font-black tracking-tight text-white">F</span>
      </div>
    </div>
  );
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    ref.current.style.setProperty("--x", `${x}%`);
    ref.current.style.setProperty("--y", `${y}%`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={hover ? onMove : undefined}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
        hover &&
          "transition will-change-transform hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.06]",
        className
      )}
    >
      {/* shine */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-24 opacity-0 transition duration-500",
          hover && "group-hover:opacity-100"
        )}
        style={{
          background:
            "radial-gradient(420px 220px at var(--x, 50%) var(--y, 50%), rgba(16,185,129,0.22), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}

export function PrimaryButton({
  children,
  className,
  onClick,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const Comp: any = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(16,185,129,0.22)] transition hover:brightness-110 active:brightness-95 focus:outline-none focus:ring-2 focus:ring-emerald-300/40",
        className
      )}
    >
      {children}
    </Comp>
  );
}

export function SecondaryButton({
  children,
  className,
  onClick,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const Comp: any = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/8 active:bg-white/6 focus:outline-none focus:ring-2 focus:ring-white/15",
        className
      )}
    >
      {children}
    </Comp>
  );
}

export function SoftGlow() {
  // Intentionally minimal: keep subtle depth without big glow blobs
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export function MotionIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
