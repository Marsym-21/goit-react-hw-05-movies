import css from './movies.module.css';
import { useCustomContext } from '../Context/Context';
import { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { getMovieSearch } from '../GetContent/GetMovieSearch';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'panding',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};
const Movies = () => {
  const { setId } = useCustomContext();
  const [name, setName] = useState('');
  const [searchName, setSearchName] = useState(
    JSON.parse(window.localStorage.getItem('searchName')) ?? ''
  );
  const [searchParams, setSearchParams] = useSearchParams('');
  const [moviesSearch, setMoviesSearch] = useState(
    JSON.parse(window.localStorage.getItem('moviesSearch')) ?? []
  );
  console.log(searchParams.get('query'));
  const location = useLocation();
  const [status, setStatus] = useState(STATUS.IDLE);

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
    setStatus(STATUS.PENDING);
    if (searchName.trim() === '') {
      setStatus(STATUS.REJECTED);
      return;
    }
    getMovieSearch(searchName)
      .then(movies => {
        setMoviesSearch([...movies.results]);
        setStatus(STATUS.RESOLVED);
      })
      .catch(error => {
        console.error(error);
        setStatus(STATUS.REJECTED);
      });
  }, [searchName]);

  useEffect(() => {
    window.localStorage.setItem('moviesSearch', JSON.stringify(moviesSearch));
  }, [moviesSearch]);

  useEffect(() => {
    window.localStorage.setItem('searchName', JSON.stringify(searchName));
  }, [searchName]);

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

      {status === STATUS.PENDING && <p className={css.cast_text}>Loading...</p>}

      {status === STATUS.RESOLVED && (
        <ul className={css.movies_list}>
          {moviesSearch.map(({ id, title }) => (
            <li
              key={id}
              className={css.movies_item}
              onClick={() => {
                setId(id);
              }}
            >
              <Link
                className={css.movies_link}
                to={`/movies/${id}`}
                state={{ from: location }}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Movies;
