import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../routes/routes';
import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <>
      <ul className={s.menu}>
        <li>
          <NavLink exact to={routes.home} activeClassName={s.activelink}>
            Home{' '}
          </NavLink>
        </li>
        <li>
          <NavLink to={routes.movies} activeClassName={s.activelink}>
            Movies{' '}
          </NavLink>
        </li>
      </ul>
      <hr />
    </>
  );
};
export default Navigation;
