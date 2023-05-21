import css from './movies.module.css';
// import { useCustomContext } from '../Context/Context';
import { useEffect, useState } from 'react';

const Movies = () => {
  const [name, setName] = useState('');

  const handleNameChange = e => {
    setName(e.currentTarget.value);
  };

  const submitForm = e => {
    e.preventDefault();
    if (name.trim() === '') {
      alert('Please enter a valid name !');
      return;
    }
    setName('');
  };

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
          // value={name}
        />
        <button
          className={css.btn_sub}
          type="submit"
          // className={css['SearchForm-button']}
          onClick={submitForm}
        >
          Search
        </button>
      </form>
    </div>
  );
};
export default Movies;
