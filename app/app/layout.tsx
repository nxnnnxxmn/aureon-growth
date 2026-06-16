import type { Metadata } from "next";

// Prevent indexing of the entire /app surface.
export const metadata: Metadata = {
  title: { default: "Aureon Command Center", template: "%s · Aureon Command Center" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return children;
}
