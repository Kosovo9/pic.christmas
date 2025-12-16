import type { Metadata } from 'next'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import { TRPCReactProvider } from "./trpc-provider";
import './globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'pic.christmas',
    description: 'Transform your photos into Christmas magic',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang="en" className="dark">
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <TRPCReactProvider>
                        <header className="flex justify-between items-center p-4 gap-4 h-16 border-b border-border sticky top-0 z-50 bg-background/50 backdrop-blur-md">
                            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-amber-200 bg-clip-text text-transparent">
                                pic.christmas
                            </div>
                            <div className="flex items-center gap-4">
                                <SignedOut>
                                    <SignInButton />
                                    <SignUpButton>
                                        <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm px-4 py-2 hover:bg-[#5835ff] transition">
                                            Sign Up
                                        </button>
                                    </SignUpButton>
                                </SignedOut>
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                            </div>
                        </header>
                        {children}
                    </TRPCReactProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
