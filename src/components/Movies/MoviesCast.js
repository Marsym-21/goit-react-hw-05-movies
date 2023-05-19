import React, { useEffect } from 'react';
import { useCustomContext } from '../Context/Context';
import { getMovieCast } from '../GetContent/GetMovieCast';
// import css from './movies.module.css';

const MovieCast = () => {
  const { id } = useCustomContext();

  useEffect(() => {
    getMovieCast(id)
      .then(cast => {
        console.log(cast);
      })
      .catch(error => console.error(error));
  }, [id]);

  return <p>CAST</p>;
};
export default MovieCast;
