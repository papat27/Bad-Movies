import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)
  handleClick(movie) {
    //console.log('movie:', movie);
    if (this.props.showFaves) {
      this.props.deleteMovie(movie.tmdb_id);
    } else {
      this.props.saveMovie(movie);
    }
  }

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    return (
      <ul className="movies">
        
        {this.props.movies.map((movie) => {
          return (
            <li key={movie.tmdb_id} className="movie_item" onClick={() => this.handleClick(movie)} >
              <img src={movie.poster_path ? movie.img_url : 'https://en.meming.world/images/en/thumb/6/6e/Surprised_Pikachu.jpg/300px-Surprised_Pikachu.jpg'} />
              <div key={movie.tmdb_id} className="movie_description">
                <h2>{movie.title}</h2>
                <section className="movie_details">
                  <div className="movie_year">
                    <span className="title">Year</span>
                    <span>{movie.movie_year}</span>
                  </div>
                  <div className="movie_rating">
                    <span className="title">Rating</span>
                    <span>{movie.rating}</span>
                  </div>
                </section>
              </div>
            </li>)
        })}

      </ul>
    );
  }
}

export default Movies;