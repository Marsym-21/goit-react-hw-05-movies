import React, { useEffect } from 'react';
import { useCustomContext } from '../Context/Context';
import { getMovieReviews } from '../GetContent/GetMovieReviews';
// import css from './movies.module.css';

const MovieReviews = () => {
  const { id } = useCustomContext();

  useEffect(() => {
    getMovieReviews(id)
      .then(review => {
        console.log(review);
      })
      .catch(error => console.error(error));
  }, [id]);

  return <p>Reviews</p>;
};
export default MovieReviews;
