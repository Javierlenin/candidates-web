import { useEffect, useState } from 'react';
import './CandidatesPage.css';
import { SearchBar } from '../components/SearchBar';
import { CandidateList } from '../components/CandidateList';
import type { Candidate } from '../types/candidate';
import { getCandidates } from '../services/candidateService';

export const CandidatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        setCandidates(await getCandidates());
      } catch {
        setErrorMessage(
          'No se logró cargar los candidatos. Intente de nuevo más tarde',
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadCandidates();
  }, []);

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

  const renderContent = () => {
    if (isLoading) {
      return <p className="candidates-page-status">Cargando candidatos...</p>;
    }

    if (errorMessage) {
      return (
        <p className="candidates-page-status candidates-page-error" role="alert">
          {errorMessage}
        </p>
      );
    }

    if (filteredCandidates.length === 0) {
      return (
        <p className="candidates-page-empty">
          No se encontraron candidatos con ese término
        </p>
      );
    }

    return (
      <CandidateList
        candidates={filteredCandidates}
        favoriteIds={favoriteIds}
        onToggleFavorite={handleToggleFavorite}
      />
    );
  };

  return (
    <section>
      <div className="candidates-page-header">
        <h2 className="candidates-page-title">Candidatos</h2>
        {!isLoading && !errorMessage && (
          <p className="candidates-page-count">
            {filteredCandidates.length}{' '}
            {filteredCandidates.length === 1 ? 'resultado' : 'resultados'}
          </p>
        )}
      </div>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar por nombre o ciudad"
        label="Buscar candidatos"
      />
      {renderContent()}
    </section>
  );
};
