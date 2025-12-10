#!/usr/bin/env pwsh
# Script para configurar todas las variables de entorno en Cloudflare Pages

$env_vars = @{
    "ANTHROPIC_API_KEY" = "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"
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" = "pk_test_51ScFOJLfDUqGivZmcjMCKjWSiFjLG35krloV74sD3zQ4y28k9BaSm5Z9QNtXpgwWBUlPhU6y3WhjFizY9bkZ8VER00cSy6aapq"
    "STRIPE_SECRET_KEY" = "sk_test_51ScFOJLfDUqGivZm8y4men8AdUAt4ce6b9gjsc4YnOEEFgJrXGBwuIdwqbXMtsk2w90KSP0iMhpJ7loCy2iLX307009ZIS8XRr"
    "STRIPE_WEBHOOK_SECRET" = "whsec_iRzUe99XQkd9KfTqmFjuHfpCy8GxEFZ8"
    "NEXT_PUBLIC_SUPABASE_URL" = "https://tgrmzdecznxiympzedcf.supabase.co"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRncm16ZGVjem54aXltcHplZGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMzUwMTAsImV4cCI6MjA4MDgxMTAxMH0.oq4pTYVHeqDyK2HfAWEHHRBcBXK4OczGYdWg5sAcVvg"
    "SUPABASE_SERVICE_ROLE_KEY" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRncm16ZGVjem54aXltcHplZGNmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTIzNTAxMCwiZXhwIjoyMDgwODExMDEwfQ.9KbJK4iDrKwNaqzwFWcttvI-bIM6G1ybA_u2B16v67A"
    "NEXT_PUBLIC_GTAG" = "G-9SYTS2JLS5"
    "NEXT_PUBLIC_SITE_URL" = "https://pic.christmas"
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" = "pk_test_placeholder"
    "CLERK_SECRET_KEY" = "sk_test_placeholder"
    "NODE_ENV" = "production"
}

foreach ($key in $env_vars.Keys) {
    Write-Host "Setting $key..." -ForegroundColor Cyan
    $value = $env_vars[$key]
    echo $value | npx wrangler pages secret put $key --project-name=pic-christmas
    Start-Sleep -Milliseconds 500
}

Write-Host "`n✅ All environment variables configured!" -ForegroundColor Green
