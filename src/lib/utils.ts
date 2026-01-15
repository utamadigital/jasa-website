export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function scrollToId(id: string) {
  const safeId = (id || "").replace(/^#/, "");
  const el = document.getElementById(safeId);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
