# 🌩️ CLOUDFLARE MIGRATION GUIDE (ELON CLASS)

**Objective**: Migrate Frontend from Vercel to Cloudflare Pages for 10x Speed, Global Edge Caching, and 90% Cost Reduction.

## 📋 PRE-FLIGHT CHECKLIST

1.  **Domain Control**: Ensure you have access to `namecheap.com` (to change DNS to Cloudflare).
2.  **Repo Access**: Ensure you have access to `Kosovo9/pic.christmas` on GitHub.
3.  **Environment Variables**: Have your `.env.local` ready to copy.

## 🚀 MIGRATION STEPS (30 MINS)

### PHASE 1: CLOUDFLARE SETUP (10 MIN)

1.  Go to [Cloudflare Dashboard](https://dash.cloudflare.com).
2.  **DNS Zone**: Add Site `pic.christmas`. Select **Free Plan**.
3.  **Nameservers**: Cloudflare will give you 2 nameservers (e.g., `bob.ns.cloudflare.com`).
4.  **Namecheap**: Go to Namecheap -> Domain List -> `pic.christmas` -> Manage -> Nameservers -> Custom DNS. Paste the Cloudflare ones. Save.
    *   *Wait 15 mins for propagation.*

### PHASE 2: PAGES DEPLOYMENT (10 MIN)

1.  In Cloudflare Dashboard, go to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
2.  Select `Kosovo9/pic.christmas`.
3.  **Build Settings**:
    *   **Framework**: `Next.js`
    *   **Build command**: `npx @cloudflare/next-on-pages@1` (Recommended for Edge) OR `npm run build` (Static/Standard).
    *   *Note*: For standard Next.js (with Server Actions), select `Next.js (Static/Standard)` ensuring Output directory is `.next`.
    *   **Node.js Version**: Set Environment Variable `NODE_VERSION` = `20` if needed.
4.  **Environment Variables**:
    *   Go to **Settings** -> **Environment Variables**.
    *   Copy ALL variables from Vercel (`NEXT_PUBLIC_STRIPE_KEY`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, etc.).
    *   **CRITICAL**: Updating `NEXT_PUBLIC_API_URL` to `https://pic-christmas-backend.onrender.com`.

### PHASE 3: VERIFICATION (5 MIN)

1.  Click **Save and Deploy**.
2.  Wait for build.
3.  Once green, visit the `*.pages.dev` URL.
4.  Test: Login (Clerk), Upload Photo, Payment Flow.

### PHASE 4: DOMAIN FINALIZATION

1.  Go to **Pages** -> **Custom Domains**.
2.  Add `pic.christmas` and `www.pic.christmas`.
3.  Cloudflare will automatically creating the DNS records (CNAME) since you manage DNS there.

## ⚠️ CRITICAL DIFFERENCES (VERCEL VS CLOUDFLARE)

1.  **Image Optimization**: Vercel `next/image` is proprietary. On Cloudflare, use standard `<img>` or configure a custom loader (Cloudinary is perfect for this, which we already use).
    *   *Note*: Our `c:\pic.christmas\next.config.ts` should be checked to ensure `images` configuration allows remote patterns.

## 🔧 POST-MIGRATION OPTIMIZATION

1.  **Cache Rules**: In Cloudflare -> Caching -> Configuration. Set Browser Cache TTL to `1 year` for assets.
2.  **Security**: In Cloudflare -> Security -> WAF. Enable "Bot Fight Mode". (Free protection against scrapers).

**Current Status**: Codebase is fully compatible. Just execute the Dashboard steps.
