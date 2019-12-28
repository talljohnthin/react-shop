const WishListReducer = (state, action) => {
    switch (action.type) {
        case "ADD_WISH":
            return addWish(state, action)
        case "REPLACE_WISH":
            return replaceWish(state, action)
        case "REMOVE_WISH":
            return removeWish(state, action)
        case "ADD_UNIT_WISH":
            return unitWish(state, action)
        case "UPDATE_VARIATION_WISH":
            return updateVariation(state, action)
        case "UPDATE_OPTION_WISH":
            return updateOption(state, action)
        default:
            return state
    }
}

const addWish = (state, action) => {
    localStorage.setItem('wish-list', JSON.stringify( {...state, products: [...state.products, action.payload]}))
    return {...state, products: [...state.products, action.payload]}
}

const replaceWish = ( state, action ) => {
    localStorage.setItem('wish-list', JSON.stringify( {...state, products: [...action.payload]} ))
    return {...state, products: [...action.payload]}
}

const removeWish = ( state, action ) => {
    const copyState = {...state}
    copyState.products.splice(action.payload, 1);
    localStorage.setItem('wish-list', JSON.stringify( {...state, products: [...copyState.products]} ))
    return {...state, products: [...copyState.products]}
}

const unitWish = ( state, action ) => {
    const copyState = { ...state }
    const index = copyState.products[action.payload.index]
    const ctrl = action.payload.control
    const unit = index.unit
    const price = index.price
    if (ctrl == "+") {
        index.unit = Number(unit) + 1
        index.total = Number(price) * ( Number(unit) + 1 )
    }
    if (ctrl == "-") {
        if (Number(unit) <= 1) {
            index.unit = 1
        } else {
            index.unit = Number(unit) - 1
            index.total = Number(price) * ( Number(unit) - 1 )
        }
    }
    localStorage.setItem('wish-list', JSON.stringify( {...state, products: [...copyState.products]} ))
    return {...state, products: [...copyState.products]}
}

const updateVariation  = ( state, action) => {
    const id = action.action.id
    const variation = action.action.variation
    const copyState = {...state}
    const product = copyState.products.find(item => item.id == id)
    product.variation = variation
    return  {...state, products: [...copyState.products]}
}

const updateOption  = ( state, action) => {
    const id = action.action.id
    const option = action.action.option
    const price = action.action.price
    const copyState = {...state}
    const product = copyState.products.find(item => item.id == id)
    product.option = option
    product.price = price
    product.total = product.unit * price
    return  {...state, products: [...copyState.products]}
}


export default WishListReducer;