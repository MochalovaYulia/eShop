import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderHistory: []
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        store_orders (state, action) {
            state.orderHistory = action.payload
            // console.log(action.payload);
        }
    }
})

export const selectorOrderHistory = (state) => state.orders.orderHistory

export const { store_orders } = orderSlice.actions
export default orderSlice.reducer
