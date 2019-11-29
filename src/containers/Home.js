import React from 'react';
import './../styles/reset.scss';
import './../styles/global.scss';
import Signup from '../components/auth/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Products from '../components/Product/Products'
import Category from '../components/Category/Index'
import Segments from '../components/Segments/Index'
import Uploads from '../components/Uploads/Index'
import Header from '../components/Header/Index'
import Hero from '../components/Hero/Index'
function Home() {
  return (
  <Router>
    <Header />
    <Route path="/" exact component={ Hero }/>
    <Route path="/" exact component={ Products }/>
    <Route path="/upload" exact component={ Uploads } />
    <div className="container">
      <div className="row">
        <Route path="/category" exact component={ Category }/>
        <Route path="/segments" exact component={ Segments } />
        
        <Route path="/signup" exact component={ Signup }/>
      </div>
    </div>
  </Router>
  );
}

export default Home;
