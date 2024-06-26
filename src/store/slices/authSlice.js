import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        login(state, action){
            state.isLoggedIn = true
            state.username = action.payload.username
            state.phone = action.payload.phone
            state.hostel = action.payload.hostel
            state.token = action.payload.token
        },
        logout(state){
            state.isLoggedIn = false
            state.username = null
            state.phone = null
            state.hostel = null
            state.token = null
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;