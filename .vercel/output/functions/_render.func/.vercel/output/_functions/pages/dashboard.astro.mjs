/* empty css                                 */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Navbar } from '../chunks/Navbar_BpY7slON.mjs';
import { $ as $$Footer } from '../chunks/Footer_BkCLQ1Bc.mjs';
export { renderers } from '../renderers.mjs';

const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Dashboard - Grimoire Tales" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-24 pb-20 px-4 min-h-screen"> <div class="max-w-6xl mx-auto"> <!-- Loading State --> <div id="loading-state" class="text-center py-20"> <div class="w-12 h-12 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div> <p class="text-[var(--text-secondary)]">Chargement de votre dashboard...</p> </div> <!-- Not Logged In State --> <div id="not-logged-state" class="hidden text-center py-20"> <div class="text-6xl mb-4">🔐</div> <h1 class="gothic-title text-3xl mb-4">Connexion requise</h1> <p class="text-[var(--text-secondary)] mb-8">Vous devez être connecté pour accéder à votre dashboard.</p> <div class="flex justify-center gap-4"> <a href="/login" class="glow-button px-8 py-3">Se connecter</a> <a href="/register" class="px-8 py-3 border border-[var(--accent-primary)]/50 text-[var(--accent-primary)] rounded hover:bg-[var(--accent-primary)]/10 transition-colors">
S'inscrire
</a> </div> </div> <!-- Dashboard Content --> <div id="dashboard-content" class="hidden"> <!-- Welcome Header --> <section class="parchment-card rounded-2xl p-8 mb-8"> <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"> <div class="flex items-center gap-6"> <div id="user-avatar" class="w-20 h-20 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-4xl text-[var(--accent-primary)] font-semibold shadow-lg">
?
</div> <div> <p class="text-[var(--text-secondary)] text-sm mb-1">Bienvenue,</p> <h1 id="user-name" class="gothic-title text-3xl">Utilisateur</h1> <p id="user-email" class="text-[var(--text-secondary)] text-sm"></p> </div> </div> <div class="flex flex-wrap gap-3"> <a href="/write" class="glow-button px-6 py-2 flex items-center gap-2"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Nouvelle histoire
</a> <a href="/profile" class="px-6 py-2 border border-[var(--accent-primary)]/50 text-[var(--accent-primary)] rounded hover:bg-[var(--accent-primary)]/10 transition-colors">
Mon profil
</a> <button id="logout-btn" class="px-6 py-2 border border-red-500/50 text-red-400 rounded hover:bg-red-500/10 transition-colors">
Déconnexion
</button> </div> </div> </section> <!-- Quick Stats --> <section class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"> <div class="parchment-card p-6 rounded-xl text-center"> <div class="text-3xl mb-2">📚</div> <div id="stat-stories" class="text-2xl font-semibold text-[var(--accent-primary)]">0</div> <div class="text-sm text-[var(--text-secondary)]">Mes histoires</div> </div> <div class="parchment-card p-6 rounded-xl text-center"> <div class="text-3xl mb-2">👁️</div> <div id="stat-views" class="text-2xl font-semibold text-[var(--accent-primary)]">0</div> <div class="text-sm text-[var(--text-secondary)]">Vues totales</div> </div> <div class="parchment-card p-6 rounded-xl text-center"> <div class="text-3xl mb-2">❤️</div> <div id="stat-likes" class="text-2xl font-semibold text-[var(--accent-primary)]">0</div> <div class="text-sm text-[var(--text-secondary)]">Likes reçus</div> </div> <div class="parchment-card p-6 rounded-xl text-center"> <div class="text-3xl mb-2">💬</div> <div id="stat-comments" class="text-2xl font-semibold text-[var(--accent-primary)]">0</div> <div class="text-sm text-[var(--text-secondary)]">Commentaires</div> </div> </section> <!-- Quick Actions --> <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> <a href="/write" class="parchment-card p-6 rounded-xl hover:border-[var(--accent-primary)]/50 transition-all group"> <div class="flex items-center gap-4"> <div class="w-12 h-12 rounded-lg bg-[var(--accent-primary)]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
✍️
</div> <div> <h3 class="text-[var(--text-primary)] font-semibold group-hover:text-[var(--accent-primary)] transition-colors">Écrire</h3> <p class="text-[var(--text-secondary)] text-sm">Créer une nouvelle histoire</p> </div> </div> </a> <a href="/catalogue" class="parchment-card p-6 rounded-xl hover:border-[var(--accent-primary)]/50 transition-all group"> <div class="flex items-center gap-4"> <div class="w-12 h-12 rounded-lg bg-[var(--accent-primary)]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
📖
</div> <div> <h3 class="text-[var(--text-primary)] font-semibold group-hover:text-[var(--accent-primary)] transition-colors">Explorer</h3> <p class="text-[var(--text-secondary)] text-sm">Découvrir des histoires</p> </div> </div> </a> <a href="/leaderboard" class="parchment-card p-6 rounded-xl hover:border-[var(--accent-primary)]/50 transition-all group"> <div class="flex items-center gap-4"> <div class="w-12 h-12 rounded-lg bg-[var(--accent-primary)]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
🏆
</div> <div> <h3 class="text-[var(--text-primary)] font-semibold group-hover:text-[var(--accent-primary)] transition-colors">Classement</h3> <p class="text-[var(--text-secondary)] text-sm">Voir les meilleurs auteurs</p> </div> </div> </a> </section> <!-- My Stories --> <section class="parchment-card rounded-xl p-6 mb-8"> <div class="flex items-center justify-between mb-6"> <h2 class="gothic-title text-xl">Mes histoires</h2> <a href="/write" class="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors text-sm flex items-center gap-1"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Nouvelle
</a> </div> <div id="my-stories-list" class="space-y-4"> <!-- Stories will be loaded here --> <div class="text-center py-8 text-[var(--text-secondary)]"> <div class="text-4xl mb-2">📝</div> <p>Vous n'avez pas encore publié d'histoire.</p> <a href="/write" class="inline-block mt-4 text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]">
Commencer à écrire →
</a> </div> </div> </section> <!-- Recent Activity --> <section class="parchment-card rounded-xl p-6"> <h2 class="gothic-title text-xl mb-6">Activité récente</h2> <div id="activity-list" class="space-y-4"> <div class="text-center py-8 text-[var(--text-secondary)]"> <div class="text-4xl mb-2">📊</div> <p>Aucune activité récente.</p> </div> </div> </section> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} `;
}, "/Users/Apple/Desktop/Anime_reader/src/pages/dashboard.astro", void 0);

const $$file = "/Users/Apple/Desktop/Anime_reader/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
