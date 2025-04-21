import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService.js'

const initialState = {
  user:  window.localStorage.getItem("auth") ? JSON.parse(window.localStorage.getItem("auth")) : null,
  token:  window.localStorage.getItem("token") ? JSON.parse(window.localStorage.getItem("token")) : null,
  status:'',
  error:null,
}

// this function use in loginPage
export const login = createAsyncThunk("auth/login", async (loginData, thunkAPI)=>{
  try {
      return await  authService.loginUser(loginData)
  } catch (error) {
      return thunkAPI.rejectWithValue(error)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(login.pending, (state)=>{
        state.status = "loading";
    }).addCase(login.fulfilled, (state,action)=>{
        state.status = "success"; // data recived or req. completed 
        state.user = action.payload
    }).addCase(login.rejected, (state,action)=>{
        state.status = "failed";
        state.error = action.payload
    })
  }
})

export const { increment, decrement, incrementByAmount } = authSlice.actions

export default authSlice.reducer