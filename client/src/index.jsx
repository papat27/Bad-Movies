import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

/* 
  BODY REQS FOR AXIOS REQUESTS TO SERVER:
    All routes start with /movies
      get to /search: nothing
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
  }

  getMovies() {
    // make an axios request to your server on the GET SEARCH endpoint
  }

  saveMovie() {
    // same as above but do something diff
  }

  deleteMovie() {
   
    // same as above but do something diff
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
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));