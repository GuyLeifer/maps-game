import React, { useEffect, useState } from 'react';
import './Navbar.css';

// packages
import { Link } from "react-router-dom";

//icons
import homeIcon from '../../images/homeIcon.png';
import israelIcon from '../../images/israelIcon.png';
import googleMapsIcon from '../../images/googleMapsIcon.svg';
import aboutIcon from '../../images/aboutIcon.png';
import accountIcon from '../../images/accountIcon.jpg';

import { useAuth } from "../firebaseAuth/contexts/AuthContext";
import { auth, storage } from '../firebaseAuth/firebase';

function Navbar() {

    const [authIcon, setAuthIcon] = useState(accountIcon);

    const { currentUser } = useAuth();
    let uid = null;
    let photoUrl = null;
    
    if (currentUser != null) {
        photoUrl = currentUser.photoURL;
        uid = currentUser.uid;  // The user's ID, unique to the Firebase project. Do NOT use
    }
    storage.ref().child(`users/${uid}/profile`).getDownloadURL().then(function(url) {
        setAuthIcon(url)
    }).catch(function(error) {
        if(photoUrl) setAuthIcon(photoUrl)
    });

    auth.onAuthStateChanged(function(user) {
        if(!user) setAuthIcon(accountIcon)
    })

    return (
        <div className="navbar">
                <Link to="/about">
                    <div className="navbarLink">
                        <img className="Icon" src={aboutIcon} alt="About" width="70" height="70" />
                    </div>
                </Link>
                    <div className="navbarLink">
                        <img className="Icon" src={israelIcon} alt="Israel" width="80" height="80"/> 
                    </div>
                <Link to="/">
                    <div className="navbarLink">
                        <img className="Icon" src={homeIcon} alt="Home" width="70" height="70" />
                    </div>
                </Link>
                    <div className="navbarLink">
                        <img className="Icon" src={googleMapsIcon} alt="Google Maps" width="80" height="80"/> 
                    </div>
                <Link to="/dashboard">
                    <div className="navbarLink">
                        <img className="Icon" src={authIcon} alt="Account" width="70" height="70" />                        
                    </div>
                </Link>
        </div>
    )
}

export default Navbar
