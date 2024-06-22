import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import modalDisplaySlice from './slices/modalDisplaySlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        modalDisplay: modalDisplaySlice.reducer,
    }
})

export default store;