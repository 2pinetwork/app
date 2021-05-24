import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { fetchVaultsDataAsync } from '../features/vaultsSlice'
import { toastAdded, toastDestroyed } from '../features/toastsSlice'
import { fromWei, toWei } from '../helpers/wei'
import { decimalPlaces, formatAmount, toWeiFormatted } from '../helpers/format'

const Withdraw = props => {
  const dispatch                                = useDispatch()
  const [withdraw, setWithdraw]                 = useState('')
  const [useAll, setUseAll]                     = useState(false)
  const [withdrawLabel, setWithdrawLabel]       = useState('Withdraw')
  const [withdrawAllLabel, setWithdrawAllLabel] = useState('Withdraw all')
  const [enabled, setEnabled]                   = useState(true)

  const onChange = e => {
    const value = e.target.value

    setUseAll(false)
    setWithdraw(value)

    if (/^\d*\.?\d*$/.test(value)) {
      const amount = toWei(new BigNumber(value), props.decimals)

      setEnabled(props.deposited.comparedTo(amount) >= 0)
    } else {
      setEnabled(false)
    }
  }

  const handleWithdrawClick = () => {
    const vaultContract = props.vaultContract()
    const withdrawInWei = toWei(new BigNumber(withdraw), props.decimals)
    const shares        = withdrawInWei.div(props.pricePerFullShare)
    const amount        = toWeiFormatted(shares, props.vaultDecimals)

    setWithdrawLabel('Withdraw...')
    setEnabled(false)

    vaultContract.methods.withdraw(amount).send({ from: props.address }).then(() => {
      setWithdrawLabel('Withdraw')
      setEnabled(true)
      dispatch(toastDestroyed('Withdraw rejected'))
      dispatch(fetchVaultsDataAsync())
      dispatch(
        toastAdded({
          title:    'Withdraw approved',
          body:     'Your withdraw was successful',
          icon:     'check-circle',
          style:    'success',
          autohide: true
        })
      )
    }).catch(error => {
      setWithdrawLabel('Withdraw')
      setEnabled(true)
      dispatch(
        toastAdded({
          title:    'Withdraw rejected',
          body:     error.message,
          icon:     'exclamation-triangle',
          style:    'danger',
          autohide: true
        })
      )
    })
  }

  const handleWithdrawAllClick = () => {
    const vaultContract = props.vaultContract()

    setMax()
    setWithdrawAllLabel('Withdraw all...')
    setEnabled(false)

    vaultContract.methods.withdrawAll().send({ from: props.address }).then(() => {
      setWithdrawAllLabel('Withdraw all')
      setEnabled(true)
      dispatch(toastDestroyed('Withdraw all rejected'))
      dispatch(fetchVaultsDataAsync())
      dispatch(
        toastAdded({
          title:    'Withdraw all approved',
          body:     'Your withdraw was successful',
          icon:     'check-circle',
          style:    'success',
          autohide: true
        })
      )
    }).catch(error => {
      setWithdrawAllLabel('Withdraw all')
      setEnabled(true)
      dispatch(
        toastAdded({
          title:    'Withdraw all rejected',
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
    setWithdraw(
      fromWei(props.deposited, props.decimals).toFixed(places, roundingMode)
    )
  }

  const depositedId = () => `deposited-${props.token}`

  return (
    <React.Fragment>
      <label className="text-muted text-decoration-underline-dotted cursor-pointer mb-2"
             htmlFor={depositedId()}
             onClick={setMax}>
        Deposited ({formatAmount(fromWei(props.deposited, props.decimals))} {props.symbol})
      </label>

      <div className="input-group mb-3">
        <input type="number"
               className="form-control"
               id={depositedId()}
               onKeyDown={e => onChange(e) && e.preventDefault()}
               onChange={onChange}
               value={withdraw} />
        <button type="button"
                className="btn btn-link bg-input"
                disabled={props.deposited?.isZero()}
                onClick={setMax}>
          Max
        </button>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="d-grid gap-2 mb-3 mb-lg-0">
            <button type="button"
                    className="btn btn-outline-primary bg-dark fw-bold"
                    disabled={! (enabled && +withdraw > 0)}
                    onClick={useAll ? handleWithdrawAllClick : handleWithdrawClick}>
              {withdrawLabel}
            </button>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="d-grid gap-2 mb-3 mb-lg-0">
            <button type="button"
                    className="btn btn-outline-primary bg-dark fw-bold"
                    disabled={! (enabled && !props.deposited?.isZero())}
                    onClick={handleWithdrawAllClick}>
              {withdrawAllLabel}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

Withdraw.propTypes = {
  address:       PropTypes.string.isRequired,
  decimals:      PropTypes.object.isRequired,
  deposited:     PropTypes.object.isRequired,
  symbol:        PropTypes.string.isRequired,
  token:         PropTypes.string.isRequired,
  vaultContract: PropTypes.func.isRequired,
  vaultDecimals: PropTypes.object.isRequired
}

export default Withdraw
