import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { fromWei, toWei } from '../helpers/wei'
import { fetchVaultsDataAsync } from '../features/vaultsSlice'
import { toastAdded, toastDestroyed } from '../features/toastsSlice'
import { decimalPlaces, formatAmount, toWeiFormatted } from '../helpers/format'

const Deposit = props => {
  const dispatch                              = useDispatch()
  const [deposit, setDeposit]                 = useState('')
  const [useAll, setUseAll]                   = useState(false)
  const [depositLabel, setDepositLabel]       = useState('Deposit')
  const [depositAllLabel, setDepositAllLabel] = useState('Deposit all')
  const [enabled, setEnabled]                 = useState(true)

  const onChange = e => {
    const value = e.target.value

    setUseAll(false)
    setDeposit(value)

    if (/^\d*\.?\d*$/.test(value)) {
      const amount = toWei(new BigNumber(value), props.decimals)

      setEnabled(props.balance.comparedTo(amount) >= 0)
    } else {
      setEnabled(false)
    }
  }

  const handleDepositClick = () => {
    const vaultContract = props.vaultContract()
    const amount        = toWeiFormatted(new BigNumber(deposit), props.decimals)

    setDepositLabel('Deposit...')
    setEnabled(false)

    vaultContract.methods.deposit(amount).send({ from: props.address }).then(() => {
      setDeposit('')
      setDepositLabel('Deposit')
      setEnabled(true)
      dispatch(toastDestroyed('Deposit rejected'))
      dispatch(fetchVaultsDataAsync())
      dispatch(
        toastAdded({
          title:    'Deposit approved',
          body:     'Your deposit was successful',
          icon:     'check-circle',
          style:    'success',
          autohide: true
        })
      )
    }).catch(error => {
      setDepositLabel('Deposit')
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

  const handleDepositAllClick = () => {
    const vaultContract = props.vaultContract()

    setMax()
    setDepositAllLabel('Deposit all...')
    setEnabled(false)

    vaultContract.methods.depositAll().send({ from: props.address }).then(() => {
      setDepositAllLabel('Deposit all')
      setEnabled(true)
      dispatch(toastDestroyed('Deposit all rejected'))
      dispatch(fetchVaultsDataAsync())
      dispatch(
        toastAdded({
          title:    'Deposit all approved',
          body:     'Your deposit was successful',
          icon:     'check-circle',
          style:    'success',
          autohide: true
        })
      )
    }).catch(error => {
      setDepositAllLabel('Deposit all')
      setEnabled(true)
      dispatch(
        toastAdded({
          title:    'Deposit all rejected',
          body:     error.message,
          icon:     'exclamation-triangle',
          style:    'danger',
          autohide: true
        })
      )
    })
  }

  const setMax = () => {
    const places       = decimalPlaces(props.decimals)
    const roundingMode = BigNumber.ROUND_DOWN

    setUseAll(true)
    setDeposit(
      fromWei(props.balance, props.decimals).toFixed(places, roundingMode)
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
                disabled={props.balance?.isZero() || useAll}
                onClick={setMax}>
          Max
        </button>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="d-grid gap-2 mb-3 mb-lg-0">
            <button type="button"
                    className="btn btn-primary text-white fw-bold"
                    disabled={! (enabled && +deposit > 0)}
                    onClick={useAll ? handleDepositAllClick : handleDepositClick}>
              {depositLabel}
            </button>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="d-grid gap-2 mb-3 mb-lg-0">
            <button type="button"
                    className="btn btn-primary text-white fw-bold"
                    disabled={! (enabled && !props.balance.isZero())}
                    onClick={handleDepositAllClick}>
              {depositAllLabel}
            </button>
          </div>
        </div>
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
