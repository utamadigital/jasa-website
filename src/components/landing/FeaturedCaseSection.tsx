"use client";

import { MotionIn, Card, PrimaryButton, Badge } from "./ui";

export default function FeaturedCaseSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <MotionIn>
          <div className="flex items-center gap-2">
            <Badge>Studi Kasus Singkat</Badge>
          </div>

          <h2 className="mt-3 text-2xl font-semibold text-white">
            Contoh Hasil Website yang Siap Closing
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Bukan sekadar tampilan — dirancang untuk meningkatkan kepercayaan dan mempercepat chat masuk.
          </p>

          <Card className="mt-6 p-6">
            <div className="grid gap-3 text-sm text-white/80">
              <div className="flex items-start gap-2">
                <span className="mt-0.5">❌</span>
                <span>
                  <b>Sebelum:</b> brand terlihat kurang meyakinkan, info tercecer.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5">✅</span>
                <span>
                  <b>Solusi:</b> struktur halaman rapi + CTA WhatsApp jelas.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5">🚀</span>
                <span>
                  <b>Hasil:</b> lebih dipercaya dan lebih mudah closing via chat.
                </span>
              </div>
            </div>

            <div className="mt-5">
              <PrimaryButton href="https://wa.me/6289654543003?text=Halo%2C%20saya%20mau%20konsultasi%20gratis%20pembuatan%20website.%20Bisa%20bantu%20jelaskan%20paket%20dan%20estimasinya%3F">
                Konsultasi Gratis (Respon WA Cepat)
              </PrimaryButton>
            </div>
          </Card>
        </MotionIn>
      </div>
    </section>
  );
}
