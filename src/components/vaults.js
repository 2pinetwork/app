import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Vault from './vault'
import { selectAddress, selectWeb3 } from '../features/walletSlice'
import { selectVaults, fetchVaultsDataAsync } from '../features/vaultsSlice'

const renderVaults = (vaults, address, web3) => {
  return vaults.map(vaultData => {
    return (
      <Vault key={vaultData.key}
             address={address}
             allowance={vaultData.allowance}
             balance={vaultData.balance}
             color={vaultData.color}
             decimals={vaultData.decimals}
             deposited={vaultData.deposited}
             token={vaultData.token}
             tvl={vaultData.tvl}
             uses={vaultData.uses}
             web3={web3} />
    )
  })
}

const Vaults = props => {
  const address  = useSelector(selectAddress)
  const web3     = useSelector(selectWeb3)
  const vaults   = useSelector(selectVaults)
  const dispatch = useDispatch()

  useEffect(() => {
    if (address) {
      dispatch(fetchVaultsDataAsync())
    }
  }, [address, dispatch])


  return (
    <div className="mt-1">
      <h2 className="h2 fw-bold mt-1">
        Vaults
      </h2>

      <div className="mt-3">
        {renderVaults(vaults, address, web3)}
      </div>
    </div>
  )
}

export default Vaults
