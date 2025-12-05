# 🌐 Configuración de Dominio: pic.christmas

Esta guía te ayudará a conectar tu dominio `pic.christmas` usando Cloudflare y Vercel.

## Estrategia Recomendada
**Cloudflare (DNS) + Vercel (Hosting)**
Esta combinación te da lo mejor de ambos mundos: la rapidez y seguridad de Cloudflare con la facilidad de despliegue de Vercel.

---

## Paso 1: Configurar Cloudflare

1.  **Crear cuenta / Iniciar sesión** en [Cloudflare](https://dash.cloudflare.com/).
2.  Haz clic en **"Add a Site"** (Agregar un sitio).
3.  Escribe tu dominio: `pic.christmas` y haz clic en **Add Site**.
4.  Selecciona el **Plan Free** (Gratis) y continúa.
5.  Cloudflare escaneará tus registros DNS actuales. Revisa y haz clic en **Continue**.
6.  Cloudflare te dará dos **Nameservers** (ej. `bob.ns.cloudflare.com` y `alice.ns.cloudflare.com`). **Cópialos**.

## Paso 2: Cambiar Nameservers en Namecheap

1.  Ve a [Namecheap Dashboard](https://ap.www.namecheap.com/domains/list/).
2.  Busca tu dominio `pic.christmas` y haz clic en **Manage**.
3.  En la sección **Nameservers**, cambia de "Namecheap BasicDNS" a **"Custom DNS"**.
4.  Pega los dos Nameservers que te dio Cloudflare en las líneas 1 y 2.
5.  Haz clic en la palomita verde (✅) para guardar.
    *   *Nota: Esto puede tardar desde unos minutos hasta 24 horas en propagarse, pero usualmente es rápido.*

## Paso 3: Configurar Vercel

1.  Ve a tu proyecto en [Vercel](https://vercel.com/dashboard).
2.  Ve a **Settings** → **Domains**.
3.  Escribe `pic.christmas` en el campo de entrada y haz clic en **Add**.
4.  Vercel te mostrará una configuración recomendada.
    *   Si eliges la opción recomendada, Vercel te pedirá agregar registros A y CNAME en tu proveedor de DNS (que ahora es Cloudflare).

## Paso 4: Apuntar Cloudflare a Vercel

1.  Regresa a **Cloudflare** → selecciona `pic.christmas` → ve a **DNS**.
2.  Agrega los registros que te pide Vercel:
    *   **Registro A:**
        *   Type: `A`
        *   Name: `@` (o `pic.christmas`)
        *   Content: `76.76.21.21` (IP de Vercel)
        *   Proxy status: **Proxied** (Nube Naranja) o **DNS Only** (Nube Gris).
            *   *Recomendación:* Para Vercel, a veces es mejor usar **DNS Only** (Nube Gris) para evitar conflictos de SSL, o configurar SSL en Cloudflare como "Full (Strict)".
    *   **Registro CNAME:**
        *   Type: `CNAME`
        *   Name: `www`
        *   Content: `cname.vercel-dns.com`
        *   Proxy status: **DNS Only** (Nube Gris) recomendado para empezar.

## Paso 5: Verificación

1.  En Vercel, espera a que los indicadores se pongan en verde.
2.  Visita `https://pic.christmas`. ¡Debería cargar tu sitio!

---

## 🆘 Solución de Problemas Comunes

*   **Error "Too many redirects":**
    *   En Cloudflare, ve a **SSL/TLS**.
    *   Cambia el modo de encriptación a **Full (Strict)**.
*   **El sitio no carga:**
    *   Verifica que los Nameservers en Namecheap sean los correctos de Cloudflare.
    *   Verifica que los registros A y CNAME en Cloudflare coincidan con lo que pide Vercel.
