import React, { useEffect, useState } from 'react';
// import { useCustomContext } from '../Context/Context';
import { getMovieReviews } from '../GetContent/GetMovieReviews';
import { useParams } from 'react-router-dom';
import css from './movies.module.css';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'panding',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

const MovieReviews = () => {
  // const { id } = useCustomContext();
  const [review, setReview] = useState([]);
  const { movieId } = useParams();
  const [status, setStatus] = useState(STATUS.IDLE);

  useEffect(() => {
    setStatus(STATUS.PENDING);
    getMovieReviews(movieId)
      .then(review => {
        if (review.results.length === 0) {
          setStatus(STATUS.REJECTED);
          return;
        } else {
          setReview(review.results);
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
        {review.map(({ id, author, content }) => (
          <li className={css.cast_item} key={id}>
            <h3 className={css.movie_title3}>Author:{author}</h3>
            <p className={css.cast_text}>{content}</p>
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
export default MovieReviews;
