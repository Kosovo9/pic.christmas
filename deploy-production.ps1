#!/usr/bin/env pwsh
# 🚀 DEPLOYMENT SCRIPT - PIC.CHRISTMAS
# Este script automatiza el deployment a Netlify

Write-Host "🎄 PIC.CHRISTMAS - Deployment Script" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: No se encuentra package.json" -ForegroundColor Red
    Write-Host "   Ejecuta este script desde la raíz del proyecto" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Directorio verificado" -ForegroundColor Green

# Verificar que Netlify CLI está instalado
Write-Host ""
Write-Host "Verificando Netlify CLI..." -ForegroundColor Cyan
$netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue
if (-not $netlifyInstalled) {
    Write-Host "❌ Netlify CLI no está instalado" -ForegroundColor Red
    Write-Host "   Instalando..." -ForegroundColor Yellow
    npm install -g netlify-cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error instalando Netlify CLI" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✓ Netlify CLI disponible" -ForegroundColor Green

# Build del proyecto
Write-Host ""
Write-Host "Construyendo el proyecto..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en el build" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Build exitoso" -ForegroundColor Green

# Link al site de Netlify
Write-Host ""
Write-Host "Conectando con Netlify..." -ForegroundColor Cyan
netlify link --id 5f5a1cad-cd80-41d2-aebe-bb75b61834bb
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  No se pudo conectar automáticamente" -ForegroundColor Yellow
    Write-Host "   Ejecuta: netlify login" -ForegroundColor Yellow
    Write-Host "   Luego: netlify link --id 5f5a1cad-cd80-41d2-aebe-bb75b61834bb" -ForegroundColor Yellow
}

# Configurar variables de entorno
Write-Host ""
Write-Host "¿Deseas configurar las variables de entorno en Netlify? (s/n)" -ForegroundColor Cyan
$configEnv = Read-Host
if ($configEnv -eq "s" -or $configEnv -eq "S") {
    Write-Host "Configurando variables de entorno..." -ForegroundColor Cyan
    
    # Leer .env.local
    if (Test-Path ".env.local") {
        $envVars = Get-Content ".env.local" | Where-Object { $_ -notmatch "^#" -and $_ -match "=" }
        foreach ($line in $envVars) {
            $parts = $line -split "=", 2
            if ($parts.Count -eq 2) {
                $key = $parts[0].Trim()
                $value = $parts[1].Trim()
                Write-Host "  Configurando $key..." -ForegroundColor Gray
                netlify env:set $key $value --context production
            }
        }
        Write-Host "✓ Variables de entorno configuradas" -ForegroundColor Green
    } else {
        Write-Host "⚠️  No se encuentra .env.local" -ForegroundColor Yellow
    }
}

# Deploy a producción
Write-Host ""
Write-Host "¿Deseas hacer deploy a producción ahora? (s/n)" -ForegroundColor Cyan
$doDeploy = Read-Host
if ($doDeploy -eq "s" -or $doDeploy -eq "S") {
    Write-Host ""
    Write-Host "🚀 Deploying a producción..." -ForegroundColor Magenta
    netlify deploy --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "=====================================" -ForegroundColor Green
        Write-Host "🎉 DEPLOYMENT EXITOSO!" -ForegroundColor Green
        Write-Host "=====================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Próximos pasos:" -ForegroundColor Cyan
        Write-Host "1. Verificar el sitio en la URL de Netlify" -ForegroundColor White
        Write-Host "2. Configurar DNS en Cloudflare para pic.christmas" -ForegroundColor White
        Write-Host "3. Esperar propagación DNS (1-5 min)" -ForegroundColor White
        Write-Host "4. Verificar SSL en Netlify" -ForegroundColor White
        Write-Host "5. Testing completo en producción" -ForegroundColor White
        Write-Host ""
        Write-Host "Ver walkthrough.md para instrucciones detalladas" -ForegroundColor Yellow
    } else {
        Write-Host ""
        Write-Host "❌ Error en el deployment" -ForegroundColor Red
        Write-Host "   Revisa los logs arriba para más detalles" -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "Deployment cancelado." -ForegroundColor Yellow
    Write-Host "Para deployar manualmente:" -ForegroundColor Cyan
    Write-Host "  netlify deploy --prod" -ForegroundColor White
}

Write-Host ""
