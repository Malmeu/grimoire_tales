/* empty css                                 */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Navbar } from '../chunks/Navbar_BpY7slON.mjs';
import { $ as $$Footer } from '../chunks/Footer_BkCLQ1Bc.mjs';
import { $ as $$StoryCard } from '../chunks/StoryCard_C-laisvo.mjs';
import { s as supabase } from '../chunks/supabase_DLn0xzmn.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: storiesData } = await supabase.from("stories").select(`
    id,
    title,
    slug,
    cover_url,
    genre,
    tags,
    type,
    views,
    users!stories_author_id_fkey (username)
  `).eq("status", "published").order("views", { ascending: false }).limit(4);
  const { count: storiesCount } = await supabase.from("stories").select("*", { count: "exact", head: true }).eq("status", "published");
  const { count: authorsCount } = await supabase.from("users").select("*", { count: "exact", head: true });
  const featuredStories = (storiesData || []).map((story) => ({
    id: story.id,
    title: story.title,
    slug: story.slug,
    author: story.users?.username || "Anonyme",
    coverUrl: story.cover_url,
    genre: story.genre,
    tags: story.tags || [],
    type: story.type,
    views: story.views || 0,
    rating: 0
  }));
  const genres = [
    { name: "Dark Fantasy", icon: "\u{1F311}" },
    { name: "Sci-Fi", icon: "\u{1F680}" },
    { name: "Fantasy", icon: "\u2694\uFE0F" },
    { name: "Anime", icon: "\u{1F38C}" },
    { name: "Gaming", icon: "\u{1F3AE}" },
    { name: "Horreur", icon: "\u{1F47B}" }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Accueil" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="relative"> <!-- Hero Section --> <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"> <!-- Background Effects --> <div class="absolute inset-0"> <div class="absolute inset-0 bg-gradient-to-b from-dark-void via-dark-purple/50 to-dark-void"></div> <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-old/5 rounded-full blur-3xl animate-pulse-slow"></div> <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-dark-purple/30 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 2s;"></div> </div> <!-- Floating Particles --> <div class="absolute inset-0 overflow-hidden pointer-events-none"> ${[...Array(20)].map((_, i) => renderTemplate`<div class="absolute w-1 h-1 bg-gold-old/30 rounded-full animate-float"${addAttribute(`left: ${Math.random() * 100}%; top: ${Math.random() * 100}%; animation-delay: ${Math.random() * 5}s; animation-duration: ${5 + Math.random() * 5}s;`, "style")}></div>`)} </div> <div class="relative z-10 max-w-5xl mx-auto px-4 text-center"> <!-- Main Title --> <h1 class="gothic-title text-5xl md:text-7xl lg:text-8xl mb-6 animate-float">
Grimoire Tales
</h1> <p class="text-xl md:text-2xl text-parchment-light/80 mb-4 font-light">
Là où les histoires prennent vie
</p> <p class="text-lg text-parchment/60 max-w-2xl mx-auto mb-10">
Plongez dans un univers de novels, livres et BD créés par une communauté passionnée. 
          Dark Fantasy, Anime, Gaming - Votre prochaine aventure vous attend.
</p> <!-- CTA Buttons --> <div class="flex flex-col sm:flex-row gap-4 justify-center items-center"> <a href="/catalogue" class="glow-button text-lg px-8 py-4">
Explorer le Catalogue
</a> <a href="/register" class="px-8 py-4 border border-gold-old/50 text-gold-old hover:bg-gold-old/10 rounded transition-all duration-300">
Devenir Auteur
</a> </div> <!-- Stats --> <div class="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"> <div class="text-center"> <div class="text-3xl md:text-4xl font-gothic text-gold-old">${storiesCount || 0}</div> <div class="text-sm text-parchment/60">Histoires</div> </div> <div class="text-center"> <div class="text-3xl md:text-4xl font-gothic text-gold-old">${authorsCount || 0}</div> <div class="text-sm text-parchment/60">Auteurs</div> </div> <div class="text-center"> <div class="text-3xl md:text-4xl font-gothic text-gold-old">0</div> <div class="text-sm text-parchment/60">Lecteurs</div> </div> </div> </div> <!-- Scroll Indicator --> <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"> <svg class="w-6 h-6 text-gold-old/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path> </svg> </div> </section> <!-- Featured Stories --> <section class="relative py-20 px-4"> <div class="max-w-7xl mx-auto"> <div class="flex items-center justify-between mb-10"> <div> <h2 class="gothic-title text-3xl md:text-4xl mb-2">Histoires Populaires</h2> <p class="text-parchment/60">Les récits qui captivent notre communauté</p> </div> <a href="/catalogue" class="hidden md:flex items-center gap-2 text-gold-old hover:text-gold-bright transition-colors">
Voir tout
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> ${featuredStories.map((story) => renderTemplate`${renderComponent($$result2, "StoryCard", $$StoryCard, { ...story })}`)} </div> </div> </section> <!-- Genres Section --> <section class="relative py-20 px-4 bg-dark-purple/20"> <div class="max-w-7xl mx-auto"> <div class="text-center mb-12"> <h2 class="gothic-title text-3xl md:text-4xl mb-2">Explorer par Genre</h2> <p class="text-parchment/60">Trouvez votre prochaine obsession</p> </div> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"> ${genres.map((genre) => renderTemplate`<a${addAttribute(`/catalogue?genre=${encodeURIComponent(genre.name)}`, "href")} class="parchment-card p-6 rounded-lg text-center group hover:border-gold-old/50 transition-all duration-300"> <div class="text-4xl mb-3">${genre.icon}</div> <h3 class="font-gothic text-gold-old group-hover:text-gold-bright transition-colors mb-1"> ${genre.name} </h3> <p class="text-sm text-parchment/50">Explorer</p> </a>`)} </div> </div> </section> <!-- How It Works --> <section class="relative py-20 px-4"> <div class="max-w-5xl mx-auto"> <div class="text-center mb-12"> <h2 class="gothic-title text-3xl md:text-4xl mb-2">Comment ça marche</h2> <p class="text-parchment/60">Rejoignez notre communauté en quelques étapes</p> </div> <div class="grid md:grid-cols-3 gap-8"> <div class="parchment-card p-8 rounded-lg text-center"> <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-old/10 flex items-center justify-center"> <span class="text-3xl">✍️</span> </div> <h3 class="font-gothic text-xl text-gold-old mb-3">Créez</h3> <p class="text-parchment/70">
Utilisez notre éditeur Markdown pour écrire vos novels ou uploadez vos BD panel par panel.
</p> </div> <div class="parchment-card p-8 rounded-lg text-center"> <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-old/10 flex items-center justify-center"> <span class="text-3xl">📢</span> </div> <h3 class="font-gothic text-xl text-gold-old mb-3">Publiez</h3> <p class="text-parchment/70">
Partagez vos créations avec notre communauté de passionnés de dark fantasy et culture geek.
</p> </div> <div class="parchment-card p-8 rounded-lg text-center"> <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-old/10 flex items-center justify-center"> <span class="text-3xl">🏆</span> </div> <h3 class="font-gothic text-xl text-gold-old mb-3">Grandissez</h3> <p class="text-parchment/70">
Gagnez des followers, recevez des feedbacks et montez dans les classements hebdomadaires.
</p> </div> </div> </div> </section> <!-- CTA Section --> <section class="relative py-20 px-4"> <div class="max-w-4xl mx-auto"> <div class="parchment-card p-12 rounded-2xl text-center relative overflow-hidden"> <div class="absolute inset-0 bg-gradient-to-r from-gold-old/5 via-transparent to-gold-old/5"></div> <div class="relative z-10"> <h2 class="gothic-title text-3xl md:text-4xl mb-4">
Prêt à écrire votre légende ?
</h2> <p class="text-parchment/70 mb-8 max-w-xl mx-auto">
Rejoignez des milliers d'auteurs qui partagent leurs univers fantastiques. 
              Votre histoire mérite d'être racontée.
</p> <a href="/register" class="glow-button text-lg px-10 py-4 inline-block">
Commencer Gratuitement
</a> </div> </div> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/Apple/Desktop/Anime_reader/src/pages/index.astro", void 0);

const $$file = "/Users/Apple/Desktop/Anime_reader/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
