import React from 'react';
import axios from 'axios';
import '../App.css'

const imgURL = 'http://image.tmdb.org/t/p/original';
const myApiKey = process.env.REACT_APP_TOP_TWENTY_FINDER_API_KEY;

class TvShow extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            shows : []
        }
    }

    componentDidMount() {
        // load data
        axios.get("https://api.themoviedb.org/3/tv/popular?api_key="+myApiKey+'&language=en-US&page=1')
          .then(response => {
            console.log(response.data);
            this.setState({ 
              shows: response.data.results
            });
          })  
      }

    render() {
        // iterate over shows and display in a grid
        const shows= this.state.shows.map((show, index)=> {
            return(
                <div className="show-card col s4 m6 l3" key={ index }>
                    <a href="#!"><img src={ imgURL + show.poster_path } alt='tv show poster'></img></a>
                    {/*<p>{ show.original_title }</p>
                    <p>Rating: { show.vote_average }/10</p>*/}
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

export default TvShow;