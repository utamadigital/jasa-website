"use client";

import * as React from "react";
import { SectionShell } from "./SectionShell";
import { Card, MotionIn, Badge } from "./ui";

type T = {
  quote: string;
  name: string;
  niche: string;
  city: string;
  when: string;
  outcome: string;
  rating: number;
};

const testimonials: T[] = [
  {
    quote:
      "Awalnya website saya cuma “ada”, tapi nggak bikin orang yakin. Setelah dibantu Febrian, tampilannya jauh lebih rapi, ada CTA WhatsApp yang jelas, dan struktur halaman bikin calon klien nggak bingung. Minggu pertama langsung masuk 6 chat yang serius.",
    name: "Rani A.",
    niche: "MUA & Wedding",
    city: "Bandung",
    when: "2 minggu lalu",
    outcome: "6 chat serius / minggu 1",
    rating: 5,
  },
  {
    quote:
      "Saya suka prosesnya: cepat, arahan konten jelas, dan revisinya enak. Web jadi lebih ringan di HP, dan saya bisa update portofolio sendiri di WordPress. Setelah diiklankan, bounce rate turun dan orang lebih banyak klik tombol WA.",
    name: "Dimas S.",
    niche: "Fotografer",
    city: "Jakarta",
    when: "1 bulan lalu",
    outcome: "CTR WA naik signifikan",
    rating: 5,
  },
  {
    quote:
      "Kita butuh website yang kelihatan profesional buat corporate client. Hasilnya clean, premium, dan copywriting-nya ngarahin orang ke inquiry. Enaknya lagi: struktur SEO-nya sudah rapi, jadi saya tinggal lanjut isi artikel.",
    name: "Nadia K.",
    niche: "Agency Kreatif",
    city: "Surabaya",
    when: "3 minggu lalu",
    outcome: "Lebih dipercaya saat pitching",
    rating: 5,
  },
  {
    quote:
      "Sebelumnya saya cuma jualan lewat IG. Sekarang punya website yang bisa jelasin paket, proses kerja, dan FAQ. Banyak yang bilang websitenya bikin yakin. Saya juga jadi lebih gampang follow up karena leads masuknya rapih.",
    name: "Ari P.",
    niche: "UMKM Kuliner",
    city: "Yogyakarta",
    when: "5 hari lalu",
    outcome: "Leads lebih terstruktur",
    rating: 5,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={[
            "inline-block h-3 w-3 rounded-sm",
            i < n ? "bg-emerald-300/90" : "bg-white/10",
          ].join(" ")}
          aria-hidden
        />
      ))}
      <span className="ml-2 text-[11px] text-white/55">{n}.0</span>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = React.useMemo(() => {
    const parts = name.replace(".", "").split(" ");
    return parts.map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  }, [name]);

  return (
    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/6 ring-1 ring-white/10">
      <span className="text-sm font-bold text-white">{initials}</span>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <SectionShell
      id="testimonials"
      eyebrow="TESTIMONI"
      title="Testimoni yang terasa nyata (bukan sekadar ‘bagus’) 😄"
      subtitle="Ini contoh feedback yang biasanya muncul setelah website dibuat lebih rapi, CTA jelas, dan struktur konten lebih meyakinkan."
    >
      <MotionIn>
        <Card className="p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-white/85">Cuplikan paling sering:</div>
              <p className="mt-2 text-balance text-lg leading-relaxed text-white/90 sm:text-xl">
                “Website-nya bikin calon klien lebih yakin, dan chat WhatsApp jadi lebih serius.”
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge className="bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/20">
                  + CTA WhatsApp jelas
                </Badge>
                <Badge className="bg-white/6 text-white/80 ring-1 ring-white/12">Struktur rapi</Badge>
                <Badge className="bg-white/6 text-white/80 ring-1 ring-white/12">Mobile nyaman</Badge>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-[11px] font-semibold text-white/70">Rata-rata rating</div>
              <div className="mt-2">
                <Stars n={5} />
              </div>
              <div className="mt-2 text-[11px] text-white/55">Berdasarkan feedback klien</div>
            </div>
          </div>
        </Card>
      </MotionIn>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {testimonials.map((t) => (
          <MotionIn key={t.name} delay={0.04}>
            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar name={t.name} />
                  <div className="leading-tight">
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-[12px] text-white/60">
                      {t.niche} • {t.city}
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-white/50">{t.when}</div>
              </div>

              <div className="mt-3">
                <Stars n={t.rating} />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-white/78">“{t.quote}”</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge className="bg-emerald-500/12 text-emerald-100 ring-1 ring-emerald-400/18">
                  Hasil: {t.outcome}
                </Badge>
                <Badge className="bg-white/6 text-white/75 ring-1 ring-white/12">Verified client</Badge>
              </div>
            </Card>
          </MotionIn>
        ))}
      </div>
    </SectionShell>
  );
}
