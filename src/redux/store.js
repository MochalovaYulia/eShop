import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import filterSlice from "./slice/filterSlice";
import cartSlice from "./slice/cartSlice";
import checkoutSlice from "./slice/checkoutSlice";
import orderSlice from "./slice/orderSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    product: productSlice,
    filter: filterSlice,
    cart: cartSlice,
    checkout: checkoutSlice,
    orders: orderSlice,
})

const store = configureStore({
    reducer: rootReducer,

    middleware: (getDeafaultMiddleware) =>
        getDeafaultMiddleware({
            serializableCheck: false
        }),
})

export default store;