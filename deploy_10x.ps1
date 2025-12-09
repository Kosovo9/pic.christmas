$ErrorActionPreference = "Stop"

Write-Host "🚀 ELON-SPEED REMOTE DEPLOYMENT INITIATED..." -ForegroundColor Cyan

# 1. Verification
Write-Host "🔍 Verifying Neural Link (Git Status)..." -ForegroundColor Yellow
if (!(Test-Path .git)) {
    Write-Error "❌ Not a git repository! Initialize git first."
    exit 1
}

# 2. Stage & Commit
Write-Host "📦 Staging Quantum Updates..." -ForegroundColor Yellow
git add .
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "🚀 DEPLOY 10X: Auto-sync at $timestamp (Sayayin Mode)"
# Only error if commit fails (e.g. nothing to commit is fine-ish, but let's allow flow)

# 3. Push to Cloud
Write-Host "☁️  Engaging Hyper-Speed Uplink (Pushing to GitHub)..." -ForegroundColor Yellow
git push

if ($LASTEXITCODE -ne 0) { 
    Write-Error "❌ Push failed! Check your internet or git credentials."
    exit 1 
}

Write-Host "✅ UPLOAD COMPLETE." -ForegroundColor Green
Write-Host "⚡ Cloudflare is now building your project in a high-performance Linux environment." -ForegroundColor Green
Write-Host "🌍 Track build: https://dash.cloudflare.com" -ForegroundColor Green
