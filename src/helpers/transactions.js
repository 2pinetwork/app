import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getBlockExplorerUrl } from '../data/networks'
import { toastAdded } from '../features/toastsSlice'
import { selectChainId } from '../features/walletSlice'

const TransactionLink = props => {
  const chainId     = useSelector(selectChainId)
  const explorerUrl = getBlockExplorerUrl(chainId)

  if (explorerUrl) {
    const href = `${explorerUrl}/tx/${props.hash}`

    return (
      <a href={href} target="_blank" rel="noreferrer" title={props.text}>
        {props.text || props.hash}
      </a>
    )
  } else {
    return props.hash
  }
}

TransactionLink.propTypes = {
  hash: PropTypes.string.isRequired,
  text: PropTypes.string
}

export const transactionSended = (hash, dispatch) => {
  dispatch(
    toastAdded({
      title:    'Transaction sended',
      body:     <TransactionLink hash={hash} text={hash} />,
      icon:     'check-circle',
      style:    'success',
      autohide: true
    })
  )
}

export const transactionReceived = (receipt, dispatch) => {
  const hash = receipt.transactionHash

  dispatch(
    toastAdded({
      title:    'Transaction received',
      body:     <TransactionLink hash={hash} text={hash} />,
      icon:     'check-circle',
      style:    'success',
      autohide: true
    })
  )
}
