import { Link, NavLink } from 'react-router';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="header-brand">
          TalentHub
        </Link>
        <NavLink
          to="/candidates"
          className={({ isActive }) =>
            isActive ? 'header-link header-link-active' : 'header-link'
          }
        >
          Candidatos
        </NavLink>
      </div>
    </header>
  );
};
