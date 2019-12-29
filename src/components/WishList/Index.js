import React, {Fragment, useContext, useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { WishListContext } from '../../contexts/WishListContext'
import { Link } from 'react-router-dom'
import Product from './Product'

export default function Index() {
    const [wish, setWish] = useState([])
    const [total, setTotal] = useState(0)
    const { wishListState, wishListDispatch } = useContext(WishListContext)
    
    useEffect(()=>{
        setWish(wishListState.products)
        getTotal()
    }, [wishListState])

    const getTotal = () => {
        const totalResult = wishListState.products.reduce((acc, item) => item.total + acc, 0)
        setTotal(totalResult)
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
                    <li><span className="label">Total :</span><span class="amount">{total}</span></li>
                    <li><span className="label">Shipping :</span><span class="amount">Added later</span></li>
                </ul>
            </div>

            <div className="WISHLIST-shipping-info">
                <div className="title">Add Shipping Info</div>
                <form>
                            
                <div className="form-check">
                    <input className="form-check-input" name="user-info" type="checkbox" />
                    <label className="form-check-label" for="user">
                        Use current login information
                    </label>
                </div>
                    <div className="each">
                        <div className="label">Ship to:</div>
                        <div className="form-group"><input type="text" name="name" placeholder="Input name" className="form-control"/></div>
                    </div>
                    <div className="each">
                        <div className="label">Shipping Address:</div>
                        <div className="form-group"><input type="text" name="address" placeholder="Input address" className="form-control"/></div>
                    </div>
                    <div className="each">
                        <div className="label">Phone/Mobile Number:</div>
                        <div className="form-group"><input type="number" name="phone" placeholder="Input phone" className="form-control"/></div>
                    </div>
                </form>
            </div>
        </Container>
        </div>
    </Fragment>
    )
}
