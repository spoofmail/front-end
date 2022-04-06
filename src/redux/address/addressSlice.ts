import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import getAllAddresses from '../../api/spoofmail/addresses/fetchAll'
import Address from '../../types/Address'

interface AddressState {
  ids: Array<Address['id']>
  map: {
    [key: Address['id']]: Address
  },
  loading: boolean,
  status: 'idle' | 'pending' | 'error' | 'success'
}
const initialState: AddressState = {
  ids: [],
  map: {},
  loading: false,
  status: 'idle',
}

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddresses: (state, action: PayloadAction<{ addresses: Array<Address> }>) => {
      const ids = action.payload.addresses.map(address => address.id)
      state.ids = ids

      const map = {}
      action.payload.addresses.forEach(address => map[address.id] = address)
      state.map = map
    },
    addAddress: (state, { payload: { address } }: PayloadAction<{ address: Address }>) => {
      const exists = state.map.hasOwnProperty(address.id)

      if (exists) return

      state.ids.push(address.id)
      state.map[address.id] = address
    },
    removeAddress: (state, { payload: { id } }: PayloadAction<{ id: Address['id'] }>) => {
      const foundIndex = state.ids.findIndex(addressId => addressId === id)

      if (foundIndex === -1) return

      delete state.map[id]
      state.ids.splice(foundIndex, 1)
    },
    updateAddressName: (state, { payload: { addressId, newName } }: PayloadAction<{ addressId: Address['id'], newName: Address['addressname'] }>) => {
      const exists = state.map.hasOwnProperty(addressId)

      if (!exists) return

      state.map[addressId].addressname = newName
    },
    updateAddressTag: (state, { payload: { addressId, newTag } }: PayloadAction<{ addressId: Address['id'], newTag: Address['addresstag'] }>) => {
      const exists = state.map.hasOwnProperty(addressId)

      if (!exists) return

      state.map[addressId].addresstag = newTag
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddresses.fulfilled, (state, action) => {
      state.ids = action.payload.map(address => address.id)
      const map = action.payload.reduce((byId, user) => {
        byId[user.id] = user
        return byId
      }, {})
      state.map = map
      state.loading = false
      state.status = 'success'
    })
    builder.addCase(fetchAddresses.pending, (state, action) => {
      state.loading = true
      state.status = 'pending'
    })
    builder.addCase(fetchAddresses.rejected, (state, action) => {
      state.loading = false
      state.status = 'error'
    })
  }
})

export const {
    setAddresses,
    addAddress,
    removeAddress,
    updateAddressName,
    updateAddressTag,
} = addressSlice.actions

export default addressSlice.reducer

export const fetchAddresses = createAsyncThunk(
  'addresses/all',
  async () => {
    const response = await getAllAddresses()
    return response
  }
)