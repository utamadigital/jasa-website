import { NextResponse, NextRequest } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const s = await getAdminSessionFromRequest(req);
  return NextResponse.json({ ok: !!s, session: s });
}
