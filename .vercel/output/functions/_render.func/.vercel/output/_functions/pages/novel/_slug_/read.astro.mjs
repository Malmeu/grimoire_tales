/* empty css                                       */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Navbar } from '../../../chunks/Navbar_BpY7slON.mjs';
import { N as NovelReader } from '../../../chunks/NovelReader_DdWVKpvh.mjs';
import { s as supabase } from '../../../chunks/supabase_DLn0xzmn.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const { data: stories } = await supabase.from("stories").select("slug").eq("type", "novel").eq("status", "published");
  return (stories || []).map((s) => ({
    params: { slug: s.slug }
  }));
}
const $$Read = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Read;
  const { slug } = Astro2.params;
  const { data: novelData } = await supabase.from("stories").select(`
    *,
    users!stories_author_id_fkey (username, avatar_url),
    chapters (id, title, chapter_number, content)
  `).eq("slug", slug).eq("type", "novel").eq("status", "published").single();
  if (!novelData) {
    return Astro2.redirect("/404");
  }
  const chapters = (novelData.chapters || []).sort((a, b) => a.chapter_number - b.chapter_number);
  if (chapters.length === 0) {
    return Astro2.redirect("/404");
  }
  const novel = {
    id: novelData.id,
    title: novelData.title,
    slug: novelData.slug,
    author: {
      username: novelData.users?.username || "Anonyme",
      avatar_url: novelData.users?.avatar_url
    },
    description: novelData.description || "",
    coverUrl: novelData.cover_url,
    genre: novelData.genre,
    totalChapters: chapters.length
  };
  const firstChapter = chapters[0];
  const chapter = {
    number: firstChapter.chapter_number,
    title: firstChapter.title,
    content: firstChapter.content || ""
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${chapter.title} - ${novel.title}`, "description": novel.description }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-20 min-h-screen"> ${renderComponent($$result2, "NovelReader", NovelReader, { "client:load": true, "content": chapter.content, "title": novel.title, "chapterTitle": chapter.title, "chapterNumber": chapter.number, "totalChapters": novel.totalChapters, "storySlug": novel.slug || "", "hasNextChapter": chapter.number < novel.totalChapters, "hasPrevChapter": chapter.number > 1, "client:component-hydration": "load", "client:component-path": "/Users/Apple/Desktop/Anime_reader/src/components/NovelReader", "client:component-export": "default" })} </main> ` })}`;
}, "/Users/Apple/Desktop/Anime_reader/src/pages/novel/[slug]/read.astro", void 0);

const $$file = "/Users/Apple/Desktop/Anime_reader/src/pages/novel/[slug]/read.astro";
const $$url = "/novel/[slug]/read";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Read,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
