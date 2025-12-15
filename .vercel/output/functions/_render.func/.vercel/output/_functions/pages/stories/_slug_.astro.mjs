/* empty css                                    */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Navbar } from '../../chunks/Navbar_BpY7slON.mjs';
import { $ as $$Footer } from '../../chunks/Footer_BkCLQ1Bc.mjs';
import { C as CommentFeed } from '../../chunks/CommentFeed_B1fkU1Z0.mjs';
import { s as supabase } from '../../chunks/supabase_DLn0xzmn.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const { data: stories } = await supabase.from("stories").select("slug").eq("status", "published");
  return (stories || []).map((story) => ({
    params: { slug: story.slug }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const { data: storyData } = await supabase.from("stories").select(`
    *,
    users!stories_author_id_fkey (username, avatar_url, bio_geek),
    chapters (id, title, chapter_number)
  `).eq("slug", slug).eq("status", "published").single();
  if (!storyData) {
    return Astro2.redirect("/404");
  }
  const story = {
    id: storyData.id,
    title: storyData.title,
    slug: storyData.slug,
    author: {
      username: storyData.users?.username || "Anonyme",
      avatar_url: storyData.users?.avatar_url,
      bio: storyData.users?.bio_geek || ""
    },
    description: storyData.description || "",
    coverUrl: storyData.cover_url,
    genre: storyData.genre,
    tags: storyData.tags || [],
    type: storyData.type,
    views: storyData.views || 0,
    rating: 0,
    chapters: (storyData.chapters || []).map((ch) => ({
      id: ch.id,
      title: ch.title,
      number: ch.chapter_number
    })).sort((a, b) => a.number - b.number),
    created_at: storyData.created_at,
    updated_at: storyData.updated_at
  };
  const formatViews = (num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num.toString();
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": story.title, "description": story.description, "image": story.coverUrl }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-20 pb-20"> <!-- Hero Section --> <section class="relative"> <div class="absolute inset-0 h-96"> <img${addAttribute(story.coverUrl, "src")}${addAttribute(story.title, "alt")} class="w-full h-full object-cover"> <div class="absolute inset-0 bg-gradient-to-t from-dark-void via-dark-void/80 to-dark-void/40"></div> </div> <div class="relative max-w-6xl mx-auto px-4 pt-32 pb-12"> <div class="flex flex-col md:flex-row gap-8"> <!-- Cover --> <div class="flex-shrink-0"> <img${addAttribute(story.coverUrl, "src")}${addAttribute(story.title, "alt")} class="w-48 md:w-64 rounded-lg shadow-dark floating-shadow"> </div> <!-- Info --> <div class="flex-1"> <div class="flex flex-wrap gap-2 mb-4"> <span class="px-3 py-1 bg-gold-old/20 text-gold-old text-sm rounded-full"> ${story.type === "novel" ? "Novel" : story.type === "comic" ? "BD" : "Livre"} </span> <span class="px-3 py-1 bg-dark-purple/50 text-parchment text-sm rounded-full"> ${story.genre} </span> </div> <h1 class="gothic-title text-4xl md:text-5xl mb-4">${story.title}</h1> <div class="flex items-center gap-4 mb-6"> <a${addAttribute(`/authors/${story.author.username}`, "href")} class="flex items-center gap-3 group"> <div class="w-10 h-10 rounded-full bg-dark-purple flex items-center justify-center text-gold-old font-gothic"> ${story.author.username.charAt(0)} </div> <span class="text-parchment-light group-hover:text-gold-old transition-colors"> ${story.author.username} </span> </a> <span class="text-parchment/50">•</span> <span class="text-parchment/70">${story.chapters.length} chapitres</span> </div> <p class="text-parchment/80 leading-relaxed mb-6 max-w-2xl"> ${story.description} </p> <!-- Tags --> <div class="flex flex-wrap gap-2 mb-6"> ${story.tags.map((tag) => renderTemplate`<a${addAttribute(`/catalogue?tag=${tag}`, "href")} class="px-3 py-1 bg-dark-void/50 text-parchment/70 text-sm rounded hover:text-gold-old transition-colors">
#${tag} </a>`)} </div> <!-- Stats --> <div class="flex items-center gap-6 mb-8"> <div class="flex items-center gap-2 text-parchment/70"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path> </svg> ${formatViews(story.views)} vues
</div> <div class="flex items-center gap-1"> ${[1, 2, 3, 4, 5].map((star) => renderTemplate`<svg${addAttribute(`w-5 h-5 ${star <= Math.round(story.rating) ? "text-gold-old" : "text-parchment/30"}`, "class")} fill="currentColor" viewBox="0 0 20 20"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path> </svg>`)} <span class="ml-2 text-parchment/70">${story.rating}</span> </div> </div> <!-- Actions --> <div class="flex flex-wrap gap-4"> <a${addAttribute(`/stories/${slug}/chapter/1`, "href")} class="glow-button px-8 py-3 text-lg flex items-center gap-2"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path> </svg>
Commencer la lecture
</a> <button class="px-6 py-3 border border-gold-old/50 text-gold-old rounded hover:bg-gold-old/10 transition-colors flex items-center gap-2"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path> </svg>
Ajouter aux favoris
</button> <button class="px-6 py-3 border border-gold-old/50 text-gold-old rounded hover:bg-gold-old/10 transition-colors flex items-center gap-2"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path> </svg>
Partager
</button> </div> </div> </div> </div> </section> <!-- Chapters List --> <section class="max-w-6xl mx-auto px-4 py-12"> <div class="flex items-center justify-between mb-6"> <h2 class="gothic-title text-2xl">Chapitres</h2> <a${addAttribute(`/stories/${slug}/add-chapter`, "href")} class="add-chapter-btn hidden px-4 py-2 bg-gold-old/20 text-gold-old rounded hover:bg-gold-old/30 transition-colors items-center gap-2"${addAttribute(storyData.author_id, "data-author-id")}> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Ajouter un chapitre
</a> </div> <div class="parchment-card rounded-lg overflow-hidden"> ${story.chapters.map((chapter, idx) => renderTemplate`<a${addAttribute(`/stories/${slug}/chapter/${chapter.number}`, "href")}${addAttribute(`flex items-center justify-between p-4 hover:bg-gold-old/5 transition-colors ${idx !== story.chapters.length - 1 ? "border-b border-gold-old/10" : ""}`, "class")}> <div class="flex items-center gap-4"> <span class="w-8 h-8 flex items-center justify-center bg-dark-purple/50 rounded text-gold-old text-sm"> ${chapter.number} </span> <span class="text-parchment-light">${chapter.title}</span> </div> <svg class="w-5 h-5 text-parchment/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a>`)} </div> </section> <!-- Comments --> <section class="max-w-6xl mx-auto px-4 py-12"> ${renderComponent($$result2, "CommentFeed", CommentFeed, { "client:load": true, "storyId": story.id, "client:component-hydration": "load", "client:component-path": "/Users/Apple/Desktop/Anime_reader/src/components/CommentFeed", "client:component-export": "default" })} </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} `;
}, "/Users/Apple/Desktop/Anime_reader/src/pages/stories/[slug].astro", void 0);

const $$file = "/Users/Apple/Desktop/Anime_reader/src/pages/stories/[slug].astro";
const $$url = "/stories/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
