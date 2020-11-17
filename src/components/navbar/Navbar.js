import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";

//icons
import homeIcon from '../../images/homeIcon.png';
import israelIcon from '../../images/israelIcon.png';
import accountUser from '../../images/accountUser.jpg';
// import aboutIcon from '../../images/aboutIcon.png';


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
                        <img className="Icon" src="https://www.flaticon.com/svg/static/icons/svg/355/355980.svg" alt="Israel" width="80" height="80"/> 
                    </div>
                <Link to="/account">
                    <div className="navbarLink">
                        <img className="Icon" src={accountUser} alt="Home" width="70" height="70" />
                    </div>
                </Link>
                <Link to="/about">
                    <div className="navbarLink">
                        <img className="Icon" src="https://static.thenounproject.com/png/2940521-200.png" alt="Home" width="70" height="70" />
                    </div>
                </Link>
        </div>
    )
}

export default Navbar
