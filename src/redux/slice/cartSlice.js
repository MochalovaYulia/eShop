import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
            const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (productIndex >= 0)  {
                // товар уже существует в корзине
                // увеличиваем в корзине количество
                state.cartItems[productIndex].cartQuantity += 1
                toast.info(`${action.payload.name} increased by one`, {position: 'top-left'})

            } else {
                // товара не существует в корзине
                // добавляем товар в корзину
                const tempProduct = {...action.payload, cartQuantity: 1}
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.name} added to cart`, {position: 'top-left'})
            }
            // сохранение в локальное хранилище
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        }, decrease_to_cart(state, action) {
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
    
            if (state.cartItems[productIndex].cartQuantity > 1) {
                state.cartItems[productIndex].cartQuantity -= 1;
                toast.info(`${action.payload.name} decreased by one`, {
                    position: "top-left",
                });
            } else if (state.cartItems[productIndex].cartQuantity === 1) {
                const newCartItem = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );
                state.cartItems = newCartItem;
                toast.success(`${action.payload.name} removed from cart`, {
                    position: "top-left",
                });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        }, remove_from_cart(state, action) {
            const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
            state.cartItems = newCartItem;
            toast.success(`${action.payload.name} removed from cart`, {
                position: "top-left",
            });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        }, clear_cart(state, action) {
            state.cartItems = []
            toast.info(`Cart cleared`, {
                position: "top-left",
            });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        }
    }
})

export const selectCartItems = (state) => state.cart.cartItems
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount

export default cartSlice.reducer
export const { add_to_cart, decrease_to_cart, remove_from_cart, clear_cart } = cartSlice.actions