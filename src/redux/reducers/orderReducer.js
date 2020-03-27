import { 
    ORDER_SUCCESS,
    ORDER_LOADING,
    ORDER_ERROR,
    ORDER_RESET,
    GET_ORDERS,
    SELECT_ORDER,
    DELETE_ORDER,
    GET_ORDERS_BY_CUSTOMER,
    ADD_QUANTITY,
    SUBTRACT_QUANTITY,
    REMOVE_TO_ORDER,
    EMPTY_ORDER,
    SUM_TOTAL_IN_THE_ORDER,
    UPDATE_SHIPPING_FEE,
    PROCESS_ORDER
} from './../actions/order/orderTypes'

const initialState = {
    orders:[],
    isSuccess:false,
    ordersLoading:false,
    message:'',
    selectedOrderId:'',
    selectedOrder:{}
}

const reducer = ( state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS :
            return {
                ...state,
                ordersLoading: false,
                orders:action.payload
            }
        case GET_ORDERS_BY_CUSTOMER :
            return {
                ...state,
                ordersLoading: false,
                orders:action.payload
            }
        case SELECT_ORDER: 
            return {
                ...state,
                selectedOrderId : action.payload,
                selectedOrder: selectedOrderFunc(state, action.payload)
            }
        case DELETE_ORDER: 
            return {
                ...state
            }
        case ORDER_SUCCESS :
            return {
                ...state,
                isSuccess:true,
                ordersLoading:false,
                message:''
            }
        case ORDER_RESET: 
            return {
                ...state,
                isSuccess:false,
                ordersLoading:false,
                message:''
            }
        case ORDER_LOADING :
            return {
                ...state,
                ordersLoading: true,
                message:'',
                orders:[]
            }
        case ORDER_ERROR :
            return {
                ...state,
                ordersLoading: false,
                isSuccess:false,
                message: action.payload
            }
        case REMOVE_TO_ORDER :
            return {
                ...state,
                orders: removeToOrder(state, action.payload)
            }
        case ADD_QUANTITY :
            return {
                ...state,
                selectedOrder: addQTY(state, action.payload)
            }
        case SUBTRACT_QUANTITY :
            return {
                ...state,
                selectedOrder: subtractQTY(state, action.payload)
            }
        case SUM_TOTAL_IN_THE_ORDER :
            return {
                ...state,
                selectedOrder: {...state.selectedOrder, ...state.selectedOrder.name.total_amount = sumProductsInOrder(state)}
            }
        case EMPTY_ORDER :
            return {
                ...state,
                orders: [],
            }
        case UPDATE_SHIPPING_FEE :
            return {
                ...state,
                selectedOrder:{...state.selectedOrder, ...state.selectedOrder.name.shipping_fee = action.payload}
            }
        case PROCESS_ORDER :
            return {
                ...state,
            }
        default : return state
    }
}

export default reducer

const selectedOrderFunc = (state, id ) => {
    const orders = [...state.orders]
    if(id) {
        const index = orders.findIndex(e => e.id === id)
        if(index !== null || index !== undefined) {
            return orders[index]
        }
    }
    return {}
}

const addQTY = (state, index) => {
    const selectedOrder = {...state.selectedOrder}
    const orders = selectedOrder.name.products
    if (index !== undefined || index !== null || index !== '') {
        if(orders.length) {
            const productObj = {
                id: orders[index].id,
                name: orders[index].name,
                option:orders[index].option,
                price:orders[index].price,
                qty:orders[index].qty + 1,
                variation:orders[index].variation,
                cover:orders[index].cover,
                total: ( orders[index].qty + 1 ) * Number(orders[index].price)
            }
            orders[index] = productObj
            return selectedOrder
        } else {
            return state.selectedOrder
        }
    } else {
        return state.selectedOrder
    }
}
const subtractQTY = (state, index) => {
    const selectedOrder = {...state.selectedOrder}
    const orders = selectedOrder.name.products
    if (index !== undefined || index !== null || index !== '') {
        if(orders.length) {
            const productObj = {
                id: orders[index].id,
                name: orders[index].name,
                option:orders[index].option,
                price:orders[index].price,
                qty:orders[index].qty <= 1 ? 1 : orders[index].qty - 1,
                variation:orders[index].variation,
                cover:orders[index].cover,
                total: ( orders[index].qty <= 1 ? 1 : orders[index].qty - 1 ) * Number(orders[index].price) 
            }
            orders[index] = productObj
            return selectedOrder
        } else {
            return state.selectedOrder
        }
    } else {
        return state.selectedOrder
    }
}
const removeToOrder = (state, index) => {
    const selectedOrder = {...state.selectedOrder}
    const orders = selectedOrder.name.products
    if (index !== undefined || index !== null || index !== '') {
        if(orders.length) {
            orders.splice(index, 1)
            return orders
        } else {
            return state.selectedOrder
        }
    } else {
        return state.selectedOrder
    }
}
const sumProductsInOrder = (state) => {
    const selectedOrder = {...state.selectedOrder}
    const orders = selectedOrder.name.products
    const shipping_fee = selectedOrder.name.shipping_fee
    if(orders.length) {
        const total = orders.map(item => item.total)
        .reduce((prev, curr) => prev + curr, 0);
       return total + Number(shipping_fee)
    } else {
        return 0
    }
}
