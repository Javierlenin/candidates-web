import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { isAxiosError } from 'axios';
import { getCandidateById } from '../services/candidateService';
import type { Candidate } from '../types/candidate';
import './CandidateDetailPage.css';

const formatExperience = (years: number): string => {
  if (years === 0) {
    return 'Sin experiencia';
  }

  if (years === 1) {
    return '1 año de experiencia';
  }

  return `${years} años de experiencia`;
};

const NOT_FOUND_MESSAGE = 'El candidato que busca no existe.';
const ERROR_MESSAGE =
  'No se pudieron cargar los candidatos. Intente de nuevo más tarde.';

export const CandidateDetailPage = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadCandidate = async () => {
      setIsLoading(true);
      setErrorMessage('');
      setCandidate(null);

      try {
        setCandidate(await getCandidateById(Number(id)));
      } catch (error) {
        const status = isAxiosError(error) ? error.response?.status : undefined;

        if (status === 404 || status === 400) {
          setErrorMessage(NOT_FOUND_MESSAGE);
        } else {
          setErrorMessage(ERROR_MESSAGE);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCandidate();
  }, [id]);

  if (isLoading) {
    return <p className="candidate-detail-status">Cargando candidato...</p>;
  }

  if (errorMessage || !candidate) {
    return (
      <section>
        <p className="candidate-detail-status candidate-detail-error" role="alert">
          {errorMessage || NOT_FOUND_MESSAGE}
        </p>
        <Link to="/candidates" className="candidate-detail-back">
          ← Volver a los candidatos
        </Link>
      </section>
    );
  }

  return (
    <section className="candidate-detail">
      <h2 className="candidate-detail-name">{candidate.name}</h2>
      <p className="candidate-detail-city">{candidate.city}</p>
      <p className="candidate-detail-email">{candidate.email}</p>
      <p className="candidate-detail-experience">
        {formatExperience(candidate.experience_years)}
      </p>
      {candidate.skills && candidate.skills.length > 0 && (
        <ul className="candidate-detail-skills">
          {candidate.skills.map((skill) => (
            <li key={skill} className="candidate-detail-skill">
              {skill}
            </li>
          ))}
        </ul>
      )}
      <Link to="/candidates" className="candidate-detail-back">
        ← Volver a los candidatos
      </Link>
    </section>
  );
};
