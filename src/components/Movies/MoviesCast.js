import React, { useEffect, useState } from 'react';
// import { useCustomContext } from '../Context/Context';
import { getMovieCast } from '../GetContent/GetMovieCast';
import { useParams } from 'react-router-dom';
import css from './movies.module.css';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'panding',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500/';
  const [status, setStatus] = useState(STATUS.IDLE);

  useEffect(() => {
    setStatus(STATUS.PENDING);
    getMovieCast(movieId)
      .then(cast => {
        if (cast.cast.length === 0) {
          setStatus(STATUS.REJECTED);
          return;
        } else {
          setCast(cast.cast);
          setStatus(STATUS.RESOLVED);
        }
      })
      .catch(error => {
        console.error(error);
        setStatus(STATUS.REJECTED);
      });
  }, [movieId]);
  if (status === STATUS.RESOLVED)
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
  else if (status === STATUS.PENDING)
    return <p className={css.cast_text}>Loading...</p>;
  else if (status === STATUS.REJECTED)
    return (
      <p className={css.cast_text}>We don't have any reviews for this movie.</p>
    );
};
export default MovieCast;
