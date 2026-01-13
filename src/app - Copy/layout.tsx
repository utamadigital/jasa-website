import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jasa Website • Febrian",
  description: "Website profesional yang membantu bisnismu tumbuh & dipercaya.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
