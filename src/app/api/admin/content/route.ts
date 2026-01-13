import { NextResponse, NextRequest } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";
import { readSiteContent, writeSiteContent } from "@/lib/siteContent";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const s = await getAdminSessionFromRequest(req);
  if (!s) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, content: readSiteContent() });
}

export async function PUT(req: NextRequest) {
  const s = await getAdminSessionFromRequest(req);
  if (!s) return NextResponse.json({ ok: false }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, message: "Payload invalid." }, { status: 400 });
  }
  writeSiteContent(body);
  return NextResponse.json({ ok: true });
}
