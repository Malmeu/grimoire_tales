import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate } from './astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                             */

const $$Astro = createAstro();
const $$StoryCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$StoryCard;
  const { id, title, slug, author, coverUrl, genre, tags, type, views, rating = 0 } = Astro2.props;
  const typeIcons = {
    novel: "\u{1F4D6}",
    book: "\u{1F4DA}",
    comic: "\u{1F3A8}"
  };
  const typeLabels = {
    novel: "Novel",
    book: "Livre",
    comic: "BD"
  };
  const formatViews = (num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num.toString();
  };
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/stories/${slug}`, "href")} class="block group" data-astro-cid-3cpxmm42> <article class="story-card parchment-card rounded-lg overflow-hidden" data-astro-cid-3cpxmm42> <!-- Cover Image --> <div class="relative aspect-[3/4] overflow-hidden" data-astro-cid-3cpxmm42> ${coverUrl ? renderTemplate`<img${addAttribute(coverUrl, "src")}${addAttribute(title, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" data-astro-cid-3cpxmm42>` : renderTemplate`<div class="w-full h-full bg-gradient-to-br from-dark-purple to-dark-void flex items-center justify-center" data-astro-cid-3cpxmm42> <span class="text-6xl opacity-50" data-astro-cid-3cpxmm42>${typeIcons[type]}</span> </div>`} <!-- Overlay gradient --> <div class="absolute inset-0 bg-gradient-to-t from-dark-void via-transparent to-transparent opacity-80" data-astro-cid-3cpxmm42></div> <!-- Type Badge --> <div class="absolute top-3 left-3" data-astro-cid-3cpxmm42> <span class="px-2 py-1 text-xs font-medium bg-dark-void/80 text-gold-old rounded border border-gold-old/30" data-astro-cid-3cpxmm42> ${typeLabels[type]} </span> </div> <!-- Views --> <div class="absolute top-3 right-3 flex items-center gap-1 text-xs text-parchment-light/80" data-astro-cid-3cpxmm42> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-3cpxmm42> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-3cpxmm42></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-astro-cid-3cpxmm42></path> </svg> ${formatViews(views)} </div> </div> <!-- Content --> <div class="p-4" data-astro-cid-3cpxmm42> <h3 class="font-gothic text-lg text-gold-old group-hover:text-gold-bright transition-colors line-clamp-2 mb-2" data-astro-cid-3cpxmm42> ${title} </h3> <p class="text-sm text-parchment/70 mb-3" data-astro-cid-3cpxmm42>
par <span class="text-parchment-light" data-astro-cid-3cpxmm42>${author}</span> </p> <!-- Genre & Tags --> <div class="flex flex-wrap gap-2 mb-3" data-astro-cid-3cpxmm42> <span class="px-2 py-0.5 text-xs bg-dark-purple/50 text-parchment rounded" data-astro-cid-3cpxmm42> ${genre} </span> ${tags.slice(0, 2).map((tag) => renderTemplate`<span class="px-2 py-0.5 text-xs bg-dark-void/50 text-parchment/70 rounded" data-astro-cid-3cpxmm42>
#${tag} </span>`)} </div> <!-- Rating --> ${rating > 0 && renderTemplate`<div class="flex items-center gap-1" data-astro-cid-3cpxmm42> ${[1, 2, 3, 4, 5].map((star) => renderTemplate`<svg${addAttribute(`w-4 h-4 ${star <= rating ? "text-gold-old" : "text-parchment/30"}`, "class")} fill="currentColor" viewBox="0 0 20 20" data-astro-cid-3cpxmm42> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-astro-cid-3cpxmm42></path> </svg>`)} <span class="text-xs text-parchment/50 ml-1" data-astro-cid-3cpxmm42>${rating.toFixed(1)}</span> </div>`} </div> </article> </a> `;
}, "/Users/Apple/Desktop/Anime_reader/src/components/StoryCard.astro", void 0);

export { $$StoryCard as $ };
