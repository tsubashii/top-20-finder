import React from 'react';
import axios from 'axios';
import '../App.css';
import { imgURL, myApiKey, tvshowPopular } from './api/APIUtils';

class Tvshow extends React.Component {
    _isMounted = false; // to prevent no-op/ memory leak -- class field that holds the lifecycle state of your component, to prevent this.setState() being called         

    constructor(props) {
        super(props);
        
        this.state = {
            shows : []
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

    render() {
        // iterate over shows and display in a grid
        const shows= this.state.shows.map((show, index)=> {
            return(
                <div className="show-card col s4 m6 l3" key={ index }>
                    <a href="#!"><img src={ imgURL + show.poster_path } alt='tv show poster'></img></a>
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