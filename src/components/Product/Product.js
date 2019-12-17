import React, { useContext} from 'react'
import { AuthContext } from './../../contexts/AuthContext'
function Product({data}) {
    const product = data.data;
    const {state, dispatch} = useContext(AuthContext)
    
    const handleClick = () => {
        console.log(state.user.uid)
    }
    return (
        product.priceOptions[0].options.length > 0 ?
        <div className="card">
            <div className="card-wrapper">
                <img className="card-img" src={ product.cover ? product.cover : product.productImages[0] } alt={ product.productName } />
                <div className="card-body">
                    <p className="card-price">Php { product.priceOptions[0].options[0].price } </p>
                    <h4 className="card-title">{ product.productName }</h4>
                    <span className="card-cart" onClick={handleClick}><ion-icon name="heart-empty"></ion-icon></span>
                </div>
            </div>
        </div> :
        ''
     )
  }
export default Product;
