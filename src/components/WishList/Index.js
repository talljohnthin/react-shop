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
    const [useCurUserInfo, setUseCurUserInfo] = useState(false)
    const { wishListState, wishListDispatch } = useContext(WishListContext)
    
    useEffect(()=>{
        setWish(wishListState.products)
        getTotal()
    }, [wishListState])

    const getTotal = () => {
        const totalResult = wishListState.products.reduce((acc, item) => item.total + acc, 0)
        setTotal(totalResult)
    }

    const handleOrder = () => {
        if ( firebase.auth().currentUser) {
            const userId = firebase.auth().currentUser.uid
            const phone = firebase.auth().currentUser.phoneNumber
            const userName = firebase.auth().currentUser.displayName

            console.log(currentUserName)
            console.log(currentUserAddress)
            console.log(currentUserPhone)

        } else {
            notification('Wish', 'You must be logged in to order. Thank you!', 'danger')
        }
    }

    const handleChangeName = (e) =>  {
        setCurrentUserName(e.target.value)
    }
    const handleChangeAddress = (e) =>  {
        setCurrentUserAddress(e.target.value)
    }
    const handleChangePhone = (e) =>  {
        setCurrentUserPhone(e.target.value)
    }
    const handleUseUserInfo = () => {
        setUseCurUserInfo(!useCurUserInfo)
        if( useCurUserInfo === false) {
            if (firebase.auth().currentUser) {
                setCurrentUserName(firebase.auth().currentUser.displayName)
                setCurrentUserPhone(firebase.auth().currentUser.phoneNumber)
            } else {
                notification('Wish', 'You must be logged in to continue. Thank you!', 'danger')
            }
        } else {
            setCurrentUserName('')
            setCurrentUserPhone('')
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
                    <li><span className="label">Shipping :</span><span className="amount">Add later</span></li>
                </ul>
            </div>
            <div className="WISHLIST-shipping-info">
                <div className="title">Add Shipping Info</div>
                <form>
                    <div className="form-check">
                        <input checked={useCurUserInfo} onChange={handleUseUserInfo} className="form-check-input" name="user-info" type="checkbox" />
                        <label className="form-check-label"  onClick={handleUseUserInfo}>
                            Use current login information
                        </label>
                    </div>
                    <div className="each">
                        <div className="label">Ship to:</div>
                        <div className="form-group"><input type="text" name="name" placeholder="Input name" onChange={handleChangeName} value={currentUserName || ''} className="form-control"/></div>
                    </div>
                    <div className="each">
                        <div className="label">Shipping Address:</div>
                        <div className="form-group"><input type="text" name="address" placeholder="Input address" onChange={handleChangeAddress}  value={currentUserAddress || ''} className="form-control"/></div>
                    </div>
                    <div className="each">
                        <div className="label">Phone/Mobile Number:</div>
                        <div className="form-group"><input type="number" name="phone" placeholder="Input phone" onChange={handleChangePhone}  value={currentUserPhone || ''} className="form-control"/></div>
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
