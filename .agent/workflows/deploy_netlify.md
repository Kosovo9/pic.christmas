---
description: Deploy pic.christmas to Netlify
---
1. Install Netlify CLI globally:
   // turbo
   npm i -g netlify-cli

2. Log in to Netlify (only needed once):
   // turbo
   netlify login

3. Deploy the project to production:
   netlify deploy --prod --dir .next

4. Verify the deployment URL returns the expected pages.

5. (Optional) Add environment variables in Netlify dashboard under Site Settings → Build & Deploy → Environment.
