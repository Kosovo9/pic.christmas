# 🧪 VERIFICACIÓN COMPLETA DEL DEPLOYMENT

## ✅ PASO 1: Health Check del Backend

### Test Directo (Backend)
```bash
curl https://pic-christmas-backend.onrender.com/health
```

**Esperado:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-07T...",
  "uptime": 123.45,
  "environment": "production",
  "services": {
    "mongodb": "connected",
    "redis": "connected",
    "cloudinary": "configured",
    "stripe": "configured",
    "mercadoPago": "configured"
  }
}
```

### Test a través del Proxy (Frontend)
```bash
# Desde el navegador (F12 Console)
fetch('/api/health')
  .then(r => r.json())
  .then(console.log)
```

**Esperado:** Mismo JSON que arriba ✅

---

## ✅ PASO 2: Verificar Conexión Frontend → Backend

### 1. Abre pic.christmas (o https://pic-christmas.vercel.app)

### 2. Abre DevTools (F12) → Network Tab

### 3. Navega a cualquier página que haga llamadas al backend:
- `/` (Home - debería cargar prompts)
- Cualquier acción que use el backend

### 4. Verifica en Network Tab:
- ✅ Requests a `/api/*` devuelven 200 OK
- ✅ No hay errores CORS
- ✅ No hay timeouts (504)
- ✅ Las respuestas tienen datos válidos

### 5. Test Manual de Endpoints:

```javascript
// En la consola del navegador (F12)

// Test 1: Prompts
fetch('/api/prompts')
  .then(r => r.json())
  .then(data => console.log('✅ Prompts:', data))

// Test 2: Health
fetch('/api/health')
  .then(r => r.json())
  .then(data => console.log('✅ Health:', data))

// Test 3: Referrals (debería funcionar sin auth)
fetch('/api/referrals/validate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ code: 'TEST123' })
})
  .then(r => r.json())
  .then(data => console.log('✅ Referrals:', data))
```

---

## ✅ PASO 3: Test del Flujo Completo (Upload → Generate)

### Flujo End-to-End:

1. **Ve a pic.christmas**
2. **Click: "Create My Magic Photo" o botón principal**
3. **Step 1: Selecciona un Scene/Prompt**
   - ✅ Los prompts se cargan desde `/api/prompts`
   - ✅ Puedes seleccionar uno
4. **Step 2: Sube una foto**
   - ✅ Drag & drop funciona
   - ✅ Preview se muestra
   - ✅ Validación de calidad funciona
5. **Step 3: Configura detalles**
   - ✅ Email input funciona
   - ✅ Contadores (adults, children, pets) funcionan
6. **Click: "Generate Magic"**
   - ✅ Se crea la orden (POST `/api/orders`)
   - ✅ Se suben las fotos (POST `/api/uploads`)
   - ✅ Se inicia la generación

### Verificar en Logs de Render:

1. Ve a Render Dashboard → pic-christmas-backend → Logs
2. Deberías ver:
   ```
   POST /api/orders - 201 Created
   POST /api/uploads - 200 OK
   POST /api/ai/enhance-prompt - 200 OK
   [WORKER] Image generation started for order: xxx
   ```

---

## ✅ PASO 4: Verificar Variables de Entorno

### Frontend (Vercel):
- ✅ `BACKEND_URL` = `https://pic-christmas-backend.onrender.com`
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` configurado
- ✅ `NEXT_PUBLIC_GOOGLE_AI_API_KEY` configurado (si aplica)

### Backend (Render):
- ✅ `MONGODB_URI` configurado
- ✅ `REDIS_URL` configurado
- ✅ `CLOUDINARY_*` configurado
- ✅ `STRIPE_SECRET_KEY` configurado
- ✅ `MERCADOPAGO_*` configurado

---

## 🚨 TROUBLESHOOTING

### Error: "Failed to connect to backend"
**Causa:** `BACKEND_URL` no configurado en Vercel
**Solución:** 
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Agregar: `BACKEND_URL` = `https://pic-christmas-backend.onrender.com`
3. Redeploy

### Error: 502 Bad Gateway
**Causa:** Backend no responde o timeout
**Solución:**
1. Verificar que backend esté online: `curl https://pic-christmas-backend.onrender.com/health`
2. Verificar logs en Render
3. Verificar que el proxy tenga timeout suficiente (actualmente 8s)

### Error: CORS
**Causa:** Backend no permite origen del frontend
**Solución:** Ya está resuelto con el proxy `/api` - no debería haber CORS

### Error: 404 en `/api/*`
**Causa:** Ruta no existe en backend o proxy mal configurado
**Solución:**
1. Verificar que la ruta exista en `backend/routes/*`
2. Verificar que el proxy en `src/app/api/[...path]/route.ts` esté correcto

---

## 📊 CHECKLIST FINAL

- [ ] Backend health check responde 200 OK
- [ ] Frontend puede hacer requests a `/api/*`
- [ ] Prompts se cargan correctamente
- [ ] Upload de fotos funciona
- [ ] Creación de orden funciona
- [ ] Generación de imágenes se inicia
- [ ] Logs en Render muestran actividad
- [ ] No hay errores en consola del navegador
- [ ] No hay errores en Network tab

---

## 🎉 ¡TODO LISTO!

Si todos los checks pasan, tu aplicación está **100% funcional** y lista para recibir tráfico real.

**Próximos pasos:**
1. Monitorear logs durante las primeras horas
2. Testear con usuarios reales
3. Optimizar según feedback
4. Escalar según demanda

¡Éxito! 🚀

