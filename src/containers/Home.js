import React from 'react';
import Signup from '../components/auth/Signup';
import Shop from './Shop';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function Home() {
  return (
  <Router>
    <div className="container">
      <div className="row">
        <Route path="/" exact component={ Shop }/>
        <Route path="/signup" exact component={ Signup }/>
      </div>
    </div>
  </Router>
  );
}

export default Home;
