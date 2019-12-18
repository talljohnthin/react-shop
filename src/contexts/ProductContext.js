import React, { createContext, useReducer } from 'react'
import ProductReducer from '../reducers/ProductReducer'

export const ProductContext = createContext()

const initState = {
    products: []
}

const ProductProvider = props => {
    const [ productState, productDispatch ] = useReducer(ProductReducer, initState)
    const value = {productState, productDispatch}
    return (
        <ProductContext.Provider value={value}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductProvider