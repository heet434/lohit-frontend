import {configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './slices/authSlice';
import modalDisplaySlice from './slices/modalDisplaySlice';
import cartSlice from './slices/cartSlice';

const authPersistConfig = {
    key: 'auth',
    storage
}

const cartPersistConfig = {
    key: 'cart',
    storage
}

const modalDisplayPersistConfig = {
    key: 'modalDisplay',
    storage
}

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice.reducer);
const persistedModalDisplayReducer = persistReducer(modalDisplayPersistConfig, modalDisplaySlice.reducer);

// const store = configureStore({
//     reducer: {
//         auth: authSlice.reducer,
//         modalDisplay: modalDisplaySlice.reducer,
//         cart: cartSlice.reducer
//     }
// })

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        modalDisplay: persistedModalDisplayReducer,
        cart: persistedCartReducer
    },
    devTools: process.env.REACT_APP_NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
    }),
})

export const persistor = persistStore(store);