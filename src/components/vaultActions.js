import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import Approve from './approve'
import Connect from './connect'
import Deposit from './deposit'
import Withdraw from './withdraw'
import { selectStatus } from '../features/vaultsSlice'

const VaultActions = props => {
  const status = useSelector(selectStatus)

  const canDeposit = () => {
    return props.balance.comparedTo(0) > 0 &&
      props.allowance.comparedTo(props.balance) >= 0
  }

  const renderBalanceAction = () => {
    const {
      address,
      balance,
      decimals,
      symbol,
      token,
      tokenContract,
      vault,
      vaultContract,
      web3
    } = props

    if (canDeposit()) {
      return <Deposit address={address}
                      balance={balance}
                      decimals={decimals}
                      symbol={symbol}
                      token={token}
                      vaultContract={vaultContract} />
    } else {
      return <Approve address={address}
                      balance={balance}
                      decimals={decimals}
                      symbol={symbol}
                      token={token}
                      tokenContract={tokenContract}
                      vault={vault}
                      web3={web3} />
    }
  }

  const renderActions = () => {
    if (status === 'loaded') {
      return (
        <div className="row">
          <div className="col-lg-6">
            {renderBalanceAction()}
          </div>

          <div className="col-lg-6">
            <Withdraw address={props.address}
                      decimals={props.decimals}
                      deposited={props.deposited}
                      symbol={props.symbol}
                      token={props.token}
                      vaultContract={props.vaultContract} />
          </div>
        </div>
      )
    } else {
      return <Connect />
    }
  }

  return (
    <React.Fragment>
      <hr />

      {renderActions()}
    </React.Fragment>
  )
}

VaultActions.propTypes = {
  address:          PropTypes.string,
  allowance:        PropTypes.object,
  balance:          PropTypes.object,
  decimals:         PropTypes.object,
  deposited:        PropTypes.object,
  symbol:           PropTypes.string.isRequired,
  token:            PropTypes.string.isRequired,
  tokenContract:    PropTypes.func,
  vault:            PropTypes.object,
  vaultContract:    PropTypes.func,
  web3:             PropTypes.object
}

export default VaultActions
