const WishListReducer = (state, action) => {
    switch (action.type) {
        case "ADD_WISH":
            return addWish(state, action)
        default:
            return state
    }
}

const addWish = (state, action) => {
    localStorage.setItem('wish-list', JSON.stringify( {...state, products: [...state.products, action.payload]}))
    return {...state, products: [...state.products, action.payload]}
}

export default WishListReducer;