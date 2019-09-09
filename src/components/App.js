import React, { Component } from 'react';
import Nav from './Nav';
import Main from './Main';
import Movie from './Movie';

class App extends Component {
  constructor() {
    super();

    this.state= {
    }
    
  }
  
  render() {    
    return (
      <div className="App">
        <Nav />
        <Main />
        <Movie />
      </div>
    )

  }
}

export default App;