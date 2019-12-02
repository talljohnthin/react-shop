import React from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
function Product({data}) {
    const product = data.data;
    return (
        <div className="card">
            <div className="card-wrapper">
                <img className="card-img" src={ product.cover ? product.cover : product.productImages[0] } alt={ product.productName } />
                <div className="card-body">
                    <p className="card-price">Php { product.priceOptions[0].options[0].price } </p>
                    <h4 className="card-title">{ product.productName }</h4>
                    <span className="card-cart"><ion-icon name="heart-empty"></ion-icon></span>
                </div>
            </div>
        </div>
     )
  }
export default Product;
