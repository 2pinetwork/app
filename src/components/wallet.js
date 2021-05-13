import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  connectAsync,
  selectAddress,
  selectChainId,
  selectStatus,
  supportedChains
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

const walletIcon = (address, supported) => {
  if (address && supported) {
    return 'bi-wallet-fill'
  } else if (address) {
    return 'bi-exclamation-diamond-fill'
  } else {
    return 'bi-plug-fill'
  }
}
const Wallet = props => {
  const address   = useSelector(selectAddress)
  const chainId   = useSelector(selectChainId)
  const status    = useSelector(selectStatus)
  const dispatch  = useDispatch()
  const supported = isNaN(chainId) || supportedChains.includes(chainId)
  const border    = supported ? 'primary' : 'danger'
  const className = `btn btn-outline-${border} btn-sm bg-dark text-primary fw-semi-bold`

  return (
    <React.Fragment>
      <button type="button"
              className={className}
              disabled={status === 'loading'}
              onClick={() => { dispatch(connectAsync()) }}>
        <span className="me-2">
          <i className={walletIcon(address, supported)}></i>
        </span>
        {addressLabel(address, status)}
      </button>
    </React.Fragment>
  )
}

export default Wallet
