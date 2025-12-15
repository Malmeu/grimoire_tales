import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useCallback } from 'react';

function BDReader({
  pages,
  title,
  chapterTitle,
  onNextChapter,
  onPrevChapter,
  hasNextChapter = false,
  hasPrevChapter = false
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [readingMode, setReadingMode] = useState("single");
  const [readingDirection, setReadingDirection] = useState("ltr");
  const [showControls, setShowControls] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  useEffect(() => {
    const preloadImages = async () => {
      setIsLoading(true);
      const promises = pages.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = src;
        });
      });
      await Promise.all(promises);
      setIsLoading(false);
    };
    preloadImages();
  }, [pages]);
  const goToPage = useCallback((page) => {
    const maxPage = readingMode === "double" ? Math.ceil(pages.length / 2) - 1 : pages.length - 1;
    if (page >= 0 && page <= maxPage) {
      setCurrentPage(page);
    }
  }, [pages.length, readingMode]);
  const nextPage = useCallback(() => {
    const maxPage = readingMode === "double" ? Math.ceil(pages.length / 2) - 1 : pages.length - 1;
    if (currentPage < maxPage) {
      goToPage(currentPage + 1);
    } else if (hasNextChapter && onNextChapter) {
      onNextChapter();
    }
  }, [currentPage, goToPage, hasNextChapter, onNextChapter, readingMode, pages.length]);
  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    } else if (hasPrevChapter && onPrevChapter) {
      onPrevChapter();
    }
  }, [currentPage, goToPage, hasPrevChapter, onPrevChapter]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isRtl = readingDirection === "rtl";
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        isRtl ? prevPage() : nextPage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        isRtl ? nextPage() : prevPage();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setZoom((z) => Math.min(200, z + 10));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setZoom((z) => Math.max(50, z - 10));
      } else if (e.key === "Escape") {
        if (isFullscreen) {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      } else if (e.key === "f") {
        toggleFullscreen();
      } else if (e.key === "h") {
        setShowControls((c) => !c);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage, readingDirection, isFullscreen]);
  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isFullscreen) setShowControls(false);
      }, 3e3);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isFullscreen]);
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  const getCurrentPages = () => {
    if (readingMode === "double") {
      const startIdx = currentPage * 2;
      const pages1 = pages[startIdx];
      const pages2 = pages[startIdx + 1];
      return readingDirection === "rtl" ? [pages2, pages1].filter(Boolean) : [pages1, pages2].filter(Boolean);
    }
    return [pages[currentPage]];
  };
  const getDisplayPageNumber = () => {
    if (readingMode === "double") {
      const start = currentPage * 2 + 1;
      const end = Math.min(start + 1, pages.length);
      return start === end ? `${start}` : `${start}-${end}`;
    }
    return `${currentPage + 1}`;
  };
  const currentPages = getCurrentPages();
  return /* @__PURE__ */ jsxs("div", { className: `relative bg-[var(--bg-primary)] ${isFullscreen ? "fixed inset-0 z-50" : "rounded-lg overflow-hidden"}`, children: [
    isLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-[var(--bg-primary)] z-50", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" }),
      /* @__PURE__ */ jsx("p", { className: "text-[var(--text-secondary)]", children: "Chargement des pages..." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between p-3 bg-[var(--bg-secondary)]/90 backdrop-blur-sm border-b border-[var(--card-border)] transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-[var(--font-title)] text-lg text-[var(--accent-primary)] truncate max-w-[200px] md:max-w-none", children: title }),
        chapterTitle && /* @__PURE__ */ jsxs("span", { className: "hidden md:inline text-[var(--text-secondary)] text-sm", children: [
          "• ",
          chapterTitle
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 md:gap-4", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-[var(--text-secondary)] text-sm", children: [
          "Page ",
          getDisplayPageNumber(),
          " / ",
          pages.length
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowSettings(!showSettings),
            className: "p-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors",
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
            onClick: toggleFullscreen,
            className: "p-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors",
            title: "Plein écran (F)",
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: isFullscreen ? /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" }) })
          }
        )
      ] })
    ] }),
    showSettings && /* @__PURE__ */ jsxs("div", { className: "absolute top-14 right-4 z-50 w-72 p-4 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-lg shadow-xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-[var(--accent-primary)] font-semibold mb-4", children: "Paramètres de lecture" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[var(--text-secondary)] text-sm mb-2 block", children: "Mode de lecture" }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [
          { mode: "single", label: "Simple", icon: "📄" },
          { mode: "double", label: "Double", icon: "📖" },
          { mode: "vertical", label: "Vertical", icon: "📜" }
        ].map(({ mode, label, icon }) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setReadingMode(mode);
              setCurrentPage(0);
            },
            className: `flex-1 py-2 px-3 rounded text-sm transition-colors ${readingMode === mode ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"}`,
            children: [
              icon,
              " ",
              label
            ]
          },
          mode
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[var(--text-secondary)] text-sm mb-2 block", children: "Direction de lecture" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setReadingDirection("ltr"),
              className: `flex-1 py-2 px-3 rounded text-sm transition-colors ${readingDirection === "ltr" ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"}`,
              children: "→ Gauche à Droite"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setReadingDirection("rtl"),
              className: `flex-1 py-2 px-3 rounded text-sm transition-colors ${readingDirection === "rtl" ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"}`,
              children: "← Droite à Gauche"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxs("label", { className: "text-[var(--text-secondary)] text-sm mb-2 block", children: [
          "Zoom: ",
          zoom,
          "%"
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "range",
            min: "50",
            max: "200",
            value: zoom,
            onChange: (e) => setZoom(Number(e.target.value)),
            className: "w-full accent-[var(--accent-primary)]"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[var(--text-secondary)] text-sm", children: "Miniatures" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowThumbnails(!showThumbnails),
            className: `w-12 h-6 rounded-full transition-colors ${showThumbnails ? "bg-[var(--accent-primary)]" : "bg-[var(--bg-primary)]"}`,
            children: /* @__PURE__ */ jsx("div", { className: `w-5 h-5 bg-white rounded-full transition-transform ${showThumbnails ? "translate-x-6" : "translate-x-0.5"}` })
          }
        )
      ] })
    ] }),
    readingMode === "vertical" ? (
      /* Vertical Scroll Mode */
      /* @__PURE__ */ jsx("div", { className: "overflow-y-auto max-h-[80vh] px-4 py-8 space-y-2", children: pages.map((page, idx) => /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: page,
          alt: `Page ${idx + 1}`,
          className: "max-w-full object-contain",
          style: { maxWidth: `${zoom}%` }
        }
      ) }, idx)) })
    ) : (
      /* Single/Double Page Mode */
      /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center min-h-[60vh] md:min-h-[70vh] bg-black/20", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: readingDirection === "rtl" ? nextPage : prevPage,
            disabled: readingDirection === "rtl" ? currentPage >= (readingMode === "double" ? Math.ceil(pages.length / 2) - 1 : pages.length - 1) && !hasNextChapter : currentPage === 0 && !hasPrevChapter,
            className: `absolute left-2 md:left-4 z-10 p-2 md:p-3 bg-[var(--bg-primary)]/80 rounded-full text-[var(--text-secondary)] hover:text-[var(--accent-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 ${showControls ? "opacity-100" : "opacity-0"}`,
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 md:w-6 md:h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `flex gap-1 items-center justify-center transition-transform duration-300`,
            style: { transform: `scale(${zoom / 100})` },
            children: currentPages.map((page, idx) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: page,
                  alt: `Page ${readingMode === "double" ? currentPage * 2 + idx + 1 : currentPage + 1}`,
                  className: "max-h-[65vh] md:max-h-[75vh] max-w-[45vw] md:max-w-[40vw] object-contain rounded shadow-2xl",
                  onClick: () => {
                    const clickX = window.event ? window.event.offsetX : 0;
                    const imgWidth = window.event?.target?.width || 0;
                    if (clickX < imgWidth / 2) {
                      readingDirection === "rtl" ? nextPage() : prevPage();
                    } else {
                      readingDirection === "rtl" ? prevPage() : nextPage();
                    }
                  }
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/60 rounded text-white text-xs", children: readingMode === "double" ? currentPage * 2 + idx + 1 : currentPage + 1 })
            ] }, idx))
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: readingDirection === "rtl" ? prevPage : nextPage,
            disabled: readingDirection === "rtl" ? currentPage === 0 && !hasPrevChapter : currentPage >= (readingMode === "double" ? Math.ceil(pages.length / 2) - 1 : pages.length - 1) && !hasNextChapter,
            className: `absolute right-2 md:right-4 z-10 p-2 md:p-3 bg-[var(--bg-primary)]/80 rounded-full text-[var(--text-secondary)] hover:text-[var(--accent-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 ${showControls ? "opacity-100" : "opacity-0"}`,
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 md:w-6 md:h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute left-0 top-0 w-1/3 h-full cursor-pointer z-5",
            onClick: () => readingDirection === "rtl" ? nextPage() : prevPage()
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute right-0 top-0 w-1/3 h-full cursor-pointer z-5",
            onClick: () => readingDirection === "rtl" ? prevPage() : nextPage()
          }
        )
      ] })
    ),
    showThumbnails && readingMode !== "vertical" && /* @__PURE__ */ jsx("div", { className: `p-3 bg-[var(--bg-secondary)]/90 backdrop-blur-sm border-t border-[var(--card-border)] transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`, children: /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 scrollbar-thin", children: pages.map((page, idx) => {
      const isCurrentPage = readingMode === "double" ? Math.floor(idx / 2) === currentPage : idx === currentPage;
      return /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => goToPage(readingMode === "double" ? Math.floor(idx / 2) : idx),
          className: `flex-shrink-0 w-12 h-16 md:w-16 md:h-24 rounded overflow-hidden border-2 transition-all ${isCurrentPage ? "border-[var(--accent-primary)] shadow-[0_0_10px_var(--glow-color)]" : "border-transparent hover:border-[var(--accent-primary)]/50"}`,
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
      );
    }) }) }),
    /* @__PURE__ */ jsx("div", { className: "h-1 bg-[var(--bg-secondary)]", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-full bg-[var(--accent-primary)] transition-all duration-300",
        style: {
          width: `${((readingMode === "double" ? currentPage * 2 : currentPage) + 1) / pages.length * 100}%`
        }
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: `p-2 text-center text-xs text-[var(--text-secondary)]/60 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`, children: "← → Navigation • ↑ ↓ Zoom • F Plein écran • H Masquer contrôles • Clic sur l'image pour naviguer" })
  ] });
}

export { BDReader as B };
