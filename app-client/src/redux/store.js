import { configureStore } from '@reduxjs/toolkit'
import reducer from "./reducers";

const store = configureStore({reducer: reducer});
store.subscribe(() => console.log(store.getState()));

export default store;