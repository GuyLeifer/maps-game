import React from 'react';
import './Navbar.css';

// packages
import { Link } from "react-router-dom";

//icons
import homeIcon from '../../images/homeIcon.png';
import israelIcon from '../../images/israelIcon.png';
import googleMapsIcon from '../../images/googleMapsIcon.svg';
import aboutIcon from '../../images/aboutIcon.png';
import accountIcon from '../../images/accountIcon.jpg';


function Navbar() {
    
    return (
        <div className="navbar">
                <Link to="/">
                    <div className="navbarLink">
                        <img className="Icon" src={homeIcon} alt="Home" width="70" height="70" />
                    </div>
                </Link>
                    <div className="navbarLink">
                        <img className="Icon" src={israelIcon} alt="Israel" width="80" height="80"/> 
                    </div>
                    <div className="navbarLink">
                        <img className="Icon" src={googleMapsIcon} alt="Google Maps" width="80" height="80"/> 
                    </div>
                <Link to="/about">
                    <div className="navbarLink">
                        <img className="Icon" src={aboutIcon} alt="About" width="70" height="70" />
                    </div>
                </Link>
                <Link to="/dashboard">
                    <div className="navbarLink">
                        <img className="Icon" src={accountIcon} alt="Account" width="70" height="70" />
                    </div>
                </Link>
        </div>
    )
}

export default Navbar
