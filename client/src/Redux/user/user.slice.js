import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: undefined,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    signInSucces: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = false);
    },

    signInFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },

    signOutSuccess : (state) => {
      state.currentUser = null,
      state.loading = false,
      state.error = false
    },
  }
  
});

export const { signInFailure, signInSucces , signOutSuccess} = userSlice.actions
export default userSlice.reducer
