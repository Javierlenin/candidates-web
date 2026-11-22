import type { Candidate } from '../types/candidate';
import { apiClient } from './apiClient';

type CandidateResponse = {
  id: number;
  name: string;
  email: string;
  city: string;
  experience_years?: number;
  experienceYears?: number;
  skills?: string[];
};

const toCandidate = (candidate: CandidateResponse): Candidate => ({
  id: candidate.id,
  name: candidate.name,
  email: candidate.email,
  city: candidate.city,
  experienceYears: candidate.experienceYears ?? candidate.experience_years ?? 0,
  skills: candidate.skills ?? [],
});

export const getCandidates = async (): Promise<Candidate[]> => {
  const response = await apiClient.get<CandidateResponse[]>('/candidates');
  return response.data.map(toCandidate);
};
