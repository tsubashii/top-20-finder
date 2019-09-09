import React from 'react';
import axios from 'axios';
import '../App.css';
import { imgURL, myApiKey, moviePopular } from './api/APIUtils';

class Movie extends React.Component {
    _isMounted = false; // to prevent no-op/ memory leak -- class field that holds the lifecycle state of your component, to prevent this.setState() being called     
    constructor(props) {
        super(props);
        
        this.state = {
            movies : []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        // load data
        axios.get(moviePopular+myApiKey+'&language=en-US&page=1')
        .then(response => {
            console.log(response.data);
            // avoid calling this.setState() on your component instance if component already unmounted
            if (this._isMounted) {
                this.setState({ 
                  movies: response.data.results
                });
            }
        })  
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        // iterate over movies and display in a grid
        const movies= this.state.movies.map((movie, index)=> {
            return(
                <div className="movie-card col s4 m6 l3" key={ index }>
                    <a href="#!"><img src={ imgURL + movie.poster_path } alt='movie poster'></img></a>
                </div>
            )
        });
        return(
            <div className='container main-container'>
                <p className="text-color">Also popular Movies</p>
                <div className="row">
                { movies }
                </div>
            </div>
        )
    }

}

export default Movie;