import { useState, useEffect, useCallback } from 'react';

interface ComicViewerProps {
  pages: string[];
  title: string;
}

export default function ComicViewer({ pages, title }: ComicViewerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < pages.length) {
      setCurrentPage(page);
      setIsZoomed(false);
    }
  }, [pages.length]);

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      } else if (e.key === 'Escape') {
        setIsZoomed(false);
        setIsFullscreen(false);
      } else if (e.key === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-dark-void' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-dark-void/80 backdrop-blur-sm">
        <h2 className="font-gothic text-xl text-gold-old truncate">{title}</h2>
        <div className="flex items-center gap-4">
          <span className="text-parchment/70">
            Page {currentPage + 1} / {pages.length}
          </span>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-parchment hover:text-gold-old transition-colors"
            title="Plein écran (F)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isFullscreen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Main Viewer */}
      <div className="relative flex items-center justify-center min-h-[60vh] bg-dark-void/50">
        {/* Previous Button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="absolute left-4 z-10 p-3 bg-dark-void/80 rounded-full text-parchment hover:text-gold-old disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Image */}
        <div 
          className={`relative cursor-pointer transition-transform duration-300 ${isZoomed ? 'scale-150' : ''}`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={pages[currentPage]}
            alt={`Page ${currentPage + 1}`}
            className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-dark"
          />
          {isZoomed && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-dark-void/80 rounded text-xs text-parchment">
              Cliquez pour dézoomer
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
          className="absolute right-4 z-10 p-3 bg-dark-void/80 rounded-full text-parchment hover:text-gold-old disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Page Thumbnails */}
      <div className="p-4 bg-dark-void/80 backdrop-blur-sm">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {pages.map((page, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx)}
              className={`flex-shrink-0 w-16 h-24 rounded overflow-hidden border-2 transition-all ${
                idx === currentPage 
                  ? 'border-gold-old shadow-glow' 
                  : 'border-transparent hover:border-gold-old/50'
              }`}
            >
              <img
                src={page}
                alt={`Miniature page ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard Hints */}
      <div className="p-2 text-center text-xs text-parchment/40">
        ← → pour naviguer • Espace pour page suivante • F pour plein écran • Clic pour zoomer
      </div>
    </div>
  );
}
