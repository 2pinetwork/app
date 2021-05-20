import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Vault from './vault'
import { fromWei } from '../helpers/wei'
import { toUsd } from '../helpers/format'
import { selectVaults, fetchVaultsDataAsync } from '../features/vaultsSlice'
import {
  selectAddress,
  selectChainId,
  selectWeb3,
  supportedChains
} from '../features/walletSlice'

const renderVaults = (vaults, address, web3) => {
  return vaults.map(vaultData => {
    const {
      balance,
      decimals,
      shares,
      pricePerFullShare,
      usdPrice
    } = vaultData

    const deposited    = shares?.times(fromWei(pricePerFullShare, decimals))
    const balanceUsd   = toUsd(balance, decimals, pricePerFullShare, usdPrice)
    const depositedUsd = toUsd(deposited, decimals, pricePerFullShare, usdPrice)

    return (
      <Vault key={vaultData.key}
             address={address}
             allowance={vaultData.allowance}
             apy={vaultData.apy}
             balance={balance}
             balanceUsd={balanceUsd}
             color={vaultData.color}
             decimals={decimals}
             deposited={deposited}
             depositedUsd={depositedUsd}
             symbol={vaultData.symbol}
             token={vaultData.token}
             tvl={vaultData.tvl}
             uses={vaultData.uses}
             web3={web3} />
    )
  })
}

const Vaults = props => {
  const address  = useSelector(selectAddress)
  const chainId  = useSelector(selectChainId)
  const web3     = useSelector(selectWeb3)
  const vaults   = useSelector(selectVaults)
  const dispatch = useDispatch()

  useEffect(() => {
    if (address && supportedChains.includes(chainId)) {
      dispatch(fetchVaultsDataAsync())
    }
  }, [address, chainId, dispatch])

  return (
    <div className="mt-1 pt-3 pt-lg-0">
      <h2 className="h2 fw-bold my-4">
        Vaults
      </h2>

      <div className="mt-3">
        {renderVaults(vaults, address, web3)}
      </div>
    </div>
  )
}

export default Vaults
