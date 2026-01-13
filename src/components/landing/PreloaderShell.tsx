"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "./ui";

export default function PreloaderShell({ children }: { children: React.ReactNode }) {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[9999] grid place-items-center bg-slate-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center gap-3">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  animate={{ rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <LogoMark className="h-14 w-14" />
                </motion.div>
              </motion.div>

              <motion.div
                className="h-1.5 w-28 overflow-hidden rounded-full bg-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <motion.div
                  className="h-full w-1/2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              <div className="text-[12px] text-white/60">Loading…</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
