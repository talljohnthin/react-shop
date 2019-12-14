import React, { createContext, useReducer } from 'react'
import AuthReducer from '../reducers/AuthReducer'


export const AuthContext = createContext()
export const AuthConsumer = AuthContext.Consumer

const initState = {
    user: {}
}
const AuthProvider = props => {
    const [ state, dispatch ] = useReducer(AuthReducer, initState)
    const value = {state, dispatch}
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider