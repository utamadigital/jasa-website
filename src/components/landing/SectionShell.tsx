"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export function SectionShell({ id, className, children, eyebrow, title, subtitle }: Props) {
  return (
    <section id={id} className={cn("relative scroll-mt-24", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            {eyebrow && (
              <div className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-200">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-balance text-2xl font-semibold text-white sm:text-3xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
