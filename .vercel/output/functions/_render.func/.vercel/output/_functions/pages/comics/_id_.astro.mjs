/* empty css                                    */
import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Navbar } from '../../chunks/Navbar_BpY7slON.mjs';
import { $ as $$Footer } from '../../chunks/Footer_BkCLQ1Bc.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useCallback, useEffect } from 'react';
import { C as CommentFeed } from '../../chunks/CommentFeed_B1fkU1Z0.mjs';
export { renderers } from '../../renderers.mjs';

function ComicViewer({ pages, title }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const goToPage = useCallback((page) => {
    if (page >= 0 && page < pages.length) {
      setCurrentPage(page);
      setIsZoomed(false);
    }
  }, [pages.length]);
  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextPage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevPage();
      } else if (e.key === "Escape") {
        setIsZoomed(false);
        setIsFullscreen(false);
      } else if (e.key === "f") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage]);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: `relative ${isFullscreen ? "fixed inset-0 z-50 bg-dark-void" : ""}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-dark-void/80 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-gothic text-xl text-gold-old truncate", children: title }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-parchment/70", children: [
          "Page ",
          currentPage + 1,
          " / ",
          pages.length
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: toggleFullscreen,
            className: "p-2 text-parchment hover:text-gold-old transition-colors",
            title: "Plein écran (F)",
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: isFullscreen ? /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" }) })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center min-h-[60vh] bg-dark-void/50", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: prevPage,
          disabled: currentPage === 0,
          className: "absolute left-4 z-10 p-3 bg-dark-void/80 rounded-full text-parchment hover:text-gold-old disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110",
          children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `relative cursor-pointer transition-transform duration-300 ${isZoomed ? "scale-150" : ""}`,
          onClick: () => setIsZoomed(!isZoomed),
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: pages[currentPage],
                alt: `Page ${currentPage + 1}`,
                className: "max-h-[70vh] max-w-full object-contain rounded-lg shadow-dark"
              }
            ),
            isZoomed && /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2 px-2 py-1 bg-dark-void/80 rounded text-xs text-parchment", children: "Cliquez pour dézoomer" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: nextPage,
          disabled: currentPage === pages.length - 1,
          className: "absolute right-4 z-10 p-3 bg-dark-void/80 rounded-full text-parchment hover:text-gold-old disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110",
          children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-4 bg-dark-void/80 backdrop-blur-sm", children: /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 scrollbar-thin", children: pages.map((page, idx) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => goToPage(idx),
        className: `flex-shrink-0 w-16 h-24 rounded overflow-hidden border-2 transition-all ${idx === currentPage ? "border-gold-old shadow-glow" : "border-transparent hover:border-gold-old/50"}`,
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: page,
            alt: `Miniature page ${idx + 1}`,
            className: "w-full h-full object-cover"
          }
        )
      },
      idx
    )) }) }),
    /* @__PURE__ */ jsx("div", { className: "p-2 text-center text-xs text-parchment/40", children: "← → pour naviguer • Espace pour page suivante • F pour plein écran • Clic pour zoomer" })
  ] });
}

const $$Astro = createAstro();
async function getStaticPaths() {
  return [
    { params: { id: "1" } },
    { params: { id: "2" } },
    { params: { id: "3" } }
  ];
}
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const comic = {
    id,
    title: "Le Dernier Gardien",
    author: {
      username: "ShadowArtist"},
    description: "Dans un futur cyberpunk, le dernier gardien de l'ancienne magie doit prot\xE9ger les secrets du pass\xE9.",
    genre: "Sci-Fi",
    pages: [
      "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=1200&fit=crop"
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": comic.title, "description": comic.description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-20 pb-20"> <!-- Comic Info Header --> <section class="max-w-6xl mx-auto px-4 py-8"> <div class="flex flex-col md:flex-row items-start gap-6 mb-8"> <div class="flex-1"> <div class="flex flex-wrap gap-2 mb-3"> <span class="px-3 py-1 bg-gold-old/20 text-gold-old text-sm rounded-full">BD</span> <span class="px-3 py-1 bg-dark-purple/50 text-parchment text-sm rounded-full">${comic.genre}</span> </div> <h1 class="gothic-title text-3xl md:text-4xl mb-3">${comic.title}</h1> <div class="flex items-center gap-3 mb-4"> <span class="text-parchment/70">par</span> <a${addAttribute(`/authors/${comic.author.username}`, "href")} class="text-gold-old hover:text-gold-bright transition-colors"> ${comic.author.username} </a> <span class="text-parchment/50">•</span> <span class="text-parchment/70">${comic.pages.length} pages</span> </div> <p class="text-parchment/80 max-w-2xl">${comic.description}</p> </div> <div class="flex items-center gap-4"> <button class="px-4 py-2 border border-gold-old/50 text-gold-old rounded hover:bg-gold-old/10 transition-colors flex items-center gap-2"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path> </svg>
Favoris
</button> <button class="px-4 py-2 border border-gold-old/50 text-gold-old rounded hover:bg-gold-old/10 transition-colors flex items-center gap-2"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path> </svg>
Partager
</button> </div> </div> </section> <!-- Comic Viewer --> <section class="max-w-6xl mx-auto px-4"> <div class="parchment-card rounded-lg overflow-hidden"> ${renderComponent($$result2, "ComicViewer", ComicViewer, { "client:load": true, "pages": comic.pages, "title": comic.title, "client:component-hydration": "load", "client:component-path": "/Users/Apple/Desktop/Anime_reader/src/components/ComicViewer", "client:component-export": "default" })} </div> </section> <!-- Comments --> <section class="max-w-6xl mx-auto px-4 py-12"> ${renderComponent($$result2, "CommentFeed", CommentFeed, { "client:load": true, "storyId": comic.id || "1", "client:component-hydration": "load", "client:component-path": "/Users/Apple/Desktop/Anime_reader/src/components/CommentFeed", "client:component-export": "default" })} </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/Apple/Desktop/Anime_reader/src/pages/comics/[id].astro", void 0);

const $$file = "/Users/Apple/Desktop/Anime_reader/src/pages/comics/[id].astro";
const $$url = "/comics/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
