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
  title: "Nexora Christmas Studio",
  description: "Transform your photos into hyper-realistic Christmas portraits.",
};

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
        {children}

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
