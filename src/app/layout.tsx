import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Import Google Fonts
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pic.christmas'),
  title: "Christmas AI Studio",
  description: "Transform your photos into magical holiday portraits.",
};

import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${playfair.variable} antialiased bg-[#050B14] text-white`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
