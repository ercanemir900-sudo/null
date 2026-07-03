# Publish NULL site to GitHub Pages

This guide helps you publish the `null/` site to GitHub Pages.

## Steps

1. Create a new empty repository on GitHub (do not add README/license etc. — or it's fine, you'll merge).

2. Copy the repository HTTPS URL. Example:

   `https://github.com/<your-username>/<your-repo>.git`

3. On your machine, open PowerShell in the `null/` folder and run:

```powershell
# If you prefer PowerShell script (recommended on Windows)
.
# Example usage:
.
Publish-Note: see below
```

4. Use the provided scripts:

- Windows CMD (double-click or run in terminal):

```powershell
publish.bat https://github.com/<your-username>/<your-repo>.git
```

- PowerShell:

```powershell
.
# Example
.
.
# Run:
.
Publish-Note: see below
```

5. After push, go to GitHub → Settings → Pages and set source to `main` branch / `root` and save. The site will be available in a few minutes at:

```
https://<your-username>.github.io/<your-repo>/
```

## If you don't have git
- Install Git for Windows: https://git-scm.com/download/win
- Or install via winget:

```powershell
winget install --id Git.Git -e --source winget
```

## Temporary share (no repo)
- Install ngrok https://ngrok.com
- Run your local server (python server.py) and in a new terminal:

```bash
ngrok http 8000
```

ngrok will show a public HTTPS URL you can share.

---

If you want, paste your GitHub repo HTTPS URL here and I will attempt to run the push commands for you (I need `git` installed locally). Otherwise run the provided script locally.
