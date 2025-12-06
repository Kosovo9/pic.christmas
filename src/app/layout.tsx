import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexora Christmas Studio | Professional AI Photos",
  description: "Transform your photos into hyper-realistic Christmas portraits in minutes. The #1 AI Christmas Photo Generator.",
  openGraph: {
    title: "Nexora Christmas Studio 🎄",
    description: "Create magical Christmas photos with AI. Try it now!",
    url: "https://pic.christmas",
    siteName: "Nexora Christmas",
    images: [
      {
        url: "https://pic.christmas/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nexora Christmas AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora Christmas Studio 🎄",
    description: "Create magical Christmas photos with AI.",
    images: ["https://pic.christmas/og-image.jpg"],
  },
};

import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from "@/context/ToastContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-950 text-white overflow-x-hidden`}
        >
          <ToastProvider>
            {children}
          </ToastProvider>

          {/* Anti-copy / anti-right-click basic protection */}
          <Script id="anti-scraping" strategy="afterInteractive">
            {`
              document.addEventListener('contextmenu', function (e) {
                e.preventDefault();
              });
              ['copy', 'cut', 'selectstart'].forEach(function (ev) {
                document.addEventListener(ev, function (e) {
                  e.preventDefault();
                });
              });
            `}
          </Script>
        </body>
      </html>
    </ClerkProvider>
  );
}
