import React from 'react';
import Navbar from './components/navbar/Navbar';
import Header from './components/header/Header';
import Game from './components/game/Game';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Header />
          <Switch>
            <Route exact path="/" component={Game} />
            <Route exact path="/about" component={About} />
          </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App
