import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  currentUser: null,
  error: null,
  Loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.Loading = true;
      state.error = null; 
    },
    signinSuccess: (state, action) => {
      state.Loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signinFailure: (state, action) => {
      state.error = action.payload;
      state.Loading = false;
    },
    updateUserStart:(state) => {
      state.Loading = true;
    },
    updateUserSuccess:(state, action) => {
      state.currentUser = action.payload;
      state.Loading = false;
      state.error = null;
    },
    updateUserFailure: (state,action) =>{
      state.error = action.payload
      state.Loading = false
    },
    deleteUserStart:(state) => {
      state.Loading = true;
    },
    deleteUserSuccess:(state, action) => {
      state.currentUser = null;
      state.Loading = false;
      state.error = null;
    },
    deleteUserFailure: (state,action) =>{
      state.error = action.payload
      state.Loading = false
    },
    SignOutUserStart:(state) => {
      state.Loading = true;
    },
    SignOutUserSuccess:(state, action) => {
      state.currentUser = null;
      state.Loading = false;
      state.error = null;
    },
    SignOutUserFailure: (state,action) =>{
      state.error = action.payload
      state.Loading = false
    }
  },

});

export const { 
  signinStart, 
  signinSuccess, 
  signinFailure, 
  updateUserStart, 
  updateUserSuccess, 
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  SignOutUserStart,
  SignOutUserSuccess,
  SignOutUserFailure ,
} = userSlice.actions;

export default userSlice.reducer;
