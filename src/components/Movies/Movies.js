import css from './movies.module.css';
import { useCustomContext } from '../Context/Context';
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getMovieSearch } from '../GetContent/GetMovieSearch';

const Movies = () => {
  const { setId, setStatusc, setStatusr, setBtnBack } = useCustomContext();
  const [name, setName] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');
  const [moviesSearch, setMoviesSearch] = useState(
    JSON.parse(window.localStorage.getItem('moviesSearch')) ?? []
  );

  const handleNameChange = e => {
    setName(e.currentTarget.value);
  };

  const submitForm = e => {
    e.preventDefault();
    setSearchParams({ query: name });
    setSearchName(name);
    setName('');
  };

  useEffect(() => {
    if (searchName.trim() === '') {
      return;
    }
    getMovieSearch(searchName)
      .then(movies => {
        setMoviesSearch([...movies.results]);
      })
      .catch(error => console.error(error));
  }, [searchName]);

  useEffect(() => {
    window.localStorage.setItem('moviesSearch', JSON.stringify(moviesSearch));
  }, [moviesSearch]);

  return (
    <div className={css.movies}>
      <form className={css.movies_form}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie name"
          onChange={handleNameChange}
          value={name}
        />
        <button className={css.btn_sub} type="submit" onClick={submitForm}>
          Search
        </button>
      </form>
      <ul className={css.movies_list}>
        {moviesSearch.map(({ id, title }) => (
          <li
            key={id}
            className={css.movies_item}
            onClick={() => {
              setId(id);
              setStatusc(false);
              setStatusr(false);
              setBtnBack(false);
            }}
          >
            <Link className={css.movies_link} to={`/movies/${id}`}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Movies;
