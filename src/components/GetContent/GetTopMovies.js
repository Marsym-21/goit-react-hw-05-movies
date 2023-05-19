import axios from 'axios';
const api_Key =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2Q2ODBiNmUxZDYzZDQwZDAzOTYyZGI4MGUyYTFhMCIsInN1YiI6IjY0NjRjMmU2ZDA1YTAzMDExOWRlYzU2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q0ZQUwtEPrByjiIx7f7hGYHdbh5ojLcYEsIIKeW2RXE';
const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/all/day?api_key=e3d680b6e1d63d40d03962db80e2a1a0rfvb ',
  params: { language: 'en-US' },
  headers: { accept: 'application/json', Authorization: `Bearer ${api_Key}` },
};

export const getTopMovies = async () => {
  return axios
    .request(options)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
};
