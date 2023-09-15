import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    minPrice: null,
    maxPrice: null,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        store_products(state, action) {
            state.products = action.payload.products;
        },
        get_price_range(state, action) {
            const {products} = action.payload
            const array = []
            products.map((product) => {
                const price = product.price
                return array.push(price)
            })
            const max = Math.max(...array)
            const min = Math.min(...array)

            state.minPrice = min
            state.maxPrice = max
        }
    }
    
})


export const selectProduct = (state) => state.product.products
export const selectMinPrice = (state) => state.product.minPrice
export const selectMaxPrice = (state) => state.product.maxPrice
export const { store_products,  get_price_range } = productSlice.actions
export default productSlice.reducer