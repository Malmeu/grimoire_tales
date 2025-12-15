Cahier des Charges - Plateforme de Publication Geek Dark Fantasy
Contexte du Projet
Plateforme communautaire pour auteurs de novels, livres et BD imagées, adaptée à la culture geek (anime, gaming, fantasy). Style visuel inspiré dark fantasy : pages parchemin vieilli, typographie gothique, effets brume/noir, animations subtiles (ombres flottantes, particules). Tout utilisateur peut publier ; client écrivain novels comme contributeur premium. Stack technique : Astro (SSG/SSR pour SEO optimal), React (composants interactifs), Supabase (auth, DB PostgreSQL, storage images/BD, realtime comments).​

Fonctionnalités Clés
Publication Contenus : Éditeur Markdown riche (titre, chapitres, images/BD panels upload via Supabase Storage). Formats : novels sérialisés (chapitres), livres complets (PDF/EPUB preview), BD (viewer page-flip avec zoom/pan).

Catalogue & Recherche : Grille/liste responsive (Astro pages statiques). Filtres : genre (dark fantasy, sci-fi, geek), tags (WoW, Dragon Ball), popularité, date. Recherche full-text PostgreSQL (Supabase vector search pour similarités).

Interactions Communauté : Likes, comments realtime (Supabase Realtime), follows auteurs, ratings étoiles. Leaderboards hebdo/mensuel (vues, likes).

Profils Utilisateurs : Bio geek (badges gaming/anime), liste publications, stats lectures. Mode sombre par défaut, toggle light.

Admin/Modération : Dashboard React pour signalements, approbations contenus (RLS Supabase).​

Design & UX Geek/Dark Fantasy
Thème Visuel : Palette #1a0d1e (noir profond), #2d1b3c (violet sombre), #b89778 (parchemin), accents #e8c07b (or vieilli). Fonts : Cinzel (titres gothiques), JetBrains Mono (corps geek).

Éléments Immersifs : Header navbar "grimoire ouvert", hero sections brume animée (CSS/GSAP), cards contenus "pages arrachées". Mobile-first, PWA (Astro manifest).

Inspirations Non-Plagiat : Effets glassmorphism sombre, scroll parallax fantasy, loader "rouleau incantation". Accessibilité : contraste WCAG AA, keyboard nav.​

Architecture Technique
text
src/
├── pages/ (Astro SSG/SSR)
│   ├── index.astro (home)
│   ├── stories/[slug]/ (dynamic novel)
│   └── comics/[id]/ (BD viewer)
├── components/ (React islands)
│   ├── Editor.tsx
│   ├── CommentFeed.tsx
│   └── DarkThemeProvider.tsx
├── lib/supabase.ts (client init)
└── styles/ (Tailwind + custom CSS vars)
Supabase Schema :

sql
users (id, email, username, avatar, bio_geek);
stories (id, title, slug, author_id, chapters JSONB, tags[], views);
chapters (id, story_id, content Markdown, images uuid[]);
comments (id, story_id, user_id, text, likes);
likes (user_id, story_id);
RLS policies : owner + public read. Realtime sur comments/likes.​

Roadmap Développement MVP
Semaine 1 : Setup Astro + Supabase (auth email/OAuth GitHub/Discord). Pages statiques home/catalogue.

Semaine 2 : Composants React (éditeur, viewer BD). Upload storage + DB seed (10 stories fake geek).

Semaine 3 : Interactions realtime, recherche/filtres. Design dark fantasy complet (Tailwind).

Semaine 4 : Profils, modération dashboard. SEO (sitemap, meta OG, schema.org Book). Tests/deploy Vercel.

SEO Priorité : Astro content collections, slugs auto-générés, structured data JSON-LD (CreativeWork).

Déploiement : Vercel (Astro natif), Supabase prod. README : npm create astro@latest --template minimal, env vars Supabase.