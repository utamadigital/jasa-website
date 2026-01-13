import type { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "admin_session";

export type AdminSession = { phone: string; iat: number };

function secret() {
  return process.env.ADMIN_SESSION_SECRET || "dev-secret-change-me";
}

function normalizePhone(p: string) {
  return p.replace(/\D/g, "");
}

// Web Crypto HMAC (works in Edge + Node)
async function hmacHex(message: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function makeSessionToken(phone: string) {
  const s: AdminSession = { phone: normalizePhone(phone), iat: Date.now() };
  const payload = Buffer.from(JSON.stringify(s)).toString("base64url");
  const sig = await hmacHex(payload);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(token?: string | null): Promise<AdminSession | null> {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = await hmacHex(payload);
  if (expected !== sig) return null;
  try {
    const json = Buffer.from(payload, "base64url").toString("utf-8");
    const s = JSON.parse(json) as AdminSession;
    return s?.phone ? s : null;
  } catch {
    return null;
  }
}

export async function getAdminSessionFromRequest(req: NextRequest): Promise<AdminSession | null> {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export function setAdminCookie(res: NextResponse, token: string) {
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAdminCookie(res: NextResponse) {
  res.cookies.set(ADMIN_COOKIE_NAME, "", { path: "/", maxAge: 0 });
}
