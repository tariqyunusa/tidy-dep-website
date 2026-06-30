import type { Metadata } from "next";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/800.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "tidy-deps — find and remove unused npm dependencies",
  description:
    "A zero-config CLI that detects unused dependencies, audits package health, and keeps node_modules clean. Works with npm, yarn, pnpm, and bun.",
  metadataBase: new URL("https://tidy-deps.dev"),
  openGraph: {
    title: "tidy-deps — find and remove unused npm dependencies",
    description:
      "A zero-config CLI that detects unused dependencies, audits package health, and keeps node_modules clean.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
