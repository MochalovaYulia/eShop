import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        add_to_cart(state, action) {

        }
    }
})

export const selectCartItems = (state) => state.cartItems
export const selectCartTotalQuantity = (state) => state.cartTotalQuantity
export const selectCartTotalAmount = (state) => state.cartTotalAmount

export default cartSlice.reducer
export const { add_to_cart } = cartSlice.actions