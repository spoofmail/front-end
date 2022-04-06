import { configureStore } from '@reduxjs/toolkit'
import { addressSlice } from './address/addressSlice'
import { refreshSlice } from './refresh/refreshSlice'

export const store = configureStore({
  reducer: {
    address: addressSlice.reducer,
    refresh: refreshSlice.reducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch