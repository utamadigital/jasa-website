"use client";

import * as React from "react";
import { motion } from "framer-motion";
import CodeMirror from "@uiw/react-codemirror";
import { json as jsonLang } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";


type Content = any;

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1">
      <div className="text-xs font-semibold text-white/70">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm text-white outline-none focus:border-emerald-300/40"
      />
    </label>
  );
}

function useDebouncedCallback(fn: (...args: any[]) => void, delay = 600) {
  const fnRef = React.useRef(fn);
  React.useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const tRef = React.useRef<number | null>(null);

  return React.useCallback(
    (...args: any[]) => {
      if (tRef.current) window.clearTimeout(tRef.current);
      tRef.current = window.setTimeout(() => fnRef.current(...args), delay);
    },
    [delay]
  );
}

export default function AdminEditorPage() {
  const [content, setContent] = React.useState<Content | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);

  // JSON editor state: keep raw text separate to prevent cursor/scroll jump
  const [rawJson, setRawJson] = React.useState<string>("");
  const [jsonError, setJsonError] = React.useState<string | null>(null);
  const [dirtyJson, setDirtyJson] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((d) => {
        setContent(d.content);
        setRawJson(JSON.stringify(d.content, null, 2));
        setJsonError(null);
        setDirtyJson(false);
      })
      .catch(() => setContent(null));
  }, []);

  const applyJsonDebounced = useDebouncedCallback((text: string) => {
    try {
      const next = JSON.parse(text);
      setContent(next);
      setJsonError(null);
    } catch {
      setJsonError("JSON error: periksa koma / tanda kutip.");
    }
  }, 700);

  async function save() {
    if (!content) return;
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(content),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d?.message || "Gagal simpan");
      setMsg("Tersimpan ✅ (refresh landing untuk lihat perubahan)");
      setDirtyJson(false);
    } catch (e: any) {
      setMsg(e?.message || "Gagal simpan");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  async function upload(file: File) {
    const fd = new FormData();
    fd.set("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const d = await res.json();
    if (!res.ok) throw new Error(d?.message || "Upload gagal");
    return d.url as string;
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-10">Loading…</div>
      </div>
    );
  }

  const hero = content.hero || {};

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xl font-semibold">Editor Landing Page</div>
            <div className="text-sm text-white/60">
              Edit teks & gambar. Klik “Simpan” lalu refresh halaman utama.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className="h-10 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm font-semibold text-white/80 hover:bg-white/[0.06]"
            >
              Logout
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="h-10 rounded-2xl bg-emerald-500 px-4 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
            >
              {saving ? "Menyimpan…" : "Simpan"}
            </button>
          </div>
        </div>

        {msg && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-white/80">
            {msg}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 grid gap-4 lg:grid-cols-2"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm font-semibold">Hero</div>
            <div className="mt-4 grid gap-3">
              <Field
                label="Badge"
                value={hero.badge || ""}
                onChange={(v) => {
                  const next = { ...content, hero: { ...hero, badge: v } };
                  setContent(next);
                  setRawJson(JSON.stringify(next, null, 2));
                  setDirtyJson(true);
                }}
              />
              <Field
                label="Headline (baris 1)"
                value={hero.headlineLine1 || ""}
                onChange={(v) => {
                  const next = { ...content, hero: { ...hero, headlineLine1: v } };
                  setContent(next);
                  setRawJson(JSON.stringify(next, null, 2));
                  setDirtyJson(true);
                }}
              />
              <Field
                label="Headline prefix (baris 2)"
                value={hero.headlineLine2Prefix || ""}
                onChange={(v) => {
                  const next = { ...content, hero: { ...hero, headlineLine2Prefix: v } };
                  setContent(next);
                  setRawJson(JSON.stringify(next, null, 2));
                  setDirtyJson(true);
                }}
              />
              <Field
                label="Deskripsi"
                value={hero.desc || ""}
                onChange={(v) => {
                  const next = { ...content, hero: { ...hero, desc: v } };
                  setContent(next);
                  setRawJson(JSON.stringify(next, null, 2));
                  setDirtyJson(true);
                }}
              />
              <Field
                label="CTA Primary"
                value={hero.ctaPrimary || ""}
                onChange={(v) => {
                  const next = { ...content, hero: { ...hero, ctaPrimary: v } };
                  setContent(next);
                  setRawJson(JSON.stringify(next, null, 2));
                  setDirtyJson(true);
                }}
              />
              <Field
                label="CTA Secondary"
                value={hero.ctaSecondary || ""}
                onChange={(v) => {
                  const next = { ...content, hero: { ...hero, ctaSecondary: v } };
                  setContent(next);
                  setRawJson(JSON.stringify(next, null, 2));
                  setDirtyJson(true);
                }}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm font-semibold">Portfolio (gambar)</div>
            <div className="mt-2 text-xs text-white/60">
              Isi URL gambar, atau upload (lokal/dev). Di Vercel, upload ke public tidak persisten.
            </div>

            <div className="mt-4 grid gap-3">
              {(content.portfolio?.items || []).slice(0, 3).map((it: any, idx: number) => (
                <div key={idx} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="text-xs font-semibold text-white/80">Item #{idx + 1}</div>
                  <div className="mt-3 grid gap-2">
                    <Field
                      label="Judul"
                      value={it.title || ""}
                      onChange={(v) => {
                        const items = [...(content.portfolio?.items || [])];
                        items[idx] = { ...items[idx], title: v };
                        const next = { ...content, portfolio: { ...content.portfolio, items } };
                        setContent(next);
                        setRawJson(JSON.stringify(next, null, 2));
                        setDirtyJson(true);
                      }}
                    />
                    <Field
                      label="Image URL"
                      value={it.image || ""}
                      onChange={(v) => {
                        const items = [...(content.portfolio?.items || [])];
                        items[idx] = { ...items[idx], image: v };
                        const next = { ...content, portfolio: { ...content.portfolio, items } };
                        setContent(next);
                        setRawJson(JSON.stringify(next, null, 2));
                        setDirtyJson(true);
                      }}
                      placeholder="/uploads/xxx.jpg atau https://..."
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const url = await upload(file);
                          const items = [...(content.portfolio?.items || [])];
                          items[idx] = { ...items[idx], image: url };
                          const next = { ...content, portfolio: { ...content.portfolio, items } };
                          setContent(next);
                          setRawJson(JSON.stringify(next, null, 2));
                          setDirtyJson(true);
                          setMsg("Upload sukses ✅");
                        } catch (err: any) {
                          setMsg(err?.message || "Upload gagal");
                        } finally {
                          e.currentTarget.value = "";
                        }
                      }}
                      className="text-xs text-white/70"
                    />
                  </div>
                </div>
              ))}

              <div className="text-xs text-white/50">
                Untuk edit full struktur (pricing/services/testimoni/faq), pakai JSON editor di bawah.
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-sm font-semibold">Advanced: Edit JSON</div>
              <div className="text-xs text-white/60">
                Tidak auto-scroll lagi. Parse jalan otomatis setelah kamu berhenti ngetik (debounce).
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  try {
                    const pretty = JSON.stringify(JSON.parse(rawJson), null, 2);
                    setRawJson(pretty);
                    setJsonError(null);
                    setDirtyJson(true);
                    applyJsonDebounced(pretty);
                  } catch {
                    setJsonError("JSON error: periksa koma / tanda kutip.");
                  }
                }}
                className="h-9 rounded-2xl border border-white/10 bg-white/[0.03] px-3 text-xs font-semibold text-white/80 hover:bg-white/[0.06]"
              >
                Format JSON
              </button>
			  
			  <button
  onClick={async () => {
    try {
      await navigator.clipboard.writeText(rawJson);
      setMsg("JSON tersalin ✅");
    } catch {
      setMsg("Gagal copy");
    }
  }}
  className="h-9 rounded-2xl border border-white/10 bg-white/[0.03] px-3 text-xs font-semibold text-white/80 hover:bg-white/[0.06]"
