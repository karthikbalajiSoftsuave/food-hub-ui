import { createSlice } from '@reduxjs/toolkit';
const initialState: any = {
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addUser } = userSlice.actions;

export default userSlice.reducer;
