import React from 'react';
import Signup from '../components/auth/Signup';
import Shop from './Shop';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Category from '../components/Category/Index'
import Sizes from '../components/Sizes/Index'
import Uploads from '../components/Uploads/Index'

function Home() {
  return (
  <Router>
    <div className="container">
      <div className="row">
        <Route path="/" exact component={ Shop }/>
        <Route path="/category" exact component={ Category }/>
        <Route path="/sizes" exact component={ Sizes } />
        <Route path="/upload" exact component={ Uploads } />
        <Route path="/signup" exact component={ Signup }/>
      </div>
    </div>
  </Router>
  );
}

export default Home;
