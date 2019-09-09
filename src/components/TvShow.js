import React from 'react';
import axios from 'axios';
import '../App.css';
import { imgURL, myApiKey, tvshowPopular } from './api/APIUtils';
import Modal from 'react-responsive-modal';

class Tvshow extends React.Component {
    _isMounted = false; // to prevent no-op/ memory leak -- class field that holds the lifecycle state of your component, to prevent this.setState() being called         

    constructor(props) {
        super(props);

        this.state = {
            shows : [],
            open: false,
            selectedShow: null // keep track of selected Item
        }
    }

    componentDidMount() {
        this._isMounted = true;
        // load data
        axios.get(tvshowPopular+myApiKey+'&language=en-US&page=1')
        .then(response => {
            console.log(response.data);
            // avoid calling this.setState() on your component instance if component already unmounted
            if (this._isMounted) {
                this.setState({ 
                  shows: response.data.results
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
            selectedShow: i // when Item is clicked, mark as selected
        });
    }

    onCloseModal = () => {
        this.setState({ open: false });
    }

    renderModal = () => {
        // check to see if there's a selected item/post/show. If so, render it.
        if (this.state.selectedShow !== null) {
            const show = this.state.shows[this.state.selectedShow];
            return (
                <div style={{ width: 400, height: 450, backgroundColor: "white" }}>
                    <img src={ imgURL + show.poster_path } 
                        style={{ width: 150, height: 230 }} alt='show poster'>
                    </img>
                    <h5>Name: {show.name}</h5>
                    <p>First Air Date: { show.first_air_date }</p>
                    <p>Original language: { show.original_language }</p>
                    <p>Vote Average: { show.vote_average }</p>
                    <p>Rating: { show.popularity }</p>
                </div>
            );
        }
    }

    render() {
        const { open } = this.state;
        // iterate over shows and display in a grid
        const shows= this.state.shows.map((show, index)=> {
            return(
                <div className="show-card col s4 m6 l3" key={ index }>
                    <a href="#!" onClick={() => this.onOpenModal(index)}>
                        <img src={ imgURL + show.poster_path } 
                            alt='tv show poster'>
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
                <div className="row">
                { shows }
                </div>
            </div>
        )
    }

}

export default Tvshow;