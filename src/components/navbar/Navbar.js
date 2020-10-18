import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <div className="navbar">
                <Link to="/">
                    <div className="navbarLink">
                        <img className="Icon" src="https://cdn.icon-icons.com/icons2/2248/PNG/512/home_circle_icon_137496.png" alt="Home" width="70" height="70" />
                    </div>
                </Link>
                    <div className="navbarLink">
                        <img className="Icon" src="https://cdn.countryflags.com/thumbs/israel/flag-button-round-250.png" alt="Israel" width="80" height="80"/> 
                    </div>
                    <div className="navbarLink">
                        <img className="Icon" src="https://www.flaticon.com/svg/static/icons/svg/355/355980.svg" alt="Israel" width="80" height="80"/> 
                    </div>
                <Link to="/about">
                    <div className="navbarLink">
                        <img className="Icon" src="https://static.thenounproject.com/png/2940521-200.png" alt="Home" width="70" height="70" />
                    </div>
                </Link>
        </div>
    )
}

export default Navbar
