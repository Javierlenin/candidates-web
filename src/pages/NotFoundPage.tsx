import { Link } from 'react-router';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  return (
    <section className="not-found-page">
      <h2>Página no encontrada</h2>
      <Link to="/candidates">Volver a los candidatos</Link>
    </section>
  );
};
