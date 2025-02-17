import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  explicitLogout: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.explicitLogout = false;
    },
    removeUser: (state, action) => {
      state.user = null;
      state.explicitLogout = action.payload?.explicitLogout || false;
    },
    setExplicitLogout: (state, action) => {
      state.explicitLogout = action.payload;
    },
  },
});

export const { addUser, removeUser, setExplicitLogout } = userSlice.actions;

export default userSlice.reducer;
