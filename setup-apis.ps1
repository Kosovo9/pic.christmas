# ========================================
# 🚀 pic.christmas - Auto Setup Script
# ========================================
# Este script te ayuda a configurar todas las APIs

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🎄 pic.christmas - Setup Automático" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si .env.local existe
if (Test-Path ".env.local") {
    Write-Host "✅ .env.local ya existe" -ForegroundColor Green
    $overwrite = Read-Host "¿Quieres sobrescribirlo? (s/n)"
    if ($overwrite -ne "s") {
        Write-Host "❌ Cancelado. Edita .env.local manualmente." -ForegroundColor Red
        exit
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🎨 CONFIGURACIÓN DE APIs" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ========================================
# REPLICATE (RECOMENDADO)
# ========================================
Write-Host "🏆 REPLICATE (Mejor calidad - 50 gratis/mes)" -ForegroundColor Yellow
Write-Host "   1. Abre: https://replicate.com/account/api-tokens" -ForegroundColor Gray
Write-Host "   2. Crea cuenta si no tienes" -ForegroundColor Gray
Write-Host "   3. Copia tu token (empieza con r8_)" -ForegroundColor Gray
Write-Host ""
$REPLICATE_TOKEN = Read-Host "   Pega tu token de Replicate (o Enter para omitir)"

# ========================================
# STABILITY AI (OPCIONAL)
# ========================================
Write-Host ""
Write-Host "🎨 STABILITY AI (Opcional - 25 créditos gratis/mes)" -ForegroundColor Yellow
Write-Host "   1. Abre: https://platform.stability.ai/account/keys" -ForegroundColor Gray
Write-Host "   2. Genera nueva API key" -ForegroundColor Gray
Write-Host ""
$STABILITY_KEY = Read-Host "   Pega tu key de Stability AI (o Enter para omitir)"

# ========================================
# HUGGING FACE (OPCIONAL)
# ========================================
Write-Host ""
Write-Host "🤗 HUGGING FACE (Opcional - 100 gratis/día)" -ForegroundColor Yellow
Write-Host "   1. Abre: https://huggingface.co/settings/tokens" -ForegroundColor Gray
Write-Host "   2. Crea nuevo token" -ForegroundColor Gray
Write-Host ""
$HUGGINGFACE_TOKEN = Read-Host "   Pega tu token de HuggingFace (o Enter para omitir)"

# ========================================
# SUPABASE (STORAGE)
# ========================================
Write-Host ""
Write-Host "💾 SUPABASE (Storage - REQUERIDO para guardar imágenes)" -ForegroundColor Yellow
Write-Host "   1. Abre: https://supabase.com/dashboard" -ForegroundColor Gray
Write-Host "   2. Crea proyecto (gratis)" -ForegroundColor Gray
Write-Host "   3. Ve a Settings > API" -ForegroundColor Gray
Write-Host ""
$SUPABASE_URL = Read-Host "   Pega tu Supabase URL (o Enter para omitir)"
$SUPABASE_ANON = Read-Host "   Pega tu Supabase ANON key (o Enter para omitir)"
$SUPABASE_SERVICE = Read-Host "   Pega tu Supabase SERVICE key (o Enter para omitir)"

# ========================================
# STRIPE (PAYMENTS)
# ========================================
Write-Host ""
Write-Host "💳 STRIPE (Pagos - REQUERIDO para cobrar)" -ForegroundColor Yellow
Write-Host "   1. Abre: https://dashboard.stripe.com/apikeys" -ForegroundColor Gray
Write-Host "   2. Copia tus keys de TEST" -ForegroundColor Gray
Write-Host ""
$STRIPE_SECRET = Read-Host "   Pega tu Stripe SECRET key (sk_test_...) (o Enter para omitir)"
$STRIPE_PUBLIC = Read-Host "   Pega tu Stripe PUBLISHABLE key (pk_test_...) (o Enter para omitir)"

# ========================================
# CREAR .env.local
# ========================================
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📝 Creando .env.local..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

$envContent = @"
# ========================================
# 🎨 pic.christmas - Environment Variables
# Generado automáticamente: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
# ========================================

# ========================================
# 🎨 AI PROVIDERS
# ========================================

"@

if ($REPLICATE_TOKEN) {
    $envContent += "REPLICATE_API_TOKEN=$REPLICATE_TOKEN`n"
}

if ($STABILITY_KEY) {
    $envContent += "STABILITY_API_KEY=$STABILITY_KEY`n"
}

if ($HUGGINGFACE_TOKEN) {
    $envContent += "HUGGING_FACE_API_KEY=$HUGGINGFACE_TOKEN`n"
}

$envContent += @"

# ========================================
# 💾 SUPABASE
# ========================================

"@

if ($SUPABASE_URL) {
    $envContent += "NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL`n"
}

if ($SUPABASE_ANON) {
    $envContent += "NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON`n"
}

if ($SUPABASE_SERVICE) {
    $envContent += "SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE`n"
}

$envContent += @"

# ========================================
# 💳 STRIPE
# ========================================

"@

if ($STRIPE_SECRET) {
    $envContent += "STRIPE_SECRET_KEY=$STRIPE_SECRET`n"
}

if ($STRIPE_PUBLIC) {
    $envContent += "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLIC`n"
}

$envContent += @"

# ========================================
# 🌐 SITE CONFIG
# ========================================

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
"@

# Guardar archivo
$envContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host ""
Write-Host "✅ .env.local creado exitosamente!" -ForegroundColor Green
Write-Host ""

# ========================================
# RESUMEN
# ========================================
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📊 RESUMEN DE CONFIGURACIÓN" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$configured = 0
$total = 0

Write-Host "AI Providers:" -ForegroundColor Cyan
if ($REPLICATE_TOKEN) { Write-Host "  ✅ Replicate" -ForegroundColor Green; $configured++ } else { Write-Host "  ⚠️  Replicate (omitido)" -ForegroundColor Yellow }
$total++
if ($STABILITY_KEY) { Write-Host "  ✅ Stability AI" -ForegroundColor Green; $configured++ } else { Write-Host "  ⚠️  Stability AI (omitido)" -ForegroundColor Yellow }
$total++
if ($HUGGINGFACE_TOKEN) { Write-Host "  ✅ HuggingFace" -ForegroundColor Green; $configured++ } else { Write-Host "  ⚠️  HuggingFace (omitido)" -ForegroundColor Yellow }
$total++

Write-Host ""
Write-Host "Storage:" -ForegroundColor Cyan
if ($SUPABASE_URL -and $SUPABASE_ANON -and $SUPABASE_SERVICE) { 
    Write-Host "  ✅ Supabase (completo)" -ForegroundColor Green
    $configured += 3
} else { 
    Write-Host "  ⚠️  Supabase (incompleto)" -ForegroundColor Yellow 
}
$total += 3

Write-Host ""
Write-Host "Payments:" -ForegroundColor Cyan
if ($STRIPE_SECRET -and $STRIPE_PUBLIC) { 
    Write-Host "  ✅ Stripe (completo)" -ForegroundColor Green
    $configured += 2
} else { 
    Write-Host "  ⚠️  Stripe (incompleto)" -ForegroundColor Yellow 
}
$total += 2

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
$percentage = [math]::Round(($configured / $total) * 100)
Write-Host "Configuración: $configured/$total ($percentage%)" -ForegroundColor $(if ($percentage -gt 50) { "Green" } else { "Yellow" })
Write-Host "========================================" -ForegroundColor Cyan

# ========================================
# PRÓXIMOS PASOS
# ========================================
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 PRÓXIMOS PASOS" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($configured -eq 0) {
    Write-Host "⚠️  No configuraste ninguna API" -ForegroundColor Red
    Write-Host "   El sistema usará Pollinations (gratis, ilimitado)" -ForegroundColor Yellow
    Write-Host "   Pero recomendamos configurar al menos Replicate" -ForegroundColor Yellow
} elseif ($configured -lt 3) {
    Write-Host "⚠️  Configuración mínima" -ForegroundColor Yellow
    Write-Host "   Recomendamos agregar más APIs para mejor calidad" -ForegroundColor Yellow
} else {
    Write-Host "✅ ¡Excelente configuración!" -ForegroundColor Green
}

Write-Host ""
Write-Host "1. Reinicia el servidor:" -ForegroundColor Cyan
Write-Host "   Ctrl+C (detener)" -ForegroundColor Gray
Write-Host "   npm run dev (iniciar)" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Abre el navegador:" -ForegroundColor Cyan
Write-Host "   http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Prueba subir una foto" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "💰 ¡LISTO PARA GENERAR DINERO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Preguntar si reiniciar servidor
$restart = Read-Host "¿Quieres reiniciar el servidor ahora? (s/n)"
if ($restart -eq "s") {
    Write-Host ""
    Write-Host "🔄 Reiniciando servidor..." -ForegroundColor Yellow
    Write-Host "   Presiona Ctrl+C en la terminal del servidor" -ForegroundColor Gray
    Write-Host "   Luego ejecuta: npm run dev" -ForegroundColor Gray
}

Write-Host ""
Write-Host "✅ Setup completado!" -ForegroundColor Green
Write-Host ""
