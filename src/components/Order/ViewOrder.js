import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import  { Redirect } from 'react-router-dom'
import { formatMoney } from './../../utils/Index'
import Product from './Product'

const ViewOrder = ({ selectedOrder, selectedOrderId }) => {
    const order = selectedOrder
    if (!selectedOrderId) {
        return <Redirect to='/Order'  />
    }
    const hasOrder = () => {
        return order.name.products.map((product, productIndex) => {
            return <Product key={productIndex} index={productIndex} product={product} id={product.id}/>
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
                        <li><span className="label">Total :</span><span className="amount">&#8369; { formatMoney(order.name.total_amount) }</span></li>
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
    selectedOrder: state.orders.selectedOrder,
    selectedOrderId: state.orders.selectedOrderId
})
export default connect(mapStateToProps)(ViewOrder)