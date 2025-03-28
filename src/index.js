import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { persistor, store } from './store';
import { toast } from 'react-toastify';
import { authActions } from './store/slices/authSlice';
import { cartActions } from './store/slices/cartSlice';
import { modalDisplayActions } from './store/slices/modalDisplaySlice';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/'
// const BASE_URL = 'http://192.168.0.112:8000/'

// const BASE_URL = 'https://souruchi.up.railway.app/'

axios.defaults.baseURL = BASE_URL;

// add a request interceptor for invalid token error

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401 && error.response.data.detail === 'Invalid token.') {
            const dispatch = useDispatch()
            toast.error('Session expired, please login again.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
            })
            dispatch(cartActions.clearCart())
            dispatch(authActions.logout())
            dispatch(modalDisplayActions.openLogin())
        }
        return Promise.reject(error)
    }
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </GoogleOAuthProvider>
);