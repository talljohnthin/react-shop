const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state, user: action.payload}
        case "SIGNIN":
            return {...state, user: action.payload}
        case "LOGOUT":
            return {...state, user: action.payload}
        default:
            return state
    }
}

export default AuthReducer;