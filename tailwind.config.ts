import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#050B14", // Deep dark navy from screenshot
                foreground: "#ededed",
                christmas: {
                    red: "#C41E3A",
                    gold: "#D4AF37", // Metallic gold
                    goldLight: "#FSD34D",
                    green: "#165B33",
                    dark: "#0a0f1c",
                    card: "#111827",
                },
            },
            fontFamily: {
                serif: ["var(--font-playfair)", "serif"],
                sans: ["var(--font-inter)", "sans-serif"],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gold-gradient': 'linear-gradient(to right, #D4AF37, #FCD34D, #D4AF37)',
            }
        },
    },
    plugins: [],
};
export default config;
