import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RefreshState {
  active: boolean
}
const initialState: RefreshState = {
  active: JSON.parse(localStorage.getItem('refresh') || 'true'),
}

export const refreshSlice = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    setRefreshActive: (state, action: PayloadAction<{ active: boolean }>) => {
      state.active = action.payload.active

      localStorage.setItem('refresh', JSON.stringify(state.active))
    },
    toggleRefreshActive: (state) => {
        state.active = !state.active

        localStorage.setItem('refresh', JSON.stringify(state.active))
    },
  },
})

export const {
    setRefreshActive,
    toggleRefreshActive,
} = refreshSlice.actions

export default refreshSlice.reducer