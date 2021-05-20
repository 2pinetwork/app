import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { fetchVaultsDataAsync } from '../features/vaultsSlice'
import { toastAdded, toastDestroyed } from '../features/toastsSlice'
import { fromWei, toWei } from '../helpers/wei'
import { decimalPlaces, formatAmount, toWeiFormatted } from '../helpers/format'

const Withdraw = props => {
  const dispatch                      = useDispatch()
  const [withdraw, setWithdraw]       = useState('')
  const [buttonLabel, setButtonLabel] = useState('Withdraw')
  const [enabled, setEnabled]         = useState(true)

  const onChange = e => {
    const amount = toWei(new BigNumber(+e.target.value || 0), props.decimals)

    if (props.deposited.comparedTo(amount) >= 0) {
      setWithdraw(fromWei(amount, props.decimals))
    } else {
      setMax()
    }
  }

  const handleClick = () => {
    const vaultContract = props.vaultContract()
    const amount        = toWeiFormatted(new BigNumber(withdraw), props.decimals)

    setButtonLabel('Withdraw...')
    setEnabled(false)

    vaultContract.methods.withdraw(amount).send({ from: props.address }).then(() => {
      setButtonLabel('Withdraw')
      setEnabled(true)
      dispatch(toastDestroyed('Withdraw rejected'))
      dispatch(fetchVaultsDataAsync())
      dispatch(
        toastAdded({
          title:   'Withdraw approved',
          body:    'Your withdraw was successful',
          icon:    'check-circle',
          style:   'success',
          autohide: true
        })
      )
    }).catch(error => {
      setButtonLabel('Withdraw')
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

  const setMax = () => {
    const max    = 4
    const places = decimalPlaces(props.decimals, max)
    const offset = new BigNumber(1).div(new BigNumber(10).pow(max))

    setWithdraw(
      fromWei(props.deposited, props.decimals).minus(offset).toFixed(places)
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

      <div className="d-grid gap-2 mb-3 mb-lg-0">
        <button type="button"
                className="btn btn-outline-primary bg-dark fw-bold"
                disabled={! (enabled && +withdraw > 0)}
                onClick={handleClick}>
          {buttonLabel}
        </button>
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
  vaultContract: PropTypes.func.isRequired
}

export default Withdraw
