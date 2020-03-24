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
    GET_ORDERS_BY_CUSTOMER
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


