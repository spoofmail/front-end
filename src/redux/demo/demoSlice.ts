import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DemoState {
  active: boolean
}
const initialState: DemoState = {
  active: JSON.parse(localStorage.getItem('demo') || 'false'),
}

export const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    setDemoActive: (state, action: PayloadAction<{ active: boolean }>) => {
      state.active = action.payload.active

      localStorage.setItem('demo', JSON.stringify(state.active))
    },
    toggleDemoActive: (state) => {
        state.active = !state.active

        localStorage.setItem('demo', JSON.stringify(state.active))
    },
  },
})

export const {
    setDemoActive,
    toggleDemoActive,
} = demoSlice.actions

export default demoSlice.reducer