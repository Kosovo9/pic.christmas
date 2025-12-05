# 🎄 PIC.CHRISTMAS - Deployment Guide

## 🚀 Quick Deploy (15 Minutes)

### Prerequisites
- Node.js 18+
- Git
- Accounts: Vercel, Render, Stripe, Cloudinary, Google AI Studio

---

## 📋 Step 1: Get API Keys

### 1.1 Google AI Studio (Image Generation)
1. Go to: https://aistudio.google.com/apikey
2. Click "Create API Key"
3. Copy the key → Save as `VITE_GOOGLE_AI_API_KEY`

### 1.2 Stripe (Payments)
1. Go to: https://dashboard.stripe.com/test/apikeys
2. Toggle "Test Mode" ON
3. Copy:
   - **Publishable key** (starts with `pk_test_`) → `VITE_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** (starts with `sk_test_`) → `STRIPE_SECRET_KEY`

### 1.3 Stripe Webhook Secret
1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. URL: `https://your-backend.onrender.com/webhooks/stripe` (we'll get this URL in Step 3)
4. Events: Select `checkout.session.completed`
5. Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`

### 1.4 Cloudinary (Image Storage)
1. Go to: https://console.cloudinary.com/console
2. Copy from Dashboard:
   - **Cloud Name** → `CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`

---

## 📦 Step 2: Deploy Backend (Render)

### 2.1 Create Render Account
1. Go to: https://render.com
2. Sign up with GitHub

### 2.2 Deploy Backend
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repo: `Kosovo9/pic.christmas`
3. Settings:
   - **Name:** `pic-christmas-backend`
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### 2.3 Add Environment Variables
In Render dashboard, go to "Environment" tab and add:

```bash
PORT=3001
CLIENT_URL=https://pic.christmas  # Your Vercel URL (will update later)
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_AI_API_KEY=your_google_ai_key
```

4. Click **"Create Web Service"**
5. Wait 2-3 minutes for deployment
6. Copy the URL (e.g., `https://pic-christmas-backend.onrender.com`)

---

## 🌐 Step 3: Deploy Frontend (Vercel)

### 3.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 3.2 Deploy
```bash
# In the root directory of pic.christmas
vercel --prod
```

### 3.3 Add Environment Variables in Vercel
1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add:
   - `VITE_GOOGLE_AI_API_KEY` → Your Google AI key
   - `VITE_API_URL` → Your Render backend URL
   - `VITE_STRIPE_PUBLISHABLE_KEY` → Your Stripe publishable key

3. Redeploy:
```bash
vercel --prod
```

---

## 🔧 Step 4: Final Configuration

### 4.1 Update Stripe Webhook
1. Go back to Stripe Webhooks
2. Update endpoint URL with your Render URL:
   ```
   https://your-backend.onrender.com/webhooks/stripe
   ```

### 4.2 Update Backend CLIENT_URL
1. In Render dashboard → Environment
2. Update `CLIENT_URL` to your Vercel URL:
   ```
   https://pic.christmas
   ```
3. Save and redeploy

### 4.3 Test Payment Flow
1. Go to your live site
2. Upload a photo
3. Select participants
4. Click "Checkout & Generate"
5. Use Stripe test card: `4242 4242 4242 4242`
6. Verify webhook receives payment

---

## ✅ Verification Checklist

- [ ] Backend health check: `https://your-backend.onrender.com/health`
- [ ] Frontend loads without errors
- [ ] Photo upload works
- [ ] Pricing calculation correct
- [ ] Stripe checkout opens
- [ ] Test payment succeeds
- [ ] Webhook receives event
- [ ] Image generation triggers

---

## 🎯 Production URLs

- **Frontend:** https://pic.christmas
- **Backend:** https://pic-christmas-backend.onrender.com
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Cloudinary Console:** https://console.cloudinary.com

---

## 🆘 Troubleshooting

### Backend not starting:
- Check Render logs
- Verify all environment variables are set
- Check `package.json` in `server/` folder

### Payment fails:
- Verify Stripe keys are correct
- Check webhook signature matches
- Test with Stripe CLI locally first

### Image generation fails:
- Verify Google AI API key is valid
- Check API quota/limits
- Review backend logs

---

## 📞 Support

If stuck, check:
1. Render logs: https://dashboard.render.com
2. Vercel logs: https://vercel.com/dashboard
3. Stripe events: https://dashboard.stripe.com/test/events

---

**Estimated Time:** 15-20 minutes
**Cost:** $0 (all free tiers)

¡Listo para Navidad! 🎄✨
