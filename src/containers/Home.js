import React from 'react';
import Products from './Products';
import Filters from './Filters';
import Signup from '../components/auth/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function Home() {
  return (
  <Router>
    <div className="container">
      <div className="row">
        <Route path="/signup" component="Signup"/>
        <Filters />
        <Products />
      </div>
    </div>
  </Router>
  );
}

export default Home;
