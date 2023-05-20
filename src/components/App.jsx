import { Routes, Route } from 'react-router-dom';
import css from './Home/home.module.css';
import Movies from './Movies';
import Layout from './Layout';
import Home from './Home';
import MovieDetails from './Movies/MovieDetails';
import MovieCast from './Movies/MoviesCast';
import MoviesReviews from './Movies/MoviesReviews';

export const App = () => {
  return (
    <div className={css.app}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MoviesReviews />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
