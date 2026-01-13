INSTRUKSI CEPAT
1) Pastikan framer-motion terpasang:
   npm i framer-motion
2) Replace folder src/ project kamu dengan isi zip ini (atau merge).
3) Jalankan dev:
   npm run dev

PENTING:
- Tombol "Konsultasi Gratis Sekarang" di FinalCtaSection masih pakai alert().
  Ganti dengan link WA / form milikmu.


CMS BACKEND (JSON) ADDED:
- Admin: /admin/login (phone + PIN)
- Editor: /admin/editor
- API: /api/admin/content (GET/PUT), /api/admin/upload (POST)
- Public content: /api/content
ENV: ADMIN_PHONE, ADMIN_PIN, ADMIN_SESSION_SECRET
