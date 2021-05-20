import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { fetchVaultsDataAsync } from '../features/vaultsSlice'
import { toastAdded, toastDestroyed } from '../features/toastsSlice'
import { fromWei, toWei } from '../helpers/wei'
import { decimalPlaces, formatAmount, toWeiFormatted } from '../helpers/format'

const Deposit = props => {
  const dispatch                      = useDispatch()
  const [deposit, setDeposit]         = useState('')
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
      setMax()
    }
  }

  const handleClick = () => {
    const vaultContract = props.vaultContract()
    const amount        = toWeiFormatted(new BigNumber(deposit), props.decimals)

    setButtonLabel('Deposit...')
    setEnabled(false)

    vaultContract.methods.deposit(amount).send({ from: props.address }).then(() => {
      setButtonLabel('Deposit')
      setEnabled(true)
      dispatch(toastDestroyed('Deposit rejected'))
      dispatch(fetchVaultsDataAsync())
      dispatch(
        toastAdded({
          title:   'Deposit approved',
          body:    'Your deposit was successful',
          icon:    'check-circle',
          style:   'success',
          autohide: true
        })
      )
    }).catch(error => {
      setButtonLabel('Deposit')
      setEnabled(true)
      dispatch(
        toastAdded({
          title:    'Deposit rejected',
          body:     error.message,
          icon:     'exclamation-triangle',
          style:    'danger',
          autohide: true
        })
      )
    })
  }

  const setMax = () => {
    const max    = 7
    const places = decimalPlaces(props.decimals, max)
    const offset = new BigNumber(1).div(new BigNumber(10).pow(max))

    setDeposit(
      fromWei(props.balance, props.decimals).minus(offset).toFixed(places)
    )
  }

  const balanceId = () => `balance-${props.token}`

  return (
    <React.Fragment>
      <label className="text-muted text-decoration-underline-dotted cursor-pointer mb-2"
             htmlFor={balanceId()}
             onClick={setMax}>
        Balance ({formatAmount(fromWei(props.balance, props.decimals))} {props.symbol})
      </label>

      <div className="input-group mb-3">
        <input type="number"
               className="form-control"
               id={balanceId()}
               onKeyDown={e => onChange(e) && e.preventDefault()}
               onChange={onChange}
               value={deposit} />
        <button type="button"
                className="btn btn-link bg-input"
                disabled={props.balance?.isZero()}
                onClick={setMax}>
          Max
        </button>
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
  address:       PropTypes.string.isRequired,
  balance:       PropTypes.object.isRequired,
  decimals:      PropTypes.object.isRequired,
  symbol:        PropTypes.string.isRequired,
  token:         PropTypes.string.isRequired,
  vaultContract: PropTypes.func.isRequired
}

export default Deposit
