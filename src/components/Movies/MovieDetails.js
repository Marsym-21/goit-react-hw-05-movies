import React, { Suspense, useEffect, useRef, useState } from 'react';
import { getMovieDetails } from '../GetContent/GetMovieDetails';
import css from './movies.module.css';
import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'panding',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

const MovieDetails = () => {
  const [movie, setMovie] = useState(
    JSON.parse(window.localStorage.getItem('movie')) ?? {}
  );
  const [date, setDate] = useState('');
  const [score, setScore] = useState(0);
  const [genres, setGenres] = useState('');
  const { movieId } = useParams();
  const [status, setStatus] = useState(STATUS.IDLE);
  const location = useLocation();
  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500/';

  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    setStatus(STATUS.PENDING);

    if (!movieId) {
      setStatus(STATUS.REJECTED);
      return;
    }

    getMovieDetails(movieId)
      .then(movie => {
        if (movie.success === false) {
          setStatus(STATUS.REJECTED);
          return;
        }
        setMovie(movie);
        const movieDate = movie.release_date;
        if (movieDate) {
          setDate(movieDate.slice(0, 4));
        }
        const userScore = (movie.vote_average * 10).toFixed();
        setScore(userScore);

        const arrayGenres = movie.genres;
        let newArrayGenres = [];
        if (arrayGenres) {
          arrayGenres.forEach(({ name }) => {
            newArrayGenres.push(name);
            setGenres(newArrayGenres.join(', '));
          });
        }
        setStatus(STATUS.RESOLVED);
      })
      .catch(error => {
        console.error(error);
        setStatus(STATUS.REJECTED);
      });
  }, [movieId]);

  useEffect(() => {
    window.localStorage.setItem('movie', JSON.stringify(movie));
  }, [movie]);

  if (status === STATUS.PENDING)
    return <p className={css.cast_text}>Loading...</p>;

  if (status === STATUS.RESOLVED)
    return (
      <>
        <Link className={css.movie_back_link} to={backLinkLocationRef.current}>
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
                to={`/movies/${movieId}/cast`}
                state={{ from: location }}
              >
                Cast
              </Link>
            </li>
            <li className={css.movie_item_addinf}>
              <Link
                className={css.movie_link_addinf}
                to={`/movies/${movieId}/reviews`}
                state={{ from: location }}
              >
                Rewies
              </Link>
            </li>
          </ul>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </>
    );
  if (status === STATUS.REJECTED)
    return (
      <>
        <Link className={css.movie_back_link} to={backLinkLocationRef.current}>
          <button className={css.movie_back}>
            <AiOutlineArrowLeft fill="black" size="12" />
            Go Back
          </button>
        </Link>
        <b className={css.movie_error}>
          Sorry, we don't have detailed information about this movie !!!
        </b>
      </>
    );
};
export default MovieDetails;
