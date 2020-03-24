import React, { Fragment, useContext, useState, useEffect } from 'react'
import './Sass/Index.scss'

const Product = ({ product, id, productIndex }) => {
    const { cover, name, variation, option, qty, price, total } = product 
    const handleRemove = () => {
        
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
                                <ion-icon name="add"></ion-icon>
                                <div className="card-units">2</div>
                                <ion-icon name="remove"></ion-icon>
                            </div>
                        </div>
                        <p className="card-price"><span>Price:</span><span> { Number(price) } </span></p>
                        <p className="card-total"><span>Total:</span><span> { total } </span></p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Product


