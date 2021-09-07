import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchVaultsData } from './fetchVaultsData'
import vaults from '../data/vaults'
import {
  selectAddress,
  selectChainId,
  selectProvider,
  selectWeb3,
  supportedChains
} from './walletSlice'

const initialState = {
  order:  0,
  status: 'idle',
  value:  vaults
}

const selectOrder = state => state.vaults.order

export const fetchVaultsDataAsync = createAsyncThunk(
  'vaults/fetchVaultsData',
  async (_, { dispatch, getState }) => {
    const state    = getState()
    const address  = selectAddress(state)
    const chainId  = selectChainId(state)
    const order    = selectOrder(state)
    const provider = selectProvider(state)
    const web3     = selectWeb3(state)

    if (supportedChains.includes(chainId)) {
      fetchVaultsData(address, chainId, provider, web3, dispatch, order)
    }
  }
)

export const vaultsSlice = createSlice({
  name: 'vaults',

  initialState,

  reducers: {
    newVaultFetch: state => {
      state.order++
    },
    resetVaults: state => {
      state.status = initialState.status
      state.value  = initialState.value
    },
    vaultsLoaded: (state, action) => {
      if (action.payload.order === state.order) {
        state.status = 'loaded'
        state.value  = action.payload.vaults
      }
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

export const selectStatus = state => state.vaults.status
export const selectVaults = state => state.vaults.value

export const { newVaultFetch, resetVaults, vaultsLoaded } = vaultsSlice.actions

export default vaultsSlice.reducer
