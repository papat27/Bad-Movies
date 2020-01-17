import React from 'react';
import Axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      searchGenre: 0
    };
    this.getGenres = this.getGenres.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    Axios.get('/movies/genres')
      .catch((err) => {
        console.error('Error from sending get request to /movies/genres in getGenres method: ', err);
      })
      .then(({data}) => {
        //console.log(data);
        this.setState({
          genres: data.genres,
          searchGenre: data.genres[0].id
        });
      })
  }

  handleClick(e) {
    e.preventDefault();
    this.props.getMovies(this.state.searchGenre);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      searchGenre: e.target.value
    });
  }

  componentDidMount() {
    //make an axios get request to /movies/genres to get an array of genre objects then set the state of the genre array to this list of genres
    this.getGenres();
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.handleChange}>
          {this.state.genres.map((genre) => {
            return <option key={genre.id} value={genre.id} >{genre.name}</option>
          })}
        </select>
        <br/><br/>
        {/* pass getMovies method down to this button? */}
        <button onClick={this.handleClick}>Search</button>

      </div>
    );
  }
}

export default Search;