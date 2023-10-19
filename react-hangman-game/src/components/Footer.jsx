import '../styles/Footer.scss';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const navLinkActive = ({ isActive, isPending }) =>
    isPending ? 'pending' : isActive ? 'active' : '';

  return (
    <footer className="footer">
      <nav>
        <ul>
          <li className="footer__menu-item">
            <NavLink
              to="/"
              className={`footer__menu-link ${navLinkActive} `}
            >
              A jugar
            </NavLink>
          </li>
          <li className="footer__menu-item">
            <NavLink
              to="/instructions"
              className={`footer__menu-link ${navLinkActive} `}
            >
              ¿Cómo se juega?
            </NavLink>
          </li>
          <li className="footer__menu-item">
            <NavLink
              to="/options"
              className={`footer__menu-link ${navLinkActive} `}
            >
              Más opciones
            </NavLink>
          </li>
        </ul>
      </nav>
      <small className="footer__copy">© Adalab</small>
    </footer>
  );
};

export default Footer;
