/* empty css                                 */
import { c as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Navbar } from '../chunks/Navbar_BpY7slON.mjs';
import { $ as $$Footer } from '../chunks/Footer_BkCLQ1Bc.mjs';
export { renderers } from '../renderers.mjs';

const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Mon Profil" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-24 pb-20 px-4 min-h-screen"> <div class="max-w-6xl mx-auto"> <!-- Loading State --> <div id="loading-state" class="text-center py-20"> <div class="w-12 h-12 border-4 border-gold-old border-t-transparent rounded-full animate-spin mx-auto mb-4"></div> <p class="text-parchment/70">Chargement du profil...</p> </div> <!-- Not Logged In State --> <div id="not-logged-state" class="hidden text-center py-20"> <div class="text-6xl mb-4">🔐</div> <h1 class="gothic-title text-3xl mb-4">Connexion requise</h1> <p class="text-parchment/70 mb-8">Vous devez être connecté pour voir votre profil.</p> <div class="flex justify-center gap-4"> <a href="/login" class="glow-button px-8 py-3">Se connecter</a> <a href="/register" class="px-8 py-3 border border-gold-old/50 text-gold-old rounded hover:bg-gold-old/10 transition-colors">
S'inscrire
</a> </div> </div> <!-- Profile Content --> <div id="profile-content" class="hidden"> <!-- Profile Header --> <section class="parchment-card rounded-2xl p-8 mb-8"> <div class="flex flex-col md:flex-row items-start gap-8"> <!-- Avatar --> <div class="flex-shrink-0"> <div id="user-avatar" class="w-32 h-32 rounded-full bg-dark-purple flex items-center justify-center text-5xl text-gold-old font-gothic shadow-glow">
?
</div> </div> <!-- Info --> <div class="flex-1"> <div class="flex flex-wrap items-center gap-4 mb-4"> <h1 id="user-name" class="gothic-title text-3xl">Utilisateur</h1> <div id="user-badges" class="flex flex-wrap gap-2"></div> </div> <p id="user-bio" class="text-parchment/80 mb-6 max-w-2xl">Aucune bio définie.</p> <div class="flex flex-wrap gap-6 mb-6"> <div class="text-center"> <div id="stat-followers" class="text-2xl font-gothic text-gold-old">0</div> <div class="text-sm text-parchment/60">Abonnés</div> </div> <div class="text-center"> <div id="stat-following" class="text-2xl font-gothic text-gold-old">0</div> <div class="text-sm text-parchment/60">Abonnements</div> </div> <div class="text-center"> <div id="stat-stories-count" class="text-2xl font-gothic text-gold-old">0</div> <div class="text-sm text-parchment/60">Histoires</div> </div> </div> <div class="flex gap-4"> <button id="edit-profile-btn" class="glow-button px-6 py-2">
Modifier le profil
</button> <a href="/write" class="px-6 py-2 border border-gold-old/50 text-gold-old rounded hover:bg-gold-old/10 transition-colors">
Nouvelle histoire
</a> </div> </div> </div> </section> <!-- Edit Profile Modal --> <div id="edit-modal" class="hidden fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"> <div class="parchment-card rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"> <div class="flex items-center justify-between mb-6"> <h2 class="gothic-title text-2xl">Modifier le profil</h2> <button id="close-modal-btn" class="text-parchment/50 hover:text-parchment transition-colors"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <form id="edit-profile-form" class="space-y-4"> <div> <label for="edit-username" class="block text-sm text-parchment mb-2">Nom d'utilisateur</label> <input type="text" id="edit-username" class="w-full px-4 py-3 bg-dark-void/50 border border-gold-old/20 rounded-lg text-parchment-light focus:outline-none focus:border-gold-old/50 transition-colors"> </div> <div> <label for="edit-bio" class="block text-sm text-parchment mb-2">Bio</label> <textarea id="edit-bio" rows="4" class="w-full px-4 py-3 bg-dark-void/50 border border-gold-old/20 rounded-lg text-parchment-light resize-none focus:outline-none focus:border-gold-old/50 transition-colors" placeholder="Parlez de vous, vos passions geek..."></textarea> </div> <div class="flex gap-4 pt-4"> <button type="submit" class="glow-button px-6 py-2 flex-1">
Enregistrer
</button> <button type="button" id="cancel-edit-btn" class="px-6 py-2 border border-gold-old/50 text-gold-old rounded hover:bg-gold-old/10 transition-colors">
Annuler
</button> </div> </form> </div> </div> <!-- Stats --> <section class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"> <div class="parchment-card p-6 rounded-xl text-center"> <div id="stat-views" class="text-3xl font-gothic text-gold-old mb-1">0</div> <div class="text-sm text-parchment/60">Vues totales</div> </div> <div class="parchment-card p-6 rounded-xl text-center"> <div id="stat-likes" class="text-3xl font-gothic text-gold-old mb-1">0</div> <div class="text-sm text-parchment/60">Likes</div> </div> <div class="parchment-card p-6 rounded-xl text-center"> <div id="stat-comments" class="text-3xl font-gothic text-gold-old mb-1">0</div> <div class="text-sm text-parchment/60">Commentaires</div> </div> <div class="parchment-card p-6 rounded-xl text-center"> <div id="stat-publications" class="text-3xl font-gothic text-gold-old mb-1">0</div> <div class="text-sm text-parchment/60">Publications</div> </div> </section> <!-- User Stories --> <section> <div class="flex items-center justify-between mb-6"> <h2 class="gothic-title text-2xl">Mes Histoires</h2> <a href="/write" class="text-gold-old hover:text-gold-bright transition-colors flex items-center gap-2"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Nouvelle histoire
</a> </div> <div id="stories-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> <div class="text-center py-8 text-parchment/70 col-span-full"> <div class="text-4xl mb-2">📝</div> <p>Vous n'avez pas encore publié d'histoire.</p> <a href="/write" class="inline-block mt-4 text-gold-old hover:text-gold-bright">
Commencer à écrire →
</a> </div> </div> </section> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} `;
}, "/Users/Apple/Desktop/Anime_reader/src/pages/profile.astro", void 0);

const $$file = "/Users/Apple/Desktop/Anime_reader/src/pages/profile.astro";
const $$url = "/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
