import type { Metadata } from "next";

import { SiteShell } from "@/src/components/layout/site-shell";

import "./globals.css";

export const metadata: Metadata = {
  title: "Messy Hub",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
