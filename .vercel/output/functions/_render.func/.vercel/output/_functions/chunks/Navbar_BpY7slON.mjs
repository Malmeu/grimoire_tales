import { c as createComponent, a as createAstro, r as renderTemplate, f as renderSlot, g as renderHead, b as addAttribute, m as maybeRenderHead, d as renderComponent } from './astro/server_7z6hMgmL.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description = "Plateforme communautaire pour auteurs de novels, livres et BD - Culture Geek & Dark Fantasy",
    image = "/og-image.png"
  } = Astro2.props;
  const canonicalURL = Astro2.site ? new URL(Astro2.url.pathname, Astro2.site) : Astro2.url;
  return renderTemplate(_a || (_a = __template([`<html lang="fr" class="dark"> <head><meta charset="UTF-8"><!-- Theme initialization script - prevents flash --><script>
      (function() {
        const validThemes = ['dark-fantasy', 'eldritch-horror', 'space', 'fairy', 'ethereal', 'warrior'];
        const savedTheme = localStorage.getItem('grimoire-theme');
        if (savedTheme && validThemes.includes(savedTheme)) {
          document.documentElement.setAttribute('data-theme', savedTheme);
        }
      })();
    <\/script><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="canonical"`, "><!-- SEO Meta --><title>", ' | Grimoire Tales</title><meta name="description"', '><meta name="robots" content="index, follow"><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Schema.org --><script type="application/ld+json">\n      {\n        "@context": "https://schema.org",\n        "@type": "WebSite",\n        "name": "Grimoire Tales",\n        "description": "Plateforme communautaire pour auteurs de novels, livres et BD",\n        "url": "https://grimoire-tales.com"\n      }\n    <\/script><!-- PWA --><link rel="manifest" href="/manifest.json"><meta name="theme-color" content="#1a0d1e">', '</head> <body class="min-h-screen bg-dark-void text-parchment-light"> <div class="mist-overlay"></div> ', " </body></html>"])), addAttribute(canonicalURL, "href"), title, addAttribute(description, "content"), addAttribute(canonicalURL, "content"), addAttribute(`${title} | Grimoire Tales`, "content"), addAttribute(description, "content"), addAttribute(image, "content"), addAttribute(`${title} | Grimoire Tales`, "content"), addAttribute(description, "content"), addAttribute(image, "content"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/Apple/Desktop/Anime_reader/src/layouts/BaseLayout.astro", void 0);

const themes = [
  {
    id: "dark-fantasy",
    name: "Dark Fantasy",
    icon: "🏰",
    description: "Parchemin & Magie Ancienne"
  },
  {
    id: "eldritch-horror",
    name: "Eldritch Horror",
    icon: "🩸",
    description: "Gore & Lovecraftien"
  },
  {
    id: "space",
    name: "Cosmos",
    icon: "🌌",
    description: "Espace & Nébuleuses"
  },
  {
    id: "fairy",
    name: "Féerique",
    icon: "🧚",
    description: "Enchanté & Magique"
  },
  {
    id: "ethereal",
    name: "Éthéré",
    icon: "💫",
    description: "Mystique & Céleste"
  },
  {
    id: "warrior",
    name: "Guerrier",
    icon: "⚔️",
    description: "Combat & Bataille"
  }
];
function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState("dark-fantasy");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("grimoire-theme");
    if (savedTheme && themes.some((t) => t.id === savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);
  const switchTheme = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("grimoire-theme", theme);
    setIsOpen(false);
  };
  const currentThemeData = themes.find((t) => t.id === currentTheme);
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105",
        style: {
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)"
        },
        "aria-label": "Changer de thème",
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-xl", children: currentThemeData?.icon }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-sm", style: { color: "var(--accent-primary)" }, children: currentThemeData?.name }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: `w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
              style: { color: "var(--accent-primary)" },
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 z-40",
          onClick: () => setIsOpen(false)
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute right-0 mt-2 w-64 rounded-xl overflow-hidden z-50 shadow-2xl",
          style: {
            background: "var(--bg-secondary)",
            border: "1px solid var(--card-border)"
          },
          children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 border-b", style: { borderColor: "var(--card-border)" }, children: /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", style: { color: "var(--text-primary)" }, children: "Choisir un thème" }) }),
            /* @__PURE__ */ jsx("div", { className: "p-2", children: themes.map((theme) => /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => switchTheme(theme.id),
                className: `w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${currentTheme === theme.id ? "ring-2 ring-[var(--accent-primary)]" : "hover:opacity-80"}`,
                style: {
                  background: currentTheme === theme.id ? "var(--card-bg)" : "transparent"
                },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-2xl", children: theme.icon }),
                  /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        className: "font-medium text-sm",
                        style: { color: currentTheme === theme.id ? "var(--accent-primary)" : "var(--text-primary)" },
                        children: theme.name
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: "var(--text-secondary)" }, children: theme.description })
                  ] }),
                  currentTheme === theme.id && /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-5 h-5 ml-auto",
                      style: { color: "var(--accent-primary)" },
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })
                    }
                  )
                ]
              },
              theme.id
            )) }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "p-3 border-t text-center",
                style: { borderColor: "var(--card-border)" },
                children: /* @__PURE__ */ jsx("p", { className: "text-xs", style: { color: "var(--text-secondary)" }, children: "Le thème est sauvegardé automatiquement" })
              }
            )
          ]
        }
      )
    ] })
  ] });
}

const supabaseUrl = "https://ooevpxkcftpemofjantd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZXZweGtjZnRwZW1vZmphbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3Njg3ODYsImV4cCI6MjA4MTM0NDc4Nn0.rbUanSpOKtwqcSs71eCLw_K2ywpuWSfG9Ae88hBmu6M";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
function AuthButtons() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user: user2 } } = await supabase.auth.getUser();
        setUser(user2);
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setMenuOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-[var(--bg-secondary)] animate-pulse" });
  }
  if (!user) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/login",
          className: "hidden sm:inline text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors",
          children: "Connexion"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/register",
          className: "hidden sm:inline px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium",
          children: "S'inscrire"
        }
      )
    ] });
  }
  const username = user.user_metadata?.username || user.email?.split("@")[0] || "User";
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setMenuOpen(!menuOpen),
        className: "flex items-center gap-2 p-1 rounded-full hover:bg-[var(--bg-secondary)] transition-colors",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white font-semibold text-sm", children: username.charAt(0).toUpperCase() }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-[var(--text-primary)] text-sm max-w-[100px] truncate", children: username }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: `w-4 h-4 text-[var(--text-secondary)] transition-transform ${menuOpen ? "rotate-180" : ""}`,
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    ),
    menuOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 z-40",
          onClick: () => setMenuOpen(false)
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-full mt-2 w-56 py-2 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-xl shadow-xl z-50", children: [
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 border-b border-[var(--card-border)]", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[var(--text-primary)] font-medium truncate", children: username }),
          /* @__PURE__ */ jsx("p", { className: "text-[var(--text-secondary)] text-sm truncate", children: user.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "/dashboard",
              className: "flex items-center gap-3 px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--accent-primary)]/10 hover:text-[var(--accent-primary)] transition-colors",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" }) }),
                "Dashboard"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "/profile",
              className: "flex items-center gap-3 px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--accent-primary)]/10 hover:text-[var(--accent-primary)] transition-colors",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }),
                "Mon profil"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "/write",
              className: "flex items-center gap-3 px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--accent-primary)]/10 hover:text-[var(--accent-primary)] transition-colors",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" }) }),
                "Écrire"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-[var(--card-border)] pt-2", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleLogout,
            className: "flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" }) }),
              "Déconnexion"
            ]
          }
        ) })
      ] })
    ] })
  ] });
}

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/catalogue", label: "Catalogue" },
    { href: "/novels", label: "Novels" },
    { href: "/comics", label: "BD" },
    { href: "/leaderboard", label: "Classement" }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="fixed top-0 left-0 right-0 z-50 glass-dark"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex items-center justify-between h-16"> <!-- Logo Grimoire --> <a href="/" class="flex items-center gap-3 group"> <div class="w-10 h-10 relative"> <svg viewBox="0 0 40 40" class="w-full h-full"> <defs> <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%"> <stop offset="0%" style="stop-color:#e8c07b"></stop> <stop offset="100%" style="stop-color:#b89778"></stop> </linearGradient> </defs> <!-- Book shape --> <path d="M5 8 L20 5 L35 8 L35 35 L20 32 L5 35 Z" fill="url(#bookGrad)" opacity="0.9"></path> <path d="M20 5 L20 32" stroke="#1a0d1e" stroke-width="1"></path> <!-- Mystical symbol --> <circle cx="20" cy="18" r="6" fill="none" stroke="#1a0d1e" stroke-width="1.5"></circle> <path d="M17 18 L23 18 M20 15 L20 21" stroke="#1a0d1e" stroke-width="1.5"></path> </svg> <div class="absolute inset-0 bg-gold-old/20 blur-xl group-hover:bg-gold-old/40 transition-all duration-300 rounded-full"></div> </div> <span class="font-gothic text-xl text-gold-old group-hover:text-gold-bright transition-colors">
Grimoire Tales
</span> </a> <!-- Navigation Links --> <div class="hidden md:flex items-center gap-8"> ${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="text-parchment-light hover:text-gold-old transition-colors duration-300 relative group"> ${link.label} <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-old group-hover:w-full transition-all duration-300"></span> </a>`)} </div> <!-- Theme Switcher & Auth Buttons --> <div class="flex items-center gap-3"> <!-- Theme Switcher --> ${renderComponent($$result, "ThemeSwitcher", ThemeSwitcher, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/Apple/Desktop/Anime_reader/src/components/ThemeSwitcher", "client:component-export": "default" })} <!-- Auth Buttons (dynamically shows login/register or user menu) --> ${renderComponent($$result, "AuthButtons", AuthButtons, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/Apple/Desktop/Anime_reader/src/components/AuthButtons", "client:component-export": "default" })} <!-- Mobile Menu Button --> <button id="mobile-menu-btn" class="md:hidden p-2 text-parchment-light hover:text-gold-old"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> </div> </div> <!-- Mobile Menu --> <div id="mobile-menu" class="hidden md:hidden glass-dark border-t border-gold-old/20"> <div class="px-4 py-4 space-y-3"> ${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="block py-2 text-parchment-light hover:text-gold-old transition-colors"> ${link.label} </a>`)} </div> </div> </nav> `;
}, "/Users/Apple/Desktop/Anime_reader/src/components/Navbar.astro", void 0);

export { $$BaseLayout as $, $$Navbar as a };
