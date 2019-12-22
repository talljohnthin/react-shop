import React, { useContext, useState} from 'react'
import { WishListContext } from './../../contexts/WishListContext'
import { Modal } from 'react-bootstrap'
import notification from './../Helpers/functions'
function Product({data}) {
    const product = data.data;
    const {wishListState, wishListDispatch } = useContext(WishListContext)
    
    const handleClickWish = source => {
        const data = source.data;
        let stopMapping = false,
            pVariation = null,
            pOption = null,
            pPrice = null
        source.data.priceOptions.map(item => {
            pVariation = item.variation
            if (stopMapping === true) {
                return
            }
            item.options.map(optionItem => {
                if (optionItem.is_available == 'Yes') {
                    pOption = optionItem.option
                    pPrice = optionItem.price
                    stopMapping = true
                    return
                }
            })
        });
        const obj = {
            id: source.id,
            name: data.productName,
            image:data.cover,
            variation: pVariation,
            option: pOption,
            price:Number(pPrice),
            unit:1,
            total: Number(pPrice)
        }
        if (obj.id && obj.name && obj.option && obj.image && obj.variation && obj.price && obj.unit && obj.total) {
            wishListDispatch({
                type:"ADD_WISH",
                payload: obj
            })
            notification('Wish', 'New product added to wish list!', 'success')
        } else {
            notification('Wish', 'Failed to add to wish list!', 'danger')
        }
    }
    return (
        product.priceOptions[0].options.length > 0 ?
        <div className="card">
            <div className="card-wrapper">
                <img className="card-img" src={ product.cover ? product.cover : product.productImages[0] } alt={ product.productName } />
                <div className="card-body">
                    <p className="card-price">Php { product.priceOptions[0].options[0].price } </p>
                    <h4 className="card-title">{ product.productName }</h4>
                    <span className="card-cart" onClick={() => handleClickWish(data)}><ion-icon name="heart-empty"></ion-icon></span>
                </div>
            </div>
        </div> :
        ''
     )
  }
export default Product;
