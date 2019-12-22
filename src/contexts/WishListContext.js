import React, { createContext, useReducer } from 'react'
import WishListReducer from '../reducers/WishListReducer'
export const WishListContext = createContext()

const initState = {
    products: [],
    select_variation:null
}
const WishListProvider = props => {
    const [ wishListState, wishListDispatch ] = useReducer(WishListReducer, initState)
    const value = {wishListState, wishListDispatch }
    return (
        <WishListContext.Provider value={value}>
            {props.children}
        </WishListContext.Provider>
    )
}

export default WishListProvider