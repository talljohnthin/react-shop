import React from 'react';
import './../styles/reset.scss';
import './../styles/global.scss';
import Signup from '../components/auth/Signup';
import Shop from './Shop';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Products from '../components/Product/Products'
import Category from '../components/Category/Index'
import Sizes from '../components/Sizes/Index'
import Uploads from '../components/Uploads/Index'
import Header from '../components/Header/Index'
import Hero from '../components/Hero/Index'
function Home() {
  return (
  <Router>
    <Header />
    <Route path="/" exact component={ Hero }/>
    <Route path="/" exact component={ Products }/>
    <div className="container">
      <div className="row">
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
