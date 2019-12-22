import React, {Fragment, useContext, useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import { WishListContext } from '../../contexts/WishListContext'
import Product from './Product'

export default function Index() {
    const [wish, setWish] = useState([])
    const { wishListState, wishListDispatch } = useContext(WishListContext)
    useEffect(()=>{
        setWish(wishListState.products)
    }, [wishListState])
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
                  wish.length <= 0 ? <Loader
                  className="loader-spin"
                  type="TailSpin"
                  color="#39A7AB"
                  height={50}
                  width={50}
                  /> : 
                  wish.map((product, productIndex) => {
                        return <Product key={productIndex} productIndex={productIndex} product={product} id={product.id}/>
                  })
               }
            </div>
        </Container>
        </div>
    </Fragment>
    )
}
