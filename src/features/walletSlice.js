import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import WalletModal from '../helpers/walletModal'

export const supportedChains = [137, 80001]

export const connectAsync = createAsyncThunk(
  'wallet/connectAsync',
  async (_, { dispatch }) => {
    return await WalletModal.connect(dispatch)
  }
)

export const disconnectAsync = createAsyncThunk(
  'wallet/disconnectAsync',
  async (_, { dispatch, getState }) => {
    const state    = getState()
    const provider = selectProvider(state)
    const modal    = selectModal(state)

    if (provider?.close) {
      await provider.close()
    }

    await modal.clearCachedProvider()
  }
)

export const walletSlice = createSlice({
  name: 'wallet',

  initialState: {
    address:  undefined,
    chainId:  137,
    modal:    undefined,
    provider: undefined,
    status:   'idle',
    web3:     undefined
  },

  reducers: {
    addressChanged: (state, action) => {
      state.address = action.payload.address
    },
    chainChanged: (state, action) => {
      state.chainId = +action.payload.chainId
    }
  },

  extraReducers: {
    [connectAsync.pending]: state => {
      state.status = 'loading'
    },
    [connectAsync.fulfilled]: (state, action) => {
      state.address  = action.payload.address
      state.chainId  = +action.payload.chainId
      state.modal    = action.payload.modal
      state.provider = action.payload.provider
      state.status   = 'success'
      state.web3     = action.payload.web3
    },
    [connectAsync.rejected]: (state, action) => {
      console.error(action.error.name, action.error.message)

      state.status = 'failed'
    },
    [disconnectAsync.pending]: state => {
      state.status = 'loading'
    },
    [disconnectAsync.fulfilled]: (state, action) => {
      state.address  = undefined
      state.chainId  = 137
      state.provider = undefined
      state.status   = 'success'
      state.web3     = undefined
    },
    [disconnectAsync.rejected]: (state, action) => {
      console.error(action.error.name, action.error.message)

      state.status = 'failed'
    }
  }
})

export const selectStatus   = state => state.wallet.status
export const selectAddress  = state => state.wallet.address
export const selectChainId  = state => state.wallet.chainId
export const selectModal    = state => state.wallet.modal
export const selectProvider = state => state.wallet.provider
export const selectWeb3     = state => state.wallet.web3

export const { addressChanged, chainChanged } = walletSlice.actions

export default walletSlice.reducer
