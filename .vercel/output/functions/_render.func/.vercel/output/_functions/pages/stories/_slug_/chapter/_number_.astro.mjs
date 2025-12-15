/* empty css                                          */
import { c as createComponent, a as createAstro, r as renderTemplate, e as defineScriptVars, d as renderComponent, m as maybeRenderHead, b as addAttribute } from '../../../../chunks/astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Navbar } from '../../../../chunks/Navbar_BpY7slON.mjs';
import { s as supabase } from '../../../../chunks/supabase_DLn0xzmn.mjs';
/* empty css                                             */
export { renderers } from '../../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
async function getStaticPaths() {
  const { data: chapters } = await supabase.from("chapters").select(`
      chapter_number,
      stories!inner (slug, status)
    `).eq("stories.status", "published");
  return (chapters || []).map((ch) => ({
    params: {
      slug: ch.stories.slug,
      number: ch.chapter_number.toString()
    }
  }));
}
const $$number = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$number;
  const { slug, number } = Astro2.params;
  const chapterNumber = parseInt(number || "1");
  const { data: storyData } = await supabase.from("stories").select("id, title, slug").eq("slug", slug).eq("status", "published").single();
  if (!storyData) {
    return Astro2.redirect("/404");
  }
  const { data: chapterData } = await supabase.from("chapters").select("*").eq("story_id", storyData.id).eq("chapter_number", chapterNumber).single();
  if (!chapterData) {
    return Astro2.redirect("/404");
  }
  const { count: totalChapters } = await supabase.from("chapters").select("*", { count: "exact", head: true }).eq("story_id", storyData.id);
  const story = {
    title: storyData.title,
    slug: storyData.slug,
    totalChapters: totalChapters || 0
  };
  const chapter = {
    id: chapterData.id,
    title: chapterData.title,
    number: chapterData.chapter_number,
    content: chapterData.content || ""
  };
  const hasNextChapter = chapterNumber < story.totalChapters;
  const hasPrevChapter = chapterNumber > 1;
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", `
  // Simple Markdown parser
  function parseMarkdown(text) {
    return text
      .replace(/^### (.+)$/gm, '<h3 class="font-gothic text-xl text-gold-old mt-8 mb-4">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="font-gothic text-2xl text-gold-old mt-10 mb-5">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="font-gothic text-3xl text-gold-old mt-12 mb-6">$1</h1>')
      .replace(/\\*\\*(.+?)\\*\\*/g, '<strong class="font-semibold text-parchment-light">$1</strong>')
      .replace(/\\*(.+?)\\*/g, '<em class="italic text-parchment/90">$1</em>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gold-old/50 pl-4 my-6 italic text-parchment/80">$1</blockquote>')
      .replace(/^---$/gm, '<hr class="border-gold-old/20 my-10" />')
      .replace(/\\n\\n/g, '</p><p class="mb-6 leading-relaxed text-lg">')
      .replace(/\\n/g, '<br />');
  }

  const contentEl = document.getElementById('chapter-content');
  if (contentEl) {
    contentEl.innerHTML = '<p class="mb-6 leading-relaxed text-lg">' + parseMarkdown(content) + '</p>';
  }
})();<\/script> `], ["", " <script>(function(){", `
  // Simple Markdown parser
  function parseMarkdown(text) {
    return text
      .replace(/^### (.+)$/gm, '<h3 class="font-gothic text-xl text-gold-old mt-8 mb-4">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="font-gothic text-2xl text-gold-old mt-10 mb-5">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="font-gothic text-3xl text-gold-old mt-12 mb-6">$1</h1>')
      .replace(/\\\\*\\\\*(.+?)\\\\*\\\\*/g, '<strong class="font-semibold text-parchment-light">$1</strong>')
      .replace(/\\\\*(.+?)\\\\*/g, '<em class="italic text-parchment/90">$1</em>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gold-old/50 pl-4 my-6 italic text-parchment/80">$1</blockquote>')
      .replace(/^---$/gm, '<hr class="border-gold-old/20 my-10" />')
      .replace(/\\\\n\\\\n/g, '</p><p class="mb-6 leading-relaxed text-lg">')
      .replace(/\\\\n/g, '<br />');
  }

  const contentEl = document.getElementById('chapter-content');
  if (contentEl) {
    contentEl.innerHTML = '<p class="mb-6 leading-relaxed text-lg">' + parseMarkdown(content) + '</p>';
  }
})();<\/script> `])), renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${chapter.title} - ${story.title}`, "data-astro-cid-bp3qziht": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "data-astro-cid-bp3qziht": true })} ${maybeRenderHead()}<main class="pt-20 pb-20 min-h-screen" data-astro-cid-bp3qziht> <!-- Reading Header --> <div class="fixed top-16 left-0 right-0 z-40 glass-dark border-b border-gold-old/10" data-astro-cid-bp3qziht> <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between" data-astro-cid-bp3qziht> <a${addAttribute(`/stories/${slug}`, "href")} class="flex items-center gap-2 text-parchment/70 hover:text-gold-old transition-colors" data-astro-cid-bp3qziht> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-bp3qziht> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-bp3qziht></path> </svg> <span class="hidden sm:inline" data-astro-cid-bp3qziht>${story.title}</span> </a> <div class="flex items-center gap-4" data-astro-cid-bp3qziht> <span class="text-parchment/50 text-sm" data-astro-cid-bp3qziht>
Chapitre ${chapterNumber} / ${story.totalChapters} </span> <!-- Reading Settings --> <button id="settings-btn" class="p-2 text-parchment/70 hover:text-gold-old transition-colors" data-astro-cid-bp3qziht> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-bp3qziht> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-astro-cid-bp3qziht></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-bp3qziht></path> </svg> </button> </div> </div> </div> <!-- Chapter Content --> <article class="max-w-3xl mx-auto px-4 pt-24" data-astro-cid-bp3qziht> <header class="text-center mb-12" data-astro-cid-bp3qziht> <p class="text-gold-old/70 mb-2" data-astro-cid-bp3qziht>Chapitre ${chapterNumber}</p> <h1 class="gothic-title text-3xl md:text-4xl" data-astro-cid-bp3qziht>${chapter.title}</h1> </header> <div class="markdown-content prose prose-invert max-w-none" id="chapter-content" data-astro-cid-bp3qziht> <!-- Le contenu Markdown sera rendu ici --> </div> </article> <!-- Chapter Navigation --> <nav class="max-w-3xl mx-auto px-4 mt-16 pt-8 border-t border-gold-old/20" data-astro-cid-bp3qziht> <div class="flex items-center justify-between" data-astro-cid-bp3qziht> ${hasPrevChapter ? renderTemplate`<a${addAttribute(`/stories/${slug}/chapter/${chapterNumber - 1}`, "href")} class="flex items-center gap-2 px-6 py-3 parchment-card rounded-lg hover:border-gold-old/50 transition-colors" data-astro-cid-bp3qziht> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-bp3qziht> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-bp3qziht></path> </svg> <span data-astro-cid-bp3qziht>Chapitre précédent</span> </a>` : renderTemplate`<div data-astro-cid-bp3qziht></div>`} ${hasNextChapter ? renderTemplate`<a${addAttribute(`/stories/${slug}/chapter/${chapterNumber + 1}`, "href")} class="flex items-center gap-2 px-6 py-3 glow-button" data-astro-cid-bp3qziht> <span data-astro-cid-bp3qziht>Chapitre suivant</span> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-bp3qziht> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-astro-cid-bp3qziht></path> </svg> </a>` : renderTemplate`<a${addAttribute(`/stories/${slug}`, "href")} class="flex items-center gap-2 px-6 py-3 glow-button" data-astro-cid-bp3qziht> <span data-astro-cid-bp3qziht>Fin de l'histoire</span> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-bp3qziht> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-astro-cid-bp3qziht></path> </svg> </a>`} </div> </nav> </main> ` }), defineScriptVars({ content: chapter.content }));
}, "/Users/Apple/Desktop/Anime_reader/src/pages/stories/[slug]/chapter/[number].astro", void 0);

const $$file = "/Users/Apple/Desktop/Anime_reader/src/pages/stories/[slug]/chapter/[number].astro";
const $$url = "/stories/[slug]/chapter/[number]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$number,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
