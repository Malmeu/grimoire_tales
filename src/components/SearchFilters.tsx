import { useState } from 'react';

interface SearchFiltersProps {
  genres: string[];
  types: string[];
  sortOptions: string[];
}

export default function SearchFilters({ genres, types, sortOptions }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tous');
  const [selectedType, setSelectedType] = useState('Tous');
  const [selectedSort, setSelectedSort] = useState('Popularité');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const typeLabels: Record<string, string> = {
    'Tous': 'Tous',
    'novel': 'Novels',
    'book': 'Livres',
    'comic': 'BD'
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher une histoire, un auteur, un tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-5 py-4 pl-12 bg-dark-void/50 border border-gold-old/20 rounded-lg text-parchment-light placeholder-parchment/40 focus:outline-none focus:border-gold-old/50 transition-colors"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-parchment/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Genre Filter */}
        <div className="flex-1 min-w-[150px]">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full px-4 py-2 bg-dark-void/50 border border-gold-old/20 rounded-lg text-parchment-light focus:outline-none focus:border-gold-old/50 transition-colors cursor-pointer"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre} className="bg-dark-void">
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex-1 min-w-[150px]">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-2 bg-dark-void/50 border border-gold-old/20 rounded-lg text-parchment-light focus:outline-none focus:border-gold-old/50 transition-colors cursor-pointer"
          >
            {types.map((type) => (
              <option key={type} value={type} className="bg-dark-void">
                {typeLabels[type] || type}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex-1 min-w-[150px]">
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="w-full px-4 py-2 bg-dark-void/50 border border-gold-old/20 rounded-lg text-parchment-light focus:outline-none focus:border-gold-old/50 transition-colors cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option} className="bg-dark-void">
                Trier par: {option}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 border border-gold-old/20 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'grid' ? 'bg-gold-old/20 text-gold-old' : 'text-parchment/50 hover:text-parchment'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'list' ? 'bg-gold-old/20 text-gold-old' : 'text-parchment/50 hover:text-parchment'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedGenre !== 'Tous' || selectedType !== 'Tous' || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-parchment/50">Filtres actifs:</span>
          {searchQuery && (
            <span className="px-3 py-1 bg-gold-old/10 text-gold-old text-sm rounded-full flex items-center gap-2">
              "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="hover:text-gold-bright">×</button>
            </span>
          )}
          {selectedGenre !== 'Tous' && (
            <span className="px-3 py-1 bg-gold-old/10 text-gold-old text-sm rounded-full flex items-center gap-2">
              {selectedGenre}
              <button onClick={() => setSelectedGenre('Tous')} className="hover:text-gold-bright">×</button>
            </span>
          )}
          {selectedType !== 'Tous' && (
            <span className="px-3 py-1 bg-gold-old/10 text-gold-old text-sm rounded-full flex items-center gap-2">
              {typeLabels[selectedType]}
              <button onClick={() => setSelectedType('Tous')} className="hover:text-gold-bright">×</button>
            </span>
          )}
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedGenre('Tous');
              setSelectedType('Tous');
            }}
            className="text-sm text-parchment/50 hover:text-gold-old transition-colors"
          >
            Effacer tout
          </button>
        </div>
      )}
    </div>
  );
}
