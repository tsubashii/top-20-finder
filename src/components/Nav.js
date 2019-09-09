import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Nav = () => {
    return (
        <nav>
            <div className="nav-wrapper container">
                <Link to='/' className="brand-logo right"><i className="large material-icons">fingerprint</i>Top 20 Finder</Link>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><Link to='/'>HOME</Link></li>
                    <li><Link to='/movies'>MOVIES</Link></li>
                    <li><Link to='/tvshow'>TV SHOWS</Link></li>
                    <li><Link to='/people'>PEOPLE</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;