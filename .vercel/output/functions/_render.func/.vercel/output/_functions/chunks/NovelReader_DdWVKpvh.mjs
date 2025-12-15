import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';

function NovelReader({
  content,
  title,
  chapterTitle,
  chapterNumber,
  totalChapters,
  storySlug,
  hasNextChapter = false,
  hasPrevChapter = false
}) {
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.9);
  const [fontFamily, setFontFamily] = useState("serif");
  const [textAlign, setTextAlign] = useState("justify");
  const [showSettings, setShowSettings] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [estimatedReadTime, setEstimatedReadTime] = useState(0);
  const [bookmarkPosition, setBookmarkPosition] = useState(null);
  const contentRef = useRef(null);
  const articleRef = useRef(null);
  useEffect(() => {
    const savedSettings = localStorage.getItem("novel-reader-settings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setFontSize(settings.fontSize || 18);
      setLineHeight(settings.lineHeight || 1.9);
      setFontFamily(settings.fontFamily || "serif");
      setTextAlign(settings.textAlign || "justify");
    }
    const savedBookmark = localStorage.getItem(`bookmark-${storySlug}-${chapterNumber}`);
    if (savedBookmark) {
      setBookmarkPosition(Number(savedBookmark));
    }
  }, [storySlug, chapterNumber]);
  useEffect(() => {
    localStorage.setItem("novel-reader-settings", JSON.stringify({
      fontSize,
      lineHeight,
      fontFamily,
      textAlign
    }));
  }, [fontSize, lineHeight, fontFamily, textAlign]);
  useEffect(() => {
    const wordCount = content.split(/\s+/).length;
    const readingSpeed = 200;
    setEstimatedReadTime(Math.ceil(wordCount / readingSpeed));
  }, [content]);
  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const articleTop = articleRef.current.offsetTop;
        const articleHeight = articleRef.current.offsetHeight;
        const scrolled = scrollTop - articleTop + clientHeight;
        const progress = Math.min(100, Math.max(0, scrolled / articleHeight * 100));
        setReadingProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const parseMarkdown = (text) => {
    return text.replace(/^### (.+)$/gm, '<h3 class="novel-h3">$1</h3>').replace(/^## (.+)$/gm, '<h2 class="novel-h2">$1</h2>').replace(/^# (.+)$/gm, '<h1 class="novel-h1">$1</h1>').replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/^> (.+)$/gm, '<blockquote class="novel-quote">$1</blockquote>').replace(/^---$/gm, '<hr class="novel-divider" />').replace(/\n\n/g, '</p><p class="novel-paragraph">').replace(/\n/g, "<br />");
  };
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  const saveBookmark = () => {
    const scrollPosition = window.scrollY;
    localStorage.setItem(`bookmark-${storySlug}-${chapterNumber}`, String(scrollPosition));
    setBookmarkPosition(scrollPosition);
  };
  const goToBookmark = () => {
    if (bookmarkPosition !== null) {
      window.scrollTo({ top: bookmarkPosition, behavior: "smooth" });
    }
  };
  const fontFamilyClass = {
    serif: "font-serif",
    sans: "font-sans",
    mono: "font-mono"
  };
  const fontFamilyStyle = {
    serif: "'Georgia', 'Times New Roman', serif",
    sans: "'Inter', 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Consolas', monospace"
  };
  return /* @__PURE__ */ jsxs("div", { className: `min-h-screen ${isFullscreen ? "fixed inset-0 z-50 overflow-y-auto bg-[var(--bg-primary)]" : ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 right-0 h-1 bg-[var(--bg-secondary)] z-50", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-full bg-[var(--accent-primary)] transition-all duration-150",
        style: { width: `${readingProgress}%` }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "fixed bottom-6 right-6 z-40 flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowSettings(!showSettings),
          className: "p-3 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-full shadow-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors",
          title: "Paramètres",
          children: /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: saveBookmark,
          className: "p-3 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-full shadow-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors",
          title: "Marquer cette position",
          children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: bookmarkPosition !== null ? "currentColor" : "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" }) })
        }
      ),
      bookmarkPosition !== null && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: goToBookmark,
          className: "p-3 bg-[var(--accent-primary)] rounded-full shadow-lg text-white hover:opacity-90 transition-opacity",
          title: "Aller au marque-page",
          children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 10l7-7m0 0l7 7m-7-7v18" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: toggleFullscreen,
          className: "p-3 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-full shadow-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors",
          title: "Plein écran",
          children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: isFullscreen ? /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" }) })
        }
      )
    ] }),
    showSettings && /* @__PURE__ */ jsxs("div", { className: "fixed bottom-24 right-6 z-50 w-80 p-5 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-xl shadow-2xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-[var(--accent-primary)] font-semibold", children: "Paramètres de lecture" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setShowSettings(false), className: "text-[var(--text-secondary)] hover:text-[var(--accent-primary)]", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[var(--text-secondary)] text-sm", children: "Taille du texte" }),
          /* @__PURE__ */ jsxs("span", { className: "text-[var(--accent-primary)] text-sm font-medium", children: [
            fontSize,
            "px"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setFontSize((f) => Math.max(12, f - 2)),
              className: "w-10 h-10 flex items-center justify-center bg-[var(--bg-primary)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors",
              children: "A-"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "range",
              min: "12",
              max: "28",
              value: fontSize,
              onChange: (e) => setFontSize(Number(e.target.value)),
              className: "flex-1 accent-[var(--accent-primary)]"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setFontSize((f) => Math.min(28, f + 2)),
              className: "w-10 h-10 flex items-center justify-center bg-[var(--bg-primary)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors text-lg",
              children: "A+"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[var(--text-secondary)] text-sm", children: "Interligne" }),
          /* @__PURE__ */ jsx("span", { className: "text-[var(--accent-primary)] text-sm font-medium", children: lineHeight.toFixed(1) })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "range",
            min: "1.4",
            max: "2.5",
            step: "0.1",
            value: lineHeight,
            onChange: (e) => setLineHeight(Number(e.target.value)),
            className: "w-full accent-[var(--accent-primary)]"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[var(--text-secondary)] text-sm mb-2 block", children: "Police" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: [
          { id: "serif", label: "Serif", preview: "Aa" },
          { id: "sans", label: "Sans", preview: "Aa" },
          { id: "mono", label: "Mono", preview: "Aa" }
        ].map(({ id, label, preview }) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setFontFamily(id),
            className: `py-3 px-2 rounded-lg text-center transition-colors ${fontFamily === id ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"}`,
            children: [
              /* @__PURE__ */ jsx("span", { className: `block text-lg ${fontFamilyClass[id]}`, children: preview }),
              /* @__PURE__ */ jsx("span", { className: "text-xs", children: label })
            ]
          },
          id
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[var(--text-secondary)] text-sm mb-2 block", children: "Alignement" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: [
          { id: "left", icon: "⬅️" },
          { id: "justify", icon: "☰" },
          { id: "center", icon: "⬌" }
        ].map(({ id, icon }) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setTextAlign(id),
            className: `py-2 px-3 rounded-lg transition-colors ${textAlign === id ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"}`,
            children: icon
          },
          id
        )) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-[var(--card-border)]", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm text-[var(--text-secondary)]", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "⏱️ ~",
          estimatedReadTime,
          " min de lecture"
        ] }),
        /* @__PURE__ */ jsxs("span", { children: [
          "📖 ",
          Math.round(readingProgress),
          "% lu"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("header", { className: "max-w-3xl mx-auto px-4 pt-8 pb-6 text-center", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/stories/${storySlug}`,
          className: "inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-4",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }),
            "Retour à l'histoire"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "text-[var(--accent-primary)]/70 mb-2 text-sm uppercase tracking-wider", children: [
        "Chapitre ",
        chapterNumber,
        " sur ",
        totalChapters
      ] }),
      /* @__PURE__ */ jsx(
        "h1",
        {
          className: "text-3xl md:text-4xl mb-4",
          style: { fontFamily: "var(--font-title)", color: "var(--accent-primary)" },
          children: chapterTitle
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "text-[var(--text-secondary)] text-sm", children: [
        title,
        " • ~",
        estimatedReadTime,
        " min de lecture"
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "article",
      {
        ref: articleRef,
        className: "max-w-3xl mx-auto px-4 md:px-8 pb-16",
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref: contentRef,
            className: `novel-content ${fontFamilyClass[fontFamily]}`,
            style: {
              fontSize: `${fontSize}px`,
              lineHeight,
              textAlign,
              fontFamily: fontFamilyStyle[fontFamily]
            },
            dangerouslySetInnerHTML: {
              __html: `<p class="novel-paragraph">${parseMarkdown(content)}</p>`
            }
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("nav", { className: "max-w-3xl mx-auto px-4 py-8 border-t border-[var(--card-border)]", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      hasPrevChapter ? /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/stories/${storySlug}/chapter/${chapterNumber - 1}`,
          className: "flex items-center gap-2 px-5 py-3 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-lg hover:border-[var(--accent-primary)]/50 transition-colors",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Chapitre précédent" }),
            /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Préc." })
          ]
        }
      ) : /* @__PURE__ */ jsx("div", {}),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `/stories/${storySlug}`,
          className: "px-5 py-3 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors",
          children: "📚 Sommaire"
        }
      ),
      hasNextChapter ? /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/stories/${storySlug}/chapter/${chapterNumber + 1}`,
          className: "flex items-center gap-2 px-5 py-3 bg-[var(--accent-primary)] text-white rounded-lg hover:opacity-90 transition-opacity",
          children: [
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Chapitre suivant" }),
            /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Suiv." }),
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          ]
        }
      ) : /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/stories/${storySlug}`,
          className: "flex items-center gap-2 px-5 py-3 bg-[var(--accent-primary)] text-white rounded-lg hover:opacity-90 transition-opacity",
          children: [
            /* @__PURE__ */ jsx("span", { children: "Fin" }),
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("style", { children: `
        .novel-content {
          color: var(--text-primary);
        }
        
        .novel-paragraph {
          margin-bottom: 1.5em;
          text-indent: 2em;
        }
        
        .novel-paragraph:first-of-type {
          text-indent: 0;
        }
        
        .novel-paragraph:first-of-type::first-letter {
          font-size: 3em;
          float: left;
          line-height: 0.8;
          padding-right: 0.1em;
          color: var(--accent-primary);
          font-family: var(--font-title);
        }
        
        .novel-h1 {
          font-family: var(--font-title);
          font-size: 2em;
          color: var(--accent-primary);
          margin: 2em 0 1em;
          text-align: center;
        }
        
        .novel-h2 {
          font-family: var(--font-title);
          font-size: 1.5em;
          color: var(--accent-primary);
          margin: 1.5em 0 0.75em;
        }
        
        .novel-h3 {
          font-family: var(--font-title);
          font-size: 1.25em;
          color: var(--accent-secondary);
          margin: 1.25em 0 0.5em;
        }
        
        .novel-quote {
          border-left: 3px solid var(--accent-primary);
          padding: 1em 1.5em;
          margin: 1.5em 0;
          background: var(--card-bg);
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: var(--text-secondary);
        }
        
        .novel-divider {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
          margin: 3em auto;
          width: 60%;
        }
        
        .novel-content strong {
          color: var(--text-primary);
          font-weight: 600;
        }
        
        .novel-content em {
          color: var(--text-secondary);
        }
      ` })
  ] });
}

export { NovelReader as N };
