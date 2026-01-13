import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/adminAuth";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

function safeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
}

export async function POST(req: NextRequest) {
  const s = await getAdminSessionFromRequest(req);
  if (!s) return NextResponse.json({ ok: false }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ ok: false, message: "file is required" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(uploadsDir, { recursive: true });

  const filename = `${Date.now()}-${safeName(file.name || "image")}`;
  fs.writeFileSync(path.join(uploadsDir, filename), bytes);

  return NextResponse.json({ ok: true, url: `/uploads/${filename}` });
}
