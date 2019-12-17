import React, { createContext, useReducer } from 'react'
import WishListReducer from '../reducers/WishListReducer'
export const WishListContext = createContext()

const initState = {
    products: []
}
const WishListProvider = props => {
    const [ state, dispatch ] = useReducer(WishListReducer, initState)
    const value = {state, dispatch}
    return (
        <WishListContext.Provider value={value}>
            {props.children}
        </WishListContext.Provider>
    )
}

export default WishListProvider