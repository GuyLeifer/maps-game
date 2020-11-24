import React from 'react';
import GameInfo from '../game/GameInfo';
import './About.css';
import googleMapsIcon from '../../images/googleMapsIcon.svg';

function About() {
    return (
        <div>
            <h2 id="aboutH2">This is a Google - Maps game</h2>
            <img className="aboutImg" src={googleMapsIcon} width="100" height="100" />
            <GameInfo />
        </div>
    )
}

export default About
