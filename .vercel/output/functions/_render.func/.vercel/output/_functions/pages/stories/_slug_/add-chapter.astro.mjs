/* empty css                                       */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../../chunks/astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Navbar } from '../../../chunks/Navbar_BpY7slON.mjs';
import { E as Editor } from '../../../chunks/Editor_j1aR_6yA.mjs';
import { s as supabase } from '../../../chunks/supabase_DLn0xzmn.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const { data: stories } = await supabase.from("stories").select("slug").eq("status", "published");
  return (stories || []).map((s) => ({
    params: { slug: s.slug }
  }));
}
const $$AddChapter = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AddChapter;
  const { slug } = Astro2.params;
  const { data: story } = await supabase.from("stories").select(`
    id,
    title,
    slug,
    author_id,
    type
  `).eq("slug", slug).single();
  if (!story) {
    return Astro2.redirect("/404");
  }
  const { count: chapterCount } = await supabase.from("chapters").select("*", { count: "exact", head: true }).eq("story_id", story.id);
  const nextChapterNumber = (chapterCount || 0) + 1;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Nouveau chapitre - ${story.title}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-24 pb-20 px-4"> <div class="max-w-4xl mx-auto"> <div class="mb-8"> <a${addAttribute(`/stories/${slug}`, "href")} class="text-gold-old hover:text-gold-bright transition-colors mb-4 inline-flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg>
Retour à l'histoire
</a> <h1 class="gothic-title text-3xl md:text-4xl mb-2">Nouveau Chapitre</h1> <p class="text-parchment/70"> <span class="text-gold-old">${story.title}</span> - Chapitre ${nextChapterNumber} </p> </div> <form id="chapter-form" class="space-y-6"${addAttribute(story.id, "data-story-id")}${addAttribute(story.slug, "data-story-slug")}${addAttribute(story.type, "data-story-type")}${addAttribute(nextChapterNumber, "data-next-number")}> <!-- Chapter Title --> <div> <label for="chapter-title" class="block text-sm text-parchment mb-2">Titre du chapitre *</label> <input type="text" id="chapter-title" name="chapter-title" required class="w-full px-4 py-3 bg-dark-void/50 border border-gold-old/20 rounded-lg text-parchment-light placeholder-parchment/40 focus:outline-none focus:border-gold-old/50 transition-colors text-xl font-gothic"${addAttribute(`Chapitre ${nextChapterNumber}: ...`, "placeholder")}> </div> <!-- For comics: Image upload --> ${story.type === "comic" && renderTemplate`<div> <label class="block text-sm text-parchment mb-2">Pages du chapitre (BD)</label> <div class="parchment-card p-8 rounded-lg border-2 border-dashed border-gold-old/30 text-center hover:border-gold-old/50 transition-colors cursor-pointer" id="pages-dropzone"> <svg class="w-12 h-12 mx-auto mb-4 text-parchment/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> <p class="text-parchment/70 mb-2">Glissez les images ou cliquez pour sélectionner</p> <p class="text-sm text-parchment/50">PNG, JPG - Plusieurs fichiers acceptés</p> <input type="file" id="pages-input" accept="image/*" multiple class="hidden"> </div> <div id="pages-preview" class="grid grid-cols-4 gap-2 mt-4"></div> </div>`} <!-- For novels: Content editor --> ${story.type !== "comic" && renderTemplate`<div> <label class="block text-sm text-parchment mb-2">Contenu du chapitre *</label> ${renderComponent($$result2, "Editor", Editor, { "client:load": true, "placeholder": "\xC9crivez la suite de votre histoire...", "client:component-hydration": "load", "client:component-path": "/Users/Apple/Desktop/Anime_reader/src/components/Editor", "client:component-export": "default" })} </div>`} <!-- Actions --> <div class="flex flex-wrap gap-4 pt-4"> <button type="submit" class="glow-button px-8 py-3 text-lg">
Publier le chapitre
</button> <button type="button" class="px-8 py-3 border border-gold-old/50 text-gold-old rounded hover:bg-gold-old/10 transition-colors">
Sauvegarder en brouillon
</button> </div> </form> </div> </main> ` })} `;
}, "/Users/Apple/Desktop/Anime_reader/src/pages/stories/[slug]/add-chapter.astro", void 0);

const $$file = "/Users/Apple/Desktop/Anime_reader/src/pages/stories/[slug]/add-chapter.astro";
const $$url = "/stories/[slug]/add-chapter";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AddChapter,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
