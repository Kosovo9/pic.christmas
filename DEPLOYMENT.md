# 🚀 Deployment Guide - Christmas AI Studio

## Prerequisites
- GitHub account
- Netlify account (free tier works)
- API Keys ready (Gemini + Hugging Face)

## Step 1: Push to GitHub

```bash
# In your project directory
git add .
git commit -m "Initial commit - Christmas AI Studio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/christmas-ai-studio.git
git push -u origin main
```

## Step 2: Deploy to Netlify

### Via Netlify Dashboard (Easiest)
1. Go to https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your `christmas-ai-studio` repository
5. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click **"Deploy site"**

### Add Environment Variables
1. In Netlify dashboard, go to **Site settings** → **Environment variables**
2. Add the following:
   - `GEMINI_API_KEY` = your_gemini_api_key
   - `HF_API_KEY` = your_huggingface_api_key
3. Click **"Save"**
4. Go to **Deploys** → **"Trigger deploy"** → **"Deploy site"**

## Step 3: Test Your Live Site

Once deployed, Netlify will give you a URL like:
`https://your-site-name.netlify.app`

Test the flow:
1. Upload a photo
2. Choose a setting
3. Click "Generate Holiday Magic"
4. Wait for the AI to work its magic!

## Troubleshooting

### Build Fails
- Check that all environment variables are set
- Verify the build command is `npm run build`
- Check build logs in Netlify dashboard

### API Errors
- Verify API keys are correct
- Check Gemini API quota: https://aistudio.google.com/
- Check Hugging Face rate limits

### Images Not Loading
- Verify `next.config.ts` has correct image domains
- Check browser console for errors

## Custom Domain (Optional)

1. In Netlify: **Domain settings** → **Add custom domain**
2. Follow DNS configuration instructions
3. Enable HTTPS (automatic with Netlify)

---

**Estimated Deployment Time**: 5-10 minutes  
**Cost**: $0 (using free tiers)
