import React, {Fragment, useContext, useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { WishListContext } from '../../contexts/WishListContext'
import { Link } from 'react-router-dom'
import Product from './Product'
import firebase from '../../config/firebase'
import notification from './../Helpers/functions'

export default function Index() {
    const [wish, setWish] = useState([])
    const [total, setTotal] = useState(0)
    const [currentUserName, setCurrentUserName] = useState(null)
    const [currentUserPhone, setCurrentUserPhone] = useState(null)
    const [currentUserAddress, setCurrentUserAddress] = useState(null)
    const { wishListState, wishListDispatch } = useContext(WishListContext)
    
    useEffect(()=>{
        setWish(wishListState.products)
        getTotal()
        console.log(firebase.auth().currentUser && firebase.auth().currentUser.phoneNumber)
    }, [wishListState])

    const getTotal = () => {
        const totalResult = wishListState.products.reduce((acc, item) => item.total + acc, 0)
        setTotal(totalResult)
    }

    const getCurrentUserInfo = () => {
        if (firebase.auth().currentUser) {
            setCurrentUserName(firebase.auth().currentUser.displayName)
            setCurrentUserPhone(firebase.auth().currentUser.phoneNumber)
        } else {
            notification('Wish', 'You must be logged in to continue. Thank you!', 'danger')
        }
        
    }

    const handleOrder = () => {
        if ( firebase.auth().currentUser) {
            const userId = firebase.auth().currentUser.uid
            const phone = firebase.auth().currentUser.phoneNumber
            const userName = firebase.auth().currentUser.displayName

        } else {
            notification('Wish', 'You must be logged in to order. Thank you!', 'danger')
        }
    }


    return (
        <Fragment>
        <div className="hero">
            <Container>
                <h1>Wish List</h1>
            </Container>
        </div>
        <div className="WISHLIST-product">
        <Container>
            <div className="WISHLIST-product-list">
               {
                  wish.length <= 0 ? <p style={{textAlign:'center'}}>No wish product added! <Link to="/">Go to products</Link></p>: 
                  wish.map((product, productIndex) => {
                        return <Product key={productIndex} productIndex={productIndex} product={product} id={product.id}/>
                  })
               }
            </div>
            <div className="WISHLIST-product-total">
            <div className="title">Total</div>
                <ul>
                    <li><span className="label">Total :</span><span className="amount">{total}</span></li>
                    <li><span className="label">Shipping :</span><span className="amount">Added later</span></li>
                </ul>
            </div>

            <div className="WISHLIST-shipping-info">
                <div className="title">Add Shipping Info</div>
                <form>
                            
                <div className="form-check">
                    <input className="form-check-input" name="user-info" type="checkbox" />
                    <label className="form-check-label">
                        Use current login information
                    </label>
                </div>
                    <div className="each">
                        <div className="label">Ship to:</div>
                        <div className="form-group"><input type="text" name="name" placeholder="Input name" value={currentUserName} className="form-control"/></div>
                    </div>
                    <div className="each">
                        <div className="label">Shipping Address:</div>
                        <div className="form-group"><input type="text" name="address" placeholder="Input address" value={currentUserAddress} className="form-control"/></div>
                    </div>
                    <div className="each">
                        <div className="label">Phone/Mobile Number:</div>
                        <div className="form-group"><input type="number" name="phone" placeholder="Input phone" value={currentUserPhone} className="form-control"/></div>
                    </div>
                </form>
            </div>
            <div className="WISHLIST-submit">
                <span className="btn btn-primary" onClick={handleOrder}>Order Now</span>
            </div>
        </Container>
        </div>
    </Fragment>
    )
}
