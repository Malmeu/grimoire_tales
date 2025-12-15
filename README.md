# Grimoire Tales 📚✨

Plateforme communautaire pour auteurs de novels, livres et BD - Culture Geek & Dark Fantasy

![Astro](https://img.shields.io/badge/Astro-4.15-purple)
![React](https://img.shields.io/badge/React-18.3-blue)
![Supabase](https://img.shields.io/badge/Supabase-2.45-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)

## 🌑 Aperçu

Grimoire Tales est une plateforme de publication inspirée dark fantasy où les auteurs peuvent partager leurs créations :
- **Novels** : Histoires sérialisées en chapitres
- **Livres** : Œuvres complètes
- **BD/Manga** : Viewer interactif avec zoom et navigation

## ✨ Fonctionnalités

- 📝 **Éditeur Markdown** riche pour la création de contenu
- 🎨 **Design Dark Fantasy** immersif (parchemin, brume, effets gothiques)
- 💬 **Commentaires en temps réel** via Supabase Realtime
- ⭐ **Système de notation** et likes
- 🏆 **Classements** hebdomadaires et mensuels
- 👤 **Profils utilisateurs** avec badges geek
- 🔐 **Authentification** email/GitHub/Discord
- 📱 **PWA** responsive mobile-first
- 🔍 **SEO optimisé** avec Astro SSG/SSR

## 🚀 Installation

### Prérequis
- Node.js 18+
- Compte Supabase

### Étapes

1. **Cloner le projet**
```bash
cd Anime_reader
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer Supabase**
   - Créez un projet sur [supabase.com](https://supabase.com)
   - Exécutez le schéma SQL dans `supabase/schema.sql`
   - Copiez `.env.example` vers `.env` et remplissez les variables

```bash
cp .env.example .env
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

5. **Ouvrir dans le navigateur**
```
http://localhost:4321
```

## 📁 Structure du Projet

```
src/
├── pages/              # Pages Astro (SSG/SSR)
│   ├── index.astro     # Page d'accueil
│   ├── catalogue.astro # Catalogue des histoires
│   ├── login.astro     # Connexion
│   ├── register.astro  # Inscription
│   ├── profile.astro   # Profil utilisateur
│   ├── write.astro     # Éditeur d'histoires
│   ├── leaderboard.astro # Classements
│   ├── stories/[slug]/ # Pages dynamiques histoires
│   ├── comics/[id]/    # Viewer BD
│   └── admin/          # Dashboard admin
├── components/         # Composants React islands
│   ├── Editor.tsx      # Éditeur Markdown
│   ├── CommentFeed.tsx # Commentaires realtime
│   ├── ComicViewer.tsx # Viewer BD
│   └── SearchFilters.tsx
├── layouts/            # Layouts Astro
├── lib/                # Utilitaires
│   ├── supabase.ts     # Client Supabase
│   └── database.types.ts
└── styles/             # CSS global + Tailwind
```

## 🎨 Design System

### Palette de couleurs
- **Dark Void** `#1a0d1e` - Fond principal
- **Dark Purple** `#2d1b3c` - Fond secondaire
- **Parchment** `#b89778` - Texte principal
- **Gold Old** `#e8c07b` - Accents et titres

### Typographie
- **Cinzel** - Titres gothiques
- **JetBrains Mono** - Code et éléments geek
- **Inter** - Corps de texte

## 🗄️ Base de Données

Le schéma Supabase inclut :
- `users` - Profils utilisateurs avec badges
- `stories` - Histoires (novels, livres, BD)
- `chapters` - Chapitres avec contenu Markdown
- `comments` - Commentaires avec likes
- `likes`, `follows`, `ratings` - Interactions
- `reports` - Signalements pour modération

RLS (Row Level Security) configuré pour :
- Lecture publique des contenus publiés
- Modification réservée aux auteurs
- Administration pour les modérateurs

## 📦 Scripts

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualisation du build
```

## 🚀 Déploiement

### Vercel (recommandé)
```bash
npm install -g vercel
vercel
```

### Variables d'environnement à configurer
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

## 📄 Licence

MIT License - Libre d'utilisation et modification.

---

Créé avec 🖤 pour la communauté Geek & Dark Fantasy
