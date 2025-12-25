"use server";

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export async function getAffiliateStats(email: string) {
    // Quantum Simulation for Dev
    return {
        code: email.split("@")[0].toUpperCase() + "24",
        clicks: Math.floor(Math.random() * 500),
        orders: Math.floor(Math.random() * 50),
        earnings: Math.floor(Math.random() * 1000)
    };
}
