//const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../konfig.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

let getGenresFromTMDB = function () {
  let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
  
  return axios.get(url);
}

let getMoviesFromTMDB = function (genre_id) {
  //console.log(genre_id);
  let urlParams = {
    sort_by: 'vote_average.asc',
    with_genres: genre_id
  }
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${urlParams.sort_by}&include_adult=false&include_video=false&page=1&with_genres=${urlParams.with_genres}`;
  
  return axios.get(url);
}

module.exports.getMoviesFromTMDB = getMoviesFromTMDB;
module.exports.getGenresFromTMDB = getGenresFromTMDB;