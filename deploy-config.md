# 🚀 Deploy Configuration - Christmas AI Studio

## Variables de Entorno Requeridas

### Autenticación (Clerk)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
```

### APIs de IA
```env
GEMINI_API_KEY=AIzaSyBK5aHGPJJ4YrEfQH9xP_YnS6zOZ1B8_UA
HF_API_KEY=hf_your_huggingface_api_key_here
OPENAI_API_KEY=sk-your_openai_api_key_here
```

### Base de Datos (Supabase)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Pagos
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
MERCADOPAGO_ACCESS_TOKEN=your_mercadopago_access_token
STRIPE_PUBLISHABLE_KEY=pk_test_51ScFOJLfDUqGivZmcjMCKjWSiFjLG35krloV74sD3zQ4y28k9BaSm5Z9QNtXpgwWBUlPhU6y3WhjFizY9bkZ8VER00cSy6aapq
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Analytics y Monitoreo
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
MIXPANEL_TOKEN=your_mixpanel_token
```

### Email (Resend)
```env
RESEND_API_KEY=re_your_resend_api_key
```

### Configuración de Aplicación
```env
NEXTAUTH_URL=https://pic.christmas
NEXTAUTH_SECRET=your_nextauth_secret_here
NODE_ENV=production
```

## 📋 Checklist de Deploy

### ✅ Pre-Deploy
- [ ] Todas las variables de entorno configuradas
- [ ] Build local exitoso (`npm run build`)
- [ ] Tests pasando
- [ ] Imágenes de demo subidas
- [ ] APIs funcionando

### ✅ Deploy a Netlify

#### Método 1: GitHub (Recomendado)
1. Push del código a GitHub
2. Conectar repositorio en Netlify
3. Configurar variables de entorno en Netlify Dashboard
4. Deploy automático

#### Método 2: Drag & Drop
1. Ejecutar `npm run build`
2. Subir carpeta `.next` a Netlify
3. Configurar variables de entorno
4. Deploy manual

### ✅ Configuración de Netlify

#### Build Settings
```
Build command: npm run build
Publish directory: .next
```

#### Redirects (_redirects file)
```
/*    /index.html   200
/api/*  /.netlify/functions/:splat  200
```

#### Headers
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

### ✅ Post-Deploy
- [ ] Verificar carga de la aplicación
- [ ] Test de upload de imágenes
- [ ] Test de generación de IA
- [ ] Test de sistema de pagos
- [ ] Test responsive en móviles
- [ ] Verificar analytics
- [ ] Test de performance (Lighthouse)

## 🌐 Deploy Alternativo - Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔧 Troubleshooting Común

### Error: Missing publishableKey (Clerk)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
```

### Error: API Keys not working
- Verificar que las keys estén en variables de entorno
- Revisar límites de rate en APIs
- Comprobar dominios autorizados

### Error: Images not loading
- Verificar configuración de `next.config.ts`
- Comprobar dominios en `remotePatterns`
- Verificar permisos de Supabase Storage

### Error: Build failing
```bash
# Limpiar cache
rm -rf .next
npm run build
```

## 📊 Performance Targets

- **Lighthouse Score**: 90+ en todas las métricas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Seguridad

### Variables Sensibles
- Nunca commitear `.env.local`
- Usar `.env.example` para documentación
- Rotar APIs keys periódicamente
- Monitorear uso de APIs

### CSP Headers
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';
```

## 📈 Monitoreo Post-Deploy

### Métricas a Monitorear
- Tiempo de respuesta de APIs
- Rate de error en generación de imágenes
- Conversión de pagos
- Core Web Vitals
- Uso de ancho de banda

### Alertas Configurar
- API rate limits alcanzados
- Errores 5xx > 1%
- Tiempo de respuesta > 5s
- Storage casi lleno

---

**🎄 Christmas AI Studio está listo para producción!**

Última actualización: Diciembre 2024