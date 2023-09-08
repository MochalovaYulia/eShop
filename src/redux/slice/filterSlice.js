import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filteredProducts: [],
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filter_by_search(state, action) {
            const {products, search} = action.payload
            const tempProducts = products.filter(
                (product) => 
                    product.name.toLowerCase().includes(search.toLowerCase()) || 
                    product.category.toLowerCase().includes(search.toLowerCase())) 
            state.filteredProducts = tempProducts;
        },
        sort_products(state, action) {
            const {sort, products} = action.payload
            let tempProducts = []
            if(sort === 'latest') {
                tempProducts = products
            }
            if(sort === 'lowest-price') {
                tempProducts = products.slice().sort((a, b) => {
                    return a.price - b.price
                })
            }
            if(sort === 'higest-price') {
                tempProducts = products.slice().sort((a, b) => {
                    return b.price - a.price
                })
            }
            if(sort === 'z-a') {
                tempProducts = products.slice().sort((a, b) => {
                    return b.name.localeCompare(a.name)
                })
            }
            if(sort === 'a-z') {
                tempProducts = products.slice().sort((a, b) => {
                    return a.name.localeCompare(b.name)
                })
            }
            state.filteredProducts = tempProducts
        }
    }
})

export const selectFilteredProducts = (state) => state.filter.filteredProducts
export const selectSortProducts = (state) => state.filter.sort

export const { filter_by_search, sort_products } = filterSlice.actions
export default filterSlice.reducer