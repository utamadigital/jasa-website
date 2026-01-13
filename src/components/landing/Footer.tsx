"use client";

import { scrollToId } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-white">Febrian Budi Utama</div>
            <div className="mt-1 text-xs text-white/60">Web Specialist</div>
			<div className="mt-1 text-xs text-white/60">hello@utamadigital.id</div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              ["Home", "home"],
              ["Paket", "pricing"],
              ["Portofolio", "portfolio"],
              ["FAQ", "faq"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 hover:bg-white/8"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-xs text-white/45">
          © {new Date().getFullYear()} • All rights reserved.
        </div>
      </div>
    </footer>
  );
}
