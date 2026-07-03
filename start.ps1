# NULL - Local Web Server (PowerShell)
# Lance un serveur web local pour accéder au site

$port = 8000
$directory = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║    NULL - Local Web Server (PS)        ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Accédez au site: http://localhost:$port" -ForegroundColor Cyan
Write-Host "📂 Dossier: $directory" -ForegroundColor Yellow
Write-Host ""
Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Gray
Write-Host ""

# Lancer le serveur Python
Set-Location $directory
& python server.py
