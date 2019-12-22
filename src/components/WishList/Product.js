import React, { Fragment, useContext, useState, useEffect} from 'react'
import './Sass/Index.scss'
import { WishListContext } from '../../contexts/WishListContext'

const Product = ({product, id, productIndex}) => {
    const{name, price, image, variation, option, unit, total} = product
    const {wishListState, wishListDispatch} = useContext(WishListContext)
    
    const handleRemove = () => {
        if (wishListState) {
            if( wishListState.products.length > 0) {
                wishListDispatch({
                    type: 'REMOVE_WISH',
                    payload: productIndex
                })
            }
        }
    }
    const handleUnit = (control) => {
        if (wishListState) {
            if( wishListState.products.length > 0) {
                wishListDispatch({
                    type: 'ADD_UNIT_WISH',
                    payload: {index: productIndex, control:control}
                })
            }
        }
    }
    const handleSelectVariation = () => {
        console.log('clicked')
        // if (wishListState) {
        //     if( wishListState.products.length > 0) {
        //         wishListDispatch({
        //             type: 'SELECT_VARIATION_WISH',
        //             payload: {index: productIndex, id:id}
        //         })
        //     }
        // }
    }
    return (
        <Fragment>
                <div className="card">
                    <div className="card-wrapper">
                        <div className="left">
                            <img className="card-img" src={ image } alt={ name } />
                        </div>
                        <div className="center">
                            <h4 className="card-title">{ name }</h4>
                            { variation && <p className="card-variation">Variation: { variation }</p>}
                            { option && <p className="card-option">Option: { option }</p>}
                            <p className="card-price">Price: {price}</p>
                            <p className="card-total">Total: {total}</p>
                        </div>
                        <div className="right">
                            <div className="card-variation">
                                <ion-icon name="settings" onClick={handleSelectVariation}></ion-icon>
                            </div>
                            <div className="card-remove" onClick={handleRemove}>
                                <ion-icon name="trash" ></ion-icon>
                            </div>
                            <div className="card-units-wrapper">
                                <ion-icon name="add" onClick={() => handleUnit('+')}></ion-icon>
                                <div className="card-units">{unit}</div>
                                <ion-icon name="remove" onClick={() => handleUnit('-')}></ion-icon>
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}

export default Product


