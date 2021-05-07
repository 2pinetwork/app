import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { selectVaults } from '../features/vaultsSlice'
import { formatAmount } from '../helpers/format'
import { fromWei } from '../helpers/wei'

const Tvl = props => {
  const vaults = useSelector(selectVaults)
  const tvl    = vaults.reduce((acc, vault) => {
    const amount = vault.tvl ? fromWei(vault.tvl, vault.decimals) : NaN

    return acc.plus(amount)
  }, new BigNumber('0'))

  return (
    <div className="text-end mt-4">
      <h2 className="h4 border-end pe-3 border-2 d-inline">
        TVL
      </h2>
      <h3 className="h4 text-primary d-inline ms-3">
        ${tvl.isNaN() ? '-' : formatAmount(tvl.toNumber())}
      </h3>
    </div>
  )
}

export default Tvl
