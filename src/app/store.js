import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import vaultsReducer from '../features/vaultsSlice'
import walletReducer from '../features/walletSlice'

export const store = configureStore({
  reducer: {
    vaults: vaultsReducer,
    wallet: walletReducer
  },

  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
})
