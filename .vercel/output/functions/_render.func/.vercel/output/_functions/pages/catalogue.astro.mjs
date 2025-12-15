/* empty css                                 */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Navbar } from '../chunks/Navbar_BpY7slON.mjs';
import { $ as $$Footer } from '../chunks/Footer_BkCLQ1Bc.mjs';
import { $ as $$StoryCard } from '../chunks/StoryCard_C-laisvo.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { s as supabase } from '../chunks/supabase_DLn0xzmn.mjs';
export { renderers } from '../renderers.mjs';

function SearchFilters({ genres, types, sortOptions }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tous");
  const [selectedType, setSelectedType] = useState("Tous");
  const [selectedSort, setSelectedSort] = useState("Popularité");
  const [viewMode, setViewMode] = useState("grid");
  const typeLabels = {
    "Tous": "Tous",
    "novel": "Novels",
    "book": "Livres",
    "comic": "BD"
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Rechercher une histoire, un auteur, un tag...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "w-full px-5 py-4 pl-12 bg-dark-void/50 border border-gold-old/20 rounded-lg text-parchment-light placeholder-parchment/40 focus:outline-none focus:border-gold-old/50 transition-colors"
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-parchment/40",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-[150px]", children: /* @__PURE__ */ jsx(
        "select",
        {
          value: selectedGenre,
          onChange: (e) => setSelectedGenre(e.target.value),
          className: "w-full px-4 py-2 bg-dark-void/50 border border-gold-old/20 rounded-lg text-parchment-light focus:outline-none focus:border-gold-old/50 transition-colors cursor-pointer",
          children: genres.map((genre) => /* @__PURE__ */ jsx("option", { value: genre, className: "bg-dark-void", children: genre }, genre))
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-[150px]", children: /* @__PURE__ */ jsx(
        "select",
        {
          value: selectedType,
          onChange: (e) => setSelectedType(e.target.value),
          className: "w-full px-4 py-2 bg-dark-void/50 border border-gold-old/20 rounded-lg text-parchment-light focus:outline-none focus:border-gold-old/50 transition-colors cursor-pointer",
          children: types.map((type) => /* @__PURE__ */ jsx("option", { value: type, className: "bg-dark-void", children: typeLabels[type] || type }, type))
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-[150px]", children: /* @__PURE__ */ jsx(
        "select",
        {
          value: selectedSort,
          onChange: (e) => setSelectedSort(e.target.value),
          className: "w-full px-4 py-2 bg-dark-void/50 border border-gold-old/20 rounded-lg text-parchment-light focus:outline-none focus:border-gold-old/50 transition-colors cursor-pointer",
          children: sortOptions.map((option) => /* @__PURE__ */ jsxs("option", { value: option, className: "bg-dark-void", children: [
            "Trier par: ",
            option
          ] }, option))
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border border-gold-old/20 rounded-lg p-1", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setViewMode("grid"),
            className: `p-2 rounded transition-colors ${viewMode === "grid" ? "bg-gold-old/20 text-gold-old" : "text-parchment/50 hover:text-parchment"}`,
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" }) })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setViewMode("list"),
            className: `p-2 rounded transition-colors ${viewMode === "list" ? "bg-gold-old/20 text-gold-old" : "text-parchment/50 hover:text-parchment"}`,
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 10h16M4 14h16M4 18h16" }) })
          }
        )
      ] })
    ] }),
    (selectedGenre !== "Tous" || selectedType !== "Tous" || searchQuery) && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm text-parchment/50", children: "Filtres actifs:" }),
      searchQuery && /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 bg-gold-old/10 text-gold-old text-sm rounded-full flex items-center gap-2", children: [
        '"',
        searchQuery,
        '"',
        /* @__PURE__ */ jsx("button", { onClick: () => setSearchQuery(""), className: "hover:text-gold-bright", children: "×" })
      ] }),
      selectedGenre !== "Tous" && /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 bg-gold-old/10 text-gold-old text-sm rounded-full flex items-center gap-2", children: [
        selectedGenre,
        /* @__PURE__ */ jsx("button", { onClick: () => setSelectedGenre("Tous"), className: "hover:text-gold-bright", children: "×" })
      ] }),
      selectedType !== "Tous" && /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 bg-gold-old/10 text-gold-old text-sm rounded-full flex items-center gap-2", children: [
        typeLabels[selectedType],
        /* @__PURE__ */ jsx("button", { onClick: () => setSelectedType("Tous"), className: "hover:text-gold-bright", children: "×" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setSearchQuery("");
            setSelectedGenre("Tous");
            setSelectedType("Tous");
          },
          className: "text-sm text-parchment/50 hover:text-gold-old transition-colors",
          children: "Effacer tout"
        }
      )
    ] })
  ] });
}

const $$Catalogue = createComponent(async ($$result, $$props, $$slots) => {
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
  `).eq("status", "published").order("created_at", { ascending: false });
  const allStories = (storiesData || []).map((story) => ({
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
  const genres = ["Tous", "Dark Fantasy", "Fantasy", "Sci-Fi", "Anime", "Gaming", "Horreur"];
  const types = ["Tous", "novel", "book", "comic"];
  const sortOptions = ["Popularit\xE9", "Date", "Note", "Vues"];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Catalogue", "description": "Explorez notre collection de novels, livres et BD" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-24 pb-20 px-4"> <div class="max-w-7xl mx-auto"> <div class="mb-10"> <h1 class="gothic-title text-4xl md:text-5xl mb-4">Catalogue</h1> <p class="text-parchment/70">Découvrez des milliers d'histoires créées par notre communauté</p> </div> ${renderComponent($$result2, "SearchFilters", SearchFilters, { "client:load": true, "genres": genres, "types": types, "sortOptions": sortOptions, "client:component-hydration": "load", "client:component-path": "/Users/Apple/Desktop/Anime_reader/src/components/SearchFilters", "client:component-export": "default" })} <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> ${allStories.map((story) => renderTemplate`${renderComponent($$result2, "StoryCard", $$StoryCard, { ...story })}`)} </div> <div class="mt-12 flex justify-center"> <nav class="flex items-center gap-2"> <button class="px-4 py-2 parchment-card rounded hover:border-gold-old/50 transition-colors">
← Précédent
</button> <span class="px-4 py-2 bg-gold-old/20 text-gold-old rounded">1</span> <button class="px-4 py-2 parchment-card rounded hover:border-gold-old/50 transition-colors">2</button> <button class="px-4 py-2 parchment-card rounded hover:border-gold-old/50 transition-colors">3</button> <span class="text-parchment/50">...</span> <button class="px-4 py-2 parchment-card rounded hover:border-gold-old/50 transition-colors">12</button> <button class="px-4 py-2 parchment-card rounded hover:border-gold-old/50 transition-colors">
Suivant →
</button> </nav> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/Apple/Desktop/Anime_reader/src/pages/catalogue.astro", void 0);

const $$file = "/Users/Apple/Desktop/Anime_reader/src/pages/catalogue.astro";
const $$url = "/catalogue";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Catalogue,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
