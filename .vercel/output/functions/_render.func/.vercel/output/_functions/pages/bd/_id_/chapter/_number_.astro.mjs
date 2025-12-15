/* empty css                                          */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../../../chunks/astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Navbar } from '../../../../chunks/Navbar_BpY7slON.mjs';
import { B as BDReader } from '../../../../chunks/BDReader_DWjALbl9.mjs';
import { s as supabase } from '../../../../chunks/supabase_DLn0xzmn.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const { data: chapters } = await supabase.from("chapters").select(`
      chapter_number,
      story_id,
      stories!inner (id, type, status)
    `).eq("stories.type", "comic").eq("stories.status", "published");
  return (chapters || []).map((ch) => ({
    params: {
      id: ch.story_id,
      number: ch.chapter_number.toString()
    }
  }));
}
const $$number = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$number;
  const { id, number } = Astro2.params;
  const chapterNumber = parseInt(number || "1");
  const { data: bdData } = await supabase.from("stories").select(`
    *,
    users!stories_author_id_fkey (username, avatar_url)
  `).eq("id", id).eq("type", "comic").eq("status", "published").single();
  if (!bdData) {
    return Astro2.redirect("/404");
  }
  const { data: chapterData } = await supabase.from("chapters").select("*").eq("story_id", id).eq("chapter_number", chapterNumber).single();
  if (!chapterData) {
    return Astro2.redirect("/404");
  }
  const { count: totalChapters } = await supabase.from("chapters").select("*", { count: "exact", head: true }).eq("story_id", id);
  const bd = {
    id: bdData.id,
    title: bdData.title,
    author: {
      username: bdData.users?.username || "Anonyme",
      avatar_url: bdData.users?.avatar_url
    },
    description: bdData.description || "",
    genre: bdData.genre,
    totalChapters: totalChapters || 0
  };
  const currentChapter = {
    title: chapterData.title,
    pages: chapterData.images || []
  };
  const hasNextChapter = chapterNumber < bd.totalChapters;
  const hasPrevChapter = chapterNumber > 1;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${currentChapter.title} - ${bd.title}`, "description": bd.description }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-20 pb-8 min-h-screen"> <!-- Header with navigation --> <div class="fixed top-16 left-0 right-0 z-40 glass-dark border-b border-[var(--card-border)]"> <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"> <div class="flex items-center gap-3"> <a${addAttribute(`/bd/${id}`, "href")} class="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg> <span class="hidden sm:inline">${bd.title}</span> </a> </div> <div class="flex items-center gap-2"> <span class="text-[var(--accent-primary)] text-sm font-medium">${currentChapter.title}</span> <span class="text-[var(--text-secondary)] text-sm">
(${chapterNumber}/${bd.totalChapters})
</span> </div> <div class="flex items-center gap-2"> ${hasPrevChapter && renderTemplate`<a${addAttribute(`/bd/${id}/chapter/${chapterNumber - 1}`, "href")} class="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" title="Chapitre précédent"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg> </a>`} ${hasNextChapter && renderTemplate`<a${addAttribute(`/bd/${id}/chapter/${chapterNumber + 1}`, "href")} class="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" title="Chapitre suivant"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a>`} </div> </div> </div> <!-- BD Reader --> <section class="max-w-7xl mx-auto px-2 md:px-4 pt-16"> ${renderComponent($$result2, "BDReader", BDReader, { "client:load": true, "pages": currentChapter.pages, "title": bd.title, "chapterTitle": currentChapter.title, "hasNextChapter": hasNextChapter, "hasPrevChapter": hasPrevChapter, "client:component-hydration": "load", "client:component-path": "/Users/Apple/Desktop/Anime_reader/src/components/BDReader", "client:component-export": "default" })} </section> <!-- Chapter Navigation Footer --> <nav class="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-[var(--card-border)]"> <div class="flex items-center justify-between"> ${hasPrevChapter ? renderTemplate`<a${addAttribute(`/bd/${id}/chapter/${chapterNumber - 1}`, "href")} class="flex items-center gap-2 px-6 py-3 parchment-card rounded-lg hover:border-[var(--accent-primary)]/50 transition-colors"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg> <div class="text-left"> <span class="text-[var(--text-secondary)] text-xs block">Précédent</span> <span class="text-[var(--text-primary)]">Chapitre ${chapterNumber - 1}</span> </div> </a>` : renderTemplate`<div></div>`} <a${addAttribute(`/bd/${id}`, "href")} class="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
📚 Tous les chapitres
</a> ${hasNextChapter ? renderTemplate`<a${addAttribute(`/bd/${id}/chapter/${chapterNumber + 1}`, "href")} class="flex items-center gap-2 px-6 py-3 glow-button"> <div class="text-right"> <span class="text-xs block opacity-80">Suivant</span> <span>Chapitre ${chapterNumber + 1}</span> </div> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a>` : renderTemplate`<a${addAttribute(`/bd/${id}`, "href")} class="flex items-center gap-2 px-6 py-3 glow-button"> <span>Fin de la BD</span> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </a>`} </div> </nav> </main> ` })}`;
}, "/Users/Apple/Desktop/Anime_reader/src/pages/bd/[id]/chapter/[number].astro", void 0);

const $$file = "/Users/Apple/Desktop/Anime_reader/src/pages/bd/[id]/chapter/[number].astro";
const $$url = "/bd/[id]/chapter/[number]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$number,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
