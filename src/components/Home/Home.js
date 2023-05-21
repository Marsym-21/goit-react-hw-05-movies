import css from './home.module.css';
import { useEffect, useState } from 'react';
import { getTopMovies } from '../GetContent/GetTopMovies';
import { useCustomContext } from '../Context/Context';
import { Link, useLocation } from 'react-router-dom';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'panding',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

const Home = () => {
  const { setId } = useCustomContext();
  const [moviesArray, setMovies] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const location = useLocation();

  useEffect(() => {
    setStatus(STATUS.PENDING);
    getTopMovies()
      .then(movies => {
        setMovies([...movies.results]);
        setStatus(STATUS.RESOLVED);
      })
      .catch(error => {
        console.error(error);
        setStatus(STATUS.REJECTED);
      });
  }, []);

  const onCliclHomeList = id => {
    setId(id);
  };

  return (
    <div className={css.home}>
      <h1 className={css.home_title}>Trending Today</h1>
      {status === STATUS.PENDING && (
        <p className={css.home_title}>Loading...</p>
      )}

      {status === STATUS.RESOLVED && (
        <ul className={css.home_list}>
          {moviesArray.map(({ title, id, name }) =>
            title ? (
              <li
                key={id}
                onClick={() => {
                  onCliclHomeList(id);
                }}
                className={css.home_item}
              >
                <Link
                  className={css.home_link}
                  to={`/movies/${id}`}
                  state={{ from: location }}
                >
                  {title}
                </Link>
              </li>
            ) : (
              <li
                key={id}
                onClick={() => {
                  onCliclHomeList(id);
                }}
                className={css.home_item}
              >
                <Link
                  className={css.home_link}
                  to={`/movies/${id}`}
                  state={{ from: location }}
                >
                  {name}
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};
export default Home;
