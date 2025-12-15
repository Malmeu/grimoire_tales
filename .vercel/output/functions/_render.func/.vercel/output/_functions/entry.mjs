import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_B9RxjPLJ.mjs';
import { manifest } from './manifest_BKzNyTmo.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin.astro.mjs');
const _page2 = () => import('./pages/bd/_id_/chapter/_number_.astro.mjs');
const _page3 = () => import('./pages/bd/_id_/read.astro.mjs');
const _page4 = () => import('./pages/bd/_id_.astro.mjs');
const _page5 = () => import('./pages/catalogue.astro.mjs');
const _page6 = () => import('./pages/comics/_id_.astro.mjs');
const _page7 = () => import('./pages/comics.astro.mjs');
const _page8 = () => import('./pages/dashboard.astro.mjs');
const _page9 = () => import('./pages/leaderboard.astro.mjs');
const _page10 = () => import('./pages/login.astro.mjs');
const _page11 = () => import('./pages/novel/_slug_/chapter/_number_.astro.mjs');
const _page12 = () => import('./pages/novel/_slug_/read.astro.mjs');
const _page13 = () => import('./pages/novel/_slug_.astro.mjs');
const _page14 = () => import('./pages/novels.astro.mjs');
const _page15 = () => import('./pages/profile.astro.mjs');
const _page16 = () => import('./pages/register.astro.mjs');
const _page17 = () => import('./pages/stories/_slug_/add-chapter.astro.mjs');
const _page18 = () => import('./pages/stories/_slug_/chapter/_number_.astro.mjs');
const _page19 = () => import('./pages/stories/_slug_.astro.mjs');
const _page20 = () => import('./pages/write.astro.mjs');
const _page21 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/index.astro", _page1],
    ["src/pages/bd/[id]/chapter/[number].astro", _page2],
    ["src/pages/bd/[id]/read.astro", _page3],
    ["src/pages/bd/[id]/index.astro", _page4],
    ["src/pages/catalogue.astro", _page5],
    ["src/pages/comics/[id].astro", _page6],
    ["src/pages/comics/index.astro", _page7],
    ["src/pages/dashboard.astro", _page8],
    ["src/pages/leaderboard.astro", _page9],
    ["src/pages/login.astro", _page10],
    ["src/pages/novel/[slug]/chapter/[number].astro", _page11],
    ["src/pages/novel/[slug]/read.astro", _page12],
    ["src/pages/novel/[slug]/index.astro", _page13],
    ["src/pages/novels/index.astro", _page14],
    ["src/pages/profile.astro", _page15],
    ["src/pages/register.astro", _page16],
    ["src/pages/stories/[slug]/add-chapter.astro", _page17],
    ["src/pages/stories/[slug]/chapter/[number].astro", _page18],
    ["src/pages/stories/[slug].astro", _page19],
    ["src/pages/write.astro", _page20],
    ["src/pages/index.astro", _page21]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "c87875f0-7955-4d49-b779-340044273f9f",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
