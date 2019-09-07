import React from 'react';
import '../App.css';

const Nav = () => {
    return (
        <nav>
            <div className="nav-wrapper container">
            <a href="#!" className="brand-logo right"><i className="large material-icons">fingerprint</i>Top 20 Finder</a>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li><a href="#!">MOVIES</a></li>
                <li><a href="#!">TV SHOWS</a></li>
                <li><a href="#!">PEOPLE</a></li>
            </ul>
            </div>
        </nav>
    );
}

export default Nav;