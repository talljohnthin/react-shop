import React, { Fragment } from 'react';
import firebase from './../config/firebase';
import './../styles/reset.scss';
import './../styles/global.scss';
import Auth from '../components/Auth/Index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Products from '../components/Product/Products'
import Category from '../components/Category/Index'
import Segments from '../components/Segments/Index'
import Uploads from '../components/Uploads/Index'
import Header from '../components/Header/Index'
import Hero from '../components/Hero/Index'
import Update from '../components/Update/Index'
import Edit from '../components/Edit/Index'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  render() {
    return ( 
      <Fragment>
        <Router>
          <Header />
          
          <Route path="/" exact component={ Hero }/>
          <Route path="/" exact component={ Products }/>
          <Route path="/upload" exact component={ Uploads } />
          <Route path="/update" exact component={ Update } />
          <Route path="/edit/:id" exact component={ Edit } />
          <Route path="/auth" exact component={ Auth }/>
      
          <div className="container">
            <div className="row">
              <Route path="/category" exact component={ Category }/>
              <Route path="/segments" exact component={ Segments } />
            </div>
          </div>
        </Router>
      </Fragment>
    );
  }
}

export default Home;
