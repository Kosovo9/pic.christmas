/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    // Adding CSP headers to fix 'unsafe-eval' blocked error affecting Clerk and Turnstile
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        // Relaxed CSP to allow Clerk/Turnstile/Stripe to work.
                        // 'unsafe-eval' is strictly required by these SDKs.
                        value: "default-src 'self' https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https: blob:; font-src 'self' https: data:; connect-src 'self' https:; frame-src 'self' https:;",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
