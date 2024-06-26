import {createSlice} from '@reduxjs/toolkit';

import { loadState, saveState } from '../../helper/sessionStore';

const authSlice = createSlice({
    name: 'auth',
    initialState: loadState('auth', {
        isLoggedIn: false,
        username: null,
        phone: null,
        hostel: null,
        token: null
    }),
    reducers: {
        login(state, action){
            state.isLoggedIn = true
            state.username = action.payload.username
            state.phone = action.payload.phone
            state.hostel = action.payload.hostel
            state.token = action.payload.token
            saveState('auth', state)
        },
        logout(state){
            state.isLoggedIn = false
            state.username = null
            state.phone = null
            state.hostel = null
            state.token = null
            saveState('auth', state)
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;