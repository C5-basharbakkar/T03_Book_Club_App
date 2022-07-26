import { createSlice } from "@reduxjs/toolkit";

export const authSlice =  createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },

  setLogin: (state, action) => {
    state.token = action.payload;
    state.isLoggedIn = true;
    localStorage.setItem("token",action.payload);
  },

  setLogOut:(state,action)=>{
      state.token=""
      state.isLoggedIn=false
      localStorage.removeItem("token")

  }
});


export const {setLogin,setLogOut}=authSlice.actions;

export default authSlice.reducer