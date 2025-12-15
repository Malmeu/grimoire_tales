/* empty css                                 */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Navbar } from '../chunks/Navbar_BpY7slON.mjs';
import { $ as $$Footer } from '../chunks/Footer_BkCLQ1Bc.mjs';
import { s as supabase } from '../chunks/supabase_DLn0xzmn.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: novels, error } = await supabase.from("stories").select(`
    id,
    title,
    slug,
    description,
    cover_url,
    genre,
    tags,
    views,
    created_at,
    author_id,
    users!stories_author_id_fkey (
      username,
      avatar_url
    )
  `).eq("type", "novel").eq("status", "published").order("created_at", { ascending: false });
  const displayNovels = novels || [];
  const formatViews = (num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num.toString();
  };
  const genres = ["Tous", "Dark Fantasy", "Fantasy", "Sci-Fi", "Romance", "Horreur", "Thriller"];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Novels - Grimoire Tales", "description": "D\xE9couvrez notre collection de romans et nouvelles. Des histoires captivantes \xE9crites par des auteurs passionn\xE9s." }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-20 pb-20 min-h-screen"> <!-- Hero Section --> <section class="relative py-16 overflow-hidden"> <div class="absolute inset-0 bg-gradient-to-b from-[var(--accent-primary)]/10 to-transparent"></div> <div class="relative max-w-6xl mx-auto px-4 text-center"> <h1 class="gothic-title text-4xl md:text-6xl mb-4">
📖 Novels & Romans
</h1> <p class="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-8">
Laissez-vous emporter par des récits immersifs. Des histoires qui vous transportent 
          dans des mondes extraordinaires, mot après mot.
</p> <!-- Stats --> <div class="flex justify-center gap-8 md:gap-16"> <div class="text-center"> <div class="text-3xl font-bold text-[var(--accent-primary)]">${displayNovels.length}</div> <div class="text-[var(--text-secondary)] text-sm">Romans disponibles</div> </div> <div class="text-center"> <div class="text-3xl font-bold text-[var(--accent-primary)]"> ${formatViews(displayNovels.reduce((acc, n) => acc + (n.views || 0), 0))} </div> <div class="text-[var(--text-secondary)] text-sm">Lectures totales</div> </div> </div> </div> </section> <!-- Filters --> <section class="max-w-6xl mx-auto px-4 py-8"> <div class="flex flex-wrap items-center justify-between gap-4 mb-8"> <div class="flex flex-wrap gap-2"> ${genres.map((genre, idx) => renderTemplate`<button${addAttribute(`px-4 py-2 rounded-full text-sm transition-colors ${idx === 0 ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/50 border border-[var(--card-border)]"}`, "class")}${addAttribute(genre, "data-genre")}> ${genre} </button>`)} </div> <div class="flex items-center gap-3"> <span class="text-[var(--text-secondary)] text-sm">Trier par:</span> <select class="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-lg text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none"> <option value="recent">Plus récents</option> <option value="popular">Plus populaires</option> <option value="views">Plus vus</option> </select> </div> </div> </section> <!-- Novels Grid --> <section class="max-w-6xl mx-auto px-4"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${displayNovels.map((novel) => renderTemplate`<a${addAttribute(`/novel/${novel.slug}`, "href")} class="group parchment-card rounded-xl overflow-hidden hover:border-[var(--accent-primary)]/50 transition-all hover:-translate-y-1"> <div class="flex gap-4 p-4"> <!-- Cover --> <div class="flex-shrink-0 w-24 h-36 rounded-lg overflow-hidden"> <img${addAttribute(novel.cover_url || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop", "src")}${addAttribute(novel.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"> </div> <!-- Info --> <div class="flex-1 min-w-0"> <div class="flex items-center gap-2 mb-2"> <span class="px-2 py-0.5 bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-xs rounded-full"> ${novel.genre} </span> </div> <h3 class="text-[var(--text-primary)] font-semibold mb-1 line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors"> ${novel.title} </h3> <p class="text-[var(--text-secondary)] text-sm mb-2">
par ${novel.users?.username || "Anonyme"} </p> <p class="text-[var(--text-secondary)] text-sm line-clamp-2 mb-3"> ${novel.description} </p> <div class="flex items-center gap-3 text-xs text-[var(--text-secondary)]"> <span class="flex items-center gap-1"> <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path> </svg> ${formatViews(novel.views || 0)} </span> </div> </div> </div> <!-- Tags --> <div class="px-4 pb-4 flex flex-wrap gap-1"> ${(novel.tags || []).slice(0, 4).map((tag) => renderTemplate`<span class="px-2 py-0.5 bg-[var(--bg-primary)] text-[var(--text-secondary)] text-xs rounded">
#${tag} </span>`)} </div> </a>`)} </div> ${displayNovels.length === 0 && renderTemplate`<div class="text-center py-16"> <div class="text-6xl mb-4">📖</div> <h3 class="text-xl text-[var(--text-primary)] mb-2">Aucun roman disponible</h3> <p class="text-[var(--text-secondary)]">Soyez le premier à publier un roman !</p> <a href="/write" class="inline-block mt-4 glow-button px-6 py-3">
Écrire un roman
</a> </div>`} </section> <!-- CTA Section --> <section class="max-w-6xl mx-auto px-4 py-8"> <div class="parchment-card rounded-2xl p-8 md:p-12 text-center"> <h2 class="gothic-title text-2xl md:text-3xl mb-4">Vous avez une histoire à raconter ?</h2> <p class="text-[var(--text-secondary)] max-w-xl mx-auto mb-6">
Partagez vos récits avec notre communauté. Publiez vos romans, recevez des retours 
          et construisez votre audience de lecteurs passionnés.
</p> <a href="/write" class="glow-button px-8 py-3 text-lg inline-flex items-center gap-2"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path> </svg>
Commencer à écrire
</a> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/Apple/Desktop/Anime_reader/src/pages/novels/index.astro", void 0);

const $$file = "/Users/Apple/Desktop/Anime_reader/src/pages/novels/index.astro";
const $$url = "/novels";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
