import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { selectVaults } from '../features/vaultsSlice'
import { formatAmount, toUsd } from '../helpers/format'

const Tvl = props => {
  const vaults = useSelector(selectVaults)
  const tvl    = vaults.reduce((acc, vault) => {
    const { tvl, decimals, pricePerFullShare, usdPrice } = vault
    const amount = toUsd(tvl, decimals, pricePerFullShare, usdPrice)

    return amount?.isFinite() ? acc.plus(amount) : acc
  }, new BigNumber('0'))

  return (
    <div className="row mt-4">
      <div className="col-6 col-sm-8 col-lg-10 text-end border-end pe-3 border-2">
        <h2 className="h5 mb-0">
          <abbr title="Total value locked">TVL</abbr>
        </h2>
      </div>
      <div className="col-6 col-sm-4 col-lg-2">
        <h3 className="h5 text-primary mb-0">
          ${tvl.isNaN() ? '-' : formatAmount(tvl.toNumber())}
        </h3>
      </div>
    </div>
  )
}

export default Tvl
