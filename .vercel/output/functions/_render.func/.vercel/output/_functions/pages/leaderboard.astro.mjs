/* empty css                                 */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Navbar } from '../chunks/Navbar_BpY7slON.mjs';
import { $ as $$Footer } from '../chunks/Footer_BkCLQ1Bc.mjs';
import { s as supabase } from '../chunks/supabase_DLn0xzmn.mjs';
export { renderers } from '../renderers.mjs';

const $$Leaderboard = createComponent(async ($$result, $$props, $$slots) => {
  const { data: topStoriesData } = await supabase.from("stories").select(`
    id,
    title,
    slug,
    type,
    views,
    users!stories_author_id_fkey (username)
  `).eq("status", "published").order("views", { ascending: false }).limit(5);
  const { data: authorsData } = await supabase.from("users").select("id, username").limit(5);
  const weeklyTop = (topStoriesData || []).map((story, index) => ({
    rank: index + 1,
    title: story.title,
    author: story.users?.username || "Anonyme",
    views: story.views || 0,
    likes: 0,
    type: story.type,
    slug: story.slug
  }));
  const monthlyTop = weeklyTop;
  const topAuthors = (authorsData || []).map((author, index) => ({
    rank: index + 1,
    username: author.username,
    followers: 0,
    stories: 0,
    totalViews: 0
  }));
  const formatNumber = (num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num.toString();
  };
  const getRankIcon = (rank) => {
    if (rank === 1) return "\u{1F947}";
    if (rank === 2) return "\u{1F948}";
    if (rank === 3) return "\u{1F949}";
    return rank.toString();
  };
  const typeLabels = {
    novel: "Novel",
    book: "Livre",
    comic: "BD"
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Classement", "description": "D\xE9couvrez les histoires et auteurs les plus populaires" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-24 pb-20 px-4"> <div class="max-w-6xl mx-auto"> <div class="text-center mb-12"> <h1 class="gothic-title text-4xl md:text-5xl mb-4">Classement</h1> <p class="text-parchment/70">Les histoires et auteurs qui font vibrer notre communauté</p> </div> <div class="grid lg:grid-cols-2 gap-8"> <!-- Weekly Top --> <section class="parchment-card rounded-xl p-6"> <div class="flex items-center gap-3 mb-6"> <span class="text-2xl">🔥</span> <h2 class="font-gothic text-2xl text-gold-old">Top Hebdomadaire</h2> </div> <div class="space-y-3"> ${weeklyTop.map((item) => renderTemplate`<a${addAttribute(`/stories/${item.title.toLowerCase().replace(/\s+/g, "-")}`, "href")} class="flex items-center gap-4 p-3 rounded-lg hover:bg-gold-old/5 transition-colors group"> <div class="w-10 h-10 flex items-center justify-center text-xl"> ${getRankIcon(item.rank)} </div> <div class="flex-1 min-w-0"> <h3 class="text-parchment-light group-hover:text-gold-old transition-colors truncate"> ${item.title} </h3> <p class="text-sm text-parchment/60">
par ${item.author} • <span class="text-gold-old/70">${typeLabels[item.type]}</span> </p> </div> <div class="text-right text-sm"> <div class="text-parchment-light">${formatNumber(item.views)} vues</div> <div class="text-parchment/60">${formatNumber(item.likes)} ❤️</div> </div> </a>`)} </div> </section> <!-- Monthly Top --> <section class="parchment-card rounded-xl p-6"> <div class="flex items-center gap-3 mb-6"> <span class="text-2xl">⭐</span> <h2 class="font-gothic text-2xl text-gold-old">Top Mensuel</h2> </div> <div class="space-y-3"> ${monthlyTop.map((item) => renderTemplate`<a${addAttribute(`/stories/${item.title.toLowerCase().replace(/\s+/g, "-")}`, "href")} class="flex items-center gap-4 p-3 rounded-lg hover:bg-gold-old/5 transition-colors group"> <div class="w-10 h-10 flex items-center justify-center text-xl"> ${getRankIcon(item.rank)} </div> <div class="flex-1 min-w-0"> <h3 class="text-parchment-light group-hover:text-gold-old transition-colors truncate"> ${item.title} </h3> <p class="text-sm text-parchment/60">
par ${item.author} • <span class="text-gold-old/70">${typeLabels[item.type]}</span> </p> </div> <div class="text-right text-sm"> <div class="text-parchment-light">${formatNumber(item.views)} vues</div> <div class="text-parchment/60">${formatNumber(item.likes)} ❤️</div> </div> </a>`)} </div> </section> </div> <!-- Top Authors --> <section class="mt-12 parchment-card rounded-xl p-6"> <div class="flex items-center gap-3 mb-6"> <span class="text-2xl">✍️</span> <h2 class="font-gothic text-2xl text-gold-old">Auteurs Populaires</h2> </div> <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4"> ${topAuthors.map((author) => renderTemplate`<a${addAttribute(`/authors/${author.username}`, "href")} class="parchment-card p-4 rounded-lg text-center hover:border-gold-old/50 transition-all group"> <div class="text-2xl mb-2">${getRankIcon(author.rank)}</div> <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-dark-purple flex items-center justify-center text-2xl text-gold-old font-gothic"> ${author.username.charAt(0)} </div> <h3 class="font-gothic text-gold-old group-hover:text-gold-bright transition-colors mb-1"> ${author.username} </h3> <p class="text-sm text-parchment/60 mb-2">${author.stories} histoires</p> <div class="flex justify-center gap-4 text-xs text-parchment/50"> <span>${formatNumber(author.followers)} abonnés</span> <span>${formatNumber(author.totalViews)} vues</span> </div> </a>`)} </div> </section> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/Apple/Desktop/Anime_reader/src/pages/leaderboard.astro", void 0);

const $$file = "/Users/Apple/Desktop/Anime_reader/src/pages/leaderboard.astro";
const $$url = "/leaderboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Leaderboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
