import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { SearchProvider } from "@/components/shell/search-provider";
import { ThemeScript } from "@/components/shell/theme-script";
import { site } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.docsName} — documentation for Kuro Browser`,
    template: `%s · ${site.docsName}`,
  },
  description: site.description,
  applicationName: site.docsName,
  openGraph: {
    type: "website",
    siteName: site.docsName,
    title: site.docsName,
    description: site.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f3" },
    { media: "(prefers-color-scheme: dark)", color: "#161615" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
        >
          Skip to content
        </a>
        <SearchProvider>{children}</SearchProvider>
      </body>
    </html>
  );
}
