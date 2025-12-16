import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string) {
    return new Intl.NumberFormat(currency === "mxn" ? "es-MX" : "en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
    }).format(amount / 100);
}
