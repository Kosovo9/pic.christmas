# 🔑 GUÍA RÁPIDA: Obtener API Keys (5 minutos)

## ⚡ PASO 1: Replicate (RECOMENDADO - Mejor calidad)

### 📋 Instrucciones:

1. **Abre tu navegador** y ve a:
   ```
   https://replicate.com/
   ```

2. **Crea cuenta GRATIS:**
   - Click en "Sign Up"
   - Usa tu email o GitHub
   - Confirma email

3. **Obtén tu token:**
   - Ve a: https://replicate.com/account/api-tokens
   - Click en "Create token"
   - Copia el token (empieza con `r8_...`)

4. **Pega aquí tu token:**
   ```
   r8_________________________________
   ```

---

## 🔧 PASO 2: Agregar al Proyecto

### Opción A: Crear archivo .env.local

1. Abre tu proyecto en VS Code
2. Crea archivo `.env.local` en la raíz (si no existe)
3. Pega esto:

```bash
# ========================================
# 🎨 AI PROVIDERS - STABLE DIFFUSION
# ========================================

# Replicate (50 generaciones gratis/mes)
REPLICATE_API_TOKEN=r8_TU_TOKEN_AQUI

# Stability AI (Opcional - 25 créditos gratis/mes)
# STABILITY_API_KEY=sk-TU_KEY_AQUI

# ========================================
# 🎄 OTRAS APIs (Ya configuradas)
# ========================================

# HuggingFace (100 gratis/día)
# HUGGING_FACE_API_KEY=hf_TU_KEY_AQUI

# Google AI Studio (60/min gratis)
# GOOGLE_AI_STUDIO_API_KEY=AIzaSy_TU_KEY_AQUI

# Segmind (100 créditos/mes gratis)
# SEGMIND_API_KEY=SG_TU_KEY_AQUI

# ========================================
# 💾 STORAGE (Supabase)
# ========================================

NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# ========================================
# 💳 PAYMENTS (Stripe)
# ========================================

STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# ========================================
# 🚦 RATE LIMITING (Upstash Redis)
# ========================================

UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxxx...
```

---

## ✅ PASO 3: Reiniciar Servidor

1. En la terminal donde corre `npm run dev`:
   - Presiona `Ctrl + C` (detener)
   - Espera 2 segundos
   - Ejecuta: `npm run dev`

2. Verás en consola:
   ```
   ✓ Ready in 2s
   - Local: http://localhost:3000
   ```

---

## 🧪 PASO 4: Probar Generación

### Método 1: Desde el navegador

1. Abre: http://localhost:3000
2. Click en "Create Your Holiday Photo"
3. Sube una foto
4. Click en "Generate"
5. Espera 10-15 segundos
6. ¡Verás tu imagen generada!

### Método 2: Desde API directa

```bash
# Test rápido con curl
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "refPhotos": ["data:image/jpeg;base64,..."],
    "presetId": "christmas-classic",
    "language": "es"
  }'
```

---

## 📊 VERIFICAR QUE FUNCIONA

### En la consola del navegador verás:

```
🚀 TURBO: Using stable-diffusion-cloud (avg: 12s)
Generating with Replicate (FREE)...
✅ TURBO SUCCESS: stable-diffusion-cloud in 11.2s
```

### Si ves esto = ¡FUNCIONA! ✅

---

## ⚠️ TROUBLESHOOTING

### Problema 1: "Token inválido"
**Solución:**
- Verifica que copiaste el token completo
- Debe empezar con `r8_`
- No debe tener espacios

### Problema 2: "No se genera imagen"
**Solución:**
- Reinicia el servidor (`Ctrl+C` → `npm run dev`)
- Verifica que `.env.local` esté en la raíz del proyecto
- Revisa consola del navegador (F12)

### Problema 3: "Muy lento"
**Solución:**
- Es normal: 10-15 segundos
- Replicate usa GPUs en la nube
- Primera generación puede tardar más

---

## 🎯 SIGUIENTE PASO

Una vez que funcione:

✅ **OPCIÓN A COMPLETA**

Ahora vamos a:
**OPCIÓN B: Revisar UI** 🎨

---

## 💡 TIPS PRO

### Para mejor calidad:
1. Usa fotos claras (buena iluminación)
2. Rostro visible de frente
3. Alta resolución (mínimo 512x512)

### Para más velocidad:
1. Si Replicate está lento, el sistema usa Pollinations automáticamente
2. Pollinations = 2-4 segundos (más rápido)
3. Replicate = 10-15 segundos (mejor calidad)

---

## 📋 CHECKLIST

- [ ] Crear cuenta en Replicate
- [ ] Copiar token
- [ ] Agregar a `.env.local`
- [ ] Reiniciar servidor
- [ ] Probar generación
- [ ] Verificar que funciona
- [ ] ✅ LISTO PARA OPCIÓN B

---

**¿Listo para obtener tu token socio?** 🚀

Te espero con el token para continuar con OPCIÓN B.
