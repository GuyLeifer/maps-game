import React, { useState } from 'react';
import './SignUp.css';

import firebase from 'firebase';

function SignUp(props) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errCode, setErrCode] = useState();
    const [errMassage, setErrMassage] = useState();

    const createUser = (e, email, password) => {
        e.preventDefault();
        const user = firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // ...
            if (errorCode) setErrCode(errorCode);
            if (errorMessage) setErrMassage(errorMessage);
        });
    }

    return (
        <div>
            <form className="signUpForm" onSubmit={(e) => createUser(e, email, password)}>
                <label>
                    Email:
                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                {errCode || errMassage &&
                    <div>{errCode, errMassage}</div>
                }
                <input type="submit" value="Sign In" />
            </form>

        </div>
    )
}

export default SignUp
