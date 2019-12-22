import React, { Fragment, useContext, useState, useEffect} from 'react'
import './Sass/Index.scss'
import { WishListContext } from '../../contexts/WishListContext'

const Product = ({product, id}) => {
    const{name, price, image, variation, option, unit, total} = product
    
    return (
        <Fragment>
                <div className="card">
                    <div className="card-wrapper">
                        <div className="left">
                            <img className="card-img" src={ image } alt={ name } />
                        </div>
                        <div className="center">
                            <h4 className="card-title">{ name }</h4>
                            <p className="card-price">Php { price } </p>
                            { variation && <p className="card-variation">Variation: { variation }</p>}
                            { option && <p className="card-option">Option: { option }</p>}
                        </div>
                        <div className="right">
                            
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}

export default Product


