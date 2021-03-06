import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import * as Sentry from '@sentry/react'
import toastsReducer from '../features/toastsSlice'
import vaultsReducer from '../features/vaultsSlice'
import walletReducer from '../features/walletSlice'

export const store = configureStore({
  reducer: {
    toasts: toastsReducer,
    vaults: vaultsReducer,
    wallet: walletReducer
  },

  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),

  enhancers: [
    Sentry.createReduxEnhancer({})
  ]
})
