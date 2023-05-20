import React, { useEffect, useState } from 'react';
import { useCustomContext } from '../Context/Context';
import { getMovieReviews } from '../GetContent/GetMovieReviews';
import css from './movies.module.css';

const MovieReviews = () => {
  const { id } = useCustomContext();
  const [review, setReview] = useState([]);

  useEffect(() => {
    getMovieReviews(id)
      .then(review => {
        console.log(review.results);
        setReview(review.results);
      })
      .catch(error => console.error(error));
  }, [id]);

  return (
    <ul className={css.cast_list}>
      {review.map(({ id, author, content }) => (
        <li className={css.cast_item} key={id}>
          <h3 className={css.movie_title3}>Author:{author}</h3>
          <p className={css.cast_text}>{content}</p>
        </li>
      ))}
    </ul>
  );
};
export default MovieReviews;
