import { toastAdded } from '../features/toastsSlice'

export const transactionSended = (hash, dispatch) => {
  dispatch(
    toastAdded({
      title:    'Transaction sended',
      body:     hash,
      icon:     'check-circle',
      style:    'success',
      autohide: true
    })
  )
}

export const transactionReceived = (receipt, dispatch) => {
  dispatch(
    toastAdded({
      title:    'Transaction received',
      body:     receipt.transactionHash,
      icon:     'check-circle',
      style:    'success',
      autohide: true
    })
  )
}
