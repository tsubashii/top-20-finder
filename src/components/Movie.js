import React from 'react';
import axios from 'axios';
import '../App.css';
import { imgURL, myApiKey, moviePopular } from './api/APIUtils';
import Modal from 'react-responsive-modal';

class Movie extends React.Component {
    _isMounted = false; // to prevent no-op/ memory leak -- class field that holds the lifecycle state of your component, to prevent this.setState() being called     
    constructor(props) {
        super(props);
        
        this.state = {
            movies : [],
            open : false,
            selectedMovie : null // keep track of selected Item
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

    onOpenModal = i => {
        this.setState({ 
            open: true,
            selectedMovie: i // when Item is clicked, mark as selected
         });
    }

    onCloseModal = () => {
        this.setState({ open: false });
    }

    renderModal = () => {
        // check to see if there's a selected item/post/movie. If so, render it.
        if (this.state.selectedMovie !== null) {
            const movie = this.state.movies[this.state.selectedMovie];
            return (
                <div style={{ width: 500, height: 630, backgroundColor: "white" }}>
                    <img src={ imgURL + movie.poster_path } 
                        style={{ width: 150, height: 230 }} alt='movie poster'>
                    </img>
                    <h5>Name: {movie.original_title}</h5>
                    <p>Release Date: { movie.release_date }</p>
                    <p>Vote Average: { movie.vote_average }</p>
                    <p>Rating: { movie.popularity }</p>
                    <p>Vote Average: { movie.vote_average }</p>
                    <p>Vote Count: { movie.vote_count }</p>
                    <p>Overview: { movie.overview }</p>
                </div>
            );
        }
    }

    render() {
        const { open } = this.state;
        // iterate over movies and display in a grid
        const movies = this.state.movies.map((movie, index)=> {
            return(
                <div className="movie-card col s4 m6 l3" key={ index }>
                    <a href="#!" onClick={() => this.onOpenModal(index)}>
                        <img src={ imgURL + movie.poster_path } 
                            alt='movie poster'>
                        </img>
                    </a>
                    <Modal open={open} onClose={this.onCloseModal} animationDuration={500} center>
                        <div>{this.renderModal()}</div>
                    </Modal>
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