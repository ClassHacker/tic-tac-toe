import { combineReducers } from 'redux'
import restartReducer from "./restartReducer"
import exitReducer from "./exitReducer"

const all = combineReducers({
    rsR: restartReducer,
    exR: exitReducer
})

export default all;