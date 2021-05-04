import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  connectAsync,
  selectAddress,
  selectStatus
} from '../features/walletSlice'

const addressLabel = (address, status) => {
  if (address) {
    return `${address.substr(0, 6)}...${address.substr(38, 42)}`
  } else if (status === 'loading') {
    return 'Connecting...'
  } else {
    return 'Connect wallet'
  }
}

const walletIcon = address => address ? 'bi-wallet-fill' : 'bi-plug-fill'

const Wallet = props => {
  const address  = useSelector(selectAddress)
  const status   = useSelector(selectStatus)
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <button type="button"
              className="btn btn-outline-primary btn-sm bg-white shadow-primary fw-semi-bold"
              disabled={status === 'loading'}
              onClick={() => { dispatch(connectAsync()) }}>
        <span className="me-2">
          <i className={walletIcon(address)}></i>
        </span>
        {addressLabel(address, status)}
      </button>
    </React.Fragment>
  )
}

export default Wallet
