import { NextResponse, NextRequest } from "next/server";
import { makeSessionToken, setAdminCookie } from "@/lib/adminAuth";

export const runtime = "nodejs";

function normalizePhone(p: string) {
  return p.replace(/\D/g, "");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const phone = normalizePhone(String(body.phone || ""));
  const pin = String(body.pin || "");

  const allowPhone = normalizePhone(process.env.ADMIN_PHONE || "085643232300");
  const allowPin = String(process.env.ADMIN_PIN || "");

  if (!allowPin) {
    return NextResponse.json(
      { ok: false, message: "ADMIN_PIN belum diset di environment." },
      { status: 500 }
    );
  }

  if (phone !== allowPhone || pin !== allowPin) {
    return NextResponse.json({ ok: false, message: "Nomor/PIN salah." }, { status: 401 });
  }

  const token = await makeSessionToken(phone);
  const res = NextResponse.json({ ok: true });
  setAdminCookie(res, token);
  return res;
}
