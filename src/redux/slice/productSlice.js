import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        store_products(state, action) {
            state.products = action.payload.products;
        },
    }
    
})


export const selectProduct = (state) => state.product.products
export const { store_products } = productSlice.actions
export default productSlice.reducer