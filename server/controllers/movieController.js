const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre     

    // https://www.themoviedb.org/account/signup
    // get your API KEY

    // use this endpoint to search for movies by genres, you will need an API key

    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API

    apiHelpers.getGenresFromTMDB()
      .then(({data}) => {
        for (let i = 0; i < data.genres.length; i++) {
          if (data.genres[i].name === req.body.genre) {
            return data.genres[i].id;
          }
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(503);
      })
      .then((genre_id) => {
        return apiHelpers.getMoviesFromTMDB(genre_id);
      })
      .then((data) => {
        //send objects with desired mySQL info instead
        console.log(data.data.results);
        res.send(data.data.results);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500)
      });
  },
  getGenres: (req, res) => {
    // make an axios request to get the list of official genres
    
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
    
    // send back

    apiHelpers.getGenresFromTMDB()
      .then((data) => {
        res.send(data.data);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(501);
      })
  },
  saveMovie: (req, res) => {
    movieModel.saveMovie(req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(505);
      })
  },
  deleteMovie: (req, res) => {
    movieModel.deleteMovie(req.body)
      .then((data) => {
        //console.log(data);
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(506);
      })
  },
  getFavorites: (req, res) => {
    movieModel.getFavorites()
      .then((data) => {
        // weird: data being logged not the same as data being sent, but it's fine because data being sent is what I want
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(404);
      });
  }
}