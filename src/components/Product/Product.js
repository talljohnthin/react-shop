import React from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
function Product() {
    return (
        <div className="card">
            <div className="card-wrapper">
                <img className="card-img" src="https://picsum.photos/600/400" alt="Card image cap" />
                <div className="card-body">
                    <p className="card-price">Php 100.00</p>
                    <h4 className="card-title">Product title</h4>
                    <span className="card-cart"> <FontAwesomeIcon icon={faPlus} /></span>
                </div>
            </div>
        </div>
     )
  }
export default Product;
