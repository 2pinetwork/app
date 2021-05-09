import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import WalletModal from '../helpers/walletModal'
import Toastr from '../components/toastr'

const expectedChainId = 80001 // Mumbai

export const connectAsync = createAsyncThunk(
  'wallet/connectAsync',
  async (_, { dispatch }) => {
    return await WalletModal.connect(dispatch)
  }
)

export const walletSlice = createSlice({
  name: 'wallet',

  initialState: {
    address:  undefined,
    chainId:  undefined,
    provider: undefined,
    status:   'idle',
    web3:     undefined
  },

  reducers: {
    addressChanged: (state, action) => {
      state.address  = action.payload.address
    },
    chainChanged: (state, action) => {
      state.chainId  = action.payload.chainId
    }
  },

  extraReducers: {
    [connectAsync.pending]: state => {
      state.status = 'loading'
    },
    [connectAsync.fulfilled]: (state, action) => {
      if (action.payload.chainId === expectedChainId) {
        state.address  = action.payload.address
        state.chainId  = action.payload.chainId
        state.provider = action.payload.provider
        state.status   = 'idle'
        state.web3     = action.payload.web3
      } else {
        Toastr.error("Please select Mumbai network first")
        state.status = 'failed'
      }
    },
    [connectAsync.rejected]: (state, action) => {
      console.error(action.error.name, action.error.message)
      Toastr.error(action.error.message)

      state.status = 'failed'
    }
  }
})

export const selectStatus   = state => state.wallet.status
export const selectAddress  = state => state.wallet.address
export const selectChainId  = state => state.wallet.chainId
export const selectProvider = state => state.wallet.provider
export const selectWeb3     = state => state.wallet.web3

export const { addressChanged, chainChanged } = walletSlice.actions

export default walletSlice.reducer
