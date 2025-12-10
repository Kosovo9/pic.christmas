# 🌐 GUÍA RÁPIDA: CONFIGURAR DOMINIO PIC.CHRISTMAS

## Paso 1: Netlify Dashboard (2 minutos)

1. **Ir a:** https://app.netlify.com/sites/pic-christmas-final-v1/settings/domain

2. **Add custom domain:**
   - Click "Add custom domain"
   - Escribir: `pic.christmas`
   - Click "Verify"
   - Click "Add domain"

3. **Agregar www:**
   - Click "Add domain alias"
   - Escribir: `www.pic.christmas`
   - Click "Save"

---

## Paso 2: Cloudflare DNS (2 minutos)

1. **Ir a:** https://dash.cloudflare.com

2. **Seleccionar:** pic.christmas

3. **DNS → Records:**

   **A Record:**
   ```
   Type: A
   Name: @
   IPv4: 75.2.60.5
   Proxy: DNS only (nube gris) ⚠️
   ```

   **CNAME Record:**
   ```
   Type: CNAME
   Name: www
   Target: pic-christmas-final-v1.netlify.app
   Proxy: DNS only (nube gris) ⚠️
   ```

4. **SSL/TLS Settings:**
   - Encryption mode: **Full (Strict)**
   - Always Use HTTPS: **On**

---

## Paso 3: Verificar (1 minuto)

1. **Esperar 1-5 minutos** para propagación DNS

2. **Verificar:**
   ```powershell
   nslookup pic.christmas
   ```
   Debe mostrar: `75.2.60.5`

3. **Visitar:** https://pic.christmas

4. **Verificar:**
   - ✅ Sitio carga correctamente
   - ✅ Candado verde (SSL)
   - ✅ No hay warnings

---

## ✅ LISTO!

Tu sitio estará en vivo en **pic.christmas** 🎄✨
