import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { selectVaults } from '../features/vaultsSlice'
import { selectAddress, selectChainId } from '../features/walletSlice'
import { formatAmount, toUsd } from '../helpers/format'
import { fromWei } from '../helpers/wei'

const Deposited = props => {
  const address   = useSelector(selectAddress)
  const chainId   = useSelector(selectChainId)
  const vaults    = useSelector(selectVaults)
  const deposited = (vaults[chainId] || []).reduce((acc, vault) => {
    const {
      shares,
      decimals,
      pricePerFullShare,
      vaultDecimals,
      usdPrice
    } = vault

    const staked    = shares && fromWei(shares, vaultDecimals)
    const deposited = staked?.times(pricePerFullShare)
    const amount    = toUsd(deposited, decimals, usdPrice)

    return amount?.isFinite() ? acc.plus(amount) : acc
  }, new BigNumber('0'))

  return (
    <div className="row">
      <div className="col-8 col-sm-9 col-lg-10 text-end border-end pe-3 border-2">
        <h3 className="h5 text-primary-dark fw-bold mb-0 mt-1">
          ${address && deposited.isFinite() ? formatAmount(deposited.toNumber()) : ' -'}
        </h3>
      </div>
      <div className="col-4 col-sm-3 col-lg-2">
        <h2 className="h6 mb-0 mt-2">
          Deposited
        </h2>
      </div>
    </div>
  )
}

export default Deposited
