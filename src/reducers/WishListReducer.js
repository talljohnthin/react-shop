const WishListReducer = (state, action) => {
    switch (action.type) {
        case "ADD_WISH":
            return {...state, products: [...state.products, action.payload]}
        default:
            return state
    }
}
export default WishListReducer;