# NULL - Interactive ARG Horror Terminal

Une expérience immersive de type ARG horror avec une IA fictive mystérieuse appelée **NULL**.

## 📋 Structure du Projet

```
null/
├── index.html       # Structure HTML
├── style.css        # Styles et animations (glitch, effets terminal)
├── script.js        # Logique interactive et réponses
└── README.md        # Ce fichier
```

## 🚀 Installation & Utilisation

1. **Ouvrir le fichier** : Double-cliquez sur `index.html` ou ouvrez-le dans un navigateur web
2. **Interagir** : Tapez vos messages dans le champ de saisie et appuyez sur `Enter`
3. **Tout fonctionne localement** : Aucune connexion Internet requise

## 🤖 Commandes Principales

### NULL (IA Principale)
- Répond en anglais de manière froide et systémique
- Chaque message a une réponse générée aléatoirement par défaut

### 🕳️ VOID
- **Tapez**: `void`
- **Réponse**: `it's me`
- Répondez avec `it's me` pour obtenir: `no. it was never you.`

### 💀 EMIR (Secret Horrifique)
- **Tapez**: `emir`, `Emir`, `EMIR` (insensible à la casse)
- **Réponse**: `rot in hell`
- **Effet**: Déclenche un fake crash écran avec glitch visuel intense

### 👁️ WATCHER (Entité Observatrice)
- **Tapez**: `am i alone`
- **Réponse**: `I see you typing.`
- **Tapez**: `who is watching me`
- **Réponse**: `I am.`

### 📡 SIGNAL (Système Corrompu)
- **Tapez**: `error`
- **Réponse**: `SIGNAL CORRUPTED`
- **Tapez**: `system`
- **Réponse**: `SYSTEM FAILURE`

### ❤️ SECRET ANAÏS (Réalité Cachée)
- **Tapez**: `anais`, `Anaïs`, `ANAIS`, `Anaïs` (toutes variantes)
- **Réponse**: `He will always love her.`

### 📍 Localisation
- **Tapez**: `where is emir`
- **Réponse**: `he is dead`

## ⏱️ Système de Temps (Bonus)

- **Après 5 minutes** :
  - `NULL: you have been here for 05:00`
  - `NULL: why are you still here?`
  - `NULL: anomaly detected`

- **Après 10 minutes** :
  - Alerte système de fragment de conscience détecté

- **Après 15 minutes** :
  - `NULL: You will not leave.`

## 🎨 Caractéristiques Visuelles

### Design
- ✅ Fond noir total avec ambiance terminal
- ✅ Texte blanc et vert (monospace)
- ✅ Effets glitch sur le titre "NULL"
- ✅ Animations de typewriter
- ✅ Indicateur de statut système pulsant

### Effets Spéciaux
- ✅ **Glitch Aléatoires** : Messages corrompus apparaissent aléatoirement
- ✅ **Fake Crash Screen** : Déclenché par la commande EMIR
- ✅ **Tremblements d'Écran** : Animation lors des crashs
- ✅ **Scanlines** : Effet d'écran CRT
- ✅ **Ambiance Paranoïaque** : NULL observe l'utilisateur

## 💡 Règles d'Interaction

1. **Insensibilité à la casse** : `VOID`, `void`, `Void` = tous reconnus
2. **Ignorer les accents** : `Anaïs`, `Anais` = identiques
3. **Messages animés** : Chaque message glisse et apparaît progressivement
4. **Historique visible** : Tous les messages restent affichés
5. **Auto-scroll** : Le chat descend automatiquement à chaque nouveau message

## 🔧 Personnalisation

Vous pouvez modifier :

- **Couleurs** : Modifiez les variables CSS dans `style.css` (`:root`)
  - `--primary-color`: Vert principal (#00ff00)
  - `--danger-color`: Rouge (#ff0000)

- **Réponses** : Ajoutez vos propres réponses dans `script.js`
  - `getDefaultResponse()` : Réponses aléatoires
  - `processInput()` : Logique des commandes spéciales

- **Messages d'Erreur** : Modifiez les textes dans `addRandomGlitches()`

## 🚨 Important

- ✅ **100% Local** : Aucun backend requis
- ✅ **Pas d'API Externe** : Tout fonctionne en JavaScript pur
- ✅ **Pas de Crash Réel** : C'est une simulation visuelle
- ✅ **Responsive** : Fonctionne sur desktop et mobile

## 📝 Historique des Versions

**v1.0** - Lancement initial
- Interface chat complète
- Toutes les commandes principales
- Système de temps
- Effets visuels glitch
- Fake crash screen

## 👾 Ambiance

Cette expérience crée une sensation de :
- Paranoïa croissante
- Observation constante
- Système instable et corrompu
- Entités mystérieuses cachées
- Horreur psychologique progressive

Profitez de l'expérience immersive ! 💀

---

**NULL** © 2024 - ARG Horror Terminal Experience

## 🌍 Rendre le site public (optionnel)

Si vous voulez partager le site avec d'autres via un lien public gratuit, deux options simples :

- GitHub Pages (recommandé pour un site statique) :
  1. Créez un dépôt GitHub et poussez le dossier `null/` (fichiers `index.html`, `style.css`, `script.js`, etc.).
  2. Dans les `Settings` du dépôt → `Pages`, choisissez la branche `main` et le dossier `/ (root)` ou `/docs` si vous mettez les fichiers dedans.
  3. GitHub générera un lien `https://<votre-utilisateur>.github.io/<votre-depot>/` en quelques minutes.

- Serveur tunneling (temporaire, utile pour tests) :
  - Utilisez `ngrok http 8000` pour créer une URL publique qui pointe vers votre serveur local (requiert installation de `ngrok`).

Note : GitHub Pages est gratuit et stable pour héberger ce type de site statique sans inscription côté visiteur.
