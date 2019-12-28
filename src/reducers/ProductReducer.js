const ProductReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_PRODUCTS":
            return {...state, products: [...action.payload]}
        case "ADD_PRODUCT":
            return {...state, products: [...state.products, action.payload]}
        default:
            return state
    }
}
export default ProductReducer;