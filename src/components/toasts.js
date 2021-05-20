import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Toast from './toast'
import { selectToasts, toastAdded, toastDestroyed } from '../features/toastsSlice'
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
                  icon={toast.icon}
                  style={toast.style}
                  autohide={!! toast.autohide} />
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
          title: 'Wrong network',
          body:  'Switch to Mumbai and try again',
          icon:  'exclamation-triangle',
          style: 'danger'
        })
      )
    } else {
      dispatch(toastDestroyed('Wrong network'))
    }
  }, [address, chainId, dispatch])

  return (
    <div aria-live="polite" aria-atomic="true" className="position-absolute bottom-0 start-0 end-0">
      <div className="toast-container p-3">
        {renderToasts(toasts)}
      </div>
    </div>
  )
}

export default Toasts
