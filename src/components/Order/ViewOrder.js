import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import  { Redirect } from 'react-router-dom'
import { formatMoney } from './../../utils/Index'
import { db } from './../../config/firebase'
import { sumProductsInOrder, updateShippingFee, proccessOrder} from './../../redux/actions/order/orderActions'
import Product from './Product'

const ViewOrder = ({ selectedOrder, selectedOrderId, sumProductsInOrder, updateShippingFee, proccessOrder }) => {
    const order = selectedOrder
    const [shippingFee, setShippingFee] = useState(0)
    
    useEffect(()=>{
        setShippingFee(order.name?.shipping_fee)
    }, [])

    if (!selectedOrderId) {
        return <Redirect to='/Order'  />
    }
    const handleAddShippingFee = (e) => {
        if(e.target.value !== 0 || e.target.value !== null || e.target.value !== undefined) {
            setShippingFee(e.target.value)
            updateShippingFee(e.target.value)
            sumProductsInOrder()
        }
    }

    const handleProccessOrder = () => {
        proccessOrder(selectedOrder, selectedOrderId)
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
                        <li><span className="label">Shipping :</span>
                            <input type="number" value={shippingFee} onChange={(e)=> handleAddShippingFee(e)}/>
                        </li>
                        <li><span className="label">Total :</span><span className="amount">&#8369; { formatMoney(order.name.total_amount) }</span></li>
                    </ul>
                </div>
                <div className="WISHLIST-submit">
                    <span className="btn btn-primary" onClick={() => handleProccessOrder()}>Proccess Order</span>
                </div>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    selectedOrder: state.orders.selectedOrder,
    selectedOrderId: state.orders.selectedOrderId
})

const mapDispatchToProps = { sumProductsInOrder, updateShippingFee, proccessOrder }
export default connect(mapStateToProps, mapDispatchToProps)(ViewOrder)