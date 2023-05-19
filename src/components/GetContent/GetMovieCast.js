const api_Key =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2Q2ODBiNmUxZDYzZDQwZDAzOTYyZGI4MGUyYTFhMCIsInN1YiI6IjY0NjRjMmU2ZDA1YTAzMDExOWRlYzU2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q0ZQUwtEPrByjiIx7f7hGYHdbh5ojLcYEsIIKeW2RXE';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${api_Key}`,
  },
};
export const getMovieCast = async id => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    options
  )
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(err => console.error(err));
};
