export interface Candidate {
  id: number;
  name: string;
  email: string;
  city: string;
  experience_years: number;
  skills?: string[];
}