import React from 'react';
import './App.css';
import { Container } from "react-bootstrap";
import { AuthProvider } from './components/firebaseAuth/contexts/AuthContext';

//components
import Navbar from './components/navbar/Navbar';
import Header from './components/header/Header';
import About from './components/about/About';
import Footer from './components/footer/Footer';

// components
import Signup from "./components/firebaseAuth/components/Signup"
import Dashboard from "./components/firebaseAuth/components/Dashboard"
import Login from "./components/firebaseAuth/components/Login"
import PrivateRoute from "./components/firebaseAuth/components/PrivateRoute"
import ForgotPassword from "./components/firebaseAuth/components/ForgotPassword"
import UpdateProfile from "./components/firebaseAuth/components/UpdateProfile"
import Game from './components/game/Game'

// packages
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Header />
          <Switch>
            <AuthProvider>
              <PrivateRoute exact path="/" component={Game} />
              <Route exact path="/about" component={About} />
              <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "90vh" }}
              >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                  <Route path="/login" component={Login} />
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                  <PrivateRoute path="/update-profile" component={UpdateProfile} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                </div>
              </Container>
            </AuthProvider>
          </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App