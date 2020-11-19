import React, { useState } from 'react';
import './Login.css';

// packages
import firebase from 'firebase';

// icons
import googleIcon from './images/googleIcon.png'

function Login() {

    const [emailLogin, setEmailLogin] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);

    const loginWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
    }
    const loginWithEmail = (e, email, password) => {
        e.preventDefault();
        console.log(email, password)
        const provider = new firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });       
    }

    return (
        <div className="loginAccount">
            <div>
                <img className="loginIcon" src={googleIcon} onClick={() => loginWithGoogle()} />
            </div>
            <div>
            <p onClick={() => setEmailLogin(prev => !prev)}>Log In With Email</p>
            {emailLogin && (
                <form className="loginForm" onSubmit={(e) => loginWithEmail(e, email, password)}>
                <label>
                    Email:
                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <input type="submit" value="Login" />
            </form>
            )}
            </div>
            <div>
                another icon
            </div>
        </div>
    )
}

export default Login
