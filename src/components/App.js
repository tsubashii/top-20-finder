import React, { Component } from 'react';
import Nav from './Nav';
// import axios from 'axios';
import Movie from './Movie';
// import MovieList from './MovieList';
// const imgURL = 'http://image.tmdb.org/t/p/original';

// const myApiKey = process.env.REACT_APP_TOP_TWENTY_FINDER_API_KEY;

class App extends Component {
  // constructor() {
  //   super();

  //   this.state= {
  //     movies: []
  //   }
    
  // }
  
  // componentDidMount() {
  //   // load data
  //   axios.get("https://api.themoviedb.org/3/movie/popular?api_key="+myApiKey+'&language=en-US&page=1')
  //     .then(response => {
  //       console.log(response.data);
  //       this.setState({ 
  //         movies: response.data.results
  //       });
  //     })  
  // }

  render() {
    // console.log(this.state.movies);
    return (
      <div className="App">
        <Nav />
        <Movie />
      </div>
    )

  }
}

export default App;