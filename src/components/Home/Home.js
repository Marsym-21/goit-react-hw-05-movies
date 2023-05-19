import css from './home.module.css';
import { useEffect, useState } from 'react';
import { getTopMovies } from '../GetContent/GetTopMovies';
import { useCustomContext } from '../Context/Context';
import { Link } from 'react-router-dom';

const Home = () => {
  const { setId } = useCustomContext();
  const [moviesArray, setMovies] = useState([]);

  useEffect(() => {
    getTopMovies()
      .then(movies => {
        setMovies([...movies.results]);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className={css.home}>
      <h1 className={css.home_title}>Trending Today</h1>
      <ul className={css.home_list}>
        {moviesArray.map(({ title, id, name }) =>
          title ? (
            <li key={id} onClick={() => setId(id)} className={css.home_item}>
              <Link className={css.home_link} to={`/movies/:${id}`}>
                {title}
              </Link>
            </li>
          ) : (
            <li key={id} onClick={() => setId(id)} className={css.home_item}>
              <Link className={css.home_link} to={`/movies/:${id}`}>
                {name}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
export default Home;
