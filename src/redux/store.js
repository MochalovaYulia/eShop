import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    product: productSlice,
})

const store = configureStore({
    reducer: rootReducer,

    middleware: (getDeafaultMiddleware) =>
        getDeafaultMiddleware({
            serializableCheck: false
        }),
})

export default store;