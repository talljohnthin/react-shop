import { db } from './../../../config/firebase'

import { 
    ORDER_LOADING,
    ORDER_ERROR,
    ORDER_SUCCESS,
    ORDER_RESET,
    GET_ORDERS,
    SELECT_ORDER,
    DELETE_ORDER,
    PROCEED_TO_ON_SHIP,
    RECEIVE_ORDER,
    GET_ORDERS_BY_CUSTOMER,
    ADD_QUANTITY,
    SUBTRACT_QUANTITY,
    REMOVE_TO_ORDER,
    EMPTY_ORDER,
    SUM_TOTAL_IN_THE_ORDER,
    UPDATE_SHIPPING_FEE,
    PROCESS_ORDER
} from './orderTypes'

export const getOrders = (orderStatus) => {

    return (dispatch) => {
        dispatch({
            type: ORDER_LOADING
        })
        dispatch({
            type: ORDER_RESET
        })
        db.collection("orders")
        .where("status", "==", orderStatus)
        .get()
        .then(snapshot => {
            const orders = []
            snapshot.forEach(doc => {
                const obj = {
                    id: doc.id,
                    name: doc.data()
                }
                orders.push(obj)
            })
            const sortedOrders = orders.sort((a,b) => a.name.timestamp - b.name.timestamp)
            dispatch({
                type: GET_ORDERS,
                payload: sortedOrders
            })
        }, function (error) {
            dispatch({
                type: ORDER_ERROR,
                payload: error
            })
        });
    }
}
export const getOrdersByCustomer = (orderStatus, customerId) => {
    
    return (dispatch) => {
        dispatch({
            type: ORDER_LOADING
        })
        dispatch({
            type: ORDER_RESET
        })
        db.collection("orders")
        .where("status", "==", orderStatus)
        .where("uid", "==", customerId)
        .get()
        .then(snapshot => {
            const orders = []
            snapshot.forEach(doc => {
                const obj = {
                    id: doc.id,
                    name: doc.data()
                }
                orders.push(obj)
            })
            const sortedOrders = orders.sort((a,b) => a.name.timestamp - b.name.timestamp)
            dispatch({
                type: GET_ORDERS_BY_CUSTOMER,
                payload: sortedOrders
            })
        }, function (error) {
            dispatch({
                type: ORDER_ERROR,
                payload: error
            })
        });
    }
}
export const orderProducts = (orderObj) => {
    return (dispatch) => {
        dispatch({
            type: ORDER_LOADING
        })
        db.collection("orders").add(orderObj)
        .then(function(docRef) {
            dispatch({
                type: ORDER_SUCCESS
            })
        })
        .catch(function(error) {
            dispatch({
                type: ORDER_ERROR,
                payload: error
            })
        });
    }
}
export const orderReset = () => {
    return {
        type: ORDER_RESET
    }
}
export const selectOrder = (orderId) => {
    return {
        type: SELECT_ORDER,
        payload: orderId
    }
}
export const deleteOrder = (orderId) => {
    return (dispatch) => {
        db.collection("orders")
          .doc(orderId)
          .delete()
          .then(function() {
            dispatch({
                type: DELETE_ORDER
            })
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });   
    } 
}
export const proceedToOnShip = (orderId) => {
    return (dispatch) => {
        db.collection("orders").doc(orderId).update({
            status: "On Ship"
        }).then(function() {
            dispatch({
                type: PROCEED_TO_ON_SHIP
            })
        }).catch(function(error) {
            console.error("Error on proceeding order: ", error);
        });
    }
}
export const receiveOrder = (orderId) => {
    return (dispatch) => {
        db.collection("orders").doc(orderId).update({
            status: "Received"
        }).then(function() {
            dispatch({
                type: RECEIVE_ORDER
            })
        }).catch(function(error) {
            console.error("Error on proceeding order: ", error);
        });
    }
}
export const removeToOrder = (index) => {
    return {
        type: REMOVE_TO_ORDER,
        payload: index
    }
}
export const addQuantity = (index) => {
    return {
        type: ADD_QUANTITY,
        payload: index
    }
}
export const subtractQuantity = (index) => {
    return {
        type: SUBTRACT_QUANTITY,
        payload: index
    }
}
export const sumProductsInOrder = () => {
    return {
        type: SUM_TOTAL_IN_THE_ORDER
    }
}
export const emptyOrder = () => {
    return {
        type: EMPTY_ORDER
    }
}
export const updateShippingFee = (fee) => {
    return {
        type: UPDATE_SHIPPING_FEE,
        payload:fee
    }
}
export const proccessOrder = (order, orderId) => {
    const newObj = {
        notes: order.name.notes,
        order_date:order.name.order_date,
        shipping_fee:order.name.shipping_fee,
        products:order.name.products,
        shipping_details: order.name.shipping_details,
        status:'Reviewed',
        timestamp:order.name.timestamp,
        total_amount:order.name.total_amount,
        transaction_id:order.name.transaction_id,
        uid:order.name.uid
    }
    return (dispatch) => {
        db.collection("orders").doc(orderId)
        .set(newObj)
        .then(function(docRef) {
            dispatch({
                type: 'PROCESS_ORDER'
            })
        })
        .catch(function(error) {
            console.log("error", error.message)
        });
    }
    
}

