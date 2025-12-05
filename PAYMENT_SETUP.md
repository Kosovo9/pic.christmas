# 🔑 Guía Maestra de Llaves (API Keys)

Socio, aquí tienes los pasos exactos para conseguir las llaves que faltan. Solo tienes que entrar a los links, copiar y pegar en tu archivo `.env`.

## 1. Cloudinary (Para subir las fotos)
**Necesario para:** Que el usuario pueda subir sus fotos y nosotros guardarlas.

1.  Ve a [Cloudinary Console](https://console.cloudinary.com/pm/settings/getting-started).
2.  Regístrate o inicia sesión (es gratis).
3.  En el "Dashboard" principal, verás un cuadro llamado **"Product Environment Credentials"**.
4.  Copia estos 3 valores y pégalos en tu `.env`:
    *   `Cloud Name` -> `CLOUDINARY_CLOUD_NAME`
    *   `API Key` -> `CLOUDINARY_API_KEY`
    *   `API Secret` -> `CLOUDINARY_API_SECRET`

## 2. Stripe (Para cobrar en USD/Global)
**Necesario para:** Cobrar con tarjeta de crédito/débito.

1.  Ve a [Stripe Dashboard (API Keys)](https://dashboard.stripe.com/test/apikeys).
2.  Asegúrate de que el interruptor **"Test mode"** (arriba a la derecha) esté **ACTIVADO** (Naranja).
3.  Copia la **Publishable key** (`pk_test_...`) -> `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
4.  Copia la **Secret key** (`sk_test_...`) -> `STRIPE_SECRET_KEY`.
5.  **(Opcional pero recomendado)** Ve a [Webhooks](https://dashboard.stripe.com/test/webhooks), añade un endpoint local (usando Stripe CLI) y copia el `Signing secret` (`whsec_...`) -> `STRIPE_WEBHOOK_SECRET`.

## 3. Mercado Pago (Para cobrar en Latam)
**Necesario para:** Cobrar en pesos, OXXO, etc.

1.  Ve a [Mercado Pago Developers](https://www.mercadopago.com.mx/developers/panel/credentials).
2.  Crea una aplicación si no tienes una.
3.  Ve a **Credenciales de prueba**.
4.  Copia el **Access Token** (`TEST-...`) -> `MERCADO_PAGO_ACCESS_TOKEN`.

## 4. Redis (Para la cola de generación)
**Necesario para:** Que el servidor no se trabe generando imágenes.

*   **Opción A (Local):** Si instalaste Redis en tu compu, usa: `redis://localhost:6379`.
*   **Opción B (Nube - Upstash):**
    1.  Ve a [Upstash Redis](https://console.upstash.com/).
    2.  Crea una base de datos gratuita.
    3.  Copia el `REDIS_URL` (empieza con `rediss://...`) -> `REDIS_URL`.

---

### 📝 Ejemplo de cómo debe quedar tu `.env`:

```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=dgh56...
CLOUDINARY_API_KEY=84759...
CLOUDINARY_API_SECRET=abc12...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN=TEST-584...

# Redis
REDIS_URL=redis://localhost:6379
```
