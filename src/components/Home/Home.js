// import { useCustomContext } from 'components/Context/Context';
import css from './home.module.css';
import { useState } from 'react';
import { getTopMovies } from './GeteDataInform';

const Home = () => {
  //   const { data } = useCustomContext();
  const [moviesArray, setMovies] = useState([]);

  useState(() => {
    getTopMovies()
      .then(movies => {
        console.log(movies);
        setMovies([...movies.results]);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className={css.home}>
      <p>Home</p>
      <ul>
        {moviesArray.map(({ title, id, name }) =>
          title ? <li key={id}>{title}</li> : <li key={id}>{name}</li>
        )}
      </ul>
    </div>
  );
};
export default Home;
