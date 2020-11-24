import React from 'react';
import './GameInfo.css';

function GameInfo() {
    return (
        <div className="gameInfo">
            <h3 id="infoH3">Game Rules:</h3>
            <ol>
                <li>Every game has 10 Rounds</li>
                <li>Every round you'll get a location</li>
                <li>You need to locate the location on the map</li>
                <li>
                    As close as you will locate the location you'll get points:
                    <ul>
                        <li>100 points - 20 KM</li> 
                        <li>90 points - 40 KM</li> 
                        <li>80 points - 55 KM</li> 
                        <li>60 points - 80 KM</li> 
                        <li>40 points - 100 KM</li> 
                    </ul>
                </li>
            </ol>
        </div>
    )
}

export default GameInfo
