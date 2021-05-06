import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { fetchVaultsDataAsync } from '../features/vaultsSlice'
import { fromWei, toWei } from '../helpers/wei'
import { toWeiFormatted, decimalPlaces } from '../helpers/format'

const Deposit = props => {
  const dispatch                      = useDispatch()
  const [deposit, setDeposit]         = useState('0')
  const [buttonLabel, setButtonLabel] = useState('Deposit')
  const [enabled, setEnabled]         = useState(true)

  const onChange = e => {
    const amount = toWei(new BigNumber(+e.target.value || 0), props.decimals)
    const places = decimalPlaces(props.decimals)

    if (props.balance.comparedTo(amount) > 0) {
      setDeposit(fromWei(amount, props.decimals))
    } else if (props.balance.comparedTo(amount) === 0) {
      setDeposit(fromWei(amount, props.decimals).toFixed(places))
    } else {
      setDeposit(fromWei(props.balance, props.decimals).toFixed(places))
    }
  }

  const handleClick = () => {
    const vaultContract = props.vaultContract()
    const amount        = toWeiFormatted(new BigNumber(deposit), props.decimals)

    setButtonLabel('Depositing...')
    setEnabled(false)

    vaultContract.methods.deposit(amount).send({ from: props.address }).then(() => {
      setButtonLabel('Deposit')
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
               onKeyDown={e => onChange(e) && e.preventDefault()}
               onChange={onChange}
               value={deposit} />
        <label htmlFor={balanceId()}>Balance</label>
      </div>

      <div className="d-grid gap-2 mb-3 mb-lg-0">
        <button type="button"
                className="btn btn-primary text-white fw-bold"
                disabled={! (enabled && +deposit > 0)}
                onClick={handleClick}>
          {buttonLabel}
        </button>
      </div>
    </React.Fragment>
  )
}

Deposit.propTypes = {
  address:        PropTypes.string.isRequired,
  balance:        PropTypes.object.isRequired,
  decimals:       PropTypes.object.isRequired,
  token:          PropTypes.string.isRequired,
  vaultContract:  PropTypes.func.isRequired
}

export default Deposit
