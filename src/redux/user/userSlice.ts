import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RefreshState {
  userId: string
  username: string
}
const initialState: RefreshState = JSON.parse(localStorage.getItem('user_info') || '{ "userId": "", "username": "" }')

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userId: string, username: string }>) => {
      state = action.payload
      localStorage.setItem('user_info', JSON.stringify(action.payload))
    },
  },
})

export const {
    setUser,
} = userSlice.actions

export default userSlice.reducer