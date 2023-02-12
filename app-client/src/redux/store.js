import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import reducer from "./reducers";

const store2 = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const store = configureStore({reducer: reducer});
store.subscribe(() => console.log(store.getState()));
// store.dispatch(action)

export default store;
