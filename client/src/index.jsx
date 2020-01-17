import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

/* 
  BODY REQS FOR AXIOS REQUESTS TO SERVER:
    All routes start with /movies
      get to /search: { tmdb_id }
        returns: array of objects from tmdb request
      get to /genres: nothing
        returns: array of objects { id: int, name: string }
      post to /save: { title, year, rating, tmdb_id }
        returns: a sendstatus '201'
      delete to /delete: { tmdb_id }
        returns: a sendstatus '204'
      get to /favorites: nothing
        returns: an array of objects which is the result of querying from table
*/


class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };
    
    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
  }

  getMovies(searchGenre) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios.get('/movies/search', {params: {genre_id: searchGenre}})
      .then((results) => {
        let newMoviesState = results.data.map((movie) => {
          return {
            tmdb_id: movie.id,
            title: movie.title,
            rating: movie.vote_average,
            movie_year: movie.release_date.split('-')[0],
            poster_path: movie.poster_path,
            img_url: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
          }
        })
        this.setState({movies: newMoviesState});
      })
      .catch((err) => {
        console.error('Error from get request to /movies/search: ', err);
      });
  }

  saveMovie(movie) {
    // same as above but do something diff
    //console.log(movie);
    let body = {
      tmdb_id: movie.tmdb_id,
      title: movie.title,
      movie_year: movie.movie_year,
      poster_path: movie.poster_path,
      rating: movie.rating
    };
    axios.post('/movies/save', body)
      .catch((err) => {
        console.error('Error from post request to /movies/save: ', err);
      })
      .then((results) => {
        //console.log('Results from post request to /movies/save: ', results);
        return axios.get('/movies/favorites');
      })
      .catch((err) => {
        console.error('Error from get request to /movies/favorites in saveMovie method from client/src/index: ', err);
      })
      .then(({data}) => {
        //console.log('Results from get request to /movies/favorites in saveMovie method from client/src/index: ', data);
        let dataWithImgUrl = data.map((movie) => {
          return Object.assign({img_url: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`}, movie)
        })
        //console.log(dataWithImgUrl);
        this.setState({
          favorites: dataWithImgUrl
        });
      })
  }

  // componentDidMount() {
  //   axios.delete('/movies/delete', { params: {tmdb_id: 5}});
  // }

  deleteMovie(tmdb_id) {
   
    // same as above but do something diff
    axios.delete('/movies/delete', { params: {tmdb_id: tmdb_id}})
      .catch((err) => {
        console.error('Error from delete request to /movies/delete: ', err);
      })
      .then((results) => {
        //console.log('Results from delete request to /movies/delete: ', results);
        return axios.get('/movies/favorites');
      })
      .catch((err) => {
        console.error('Error from get request to /movies/favorites in deleteMovie method from client/src/index: ', err);
      })
      .then(({data}) => {
        //console.log('Results from get request to movies/favorites in deleteMovie method from client/src/index: ', data);
        //this.setState(results);
        let dataWithImgUrl = data.map((movie) => {
          return Object.assign({img_url: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`}, movie)
        })
        //console.log(dataWithImgUrl);
        this.setState({
          favorites: dataWithImgUrl
        });
      })
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies} />
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} saveMovie={this.saveMovie} deleteMovie={this.deleteMovie} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));