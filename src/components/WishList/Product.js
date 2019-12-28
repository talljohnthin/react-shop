import React, { Fragment, useContext, useState, useEffect} from 'react'
import './Sass/Index.scss'
import { WishListContext } from '../../contexts/WishListContext'
import { ProductContext } from '../../contexts/ProductContext'
import Popup from "reactjs-popup";

const Product = ({product, id, productIndex}) => {
    const{name, price, image, variation, option, unit, total} = product
    const {wishListState, wishListDispatch} = useContext(WishListContext)
    const {productState} = useContext(ProductContext)
    const [popupVariation, setPopupVariation] = useState(false)
    const [popupOption, setPopupOption] = useState(false)
    const [listVariations, setListVariations] = useState([])
    const [listOptions, setListOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState({})
    const [updateToggle, setUpdateToggle] = useState(false)

    useEffect(()=> {
        generatePopupVariation()
        generatePopupOptions()
    }, [productState])

    const updateLocalStorage = (products) => {
        if (products.length > 0) {
            wishListDispatch({
                type:"REPLACE_WISH",
                payload: products.map(item => item)
            })
        } 
    }

    const generatePopupOptions = () => {
        const products = productState.products
        if (products.length > 0) {
            const finedProduct = products.find(item => item.id == id)
            const priceOptions = finedProduct.data.priceOptions
            setListOptions(priceOptions[0].options)
        }
    }

    const generatePopupOptionContent= () => {
        if ( listOptions.length > 0 ) {
           const filtered = listOptions.filter(item => item.is_available !== 'No')
           return filtered.map((item, index) => <li key={index}><span>{item.option}</span><span>Price: {item.price}</span><div className="btn btn-primary" onClick={() => changeOption(index, item.option, item.price)} >Select</div></li>)
        }
    }

    const changeOption = (index, option, price) => {
        const action = {
            id,
            option,
            price
        }
        if (option) {
            wishListDispatch({
                type:'UPDATE_OPTION_WISH',
                action
            })
            updateLocalStorage(wishListState.products)
            modalOption('close')
        }  
    }

    const generatePopupVariation = () => {
        const products = productState.products
        if (products.length > 0) {
            const finedProduct = products.find(item => item.id == id)
            const priceOptions = finedProduct.data.priceOptions
            setListVariations(priceOptions)
        }
    }

    const generatePopupVariationContent = () => {
        if ( listVariations.length > 0 ) {
           return listVariations.map((item, index) => <li className="btn btn-primary" onClick={() => changeVariation(index, item.variation, item.options)} key={index}>{item.variation}</li>)
        }
    }

    const changeVariation = (index, variation, options) => {
        const action = {
            id,
            variation
        }
        if (variation) {
            wishListDispatch({
                type:'UPDATE_VARIATION_WISH',
                action
            })
            updateLocalStorage(wishListState.products)
            modalVariation('close')
        }  
    }
    
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
    const modalVariation = action => {
        if (action == 'open') {
            setPopupVariation(true)
        } else if (action == 'close') {
            setPopupVariation(false)
        }
    }
    const modalOption = action => {
        if (action == 'open') {
            setPopupOption(true)
        } else if (action == 'close') {
            setPopupOption(false)
        }
    }

    return (
        <Fragment>
            <Popup
                open={popupVariation}
                closeOnDocumentClick
                onClose={()=> modalVariation('close')}
            >
                <div className="popup-content"> 
                    <ul>
                        {generatePopupVariationContent()}
                    </ul>
                    <span onClick={() => modalVariation('close')}>X</span>
                </div>
            </Popup>
            <Popup
                open={popupOption}
                closeOnDocumentClick
                onClose={()=> modalOption('close')}
            >
                <div className="popup-content"> 
                    <ul>
                        {generatePopupOptionContent()}
                    </ul>
                    <span onClick={() => modalOption('close')}>X</span>
                </div>
            </Popup>
                <div className="card">
                    <div className="card-wrapper">
                        <div className="left">
                            <img className="card-img" src={ image } alt={ name } />
                        </div>
                        <div className="center">
                            <h4 className="card-title">{ name }</h4>
                            { variation && <p className="card-variation">Variation: {variation} <span onClick={()=> modalVariation('open')} className="change-variation">Change</span></p>}
                            { option && <p className="card-option">Option: { option }  <span onClick={()=> modalOption('open')} className="change-option">Change</span></p>}
                            <p className="card-price">Price: {price}</p>
                            <p className="card-total">Total: {total}</p>
                        </div>
                        <div className="right">
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


