# 🌩️ CLOUDFLARE PAGES DEPLOYMENT CHECKLIST

## ✅ PRE-DEPLOYMENT (Ya completado)
- [x] Code pushed to GitHub (Hash: e627a49)
- [x] Proxy path /api prefix fixed
- [x] Edge runtime enabled
- [x] Build script configured

---

## 🚀 DASHBOARD SETUP (Haz esto AHORA)

### PASO 1: Conectar Repositorio
Dashboard → Pages → Create application
├─ Connect to Git
├─ Autoriza GitHub (si es primera vez)
└─ Selecciona: pic.christmas / main

### PASO 2: Build Configuration
Framework Preset: Next.js
Build Command: npx @cloudflare/next-on-pages@1
Output Directory: .vercel/output/static
Root Directory: / (vacío o /)

### PASO 3: Environment Variables (CRÍTICO)
✏️ Nombre               │ Valor
───────────────────────┼────────────────────────────────────
BACKEND_URL            │ https://pic-christmas-backend.onrender.com
NODE_VERSION           │ 20
NEXT_PUBLIC_BACKEND_URL│ https://pic-christmas-backend.onrender.com

**Asegúrate que las 3 variables aparezcan listadas antes de Deploy.**

### PASO 4: Deploy
Click: Save and Deploy
Espera: ~5-10 minutos
Status: Deployment successful ✅

---

## 🧪 VERIFICATION (Post-Deploy)

### URL Viva
https://pic-christmas.pages.dev

### Test de API (Console F12)
fetch('/api/prompts')
  .then(r => r.json())
  .then(console.log)

// Esperado: { prompts: [...], ...} ✅

### Logs de Cloudflare
Dashboard → Pages → pic-christmas → Deployments
├─ Status: Active
├─ Last deployed: just now
└─ View build logs (si hay errores)

---

## 🆘 TROUBLESHOOTING

### Error: "Failed to connect to backend"
Causa: BACKEND_URL variable no configurada
Solución: Verifica las 3 variables en Environment

### Error: "404 not found"
Causa: Ruta /api no llega al backend
Solución: Confirma que route.ts tiene: /api${backendPath}

### Build falla: "Build command not found"
Causa: npx no disponible
Solución: Usa: npx @cloudflare/next-on-pages@1 (exactamente así)

### Deployment lento (>15 min)
Normal si:
- Primera vez installando dependencias
- Node modules pesadas
Espera a que termine. Próximos deploys serán más rápidos.

---

## 📊 DESPUÉS DEL ÉXITO

### Monitoreo
Dashboard → Pages → pic-christmas → Analytics
├─ Requests/día
├─ Error rate
├─ Performance (latency)
└─ Bandwidth

### Auto-Deploy
Cada push a main triggeará un nuevo deployment.
Ver: Deployments tab → historial completo

### Custom Domain (Opcional)
Si quieres usar pic.christmas (tu dominio actual):
Pages → Settings → Custom domains → Agregar pic.christmas
(Requiere que pic.christmas esté en Cloudflare)

---

## ✨ SUCCESS INDICATORS
- [x] Deployment successful
- [x] pic-christmas.pages.dev responde
- [x] API calls funcionan (fetch test)
- [x] No errors en logs
- [x] Latency < 100ms (Edge ⚡)

---

## 🎯 FINAL CHECKLIST
- [ ] Abriste Cloudflare Dashboard
- [ ] Conectaste GitHub repo (pic.christmas)
- [ ] Configuraste Build settings (4 campos)
- [ ] Agregaste 3 Environment variables
- [ ] Hiciste click "Save and Deploy"
- [ ] Esperaste a "Deployment successful"
- [ ] Abriste https://pic-christmas.pages.dev
- [ ] Corriste el fetch test en Console
- [ ] Viste respuesta JSON exitosa
- [ ] Status dice "Active" en Dashboard

---

## 📞 SI ALGO FALLA
Avísame:
1. Paso exacto donde estás
2. Error que ves (copia/pega)
3. Captura de pantalla si es posible

**Estoy aquí. Vamos a dejarlo en vivo.** 🚀