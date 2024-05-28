import { createSlice } from '@reduxjs/toolkit';
const initialState: any = {
  userList: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userList.push(action.payload)
      return state;
    },
    removeUser: (state, action) => {
      return { userList : state.filter((state:any) => state.name !== action.payload.name)};
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
