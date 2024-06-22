import {createSlice} from '@reduxjs/toolkit';

const modalDisplaySlice = createSlice({
    name: 'modalDisplay',
    initialState: {
        display: false,
        content: 'login'
    },
    reducers: {
        openLogin(state){
            state.display = true
            state.content = 'login'
        },
        openSignup(state){
            state.display = true
            state.content = 'signup'
        },
        openCart(state){
            state.display = true
            state.content = 'cart'
        },
        openProfile(state){
            state.display = true
            state.content = 'profile'
        },
        openCheckout(state){
            state.display = true
            state.content = 'checkout'
        },
        openOrders(state){
            state.display = true
            state.content = 'orders'
        },
        close(state){
            state.display = false
            // state.content = null
        }
    }
})

export const modalDisplayActions = modalDisplaySlice.actions;
export default modalDisplaySlice;