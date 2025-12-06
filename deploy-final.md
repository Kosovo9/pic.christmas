# 🚀 GUÍA FINAL DE DEPLOY - RENDER (BACKEND)

## ⚠️ IMPORTANTE: LEE ESTO PRIMERO

Este archivo contiene **TODAS** las variables de entorno que necesitas para que tu backend funcione en Render.

**Formato:** Cada línea es `VARIABLE=valor` (sin espacios alrededor del `=`)

---

## 📋 PASOS PARA DEPLOY EN RENDER

1. Ve a [Render.com](https://render.com)
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio: `Kosovo9/pic.christmas`
4. Configuración:
   - **Environment:** `Node`
   - **Root Directory:** `backend` (IMPORTANTE: Esto hace que Render trabaje desde la carpeta backend)
   - **Build Command:** `npm install && npm run build` (ya estamos en /backend)
   - **Start Command:** `npm start` (ya estamos en /backend)
   - **Auto-Deploy:** `Yes` (se actualiza automáticamente cuando haces push)
5. En **"Environment Variables"**, **BORRA TODO** y pega el bloque de abajo
6. Click en **"Create Web Service"**
7. Espera a que diga **"Live"** 🎉

---

## 🔑 BLOQUE DE VARIABLES DE ENTORNO (COPIA Y PEGA TODO)

**⚠️ IMPORTANTE:** Reemplaza los valores marcados con `<<<REEMPLAZA_ESTO>>>` con tus valores reales.

```env
# MongoDB Atlas
MONGO_URI=mongodb+srv://<<<TU_USERNAME>>>:<<<TU_PASSWORD>>>@cluster0.baflqoq.mongodb.net/pic-christmas?retryWrites=true&w=majority&appName=Cluster0

# Redis (Upstash o tu servicio)
REDIS_URL=rediss://default:<<<TU_REDIS_PASSWORD>>>@square-mite-39786.upstash.io:6379

# Replicate AI
REPLICATE_API_TOKEN=r8_A5h<<<COMPLETA_TU_TOKEN_AQUI>>>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<<<TU_CLOUD_NAME>>>
CLOUDINARY_API_KEY=<<<TU_API_KEY>>>
CLOUDINARY_API_SECRET=<<<TU_API_SECRET>>>

# Stripe
STRIPE_SECRET_KEY=sk_test_<<<TU_STRIPE_SECRET_KEY>>>
STRIPE_WEBHOOK_SECRET=whsec_<<<TU_WEBHOOK_SECRET>>>

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN=TEST-<<<TU_MP_TOKEN>>>

# Google AI (Gemini)
GOOGLE_AI_API_KEY=<<<TU_GOOGLE_AI_KEY>>>

# Frontend URL (URL de Vercel - reemplaza cuando tengas la URL)
FRONTEND_URL=https://pic-christmas.vercel.app

# Puerto (Render lo asigna automáticamente, pero puedes especificarlo)
PORT=3001
```

---

## ✅ CHECKLIST ANTES DE DEPLOY

- [ ] Tienes el **username y password** de MongoDB Atlas
- [ ] Tienes la **URL completa de Redis** (con password)
- [ ] Tienes el **token completo de Replicate** (r8_A5h...)
- [ ] Tienes las **3 credenciales de Cloudinary**
- [ ] Tienes las **2 llaves de Stripe** (Secret + Webhook Secret)
- [ ] Tienes el **Access Token de Mercado Pago**
- [ ] Tienes la **API Key de Google AI (Gemini)**
- [ ] Tienes la **URL de tu frontend en Vercel**

---

## 🎯 FORMATO CORRECTO DE MONGO_URI

Tu MONGO_URI debe verse así (reemplaza `username` y `password`):

```
mongodb+srv://username:password@cluster0.baflqoq.mongodb.net/pic-christmas?retryWrites=true&w=majority&appName=Cluster0
```

**Ejemplo real:**
```
mongodb+srv://admin:MiPassword123@cluster0.baflqoq.mongodb.net/pic-christmas?retryWrites=true&w=majority&appName=Cluster0
```

---

## 🔍 DÓNDE CONSEGUIR CADA VALOR

### MongoDB Atlas
1. Ve a [MongoDB Atlas](https://cloud.mongodb.com)
2. Click en **"Connect"** en tu cluster
3. Elige **"Connect your application"**
4. Copia la connection string
5. Reemplaza `<password>` con tu password real
6. Reemplaza `<dbname>` con `pic-christmas` (o el nombre que quieras)

### Redis (Upstash)
1. Ve a [Upstash Console](https://console.upstash.com)
2. Selecciona tu base de datos
3. Copia el **"REDIS_URL"** completo (incluye el password)

### Replicate
1. Ve a [Replicate Account Settings](https://replicate.com/account/api-tokens)
2. Copia tu **API Token** (empieza con `r8_`)

### Cloudinary
1. Ve a [Cloudinary Dashboard](https://console.cloudinary.com/pm/settings/getting-started)
2. Copia: Cloud Name, API Key, API Secret

### Stripe
1. Ve a [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copia: Secret key (`sk_test_...`)
3. Para Webhook Secret: [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks) → Copia el signing secret

### Mercado Pago
1. Ve a [Mercado Pago Developers](https://www.mercadopago.com.mx/developers/panel/credentials)
2. Copia el **Access Token** de prueba

### Google AI
1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crea una API Key
3. Cópiala

---

## 🚨 ERRORES COMUNES

### ❌ "MongoDB connection failed"
- Verifica que el username y password sean correctos
- Asegúrate de que tu IP esté en la whitelist de MongoDB Atlas (o usa `0.0.0.0/0` para permitir todas)

### ❌ "Redis connection failed"
- Verifica que la URL de Redis sea correcta
- Si usas Upstash, asegúrate de copiar la URL completa con `rediss://` (nota las dos 's')

### ❌ "Replicate API error"
- Verifica que el token esté completo (debe empezar con `r8_`)
- No debe tener espacios al inicio o final

### ❌ "Cloudinary upload failed"
- Verifica las 3 credenciales (Cloud Name, API Key, API Secret)
- Asegúrate de que no haya espacios extra

---

## 🎉 DESPUÉS DEL DEPLOY

Una vez que Render diga **"Live"**, copia la URL (ej: `https://pic-christmas-backend.onrender.com`)

Luego actualiza en Vercel:
- `NEXT_PUBLIC_API_URL=https://pic-christmas-backend.onrender.com/api`

¡Y listo! 🚀🍾

---

## 📞 SI ALGO FALLA

1. Revisa los logs en Render (pestaña "Logs")
2. Verifica que todas las variables estén sin espacios extra
3. Asegúrate de que los valores no tengan comillas (Render las agrega automáticamente)
4. Verifica que el formato de MONGO_URI sea correcto

---

**¡Éxito socio! 🎄💰**

