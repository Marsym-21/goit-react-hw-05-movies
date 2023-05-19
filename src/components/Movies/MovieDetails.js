import React, { useEffect, useState } from 'react';
import { useCustomContext } from '../Context/Context';
import { getMovieDetails } from '../GetContent/GetMovieDetails';
import css from './movies.module.css';
import { Link } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useCustomContext();
  const [movie, setMovie] = useState({});
  const [date, setDate] = useState('');
  const [score, setScore] = useState(0);
  const [genres, setGenres] = useState('');
  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500/';

  useEffect(() => {
    getMovieDetails(id)
      .then(movie => {
        console.log(movie);
        setMovie(movie);
        const movieDate = movie.release_date;
        if (movieDate) {
          setDate(movieDate.slice(0, 4));
        }
        const userScore = (movie.vote_average * 10).toFixed();
        setScore(userScore);

        const arrayGenres = movie.genres;
        let newArrayGenres = [];
        arrayGenres.forEach(({ name }) => {
          console.log(name);
          newArrayGenres.push(name);
          console.log(newArrayGenres);
          setGenres(newArrayGenres.join(', '));
        });
      })
      .catch(error => console.error(error));
  }, [id]);

  return movie.adult === false ? (
    <>
      <div className={css.movie_card}>
        {movie.poster_path ? (
          <img
            src={`${BASE_IMG_URL}${movie.poster_path}`}
            width="300 px"
            alt=""
          ></img>
        ) : (
          <b className={css.banner_error}>Sorry, the banner was not found</b>
        )}
        <div className={css.movie_inf}>
          <h1 className={css.movie_title}>{`${movie.title}(${date})`}</h1>
          <p className={css.movie_text}>User score: {score}%</p>
          <h2 className={css.movie_title2}>Overview</h2>
          <p className={css.movie_text}>{movie.overview}</p>
          <h3 className={css.movie_title3}>Genres</h3>
          <p className={css.movie_text}>{genres}</p>
        </div>
      </div>
      <div className={css.movie_add_inf}>
        <p className={css.movie_text}>Additional information</p>
        <ul>
          <li>
            <Link to={`/movies/:${id}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/:${id}/reviews`}>Rewies</Link>
          </li>
        </ul>
      </div>
    </>
  ) : (
    <b className={css.movie_error}>
      Sorry, we don't have detailed information about this movie !!!
    </b>
  );
};
export default MovieDetails;
