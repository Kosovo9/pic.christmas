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
  metadataBase: new URL('https://www.pic.christmas'),
  title: {
    default: "Nexora Christmas Studio | Professional AI Photos",
    template: "%s | Nexora Christmas Studio"
  },
  description: "Transform your photos into hyper-realistic Christmas portraits in minutes. The #1 AI Christmas Photo Generator trusted by thousands.",
  keywords: ["AI Christmas Photos", "Christmas Card Generator", "Family Christmas Photo AI", "Pet Christmas Photo"],
  authors: [{ name: "Nexora Studio" }],
  creator: "Nexora Studio",
  publisher: "Nexora Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Nexora Christmas Studio 🎄",
    description: "Create magical Christmas photos with AI. Try it now!",
    url: "https://pic.christmas",
    siteName: "Nexora Christmas",
    images: [
      {
        url: "https://pic.christmas/og-image.png",
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
    images: ["https://pic.christmas/og-image.png"],
    creator: "@pic_christmas",
  },
  alternates: {
    canonical: 'https://www.pic.christmas',
    languages: {
      'en-US': 'https://www.pic.christmas',
      'es-ES': 'https://www.pic.christmas/es',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nexora Christmas Studio',
  url: 'https://www.pic.christmas',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.pic.christmas/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
}

import { Providers } from "@/components/Providers";
import { Snowfall } from "@/components/Snowfall";
import { SocialProof } from "@/components/SocialProof";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-950 text-white overflow-x-hidden`}
      >
        <Providers>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          import {ChatWidget} from "@/components/ChatWidget";

          // ... inside provider
          <Snowfall />
          <SocialProof />
          <ChatWidget />
          {children}
        </Providers>

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
  );
}
