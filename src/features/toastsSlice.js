import { createSlice } from '@reduxjs/toolkit'

export const toastsSlice = createSlice({
  name: 'toasts',

  initialState: [],

  reducers: {
    toastAdded: (state, action) => {
      const { title, body, icon, style, autohide } = action.payload

      if (! state.find(toast => toast.title === title)) {
        state.push({ title, body, icon, style, autohide })
      }
    },

    toastDestroyed: (state, action) => {
      const title = action.payload
      const index = state.findIndex(toast => toast.title === title)

      if (index !== -1) {
        state.splice(index, 1)
      }
    }
  }
})

export const selectToasts = state => state.toasts

export const { toastAdded, toastDestroyed } = toastsSlice.actions

export default toastsSlice.reducer
