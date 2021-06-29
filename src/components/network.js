import { useSelector } from 'react-redux'
import { selectChainId, supportedChains } from '../features/walletSlice'

const networkName = chainId => {
  const names = {
    137:   'Polygon',
    1337:  'Local',
    80001: 'Polygon test'
  }

  return names[chainId] || 'Unsupported network'
}

const networkLogo = chainId => {
  const logos = {
    137:   'polygon.svg',
    1337:  'localhost.svg',
    80001: 'polygon.svg'
  }

  return logos[chainId] || 'unsupported.svg'
}

const Network = props => {
  const chainId = useSelector(selectChainId)
  const network = networkName(chainId)
  const style   = supportedChains.includes(chainId) ? 'primary' : 'danger'

  return (
    <div className="d-flex mt-5 mt-lg-0">
      <div className={`card border-${style}`}>
        <div className="d-flex align-items-center card-body py-2">
          <img src={`/images/networks/${networkLogo(chainId)}`} alt={network} width="32" height="32" />
          <span className="ms-3">
            {network}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Network
