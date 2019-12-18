import React, { useContext} from 'react'
import { WishListContext } from './../../contexts/WishListContext'
import { store } from 'react-notifications-component';
function Product({data}) {
    const product = data.data;
    const {wishListState, wishListDispatch } = useContext(WishListContext)
    
    const handleClickWish = id => {
        if (id) {
            wishListDispatch({
                type:"ADD_WISH",
                payload: id
            })
            store.addNotification({
                title: 'Wish',
                message: 'Product is now added to wish list',
                type: 'success',                         // 'default', 'success', 'info', 'warning'
                container: 'top-center',
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 1500 
                }               // where to position the notifications
            })
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
                    <span className="card-cart" onClick={() => handleClickWish(data.id)}><ion-icon name="heart-empty"></ion-icon></span>
                </div>
            </div>
        </div> :
        ''
     )
  }
export default Product;
