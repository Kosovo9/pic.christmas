import type { Config } from "tailwindcss";

export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                'paw-orange': {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    400: '#fb923c', // Primary
                    500: '#f97316',
                    600: '#ea580c',
                },
                'paw-teal': {
                    50: '#f0fdfa',
                    400: '#2dd4bf', // Secondary
                    500: '#14b8a6',
                    600: '#0d9488',
                }
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'wiggle': 'wiggle 1s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                }
            }
        },
    },
    plugins: [],
} satisfies Config;