>
  Copy JSON
</button>


              <button
                onClick={() => {
                  const snap = JSON.stringify(content, null, 2);
                  setRawJson(snap);
                  setJsonError(null);
                  setDirtyJson(false);
                }}
                className="h-9 rounded-2xl border border-white/10 bg-white/[0.03] px-3 text-xs font-semibold text-white/80 hover:bg-white/[0.06]"
              >
                Reset terakhir valid
              </button>
            </div>
          </div>

          {(jsonError || dirtyJson) && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              {jsonError ? (
                <span className="rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1 text-rose-200">
                  {jsonError}
                </span>
              ) : (
                <span className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-amber-200">
                  Belum tersimpan (klik “Simpan”)
                </span>
              )}
              {!jsonError && (
                <span className="text-white/50">
                  Tips: parsing jalan otomatis setelah 0.7s kamu berhenti ngetik.
                </span>
              )}
            </div>
          )}

          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60">
  <CodeMirror
    value={rawJson}
    height="520px"
    theme={oneDark}
    extensions={[jsonLang()]}
    basicSetup={{
      lineNumbers: true,
      highlightActiveLineGutter: true,
      highlightActiveLine: true,
      bracketMatching: true,
      closeBrackets: true,
      foldGutter: true,
      autocompletion: false,
    }}
    onChange={(value) => {
      setRawJson(value);
      setDirtyJson(true);
      applyJsonDebounced(value); // tetap debounce parse
    }}
  />
</div>

        </div>
      </div>
    </div>
  );
}
