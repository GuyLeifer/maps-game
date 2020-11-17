import React from 'react';
import './App.css'

//components
import Navbar from './components/navbar/Navbar';
import Header from './components/header/Header';
import Game from './components/game/Game';
import About from './components/about/About';
import Footer from './components/footer/Footer';

import Login from './components/account/Login';
import SignUp from './components/account/SignUp';
import Profile from './components/account/Profile';

// packages
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

const auth = firebase.auth();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Header />
        {!user ?
          <Link to="/account">
            <div className="loginAsk">Please Login First</div>      
          </Link>
        : null
        }
          <Switch>
            {user && 
              <Route exact path="/" component={Game} />
            }
            <Route exact path="/account" className="accountRoute">
              <Login />
              <Profile user={user} firebase={firebase}/>
              <SignUp />
            </Route>
            <Route exact path="/about" component={About}/>
          </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App
