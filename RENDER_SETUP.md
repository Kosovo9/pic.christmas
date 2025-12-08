# 🚀 GUÍA PASO A PASO PARA RENDER

## ✅ LO QUE YA ESTÁ LISTO

- ✅ Scripts de build y start corregidos
- ✅ Archivo `render.yaml` creado (opcional, pero útil)
- ✅ Configuración de TypeScript lista

---

## 📋 PASOS EXACTOS PARA DEPLOY EN RENDER

### Paso 1: Crear el Servicio

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click en **"New +"** (arriba a la derecha)
3. Selecciona **"Web Service"**
4. Conecta tu repositorio de GitHub:
   - Si no está conectado, click en **"Connect GitHub"**
   - Busca y selecciona: `Kosovo9/pic.christmas`
   - Click en **"Connect"**

### Paso 2: Configurar el Servicio

**IMPORTANTE:** Configura exactamente así:

- **Name:** `pic-christmas-backend` (o el nombre que prefieras)
- **Environment:** `Node`
- **Region:** Elige el más cercano a tus usuarios (ej: `Oregon (US West)`)
- **Branch:** `main` (o `master` si usas master)
- **Root Directory:** `backend` ⚠️ **ESTO ES CRÍTICO**
- **Runtime:** `Node` (debería detectarse automáticamente)
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Instance Type:** `Free` (para empezar, luego puedes cambiar a `Starter` si necesitas más recursos)

### Paso 3: Variables de Entorno

1. En la sección **"Environment Variables"**, click en **"Add Environment Variable"**
2. Agrega **UNA POR UNA** las siguientes variables (copia y pega desde `deploy-final.md`):

```
MONGO_URI=mongodb+srv://username:password@cluster0.baflqoq.mongodb.net/pic-christmas?retryWrites=true&w=majority&appName=Cluster0
```

```
REDIS_URL=rediss://default:password@square-mite-39786.upstash.io:6379
```

```
REPLICATE_API_TOKEN=r8_A5h...
```

```
CLOUDINARY_CLOUD_NAME=tu_cloud_name
```

```
CLOUDINARY_API_KEY=tu_api_key
```

```
CLOUDINARY_API_SECRET=tu_api_secret
```

```
STRIPE_SECRET_KEY=sk_test_...
```

```
STRIPE_WEBHOOK_SECRET=whsec_...
```

```
MERCADO_PAGO_ACCESS_TOKEN=TEST-...
```

```
GOOGLE_AI_API_KEY=tu_google_ai_key
```

```
FRONTEND_URL=https://pic-christmas.vercel.app
```

```
PORT=3001
```

**⚠️ IMPORTANTE:**
- NO pongas comillas alrededor de los valores
- NO dejes espacios antes o después del `=`
- Reemplaza los valores de ejemplo con tus valores reales

### Paso 4: Crear el Servicio

1. Click en **"Create Web Service"**
2. Render empezará a:
   - Clonar tu repositorio
   - Instalar dependencias (`npm install`)
   - Compilar TypeScript (`npm run build`)
   - Iniciar el servidor (`npm start`)

### Paso 5: Esperar el Deploy

- Verás los logs en tiempo real
- El proceso toma 3-5 minutos
- Cuando veas **"Live"** en verde, ¡está listo! 🎉

---

## 🔍 VERIFICAR QUE FUNCIONA

Una vez que esté "Live":

1. Click en la URL que Render te da (ej: `https://pic-christmas-backend.onrender.com`)
2. Deberías ver: `Pic.Christmas API is running 🎄 (All Features Active)`
3. Si ves ese mensaje, ¡TODO ESTÁ BIEN! ✅

---

## 🚨 SI HAY ERRORES

### Error: "Cannot find module 'dist/server.js'"

**Solución:** El build no se ejecutó correctamente. Verifica:
- Que el **Root Directory** sea `backend`
- Que el **Build Command** sea `npm install && npm run build`
- Revisa los logs para ver qué falló en el build

### Error: "MongoDB connection failed"

**Solución:**
- Verifica que `MONGO_URI` tenga el formato correcto
- Asegúrate de que tu IP esté permitida en MongoDB Atlas (o usa `0.0.0.0/0`)
- Verifica que el username y password sean correctos

### Error: "Redis connection failed"

**Solución:**
- Verifica que `REDIS_URL` sea la URL completa de Upstash
- Debe empezar con `rediss://` (con dos 's')
- No debe tener espacios

### Error: "Port already in use"

**Solución:** Render asigna el puerto automáticamente. Puedes:
- Eliminar la variable `PORT` de las variables de entorno, O
- Dejar `PORT=3001` (Render lo respetará si está disponible)

---

## 📝 CHECKLIST FINAL

Antes de hacer deploy, asegúrate de tener:

- [ ] ✅ Username y password de MongoDB Atlas
- [ ] ✅ URL completa de Redis (Upstash)
- [ ] ✅ Token completo de Replicate (r8_A5h...)
- [ ] ✅ Las 3 credenciales de Cloudinary
- [ ] ✅ Secret Key de Stripe
- [ ] ✅ Webhook Secret de Stripe
- [ ] ✅ Access Token de Mercado Pago
- [ ] ✅ API Key de Google AI
- [ ] ✅ URL de tu frontend en Vercel

---

## 🎯 DESPUÉS DEL DEPLOY

Una vez que Render esté "Live":

1. **Copia la URL** de Render (ej: `https://pic-christmas-backend.onrender.com`)

2. **Ve a Vercel** y actualiza la variable de entorno:
   - `NEXT_PUBLIC_API_URL=https://pic-christmas-backend.onrender.com/api`

3. **¡Listo!** Tu app debería estar funcionando completamente 🚀

---

## 💡 TIPS

- **Auto-Deploy:** Render se actualiza automáticamente cuando haces push a `main`
- **Logs:** Siempre revisa los logs si algo falla (pestaña "Logs" en Render)
- **Free Tier:** El plan gratuito se "duerme" después de 15 min de inactividad. La primera petición puede tardar ~30 segundos en "despertar"
- **Upgrade:** Si necesitas que no se duerma, cambia a plan "Starter" ($7/mes)

---

**¡Éxito socio! 🎄💰**






