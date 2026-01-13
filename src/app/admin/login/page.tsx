"use client";

import * as React from "react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [phone, setPhone] = React.useState("085643232300");
  const [pin, setPin] = React.useState("");
  const [err, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone, pin }),
      });
      let data: any = {};
      try { data = await res.json(); } catch { data = { message: await res.text().catch(() => "") }; }
      if (!res.ok) throw new Error(data?.message || "Login gagal");
      window.location.href = "/admin/editor";
    } catch (e: any) {
      setErr(e?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <div className="text-lg font-semibold">Admin Login</div>
          <div className="mt-1 text-sm text-white/70">
            Login pakai nomor HP + PIN (PIN disimpan di environment).
          </div>

          <form onSubmit={onSubmit} className="mt-5 grid gap-3">
            <label className="grid gap-1">
              <span className="text-xs font-semibold text-white/70">Nomor HP</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11 rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none focus:border-emerald-300/40"
                placeholder="08xxxxxxxxxx"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-xs font-semibold text-white/70">PIN Admin</span>
              <input
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="h-11 rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none focus:border-emerald-300/40"
                placeholder="Masukkan PIN"
                type="password"
              />
            </label>

            {err && (
              <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-3 text-sm text-rose-200">
                {err}
              </div>
            )}

            <button
              disabled={loading}
              className="mt-1 h-11 rounded-2xl bg-emerald-500 px-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60"
            >
              {loading ? "Masuk..." : "Masuk"}
            </button>

            <div className="text-xs text-white/50">
              Wajib set: <code className="text-white/70">ADMIN_PIN</code> dan disarankan set{" "}
              <code className="text-white/70">ADMIN_SESSION_SECRET</code>.
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
