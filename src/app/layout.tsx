import type { Metadata } from "next";
import { Inter, Playfair_Display, Fira_Code } from "next/font/google";
import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Snowfall } from "@/components/Snowfall";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const fira = Fira_Code({ subsets: ["latin"], variable: "--font-fira" });

export const metadata: Metadata = {
  title: "Christmas AI Studio | Transforma tus fotos con magia navideña",
  description:
    "Crea retratos navideños mágicos con IA de última generación. Calidad 8K, 60+ escenarios, resultados en 30 segundos. ¡Pruébalo gratis!",
  keywords:
    "AI navideño, fotos navideñas IA, retratos navideños, Christmas AI, generador fotos navidad, IA navidad",
  openGraph: {
    title: "Christmas AI Studio - Magia Navideña con IA",
    description:
      "Transforma tus fotos en retratos navideños mágicos usando inteligencia artificial. Calidad profesional, resultados instantáneos.",
    images: ["/og-christmas-ai.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christmas AI Studio - Magia Navideña",
    description: "Crea retratos navideños mágicos con IA. ¡Pruébalo gratis!",
    images: ["/og-christmas-ai.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1e293b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} ${fira.variable}`}
    >
      <head>
        {/* JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Christmas AI Studio",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web",
              url: "https://pic.christmas",
              offers: {
                "@type": "Offer",
                price: "9.99",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              description:
                "Plataforma de IA premium para crear retratos navideños mágicos con tecnología de última generación.",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "12847",
                bestRating: "5",
                worstRating: "1",
              },
              creator: {
                "@type": "Organization",
                name: "Christmas AI Studio",
                url: "https://pic.christmas",
              },
              featureList: [
                "Generación de imágenes con IA",
                "Calidad 8K",
                "60+ escenarios navideños",
                "Resultados en 30 segundos",
                "Interfaz premium",
              ],
            }),
          }}
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Google Analytics will be loaded via Script component below */}
      </head>
      <body className="antialiased bg-slate-900 text-white selection:bg-yellow-400/20">
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-green-900/10 pointer-events-none"></div>

        {/* Snowfall Effect */}
        <Snowfall />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="relative">{children}</main>

        {/* Footer */}
        <Footer />

        {/* Global Loading States */}
        <div id="modal-root"></div>
        <div id="toast-root"></div>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `}
        </Script>

        {/* Service Worker Registration */}
        <Script id="service-worker" strategy="afterInteractive">
          {`
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `}
        </Script>
      </body>
    </html>
    // </ClerkProvider>
  );
}
