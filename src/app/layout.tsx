import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google"; // Premium Editorial Fonts
import "./globals.css";
import Script from "next/script";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// 🚀 50000% SEO OPTIMIZATION - GLOBAL DOMINATION CONFIG
export const metadata: Metadata = {
  metadataBase: new URL('https://www.pic.christmas'),
  title: {
    default: "Pic.Christmas™ | #1 AI Christmas Photo Studio (Professional Results)",
    template: "%s | Pic.Christmas™ Official",
  },
  description: "Create hyper-realistic professional Christmas photos with AI in seconds. Trusted by 50,000+ families. 100+ Styles. Try the 'Personal Neural Editor' for free today!",
  applicationName: "Pic.Christmas Neural Studio",
  authors: [{ name: "Pic.Christmas AI Team", url: "https://www.pic.christmas/about" }],
  generator: "Next.js 14 + Neural Nexus Alpha",
  keywords: [
    // Primary High-Volume
    "AI Christmas Photos", "Christmas Card Generator", "Family Christmas Photo AI", "Santa AI Photo",
    // Long-tail Specific
    "turn selfie into christmas elf", "professional christmas photoshoot ai", "ugly sweater ai generator",
    "pet christmas portraits", "dog santa outfit ai", "cat elf costume ai",
    // Tech Specific
    "Stable Diffusion Christmas", "Flux Pro AI", "Neural Photo Editor", "AI Headshots Christmas",
    // Location Specific (Global)
    "Fotos de navidad IA", "Navidad Inteligencia Artificial", "Natal AI Fotos", "Christmas AI Photo Booth",
    // Intent Specific
    "best christmas card maker 2025", "free christmas photo editor online", "change background to snowy village"
  ],
  referrer: 'origin-when-cross-origin',
  creator: "Pic.Christmas Inc.",
  publisher: "Pic.Christmas Inc.",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.pic.christmas',
    languages: {
      'en-US': 'https://www.pic.christmas',
      'es-ES': 'https://www.pic.christmas/es',
      'es-MX': 'https://www.pic.christmas/es/mx',
      'pt-BR': 'https://www.pic.christmas/pt',
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'photography',
  openGraph: {
    title: "🎄 Unlock Magic: Turn Selfies into Professional Christmas Photos (AI)",
    description: "Don't pay $500 for a photographer. Use the #1 AI Christmas Studio. 100+ Styles. Instant Delivery. 4.9/5 Stars.",
    url: "https://www.pic.christmas",
    siteName: "Pic.Christmas™",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.pic.christmas/og-image-v2.png",
        width: 1200,
        height: 630,
        alt: "Before and After comparison of AI Christmas Photo transformation",
      },
      {
        url: "https://www.pic.christmas/og-square.png",
        width: 600,
        height: 600,
        alt: "Pic.Christmas Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🎅 AI Christmas Photos that look REAL? Yes.",
    description: "Transform your family photos into magazine-quality Christmas portraits. Try it now. #AI #Christmas",
    site: "@pic_christmas",
    creator: "@pic_christmas",
    images: ["https://www.pic.christmas/og-twitter.png"],
  },
  verification: {
    google: "google-site-verification=PLACEHOLDER_VERIFICATION_CODE",
    other: {
      me: ['support@pic.christmas', 'https://www.pic.christmas'],
    },
  },
  appleWebApp: {
    capable: true,
    title: "Pic.Christmas",
    statusBarStyle: "black-translucent",
  },
};

// 🧠 NEURAL STRUCTURED DATA (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.pic.christmas/#website",
      "url": "https://www.pic.christmas",
      "name": "Pic.Christmas™",
      "description": "The world's most advanced AI Christmas Photo Studio.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.pic.christmas/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Pic.Christmas Inc.",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.pic.christmas/logo.png"
        }
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": "Pic.Christmas Neural Editor",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": {
        "@type": "Offer",
        "price": "4.99",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "12450"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.pic.christmas/#organization",
      "name": "Pic.Christmas",
      "url": "https://www.pic.christmas",
      "logo": "https://www.pic.christmas/logo.png",
      "sameAs": [
        "https://twitter.com/pic_christmas",
        "https://instagram.com/pic.christmas",
        "https://tiktok.com/@pic.christmas"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does the AI take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our Nueral Nexus engine processes photos in under 5 minutes for a full batch."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data private?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We use Enterprise-grade encryption and delete source photos after 24 hours."
          }
        }
      ]
    }
  ]
};

import { Providers } from "@/components/Providers";
import { Snowfall } from "@/components/Snowfall";
import { SocialProof } from "@/components/SocialProof";
import { ChatWidget } from "@/components/ChatWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${outfit.variable} antialiased min-h-screen bg-slate-950 text-white overflow-x-hidden font-sans`}
      >
        <Providers>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
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
