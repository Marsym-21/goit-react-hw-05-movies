import React, { useEffect, useState } from 'react';
import { useCustomContext } from '../Context/Context';
import { getMovieCast } from '../GetContent/GetMovieCast';
import css from './movies.module.css';

const MovieCast = () => {
  const { id } = useCustomContext();
  const [cast, setCast] = useState([]);
  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500/';

  useEffect(() => {
    getMovieCast(id)
      .then(cast => {
        setCast(cast.cast);
      })
      .catch(error => console.error(error));
  }, [id]);

  return (
    <ul className={css.cast_list}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li className={css.cast_item} key={id}>
          <img
            src={`${BASE_IMG_URL}${profile_path}`}
            width="150 px"
            alt=""
          ></img>
          <p className={css.cast_text}>{name}</p>
          <p className={css.cast_text}>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};
export default MovieCast;
