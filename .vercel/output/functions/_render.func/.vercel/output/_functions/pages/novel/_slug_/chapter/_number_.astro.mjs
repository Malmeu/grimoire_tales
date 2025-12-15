/* empty css                                          */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../../chunks/astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Navbar } from '../../../../chunks/Navbar_BpY7slON.mjs';
import { N as NovelReader } from '../../../../chunks/NovelReader_DdWVKpvh.mjs';
import { s as supabase } from '../../../../chunks/supabase_DLn0xzmn.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const { data: chapters } = await supabase.from("chapters").select(`
      chapter_number,
      stories!inner (slug, type, status)
    `).eq("stories.type", "novel").eq("stories.status", "published");
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
  const { data: novelData } = await supabase.from("stories").select("id, title, slug").eq("slug", slug).eq("type", "novel").eq("status", "published").single();
  if (!novelData) {
    return Astro2.redirect("/404");
  }
  const { data: chapterData } = await supabase.from("chapters").select("*").eq("story_id", novelData.id).eq("chapter_number", chapterNumber).single();
  if (!chapterData) {
    return Astro2.redirect("/404");
  }
  const { count: totalChapters } = await supabase.from("chapters").select("*", { count: "exact", head: true }).eq("story_id", novelData.id);
  const novel = {
    id: novelData.id,
    title: novelData.title,
    slug: novelData.slug,
    totalChapters: totalChapters || 0
  };
  const currentChapter = {
    title: chapterData.title,
    content: chapterData.content || ""
  };
  const hasNextChapter = chapterNumber < novel.totalChapters;
  const hasPrevChapter = chapterNumber > 1;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${currentChapter.title} - ${novel.title}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-20 min-h-screen"> ${renderComponent($$result2, "NovelReader", NovelReader, { "client:load": true, "content": currentChapter.content, "title": novel.title, "chapterTitle": currentChapter.title, "chapterNumber": chapterNumber, "totalChapters": novel.totalChapters, "storySlug": novel.slug || "", "hasNextChapter": hasNextChapter, "hasPrevChapter": hasPrevChapter, "client:component-hydration": "load", "client:component-path": "/Users/Apple/Desktop/Anime_reader/src/components/NovelReader", "client:component-export": "default" })} </main> ` })}`;
}, "/Users/Apple/Desktop/Anime_reader/src/pages/novel/[slug]/chapter/[number].astro", void 0);

const $$file = "/Users/Apple/Desktop/Anime_reader/src/pages/novel/[slug]/chapter/[number].astro";
const $$url = "/novel/[slug]/chapter/[number]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$number,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
