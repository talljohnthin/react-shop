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
    }, [])
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
                  timeout={3000}
         
                  /> : 
                  wish.map(product => {
                      console.log(product.name)
                      return <Product key={product.id} data={product}/>
                  })
               }
            </div>
        </Container>
        </div>
    </Fragment>
    )
}
