import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Vault from './vault'
import { selectVaults, fetchVaultsDataAsync } from '../features/vaultsSlice'
import {
  selectAddress,
  selectChainId,
  selectWeb3,
  supportedChains
} from '../features/walletSlice'

const renderVaults = (vaults, address, web3) => {
  return vaults.map(vaultData => {
    return (
      <Vault key={vaultData.key}
             address={address}
             allowance={vaultData.allowance}
             apy={vaultData.apy}
             balance={vaultData.balance}
             color={vaultData.color}
             decimals={vaultData.decimals}
             deposited={vaultData.deposited}
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
