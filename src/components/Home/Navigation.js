import css from './home.module.css';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
  return (
    <div className={css.nav}>
      <NavLink to="/" className={css.link}>
        Home
      </NavLink>
      <NavLink to="/movies" className={css.link}>
        Movies
      </NavLink>
    </div>
  );
};
export default Navigation;
