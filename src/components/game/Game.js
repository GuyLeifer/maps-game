import React, { useState }from 'react';
import GoogleApiWrapper from '../mapComponents/GoogleApiWrapper';

import {auth} from '../firebaseAuth/firebase';

function Game() {

    const [user, setUser] = useState(false);
    auth.onAuthStateChanged(function(user) {
    if (user) {
        setUser(true)
    } else {
        setUser(false)
    }
});

if(user)
    return (
        <div className="game">
            <GoogleApiWrapper />
        </div> 
    )
else return <h1>Please Login First</h1>
}

export default Game
