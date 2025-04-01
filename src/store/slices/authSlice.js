import {createSlice} from '@reduxjs/toolkit';

import { loadState, saveState } from '../../helper/sessionStore';

const authSlice = createSlice({
    name: 'authLohitClient',
    initialState: loadState('authLohitClient', {
        isLoggedIn: false,
        phone: null,
        email: null,
        token: null
    }),
    reducers: {
        login(state, action){
            state.isLoggedIn = true
            state.email = action.payload.email
            state.phone = action.payload.phone
            state.token = action.payload.token
            saveState('authLohitClient', state)
        },
        logout(state){
            state.isLoggedIn = false
            state.email = null
            state.phone = null
            state.token = null
            saveState('authLohitClient', state)
        },
        changePhone(state, action){
            state.phone = action.payload
            saveState('authLohitClient', state)
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;