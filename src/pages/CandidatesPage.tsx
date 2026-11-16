import { useState } from 'react';
import './CandidatesPage.css';
import { SearchBar } from '../components/SearchBar';
import { candidates } from '../data/candidates';
import { CandidateList } from '../components/CandidateList';

export const CandidatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const normalizedTerm = searchTerm.trim().toLowerCase();

  const filteredCandidates = candidates.filter((candidate) =>
    `${candidate.name} ${candidate.city}`.toLowerCase().includes(normalizedTerm),
  );

  const handleToggleFavorite = (id: number) => {
    setFavoriteIds((currentIds) => {
      if (currentIds.includes(id)) {
        return currentIds.filter((favoriteId) => favoriteId !== id);
      }

      return [...currentIds, id];
    });
  };

  return (
    <section>
      <div className="candidates-page-header">
        <h2 className="candidates-page-title">Candidatos</h2>
        <p className="candidates-page-count">
          {filteredCandidates.length}{' '}
          {filteredCandidates.length === 1 ? 'resultado' : 'resultados'}
        </p>
      </div>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar por nombre o ciudad"
        label="Buscar candidatos"
      />
      {filteredCandidates.length > 0 ? (
        <CandidateList
          candidates={filteredCandidates}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <p className="candidates-page-empty">
          No se encontraron candidatos con ese término
        </p>
      )}
    </section>
  );
};
