import React from 'react';
import GameInfo from './GameInfo';
import GoogleApiWrapper from '../mapComponents/GoogleApiWrapper';

function Game() {
    
    return (
        <div className="game">
            {/* <GameInfo /> */}
            <GoogleApiWrapper />
        </div>
    )
}

export default Game
