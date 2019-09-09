import React from 'react';
import axios from 'axios';
import '../App.css';
import Modal from 'react-responsive-modal';
import { imgURL, myApiKey, personPopular } from './api/APIUtils';
import SearchArea from './SearchArea';

class People extends React.Component {
    _isMounted = false; // to prevent no-op/ memory leak -- class field that holds the lifecycle state of your component, to prevent this.setState() being called 

    constructor(props) {
        super(props);
        
        this.state = {
            people : [],
            open: false,
            selectedPerson: null, // keep track of selected Item
            searchTerm: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
        this._isMounted = true;
        // load data
        axios.get(personPopular+myApiKey+'&language=en-US&page=1')
        .then(response => {
            // to avoid calling this.setState on your component instance if component already unmounted
            if (this._isMounted) {
                this.setState({ 
                    people: response.data.results
                });
            }
        })
    }

    handleSubmit =(event) => {
        event.preventDefault();
        axios.get(`https://api.themoviedb.org/3/search/person?api_key=${myApiKey}&query=${this.state.searchTerm}`)
        .then(response => {
            console.log(response.data);
            this.setState({
                searchTerm: response.data.results
            });
        })
    }

    handleChange = (event) => {
        this.setState({ searchTerm: event.target.value })
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    onOpenModal = i => {
        this.setState({ 
            open: true,
            selectedPerson: i // when Item is clicked, mark as selected
         });
    }

    onCloseModal = () => {
        this.setState({ open: false });
    }

    renderModal = () => {
        // check to see if there's a selected item/post/person. If so, render it.
        if (this.state.selectedPerson !== null) {
            const person = this.state.people[this.state.selectedPerson];
            return (
                <div style={{ width: 400, height: 400, backgroundColor: "white" }}>
                    <img src={ imgURL + person.profile_path } 
                        style={{ width: 150, height: 230 }} alt='person poster'>
                    </img>
                    <h5>Name: {person.name}</h5>
                    <p>Gender: { ((person.gender) === 2) ? <span>Male</span> : <span>Female</span> }</p>
                    <p>Known for: { person.known_for_department}</p>
                    <p>Rating: { person.popularity }</p>
                </div>
            );
        }
    }

    render() {
        const { open } = this.state;
        // iterate over people and display in a grid
        const people = this.state.people.map((person, index)=> {
            return(
                <div className="person-card col s4 m6 l3" key={ index }>
                    <a href="#!" onClick={() => this.onOpenModal(index)}>
                        <img src={ imgURL + person.profile_path } 
                            alt='person poster'>
                        </img>
                    </a>
                    <Modal open={open} onClose={this.onCloseModal} animationDuration={500} center>
                        <div>{this.renderModal()}</div>
                    </Modal>
                </div>
            )
        });

        // Search not working atm
        // const searchTerm = this.state.searchTerm.map((person, index)=> {
        //     return(
        //         <div className="person-card col s4 m6 l3" key={ index }>
        //             <a href="#!" onClick={() => this.onOpenModal(index)}>
        //                 <img src={ imgURL + person.profile_path } 
        //                     alt='person poster'>
        //                 </img>
        //             </a>
        //             <Modal open={open} onClose={this.onCloseModal} animationDuration={500} center>
        //                 <div>{this.renderModal()}</div>
        //             </Modal>
        //         </div>
        //     )
        // });


        return(
            <div className='container main-container'>
                <SearchArea handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
                <div className="row">
                    { people }
                    {/*{ searchTerm }*/}
                </div>
            </div>
        )
    }

}

export default People;