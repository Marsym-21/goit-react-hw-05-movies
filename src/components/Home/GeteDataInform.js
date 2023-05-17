import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/all/day?api_key=cca44323113746d2d15fa3c7640b29b7',
  params: { language: 'en-US' },
  headers: { accept: 'application/json' },
};

export const getTopMovies = async () => {
  return axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};
