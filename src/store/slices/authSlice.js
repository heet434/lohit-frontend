import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        login(state, payload){
            state.isLoggedIn = true
            state.username = payload.username
            state.phone = payload.phone
            state.hostel = payload.hostel
        },
        logout(state){
            state.isLoggedIn = false
            state.username = null
            state.phone = null
            state.hostel = null
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;