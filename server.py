#!/usr/bin/env python3
"""
NULL - Local Web Server
Lance un serveur web pour accéder au site sur http://localhost:8000
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = Path(__file__).parent

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # Ajouter des headers pour éviter les problèmes de cache
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

def run_server():
    """Lance le serveur web local"""
    Handler = MyHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("╔════════════════════════════════════════╗")
        print("║        NULL - Local Web Server          ║")
        print("╚════════════════════════════════════════╝")
        print()
        print(f"🌐 Serveur lancé sur: {url}")
        print(f"📂 Dossier servi: {DIRECTORY}")
        print()
        print("Appuyez sur Ctrl+C pour arrêter le serveur")
        print()
        
        # Ouvrir automatiquement le navigateur
        try:
            webbrowser.open(url)
            print("✅ Navigateur ouvert automatiquement")
        except:
            print(f"📌 Ouvrez manuellement: {url}")
        
        print()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Serveur arrêté.")

if __name__ == "__main__":
    run_server()
