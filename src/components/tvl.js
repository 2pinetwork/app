import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { selectVaults } from '../features/vaultsSlice'
import { selectAddress } from '../features/walletSlice'
import { toUsd } from '../helpers/format'

const Tvl = props => {
  const address = useSelector(selectAddress)
  const vaults  = useSelector(selectVaults)
  const tvl     = vaults.reduce((acc, vault) => {
    const { tvl, decimals, usdPrice } = vault
    const amount = toUsd(tvl, decimals, usdPrice)

    return amount?.isFinite() ? acc.plus(amount) : acc
  }, new BigNumber('0'))

  return (
    <div className="row mt-4">
      <div className="col-8 col-sm-9 col-lg-10 text-end border-end pe-3 border-2">
        <h3 className="h4 text-primary fw-bold mb-0">
          ${address && tvl.isFinite() ? tvl.toFormat(0) : ' -'}
        </h3>
      </div>
      <div className="col-4 col-sm-3 col-lg-2">
        <h2 className="h5 fw-bold mb-0 mt-1">
          <abbr title="Total value locked">TVL</abbr>
        </h2>
      </div>
    </div>
  )
}

export default Tvl
