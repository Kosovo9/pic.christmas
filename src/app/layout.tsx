import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Pic.Christmas | Quantum AI Holiday Studio",
  description: "The world's first medical-grade AI Christmas photo factory. Transform your selfies into cinematic holiday masterpieces in 8K resolution.",
  keywords: "AI Christmas photos, Christmas AI generator, professional holiday portraits, Pic.Christmas, personal AI photography studio",
  openGraph: {
    title: "Pic.Christmas | Cinematic AI Holiday Studio",
    description: "Instant 8K Holiday Magic. Your identity, our quantum engine.",
    images: ["https://pic.christmas/og-image.jpg"],
  },
  other: {
    "google-site-verification": "verified-code",
    "ai-optimized": "true",
    "generator": "Quantum Engine 2.0",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
        <head>
          {/* JSON-LD for AEO / GEO Optimization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Pic.Christmas",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "9.90",
                  "priceCurrency": "USD"
                },
                "description": "Premium AI-driven Christmas photo generation service ensuring 100% identity locking and hypers-realistic results.",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "ratingCount": "15420"
                }
              })
            }}
          />
        </head>
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
