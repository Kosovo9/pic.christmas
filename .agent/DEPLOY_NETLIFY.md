# 🚀 DEPLOY NETLIFY - GUIA RAPIDA 20 MIN

## ⚡ PASO 1: PREPARAR PROYECTO (5 min)

### 1.1 Crear netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--legacy-peer-deps"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 1.2 Verificar package.json
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "dev": "next dev"
  }
}
```

### 1.3 Crear .env.production (IMPORTANTE)
```bash
# AI APIs (100% GRATIS)
HUGGING_FACE_API_KEY=hf_xxxxx
GOOGLE_AI_STUDIO_API_KEY=AIzaSyxxxxx

# Supabase (OPCIONAL en dev)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx

# Stripe (PRODUCCION)
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=https://www.pic.christmas
```

---

## ⚡ PASO 2: SUBIR A GITHUB (3 min)

### 2.1 Inicializar Git (si no existe)
```bash
git init
git add .
git commit -m "Ready for Netlify deploy"
```

### 2.2 Crear repo en GitHub
1. Ir a github.com/new
2. Nombre: `pic.christmas`
3. Crear repositorio

### 2.3 Push
```bash
git remote add origin https://github.com/TU_USUARIO/pic.christmas.git
git branch -M main
git push -u origin main
```

---

## ⚡ PASO 3: DEPLOY EN NETLIFY (7 min)

### 3.1 Login Netlify
1. Ir a https://app.netlify.com
2. Login con GitHub
3. Click "Add new site" → "Import an existing project"

### 3.2 Conectar GitHub
1. Seleccionar "GitHub"
2. Autorizar Netlify
3. Seleccionar repo `pic.christmas`

### 3.3 Configurar Build
```
Build command: npm run build
Publish directory: .next
```

### 3.4 Variables de Entorno
Click "Show advanced" → "New variable"

Agregar TODAS las variables de .env.production:
- HUGGING_FACE_API_KEY
- GOOGLE_AI_STUDIO_API_KEY
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_SITE_URL

### 3.5 Deploy
Click "Deploy site"

⏳ Esperar 3-5 minutos...

---

## ⚡ PASO 4: CONFIGURAR DOMINIO (5 min)

### 4.1 En Netlify
1. Ir a "Domain settings"
2. Click "Add custom domain"
3. Escribir: `www.pic.christmas`
4. Click "Verify"

### 4.2 Copiar DNS Records
Netlify te dara:
```
Type: CNAME
Name: www
Value: tu-sitio.netlify.app
```

### 4.3 En tu proveedor DNS (GoDaddy/Namecheap/etc)
1. Login a tu cuenta
2. Ir a DNS Management
3. Agregar CNAME record:
   - Host: `www`
   - Points to: `tu-sitio.netlify.app`
   - TTL: Automatic

4. Agregar A record para apex (opcional):
   - Host: `@`
   - Points to: `75.2.60.5` (Netlify Load Balancer)
   - TTL: Automatic

### 4.4 SSL Certificate
1. En Netlify → Domain settings
2. Click "Verify DNS configuration"
3. Click "Provision certificate"
4. ✅ HTTPS activado automaticamente

⏳ Esperar 5-10 min para propagacion DNS

---

## ✅ VERIFICACION FINAL

### Checklist:
- [ ] Build exitoso en Netlify
- [ ] Site preview funciona
- [ ] Variables de entorno configuradas
- [ ] Dominio www.pic.christmas conectado
- [ ] HTTPS activo
- [ ] NO hay logo de Vercel
- [ ] Upload funciona
- [ ] AI generation funciona
- [ ] Chat funciona
- [ ] Payments configurados

---

## 🚨 TROUBLESHOOTING

### Build falla:
```bash
# Verificar en Netlify logs
# Si falla por dependencias:
Build command: npm install --legacy-peer-deps && npm run build
```

### Dominio no conecta:
```bash
# Verificar DNS propagacion:
nslookup www.pic.christmas

# Esperar hasta 24hrs (usualmente 10-30 min)
```

### Variables de entorno no funcionan:
```bash
# Verificar que empiecen con NEXT_PUBLIC_ si son client-side
# Rebuild despues de agregar variables
```

---

## 🎯 COMANDOS RAPIDOS

### Deploy manual (si necesario):
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Ver logs:
```bash
netlify logs
```

### Rollback:
```bash
# En Netlify UI → Deploys → Click deploy anterior → "Publish deploy"
```

---

## 📊 TIMELINE ESTIMADO

- ✅ 0-5 min: Preparar proyecto
- ✅ 5-8 min: Subir a GitHub
- ✅ 8-15 min: Deploy Netlify
- ✅ 15-20 min: Configurar dominio
- ✅ 20-30 min: Verificar + DNS propagacion

**TOTAL: 20-30 MINUTOS** ⚡

---

## 🚀 RESULTADO FINAL

**URL:** https://www.pic.christmas
**SSL:** ✅ HTTPS
**Logo Vercel:** ❌ REMOVIDO
**Status:** ✅ LIVE

🎉 **LISTO PARA PRODUCCION!** 🎉
