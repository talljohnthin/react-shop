import React, { Fragment, useContext, useState, useEffect } from 'react'
import { formatMoney } from './../../utils/Index'
import { connect } from 'react-redux'
import { addQuantity, sumProductsInOrder,  subtractQuantity , removeToOrder} from './../../redux/actions/order/orderActions'
import './Sass/Index.scss'

const Product = (props) => {
    const { cover, name, variation, option, qty, price, total } = props.product 

    const handleAddQty = () => {
        if(props.index !== null || props.index !== undefined) {
            props.addQuantity(props.index)
            props.sumProductsInOrder()
        }
    }
    const handleSubtractQty = () => {
        if(props.index !== null || props.index !== undefined) {
            props.subtractQuantity(props.index)
            props.sumProductsInOrder()
        }
    }
    const handleRemove = () => {
        if(props.index !== null || props.index !== undefined) {
            props.removeToOrder(props.index)
            props.sumProductsInOrder()
        }
    }

    return (
        <Fragment>
            <div className="card">
                <div className="card-wrapper">
                    <div className="left">
                        { <img className="card-img" src={ cover } alt={ name } /> }
                    </div>
                    <div className="right">
                        <div className="card-remove" onClick={handleRemove}>
                            <ion-icon name="close"></ion-icon>
                        </div>

                        <h4 className="card-title">{ name }</h4>
                        <p className="card-variation"><span>Variation:</span> <span> { variation } </span></p>
                        <p className="card-option"><span>Option: </span> <span> { option } </span></p>

                        <div className="card-unit"><span>Qty: </span> <span> { qty } </span>
                            <div className="card-units-wrapper">
                                <ion-icon name="remove" onClick={()=>handleSubtractQty()}></ion-icon>
                                <div className="card-units">{ qty }</div>
                                <ion-icon name="add" onClick={()=>handleAddQty()}></ion-icon>
                            </div>
                        </div>
                        <p className="card-price"><span>Price:</span><span>&#8369;  { formatMoney(Number(price)) } </span></p>
                        <p className="card-total"><span>Total:</span><span>&#8369;  { formatMoney(Number(total)) } </span></p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapDispatchToprops = {addQuantity, sumProductsInOrder, subtractQuantity, removeToOrder}

export default connect(null, mapDispatchToprops)(Product)


