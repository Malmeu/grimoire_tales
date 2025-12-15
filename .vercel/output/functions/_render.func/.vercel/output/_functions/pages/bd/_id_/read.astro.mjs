/* empty css                                       */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../../chunks/astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Navbar } from '../../../chunks/Navbar_BpY7slON.mjs';
import { B as BDReader } from '../../../chunks/BDReader_DWjALbl9.mjs';
import { s as supabase } from '../../../chunks/supabase_DLn0xzmn.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const { data: stories } = await supabase.from("stories").select("id").eq("type", "comic").eq("status", "published");
  return (stories || []).map((s) => ({
    params: { id: s.id }
  }));
}
const $$Read = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Read;
  const { id } = Astro2.params;
  const { data: bdData } = await supabase.from("stories").select(`
    *,
    users!stories_author_id_fkey (username, avatar_url),
    chapters (id, title, chapter_number, images)
  `).eq("id", id).eq("type", "comic").eq("status", "published").single();
  if (!bdData) {
    return Astro2.redirect("/404");
  }
  const bd = {
    id: bdData.id,
    title: bdData.title,
    author: {
      username: bdData.users?.username || "Anonyme",
      avatar_url: bdData.users?.avatar_url
    },
    description: bdData.description || "",
    genre: bdData.genre,
    chapters: (bdData.chapters || []).map((ch) => ({
      id: ch.id,
      number: ch.chapter_number,
      title: ch.title,
      pages: ch.images || []
    })).sort((a, b) => a.number - b.number)
  };
  if (bd.chapters.length === 0) {
    return Astro2.redirect("/404");
  }
  const firstChapter = bd.chapters[0];
  const currentChapter = firstChapter;
  const totalChapters = bd.chapters.length;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${bd.title} - Lecture`, "description": bd.description }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-20 pb-8 min-h-screen"> <!-- BD Info Header --> <section class="max-w-6xl mx-auto px-4 py-6"> <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6"> <div> <div class="flex items-center gap-3 mb-2"> <a${addAttribute(`/bd/${id}`, "href")} class="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg> </a> <span class="px-3 py-1 bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-sm rounded-full">BD</span> <span class="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-sm rounded-full">${bd.genre}</span> </div> <h1 class="gothic-title text-2xl md:text-3xl">${bd.title}</h1> <div class="flex items-center gap-3 mt-2 text-sm"> <span class="text-[var(--text-secondary)]">par</span> <a${addAttribute(`/authors/${bd.author.username}`, "href")} class="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors"> ${bd.author.username} </a> </div> </div> <!-- Chapter Selector --> <div class="flex items-center gap-3"> <label class="text-[var(--text-secondary)] text-sm">Chapitre:</label> <select id="chapter-select" class="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-lg text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none"> ${bd.chapters.map((chapter) => renderTemplate`<option${addAttribute(chapter.number, "value")}${addAttribute(chapter.number === 1, "selected")}> ${chapter.title} </option>`)} </select> </div> </div> </section> <!-- BD Reader --> <section class="max-w-7xl mx-auto px-2 md:px-4"> ${renderComponent($$result2, "BDReader", BDReader, { "client:load": true, "pages": currentChapter.pages, "title": bd.title, "chapterTitle": currentChapter.title, "hasNextChapter": currentChapter.number < totalChapters, "hasPrevChapter": currentChapter.number > 1, "client:component-hydration": "load", "client:component-path": "/Users/Apple/Desktop/Anime_reader/src/components/BDReader", "client:component-export": "default" })} </section> <!-- Chapter List --> <section class="max-w-6xl mx-auto px-4 py-8 mt-8"> <h2 class="gothic-title text-xl mb-4">Tous les chapitres</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> ${bd.chapters.map((chapter) => renderTemplate`<a${addAttribute(`/bd/${id}/chapter/${chapter.number}`, "href")}${addAttribute(`p-4 parchment-card rounded-lg hover:border-[var(--accent-primary)]/50 transition-all group ${chapter.number === 1 ? "border-[var(--accent-primary)]" : ""}`, "class")}> <div class="flex items-center gap-4"> <div class="w-16 h-20 rounded overflow-hidden flex-shrink-0"> <img${addAttribute(chapter.pages[0], "src")}${addAttribute(chapter.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform"> </div> <div> <span class="text-[var(--accent-primary)] text-sm">Chapitre ${chapter.number}</span> <h3 class="text-[var(--text-primary)] font-medium">${chapter.title}</h3> <p class="text-[var(--text-secondary)] text-sm">${chapter.pages.length} pages</p> </div> </div> </a>`)} </div> </section> </main> ` })} `;
}, "/Users/Apple/Desktop/Anime_reader/src/pages/bd/[id]/read.astro", void 0);

const $$file = "/Users/Apple/Desktop/Anime_reader/src/pages/bd/[id]/read.astro";
const $$url = "/bd/[id]/read";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Read,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
