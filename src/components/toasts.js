import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Toast from './toast'
import { clearToast, selectToasts, toastAdded } from '../features/toastsSlice'
import {
  selectAddress,
  selectChainId,
  supportedChains
} from '../features/walletSlice'

const renderToasts = toasts => {
  return toasts.map((toast, i) => {
    return <Toast key={`toast-${i}`}
                  title={toast.title}
                  body={toast.body}
                  backgroundStyle={toast.backgroundStyle}
                  textStyle={toast.textStyle} />
  })
}

const Toasts = props => {
  const toasts   = useSelector(selectToasts)
  const address  = useSelector(selectAddress)
  const chainId  = useSelector(selectChainId)
  const dispatch = useDispatch()

  useEffect(() => {
    if (address && ! supportedChains.includes(chainId)) {
      dispatch(
        toastAdded({
          title:           'Wrong network',
          body:            'Switch to Mumbai and try again',
          backgroundStyle: 'danger',
          textStyle:       'white'
        })
      )
    } else {
      dispatch(clearToast('Wrong network'))
    }
  }, [address, chainId, dispatch])

  return (
    <div aria-live="polite" aria-atomic="true" className="position-absolute bottom-0 start-0">
      <div className="toast-container p-3">
        {renderToasts(toasts)}
      </div>
    </div>
  )
}

export default Toasts
