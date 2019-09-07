import React from 'react';
import axios from 'axios';
import '../App.css'

const imgURL = 'http://image.tmdb.org/t/p/original';
const myApiKey = process.env.REACT_APP_TOP_TWENTY_FINDER_API_KEY;

class People extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            people : []
        }
    }

    componentDidMount() {
        // load data
        axios.get("https://api.themoviedb.org/3/person/popular?api_key="+myApiKey+'&language=en-US&page=1')
          .then(response => {
            console.log(response.data);
            this.setState({ 
              people: response.data.results
            });
          })  
      }

    render() {
        // iterate over people and display in a grid
        const people = this.state.people.map((person, index)=> {
            return(
                <div className="person-card col s4 m6 l3" key={ index }>
                    <a href="#!"><img src={ imgURL + person.profile_path } alt='person poster'></img></a>
                    {/*<p>{ person.name }</p>
                    <p>Rating: { person.popularity }/10</p>*/}
                </div>
            )
        });
        return(
            <div className='container main-container'>
                <div className="row">
                    { people }
                </div>
            </div>
        )
    }

}

export default People;