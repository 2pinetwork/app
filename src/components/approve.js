import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchVaultsDataAsync } from '../features/vaultsSlice'

const Approve = props => {
  const dispatch                      = useDispatch()
  const [buttonLabel, setButtonLabel] = useState('Approve')
  const [enabled, setEnabled]         = useState(true)

  const handleClick = () => {
    const address       = props.address
    const vaultAddress  = props.vault.address
    const tokenContract = props.tokenContract()
    const allowance     = props.web3.utils.toWei('8000000000', 'ether')

    setButtonLabel('Approve...')
    setEnabled(false)

    tokenContract.methods.approve(vaultAddress, allowance).send({ from: address }).then(() => {
      setButtonLabel('Approve')
      setEnabled(true)
      dispatch(fetchVaultsDataAsync())
    })
  }

  const balanceId = () => `balance-${props.token}`

  return (
    <React.Fragment>
      <div className="form-floating mb-3">
        <input type="number"
               className="form-control"
               id={balanceId()}
               disabled="disabled"
               value="0" />
        <label htmlFor={balanceId()}>Balance ({props.symbol})</label>
      </div>

      <div className="d-grid gap-2 mb-3 mb-lg-0">
        <button type="button"
                className="btn btn-primary text-white fw-bold"
                disabled={! (enabled && props.balance.comparedTo(0) > 0)}
                onClick={handleClick}>
          {buttonLabel}
        </button>
      </div>
    </React.Fragment>
  )
}

Approve.propTypes = {
  address:       PropTypes.string.isRequired,
  balance:       PropTypes.object.isRequired,
  symbol:        PropTypes.string.isRequired,
  token:         PropTypes.string.isRequired,
  tokenContract: PropTypes.func.isRequired,
  vault:         PropTypes.object.isRequired,
  web3:          PropTypes.object.isRequired
}

export default Approve
