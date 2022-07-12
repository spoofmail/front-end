import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RefreshState {
  userId: string
  username: string
  hasMFA: boolean
}
const initialState: RefreshState = JSON.parse(localStorage.getItem('user_info') || '{ "userId": "", "username": "", "hasMFA": false }')

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userId: string, username: string, hasMFA: boolean }>) => {
      state = action.payload
      localStorage.setItem('user_info', JSON.stringify(action.payload))
    },
    activateMFA: (state) => {
      state.hasMFA = true
      localStorage.setItem('user_info', JSON.stringify(state))
    },
    deactivateMFA: (state) => {
      state.hasMFA = false
      localStorage.setItem('user_info', JSON.stringify(state))
    }
  },
})

export const {
    setUser,
    activateMFA,
    deactivateMFA,
} = userSlice.actions

export default userSlice.reducer