import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import modalDisplaySlice from './slices/modalDisplaySlice';
import cartSlice from './slices/cartSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        modalDisplay: modalDisplaySlice.reducer,
        cart: cartSlice.reducer
    }
})

export default store;