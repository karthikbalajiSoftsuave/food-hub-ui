import { createSlice } from '@reduxjs/toolkit';
const initialState: any = {
};


export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        recipeDetails: (_, action) => {
            return action.payload;
        },
    },
});
// Action creators are generated for each case reducer function
export const { recipeDetails } = recipeSlice.actions;

export default recipeSlice.reducer;
