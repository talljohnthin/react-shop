import { combineReducers } from 'redux'
import orderReducer from './orderReducer'
const rootReducer = combineReducers({
    orders: orderReducer,
})
export default rootReducer