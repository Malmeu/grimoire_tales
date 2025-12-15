import { useState, useEffect } from 'react';

type Theme = 'dark-fantasy' | 'eldritch-horror' | 'space' | 'fairy' | 'ethereal' | 'warrior';

interface ThemeOption {
  id: Theme;
  name: string;
  icon: string;
  description: string;
}

const themes: ThemeOption[] = [
  {
    id: 'dark-fantasy',
    name: 'Dark Fantasy',
    icon: '🏰',
    description: 'Parchemin & Magie Ancienne'
  },
  {
    id: 'eldritch-horror',
    name: 'Eldritch Horror',
    icon: '🩸',
    description: 'Gore & Lovecraftien'
  },
  {
    id: 'space',
    name: 'Cosmos',
    icon: '🌌',
    description: 'Espace & Nébuleuses'
  },
  {
    id: 'fairy',
    name: 'Féerique',
    icon: '🧚',
    description: 'Enchanté & Magique'
  },
  {
    id: 'ethereal',
    name: 'Éthéré',
    icon: '💫',
    description: 'Mystique & Céleste'
  },
  {
    id: 'warrior',
    name: 'Guerrier',
    icon: '⚔️',
    description: 'Combat & Bataille'
  }
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark-fantasy');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('grimoire-theme') as Theme;
    if (savedTheme && themes.some(t => t.id === savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const switchTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('grimoire-theme', theme);
    setIsOpen(false);
  };

  const currentThemeData = themes.find(t => t.id === currentTheme);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)'
        }}
        aria-label="Changer de thème"
      >
        <span className="text-xl">{currentThemeData?.icon}</span>
        <span className="hidden sm:inline text-sm" style={{ color: 'var(--accent-primary)' }}>
          {currentThemeData?.name}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: 'var(--accent-primary)' }}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div 
            className="absolute right-0 mt-2 w-64 rounded-xl overflow-hidden z-50 shadow-2xl"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--card-border)'
            }}
          >
            <div className="p-3 border-b" style={{ borderColor: 'var(--card-border)' }}>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                Choisir un thème
              </p>
            </div>
            <div className="p-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => switchTheme(theme.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    currentTheme === theme.id ? 'ring-2 ring-[var(--accent-primary)]' : 'hover:opacity-80'
                  }`}
                  style={{
                    background: currentTheme === theme.id ? 'var(--card-bg)' : 'transparent'
                  }}
                >
                  <span className="text-2xl">{theme.icon}</span>
                  <div className="text-left">
                    <p 
                      className="font-medium text-sm"
                      style={{ color: currentTheme === theme.id ? 'var(--accent-primary)' : 'var(--text-primary)' }}
                    >
                      {theme.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {theme.description}
                    </p>
                  </div>
                  {currentTheme === theme.id && (
                    <svg 
                      className="w-5 h-5 ml-auto" 
                      style={{ color: 'var(--accent-primary)' }}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <div 
              className="p-3 border-t text-center"
              style={{ borderColor: 'var(--card-border)' }}
            >
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Le thème est sauvegardé automatiquement
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
