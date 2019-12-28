import React, { Fragment, useEffect, useContext } from 'react';
import ReactNotifications from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import firebase, { db } from './../config/firebase';
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
import WishList from '../components/WishList/Index'
import { AuthContext } from '../contexts/AuthContext'
import { WishListContext } from '../contexts/WishListContext'
import { ProductContext } from '../contexts/ProductContext'

const Home = () => {
  const { state, dispatch } = useContext(AuthContext)
  const { wishListState, wishListDispatch } = useContext(WishListContext)
  const {productState, productDispatch} = useContext(ProductContext)

  useEffect(() => {
   authListener()
   getProducts()
   }, [])

  useEffect(()=> {
    console.log('from state :', wishListState)
    console.log('from localStorage: ', JSON.parse(localStorage.getItem('wish-list')))
    console.log('productState', productState.products)
    if(wishListState.products.length <= 0) {
      const local = JSON.parse(localStorage.getItem('wish-list'))
      if (local) {
        if( local.products.length > 0 )  {
           wishListDispatch({
            type:"REPLACE_WISH",
            payload: local.products.map(item => item)
           })
        }
      }
    }
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

  const getProducts = () => {
    db.collection("products")
     .where("status", "==", "available")
     .onSnapshot(snapshot => {
         const products = []
         snapshot.forEach(doc => {
             const product = {
                 id: doc.id,
                 data: doc.data()
             }
             products.push(product)
         })
         productDispatch({
             type:'LOAD_PRODUCTS',
             payload: [...products]
         })
     }); 
  }
  return ( 
    <Fragment>
      <ReactNotifications />
      <Router>
        <Header />
        <Route path="/" exact component={ Hero }/>
       { <Route path="/" exact component={ Products }/> }
        <Route path="/upload" exact component={ Uploads } />
        <Route path="/update" exact component={ Update } />
        <Route path="/edit/:id" exact component={ Edit } />
        <Route path="/signup" exact component={ SignUp }/>
        <Route path="/login" exact component={ Login }/>
        <Route path="/wish-list" exact component={ WishList }/>
        
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
