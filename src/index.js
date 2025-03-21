import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/'
// const BASE_URL = 'http://192.168.0.112:8000/'

// const BASE_URL = 'https://souruchi.up.railway.app/'

axios.defaults.baseURL = BASE_URL;

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