import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userId: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    set_active_user (state, action) {
        state.isLoggedIn = true
        state.email = action.payload.email
        state.userName = action.payload.userName
        state.userId = action.payload.userId
        console.log(state)
    }
  }
});

export const { set_active_user } = authSlice.actions

export const selectedIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectedEmail = (state) => state.auth.email
export const selectedUserName = (state) => state.auth.userName
export const selectedUserId = (state) => state.auth.userId

export default authSlice.reducer