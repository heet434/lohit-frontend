import {createSlice} from '@reduxjs/toolkit';

const foodCategoriesSlice = createSlice({
    name: 'foodCategories',
    initialState: {
        foodCategories: [],
    },
    reducers: {
        addFoodCategory(state, action){
            state.foodCategories.push(action.payload)
        }
    }
})

export const foodCategoriesActions = foodCategoriesSlice.actions;
export default foodCategoriesSlice;