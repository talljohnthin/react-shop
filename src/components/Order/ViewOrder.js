import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import  { Redirect } from 'react-router-dom'
import Product from './Product'

const ViewOrder = ({ orders, selectedOrderId }) => {
    const order = orders.filter(e => e.id === selectedOrderId)[0]
    if (!selectedOrderId) {
        return <Redirect to='/Order'  />
    }
    const hasOrder = () => {
        return order.name.products.map((product, productIndex) => {
            return <Product key={productIndex} productIndex={productIndex} product={product} id={product.id}/>
        })
    }
    return (
        <Fragment>
            <Container>
                <div className="WISHLIST-product-list">
                    { order && hasOrder() }
                </div>
                <div className="WISHLIST-product-total">
                <div className="title">Total</div>
                    <ul>
                        <li><span className="label">Total :</span><span className="amount">2000</span></li>
                        <li><span className="label">Shipping :</span><span className="amount">Add later</span></li>
                    </ul>
                </div>
                <div className="WISHLIST-submit">
                    <span className="btn btn-primary">Order Now</span>
                </div>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    orders: state.orders.orders,
    selectedOrderId: state.orders.selectedOrderId
})
export default connect(mapStateToProps)(ViewOrder)