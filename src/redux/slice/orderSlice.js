import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderHistory: [],
    totalOrderAmount: null,
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        store_orders (state, action) {
            state.orderHistory = action.payload
        },
        calc_total_order_amount(state) {
            const array = []
            state.orderHistory.map((item) => {
                const {orderAmmount} = item
                return array.push(orderAmmount)
            })
            const totalAmount = array.reduce((a, b) => {
                return a + b
            }, 0)
            state.totalOrderAmount = totalAmount
        }
    }
})

export const selectorOrderHistory = (state) => state.orders.orderHistory
export const selectorOrderAmount = (state) => state.orders.totalOrderAmount

export const { store_orders, calc_total_order_amount } = orderSlice.actions
export default orderSlice.reducer
