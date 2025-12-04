# PIC.CHRISTMAS 🎄📸

Plataforma premium para generar **fotos navideñas hiperrealistas con IA** de personas, familias, parejas y mascotas.

Dominio oficial: **https://pic.christmas**

---

## 🎯 Objetivo

Permitir que cualquier persona suba de 1 a 3 fotos y reciba:

- Retratos navideños estilo estudio.
- Fotos familiares con mascotas.
- Fotos ejecutivas navideñas para LinkedIn / redes.
- Escenas navideñas personalizadas (parejas, niños, amigos, etc.).

Todo 100% online, en minutos.

---

## 🧩 Features clave

- Selección de:
  - Número de adultos
  - Número de niños
  - Número de perros, gatos y otras mascotas
- Paquetes:
  - Persona + mascota
  - Solo mascota
  - Familia + mascotas
- **Precios dinámicos** que suben ligeramente según número de personas/mascotas.
- **Programa de referidos**:
  - Recomienda a tus amigos con un código/enlace.
  - Si 5 personas compran con tu código, recibes **1 foto gratis** (1 crédito).
- **Catálogo de ideas navideñas**:
  - +100 prompts navideños precargados por el admin.
  - El usuario elige la idea, se rellena solo el campo de descripción.
- **AI Help**:
  - IA interna open-source mejora el prompt del usuario.
  - Combina sus palabras + número de personas/mascotas.
  - No cambia la intención, solo mejora el detalle.
- **Disclaimer profesional multi-idioma** en el footer:
  - Aclara uso de IA y límites legales.
  - Español / Inglés al inicio, ampliable a más idiomas.
- **UI navideña premium**:
  - Paleta: rojo profundo, dorado, blanco cálido.
  - Detalles de nieve y luces discretos.
  - Look de marca elegante, no genérico.
- **Música navideña opcional**:
  - Botón para activar/desactivar música sin derechos de autor.
  - Estado por defecto: silenciado.

---

## 🏗 Stack sugerido

- Framework: **Next.js 14**
- UI: **React + Tailwind CSS**
- Deploy: **Vercel**
- DNS / WAF: **Cloudflare**
- i18n: archivos JSON bajo `public/locales/`

---

## 📁 Estructura base

Ver carpeta:

- `/public` → imágenes, audio, locales, catálogo de prompts.
- `/src/components` → layout, header, footer, controles, catálogo, referidos, toggle de música.
- `/data/pricing-rules.json` → reglas de precios dinámicos.
- `/data/referral-config.json` → configuración del sistema de referidos.

---

## ✅ Checklist de desarrollo

- [ ] Implementar layout + Header/Footer con branding **PIC.CHRISTMAS**
- [ ] Hero con CTA “Crear mi foto navideña ahora”
- [ ] Controles de personas y mascotas
- [ ] Lógica de precio dinámico
- [ ] Bloque de paquetes (Persona + Mascota, Solo Mascota, Familia + Mascotas)
- [ ] Catálogo de ideas navideñas (+100 prompts precargados por admin)
- [ ] Módulo **AI Help** (optimización de prompt interna)
- [ ] Sistema de referidos (código único, contador, 1 foto gratis al llegar a 5)
- [ ] Disclaimer multi-idioma en footer
- [ ] Toggle de música navideña sin derechos de autor
- [ ] SEO y OG tags para `https://pic.christmas`