"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });

type Content = any;

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="grid gap-1">
      <div className="text-xs font-semibold text-white/70">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="min-h-[96px] resize-y rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none focus:border-emerald-300/40"
      />
    </label>
  );
}

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
      <div className="text-sm font-semibold">Audience Slides</div>
      <div className="text-xs text-white/60">
        Ini bagian “Untuk siapa?”. Edit judul & isi per segmen (UMKM / Perusahaan / Kreatif).
      </div>
    </div>
    <button
      onClick={() => {
        const next = {
          ...content,
          audienceSlides: content.audienceSlides || {
            eyebrow: "Untuk siapa?",
            title: "Website yang disesuaikan dengan jenis bisnismu",
            subtitle:
              "Pilih yang paling mirip dengan bisnismu — isi, struktur, dan CTA akan dibuat menyesuaikan.",
            slides: [],
          },
        };
        setContent(next);
        setRawJson(JSON.stringify(next, null, 2));
        setDirtyJson(true);
      }}
      className="h-9 rounded-2xl border border-white/10 bg-white/[0.03] px-3 text-xs font-semibold text-white/80 hover:bg-white/[0.06]"
      type="button"
    >
      Pastikan ada section ini
    </button>
  </div>

  {(() => {
    const a = content.audienceSlides || {};
    const slides = a.slides || [];
    return (
      <div className="mt-4 grid gap-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Field
            label="Eyebrow"
            value={a.eyebrow || ""}
            onChange={(v) => {
              const next = { ...content, audienceSlides: { ...a, eyebrow: v } };
              setContent(next);
              setRawJson(JSON.stringify(next, null, 2));
              setDirtyJson(true);
            }}
          />
          <Field
            label="Title"
            value={a.title || ""}
            onChange={(v) => {
              const next = { ...content, audienceSlides: { ...a, title: v } };
              setContent(next);
              setRawJson(JSON.stringify(next, null, 2));
              setDirtyJson(true);
            }}
          />
          <Field
            label="Subtitle"
            value={a.subtitle || ""}
            onChange={(v) => {
              const next = { ...content, audienceSlides: { ...a, subtitle: v } };
              setContent(next);
              setRawJson(JSON.stringify(next, null, 2));
              setDirtyJson(true);
            }}
          />
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          {slides.slice(0, 3).map((s: any, idx: number) => (
            <div key={idx} className="rounded-3xl border border-white/10 bg-slate-950/40 p-4">
              <div className="text-xs font-semibold text-white/80">
                Slide #{idx + 1} — {s.label || "Tanpa label"}
              </div>
              <div className="mt-3 grid gap-2">
                <Field
                  label="Label (tab)"
                  value={s.label || ""}
                  onChange={(v) => {
                    const nextSlides = [...slides];
                    nextSlides[idx] = { ...nextSlides[idx], label: v };
                    const next = { ...content, audienceSlides: { ...a, slides: nextSlides } };
                    setContent(next);
                    setRawJson(JSON.stringify(next, null, 2));
                    setDirtyJson(true);
                  }}
                />
                <Field
                  label="Tag kecil"
                  value={s.tag || ""}
                  onChange={(v) => {
                    const nextSlides = [...slides];
                    nextSlides[idx] = { ...nextSlides[idx], tag: v };
                    const next = { ...content, audienceSlides: { ...a, slides: nextSlides } };
                    setContent(next);
                    setRawJson(JSON.stringify(next, null, 2));
                    setDirtyJson(true);
                  }}
                  placeholder="contoh: WhatsApp-first"
                />
                <Field
                  label="Judul"
                  value={s.title || ""}
                  onChange={(v) => {
                    const nextSlides = [...slides];
                    nextSlides[idx] = { ...nextSlides[idx], title: v };
                    const next = { ...content, audienceSlides: { ...a, slides: nextSlides } };
                    setContent(next);
                    setRawJson(JSON.stringify(next, null, 2));
                    setDirtyJson(true);
                  }}
                />
                <TextArea
                  label="Deskripsi"
                  value={s.desc || ""}
                  onChange={(v) => {
                    const nextSlides = [...slides];
                    nextSlides[idx] = { ...nextSlides[idx], desc: v };
                    const next = { ...content, audienceSlides: { ...a, slides: nextSlides } };
                    setContent(next);
                    setRawJson(JSON.stringify(next, null, 2));
                    setDirtyJson(true);
                  }}
                  rows={3}
                />
                <TextArea
                  label="Bullets (1 baris = 1 bullet)"
                  value={Array.isArray(s.bullets) ? s.bullets.join("\n") : ""}
                  onChange={(v) => {
                    const nextSlides = [...slides];
                    nextSlides[idx] = {
                      ...nextSlides[idx],
                      bullets: v
                        .split("\n")
                        .map((x) => x.trim())
                        .filter(Boolean),
                    };
                    const next = { ...content, audienceSlides: { ...a, slides: nextSlides } };
                    setContent(next);
                    setRawJson(JSON.stringify(next, null, 2));
                    setDirtyJson(true);
                  }}
                  rows={6}
                  placeholder={"Contoh:\nCTA WhatsApp jelas\nStruktur rapi\nTrust booster"}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-white/50">
          Catatan: kalau kamu mau tambah slide lebih dari 3, bisa lewat JSON Editor (Advanced).
        </div>
      </div>
    );
  })()}
</div>

<div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
  <div className="text-sm font-semibold">About (Tentang Saya)</div>
  <div className="mt-1 text-xs text-white/60">
    Edit isi section Tentang Saya, termasuk foto profil (URL).
  </div>

  {(() => {
    const a = content.about || {};
    const setA = (patch: any) => {
      const next = { ...content, about: { ...a, ...patch } };
      setContent(next);
      setRawJson(JSON.stringify(next, null, 2));
      setDirtyJson(true);
    };

    return (
      <div className="mt-4 grid gap-3">
        <div className="grid gap-3 md:grid-cols-3">
          <Field label="Eyebrow" value={a.eyebrow || ""} onChange={(v) => setA({ eyebrow: v })} />
          <Field label="Title" value={a.title || ""} onChange={(v) => setA({ title: v })} />
          <Field label="Subtitle" value={a.subtitle || ""} onChange={(v) => setA({ subtitle: v })} />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <TextArea label="Deskripsi" value={a.desc || ""} onChange={(v) => setA({ desc: v })} rows={4} />
          <TextArea
            label="Bullets (1 baris = 1 bullet)"
            value={Array.isArray(a.bullets) ? a.bullets.join("\n") : ""}
            onChange={(v) =>
              setA({
                bullets: v
                  .split("\n")
                  .map((x) => x.trim())
                  .filter(Boolean),
              })
            }
            rows={6}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <Field label="CTA label" value={a.ctaLabel || ""} onChange={(v) => setA({ ctaLabel: v })} />
          <Field label="CTA href" value={a.ctaHref || ""} onChange={(v) => setA({ ctaHref: v })} placeholder="#contact" />
          <Field label="Helper text" value={a.helperText || ""} onChange={(v) => setA({ helperText: v })} />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Field
            label="Foto profil URL"
            value={a.profileImageUrl || ""}
            onChange={(v) => setA({ profileImageUrl: v })}
            placeholder="https://..."
          />
          <Field label="Nama" value={a.profileName || ""} onChange={(v) => setA({ profileName: v })} />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Role" value={a.profileRole || ""} onChange={(v) => setA({ profileRole: v })} />
          <Field label="Label foto (opsional)" value={a.profileLabel || ""} onChange={(v) => setA({ profileLabel: v })} />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Fokus (judul)" value={a.focusTitle || ""} onChange={(v) => setA({ focusTitle: v })} />
          <Field label="Fokus (isi)" value={a.focusText || ""} onChange={(v) => setA({ focusText: v })} />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Niche (judul)" value={a.nicheTitle || ""} onChange={(v) => setA({ nicheTitle: v })} />
          <Field label="Niche (isi)" value={a.nicheText || ""} onChange={(v) => setA({ nicheText: v })} />
        </div>
      </div>
    );
  })()}
</div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-sm font-semibold">Advanced: JSON Editor</div>
              <div className="text-xs text-white/60">
                CodeMirror (highlight) + tidak auto-scroll. Parsing jalan otomatis setelah 0.7s kamu berhenti ngetik.
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
            </div>
          )}

          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60">
            <JsonCodeMirror
              value={rawJson}
              onChange={(t) => {
                setRawJson(t);
                setDirtyJson(true);
                applyJsonDebounced(t);
              }}
            />
          </div>

          <div className="mt-3 text-xs text-white/50">
            Wajib install dependency: <span className="text-white/70">npm i @uiw/react-codemirror @codemirror/lang-json @codemirror/theme-one-dark</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function JsonCodeMirror({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [ready, setReady] = React.useState(false);
  const [extensions, setExtensions] = React.useState<any[]>([]);
  const [theme, setTheme] = React.useState<any>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      const [{ json }, { oneDark }] = await Promise.all([
        import("@codemirror/lang-json"),
        import("@codemirror/theme-one-dark"),
      ]);
      if (!mounted) return;
      setExtensions([json()]);
      setTheme(oneDark);
      setReady(true);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) return <div className="p-4 text-xs text-white/60">Loading editor…</div>;

  return (
    <CodeMirror
      value={value}
      height="520px"
      theme={theme}
      extensions={extensions}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        bracketMatching: true,
        closeBrackets: true,
        tabSize: 2,
      }}
      onChange={(v) => onChange(v)}
    />
  );
}
