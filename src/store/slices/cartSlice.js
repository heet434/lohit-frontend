import {createSlice} from '@reduxjs/toolkit';

import { loadState, saveState } from '../../helper/sessionStore';

const cartSlice = createSlice({
    name: 'cart',
    // initialState: {
    //     items: [],
    //     totalPrice: 0,
    //     totalQuantity: 0,
    //     numItems: 0
    // },

    initialState: loadState('cart', {
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
        numItems: 0
    }),

    reducers: {
        addItem(state, action){
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if(!existingItem){
                state.items.push({
                    id: newItem.id,
                    idBackend: newItem.idBackend,
                    name: newItem.name,
                    price: newItem.price,
                    image: newItem.image,
                    quantity: 1,
                    totalPrice: newItem.price
                })
                state.totalPrice += Number(newItem.price);
                state.numItems++;
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += Number(existingItem.price);
                state.totalPrice += Number(existingItem.price);
            }
            saveState('cart', state)
        },
        // addExistingItem(state, action){
        //     const existingItem = state.items.find(item => item.id === action.payload.id);
        //     if(existingItem){
        //         existingItem.quantity++;
        //         existingItem.totalPrice += existingItem.price;
        //         state.totalPrice += existingItem.price;
        //         state.totalQuantity++;
        //     }
        // },
        removeExistingItem(state, action){
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if(existingItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== action.payload.id);
                state.totalQuantity--;
                state.totalPrice -= Number(existingItem.price);
                state.numItems--;
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= Number(existingItem.price);
                state.totalPrice -= Number(existingItem.price);
                state.totalQuantity--;
            }
            saveState('cart', state)
        },
        clearCart(state){
            state.items = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
            state.numItems = 0;
            saveState('cart', state)
        }

    }
})

export const cartActions = cartSlice.actions;
export default cartSlice;