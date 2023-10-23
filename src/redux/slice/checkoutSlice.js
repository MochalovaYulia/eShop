import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shippingAddress: {},
    billingAddress: {}
}

const CheckoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        save_shipping_address(state, action) {
            console.log(action.payload);
            state.shippingAddress = action.payload
        }, 
        save_billing_address(state, action) {
            console.log(action.payload);
            state.billingAddress = action.payload
        },
    }
})

export default CheckoutSlice.reducer
export const {save_shipping_address, save_billing_address} = CheckoutSlice.actions 