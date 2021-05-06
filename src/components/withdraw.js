import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { fetchVaultsDataAsync } from '../features/vaultsSlice'

const Withdraw = props => {
  const dispatch = useDispatch()
  const [withdraw, setWithdraw]   = useState('0')
  const [buttonLabel, setButtonLabel] = useState('Withdraw')
  const [enabled, setEnabled] = useState(true)

  const onChange = e => {
    const amount = props.toWeiBigNumber(new BigNumber(+e.target.value || 0))

    if (props.deposited.comparedTo(amount) >= 0) {
      setWithdraw(props.fromWeiBigNumber(amount))
    } else {
      setWithdraw(props.fromWeiBigNumber(props.deposited).toFixed(8))
    }
  }

  const handleClick = () => {
    const vaultContract = props.vaultContract()
    const amount        = props.toWei(new BigNumber(withdraw))

    setButtonLabel('Withdrawing...')
    setEnabled(false)

    vaultContract.methods.withdraw(amount).send({ from: props.address }).then(() => {
      setButtonLabel('Withdraw')
      setEnabled(true)
      dispatch(fetchVaultsDataAsync())
    })
  }

  const depositedId = () => `deposited-${props.token}`

  return (
    <React.Fragment>
      <div className="form-floating mb-3">
        <input type="number"
               className="form-control"
               id={depositedId()}
               onKeyDown={e => onChange(e) && e.preventDefault()}
               onChange={onChange}
               value={withdraw} />
        <label htmlFor={depositedId()}>Deposited</label>
      </div>

      <div className="d-grid gap-2 mb-3 mb-lg-0">
        <button type="button"
                className="btn btn-outline-primary bg-white fw-bold"
                disabled={! (enabled && +withdraw > 0)}
                onClick={handleClick}>
          {buttonLabel}
        </button>
      </div>
    </React.Fragment>
  )
}

Withdraw.propTypes = {
  address:        PropTypes.string.isRequired,
  deposited:      PropTypes.object.isRequired,
  token:          PropTypes.string.isRequired,
  toWei:          PropTypes.func.isRequired,
  toWeiBigNumber: PropTypes.func.isRequired,
  vaultContract:  PropTypes.func.isRequired
}

export default Withdraw
