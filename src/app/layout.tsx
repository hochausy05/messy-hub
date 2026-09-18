import type { Metadata } from "next";

import { SiteShell } from "@/src/components/layout/site-shell";
import { PrimaryNavigation } from "@/src/components/navigation/primary-navigation";

import "./globals.css";

export const metadata: Metadata = {
  title: "Messy Hub",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <SiteShell header={<PrimaryNavigation />}>{children}</SiteShell>
      </body>
    </html>
  );
}
