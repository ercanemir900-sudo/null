Param(
    [Parameter(Mandatory=$true)]
    [string]$RepoUrl
)

Write-Host "Publish NULL site to GitHub (PowerShell)"

# Check git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git not found. Install Git: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Set-Location -Path $PSScriptRoot

if (-not (Test-Path .git)) {
    git init
}

git add .
try { git commit -m "Publish NULL site" } catch { Write-Host "No changes to commit" }

git branch -M main
try { git remote remove origin } catch {}

git remote add origin $RepoUrl

git push -u origin main

Write-Host "Done. Enable GitHub Pages in repository Settings -> Pages if needed." -ForegroundColor Green
