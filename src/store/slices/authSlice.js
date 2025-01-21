import {createSlice} from '@reduxjs/toolkit';

import { loadState, saveState } from '../../helper/sessionStore';

const authSlice = createSlice({
    name: 'auth',
    initialState: loadState('auth', {
        isLoggedIn: false,
        phone: null,
        email: null,
        token: null,
        address: null
    }),
    reducers: {
        login(state, action){
            state.isLoggedIn = true
            state.email = action.payload.email
            state.phone = action.payload.phone
            state.token = action.payload.token
            state.address = action.payload.address
            saveState('auth', state)
        },
        logout(state){
            state.isLoggedIn = false
            state.email = null
            state.phone = null
            state.token = null
            state.address = null
            saveState('auth', state)
        },
        changePhone(state, action){
            state.phone = action.payload
            saveState('auth', state)
        },
        changeAddress(state, action){
            state.address = action.payload
            saveState('auth', state)
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;