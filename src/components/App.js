import React, { Component } from 'react';
import Nav from './Nav';
import Movie from './Movie';
import TvShow from './TvShow';
import People from './People';

class App extends Component {
  constructor() {
    super();

    this.state= {
    }
    
  }
  
  render() {
    // console.log(this.state.movies);
    
    return (
      <div className="App">
        <Nav />
        <Movie />
        <TvShow />
        <People />
      </div>
    )

  }
}

export default App;