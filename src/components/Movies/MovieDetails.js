import React, { useEffect, useState } from 'react';
import { useCustomContext } from '../Context/Context';
import { getMovieDetails } from '../GetContent/GetMovieDetails';
import css from './movies.module.css';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import MovieCast from './MoviesCast';
import MovieReviews from './MoviesReviews';

const MovieDetails = () => {
  const { id, statusC, setStatusc, statusR, setStatusr, btnBack } =
    useCustomContext();
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
          newArrayGenres.push(name);
          setGenres(newArrayGenres.join(', '));
        });
      })
      .catch(error => console.error(error));
  }, [id]);

  return movie.adult === false ? (
    <>
      <Link className={css.movie_back_link} to={btnBack ? '/' : '/movies'}>
        <button className={css.movie_back}>
          <AiOutlineArrowLeft fill="black" size="12" />
          Go Back
        </button>
      </Link>

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
        <ul className={css.movie_list_addinf}>
          <li className={css.movie_item_addinf}>
            <Link
              className={css.movie_link_addinf}
              to={`/movies/:${id}/cast`}
              onClick={() => {
                setStatusc(true);
                setStatusr(false);
              }}
            >
              Cast
            </Link>
          </li>
          <li className={css.movie_item_addinf}>
            <Link
              className={css.movie_link_addinf}
              to={`/movies/:${id}/reviews`}
              onClick={() => {
                setStatusc(false);
                setStatusr(true);
              }}
            >
              Rewies
            </Link>
          </li>
        </ul>
      </div>
      {statusC ? <MovieCast /> : ''}
      {statusR ? <MovieReviews /> : ''}
    </>
  ) : (
    <b className={css.movie_error}>
      Sorry, we don't have detailed information about this movie !!!
    </b>
  );
};
export default MovieDetails;
