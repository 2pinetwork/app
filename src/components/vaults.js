import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Vault from './vault'
import { fromWei } from '../helpers/wei'
import { toUsd } from '../helpers/format'
import {
  resetVaults,
  selectVaults,
  fetchVaultsDataAsync
} from '../features/vaultsSlice'
import {
  selectAddress,
  selectChainId,
  selectWeb3,
  supportedChains
} from '../features/walletSlice'


const FETCH_INTERVAL = 30 * 1000

const renderVaults = (vaults, address, chainId, web3) => {
  return vaults.map(vaultData => {
    const {
      balance,
      decimals,
      earn,
      pricePerFullShare,
      shares,
      tvl,
      usdPrice,
      vaultDecimals
    } = vaultData

    const staked       = shares && fromWei(shares, vaultDecimals)
    const deposited    = staked?.times(pricePerFullShare)
    const balanceUsd   = toUsd(balance, decimals, usdPrice)
    const depositedUsd = toUsd(deposited, decimals, usdPrice)
    const tvlUsd       = toUsd(tvl, decimals, usdPrice)

    return (
      <Vault key={vaultData.key}
             address={address}
             allowance={vaultData.allowance}
             apy={vaultData.apy}
             balance={balance}
             balanceUsd={balanceUsd}
             chainId={chainId}
             color={vaultData.color}
             decimals={decimals}
             deposited={deposited}
             depositedUsd={depositedUsd}
             earn={earn}
             pricePerFullShare={pricePerFullShare}
             symbol={vaultData.symbol}
             token={vaultData.token}
             tvlUsd={tvlUsd}
             usdPrice={usdPrice}
             uses={vaultData.uses}
             vaultDecimals={vaultDecimals}
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
    const delay     = address ? FETCH_INTERVAL : FETCH_INTERVAL * 6
    const fetchData = () => {
      if (supportedChains.includes(chainId)) {
        dispatch(fetchVaultsDataAsync())
      } else {
        dispatch(resetVaults())
      }
    }
    const interval = setInterval(fetchData, delay)

    fetchData()

    return () => clearInterval(interval)
  }, [address, chainId, dispatch])

  return (
    <div className="mt-1 pt-3 pt-lg-0">
      <div className="d-flex my-4">
        <h2 className="h2 fw-bold flex-grow-1 mb-0">
          Vaults
        </h2>

        <p className="small text-muted text-right align-self-end mb-0 ms-4">
          Withdrawal Fee: 0.1%.
        </p>

        <p className="small text-muted text-right align-self-end mb-0 ms-1">
          Deposit Fee: 0%.
        </p>
      </div>

      <div className="mt-3">
        {renderVaults(vaults, address, chainId, web3)}
      </div>
    </div>
  )
}

export default Vaults
