import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    previousUrl: '',
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
                toast.info(`${action.payload.name} removed from cart`, {
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
        }, clear_cart(state) {
            state.cartItems = []
            toast.info(`Cart cleared`, {
                position: "top-left",
            });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        }, calculate_subtotal(state) {
            const array = []
            state.cartItems.map((item) => {
                const {price, cartQuantity} = item
                const cartItemAmount = price * cartQuantity
                return array.push(cartItemAmount)
            })
            const totalAmount = array.reduce((a, b) => {
                return a + b
            }, 0)
            state.cartTotalAmount = totalAmount
        }, calculate_cart_total_quantity(state) {
            const array = []
            state.cartItems.map((item) => {
                const quantity = item.cartQuantity
                return array.push(quantity)
            })
            const totalQuantity = array.reduce((a, b) => {
                return a + b
            }, 0)
            state.cartTotalQuantity = totalQuantity
        }, save_url(state, action) {
            console.log(action.payload);
            state.previousUrl = action.payload
        }
    }
})

export const selectCartItems = (state) => state.cart.cartItems
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount
export const selectPreviousUrl = (state) => state.cart.previousUrl

export default cartSlice.reducer
export const { add_to_cart, decrease_to_cart, remove_from_cart, clear_cart, calculate_subtotal, calculate_cart_total_quantity, save_url } = cartSlice.actions