import React, { Fragment, useState, useEffect, useContext } from 'react';
import firebase from './../config/firebase';
import './../styles/reset.scss';
import './../styles/global.scss';
import SignUp from '../components/Auth/SignUp';
import Login from '../components/Auth/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Products from '../components/Product/Products'
import Category from '../components/Category/Index'
import Segments from '../components/Segments/Index'
import Uploads from '../components/Uploads/Index'
import Header from '../components/Header/Index'
import Hero from '../components/Hero/Index'
import Update from '../components/Update/Index'
import Edit from '../components/Edit/Index'
import { AuthContext } from '../contexts/AuthContext'

const Home = () => {
  const { state, dispatch } = useContext(AuthContext)

  useEffect(() => {
    authListener()
  }, [])

  useEffect(() => {
    console.log("im the user: ", state.user)
  })
  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        dispatch({
          type: "SIGNIN",
          payload: user
        })
      } else {
        dispatch({
          type: "SIGNIN",
          payload: null
        })
      }
    })
  }

  return ( 
    <Fragment>
      <Router>
        <Header />
        <Route path="/" exact component={ Hero }/>
        <Route path="/" exact component={ Products }/>
        <Route path="/upload" exact component={ Uploads } />
        <Route path="/update" exact component={ Update } />
        <Route path="/edit/:id" exact component={ Edit } />
        <Route path="/signup" exact component={ SignUp }/>
        <Route path="/login" exact component={ Login }/>
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
export default Home;
