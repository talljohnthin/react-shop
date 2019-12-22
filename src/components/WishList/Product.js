import React, { Fragment, useContext, useState, useEffect} from 'react'
import { WishListContext } from '../../contexts/WishListContext'

const Product = (product) => {
    const{name, price, image} = product.data
    return (
        <Fragment>
            {console.log('name: ', name)}
                <div className="card">
                    <div className="card-wrapper">
                        <div className="left">
                            <img className="card-img" src={ image } alt={ name } />
                        </div>
                        <div className="center">
                            <h4 className="card-title">{ name }</h4>
                            <p className="card-price">Php { price } </p>
                        </div>
                        <div className="right">
                            
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}

export default Product


