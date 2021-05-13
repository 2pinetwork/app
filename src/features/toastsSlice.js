import { createSlice } from '@reduxjs/toolkit'

export const toastsSlice = createSlice({
  name: 'toasts',

  initialState: [],

  reducers: {
    clearToast: (state, action) => {
      const title = action.payload

      state.splice(state.findIndex(toast => toast.title === title), 1)
    },

    toastAdded: (state, action) => {
      const { title, body, backgroundStyle, textStyle } = action.payload

      if (! state.find(toast => toast.title === title)) {
        state.push({ title, body, backgroundStyle, textStyle })
      }
    }
  }
})

export const selectToasts = state => state.toasts

export const { clearToast, toastAdded } = toastsSlice.actions

export default toastsSlice.reducer
