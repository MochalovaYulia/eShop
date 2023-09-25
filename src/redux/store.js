import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import filterSlice from "./slice/filterSlice";
import cartSlice from "./slice/cartSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    product: productSlice,
    filter: filterSlice,
    cart: cartSlice,
})

const store = configureStore({
    reducer: rootReducer,

    middleware: (getDeafaultMiddleware) =>
        getDeafaultMiddleware({
            serializableCheck: false
        }),
})

export default store;