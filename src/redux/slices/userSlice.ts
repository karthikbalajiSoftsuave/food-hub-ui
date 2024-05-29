import { createSlice } from '@reduxjs/toolkit';
const initialState: any = {
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      return {...state, ...action.payload}
    },
    removeUser: (state, action) => {
      // return { userList : state.filter((state:any) => state.name !== action.payload.name)};
      return state;
    },
    clearUser: () => {
      return initialState;
    },
    setIsDisclosed: (state, action) => {
      return { ...state, isDisclosed: action.payload };
    },
  },
});
// Action creators are generated for each case reducer function
export const { addUser, removeUser, clearUser, setIsDisclosed } =
  userSlice.actions;

export default userSlice.reducer;
