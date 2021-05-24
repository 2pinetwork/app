import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchVaultsData } from './fetchVaultsData'
import vaults from '../data/vaults'
import {
  selectAddress,
  selectProvider,
  selectWeb3
} from './walletSlice'

const initialState = {
  value:  vaults,
  status: 'idle'
}

export const fetchVaultsDataAsync = createAsyncThunk(
  'vaults/fetchVaultsData',
  async (_, { dispatch, getState }) => {
    const state    = getState()
    const address  = selectAddress(state)
    const provider = selectProvider(state)
    const web3     = selectWeb3(state)

    fetchVaultsData(address, provider, web3, dispatch)
  }
)

export const vaultsSlice = createSlice({
  name: 'vaults',

  initialState,

  reducers: {
    resetVaults: state => {
      state.status = initialState.status
      state.value  = initialState.value
    },
    vaultsLoaded: (state, action) => {
      state.status = 'loaded'
      state.value  = action.payload
    }
  },

  extraReducers: {
    [fetchVaultsDataAsync.pending]: state => {
      state.status = 'loading'
    },
    [fetchVaultsDataAsync.fulfilled]: state => {
      state.status = 'succeded'
    },
    [fetchVaultsDataAsync.rejected]: (state, action) => {
      console.error(action.error.name, action.error.message)

      state.status = 'failed'
    }
  }
})

export const selectVaults = state => state.vaults.value
export const selectStatus = state => state.vaults.status

export const { resetVaults, vaultsLoaded } = vaultsSlice.actions

export default vaultsSlice.reducer
