import { configureStore } from '@reduxjs/toolkit'
import { addressSlice } from './address/addressSlice'
import { refreshSlice } from './refresh/refreshSlice'
import { userSlice } from './user/userSlice'

export const store = configureStore({
  reducer: {
    address: addressSlice.reducer,
    refresh: refreshSlice.reducer,
    user: userSlice.reducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch