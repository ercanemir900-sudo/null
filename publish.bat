@echo off
REM Publish NULL site to GitHub (Windows Batch)
REM Usage: publish.bat https://github.com/USERNAME/REPO.git

if "%1"=="" (
  echo Usage: publish.bat https://github.com/USERNAME/REPO.git
  exit /b 1
)

set REPO_URL=%1

echo Checking for git...
where git >nul 2>nul
if errorlevel 1 (
  echo Git not found. Please install Git for Windows: https://git-scm.com/download/win
  pause
  exit /b 1
)

cd /d "%~dp0"

if not exist .git (
  git init
)

git add .
 git commit -m "Publish NULL site" 2>nul || echo No changes to commit
 git branch -M main
 git remote remove origin 2>nul || echo
 git remote add origin %REPO_URL%
 git push -u origin main

echo Done. If GitHub Pages not active, enable it in repository Settings -> Pages.
pause
