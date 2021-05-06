import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import Approve from './approve'
import Connect from './connect'
import Deposit from './deposit'
import Withdraw from './withdraw'
import { selectStatus } from '../features/vaultsSlice'

const VaultActions = props => {
  const status        = useSelector(selectStatus)

  const canDeposit = () => {
    return props.balance.comparedTo(0) > 0 &&
      props.allowance.comparedTo(props.balance) >= 0
  }

  const renderBalanceAction = () => {
    const {
      address,
      balance,
      fromWeiBigNumber,
      token,
      tokenContract,
      toWei,
      toWeiBigNumber,
      vault,
      vaultContract,
      web3
    } = props

    if (canDeposit()) {
      return <Deposit address={address}
                      balance={balance}
                      fromWeiBigNumber={fromWeiBigNumber}
                      token={token}
                      toWei={toWei}
                      toWeiBigNumber={toWeiBigNumber}
                      vaultContract={vaultContract} />
    } else {
      return <Approve address={address}
                      balance={balance}
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
                      deposited={props.deposited}
                      fromWeiBigNumber={props.fromWeiBigNumber}
                      token={props.token}
                      toWei={props.toWei}
                      toWeiBigNumber={props.toWeiBigNumber}
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
  deposited:        PropTypes.object,
  fromWei:          PropTypes.func.isRequired,
  fromWeiBigNumber: PropTypes.func.isRequired,
  token:            PropTypes.string.isRequired,
  tokenContract:    PropTypes.func,
  toWei:            PropTypes.func.isRequired,
  toWeiBigNumber:   PropTypes.func.isRequired,
  vault:            PropTypes.object,
  vaultContract:    PropTypes.func,
  web3:             PropTypes.object
}

export default VaultActions
