import React from 'react';
import GameInfo from '../game/GameInfo';
import './About.css';

function About() {
    return (
        <div>
            <img src="https://www.flaticon.com/svg/static/icons/svg/355/355980.svg" width="100" height="100" />
            <h2 className="h2">This is a Google - Maps game</h2>
            <GameInfo />
        </div>
    )
}

export default About
