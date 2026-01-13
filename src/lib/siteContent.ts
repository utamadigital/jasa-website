import fs from "node:fs";
import path from "node:path";

export type SiteContent = any;

const CONTENT_PATH = path.join(process.cwd(), "src", "content", "site.json");

export function readSiteContent(): SiteContent {
  try {
    const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function writeSiteContent(next: SiteContent) {
  fs.mkdirSync(path.dirname(CONTENT_PATH), { recursive: true });
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(next, null, 2), "utf-8");
}
