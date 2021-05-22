import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { fromWei, toWei } from '../helpers/wei'
import { fetchVaultsDataAsync } from '../features/vaultsSlice'
import { toastAdded, toastDestroyed } from '../features/toastsSlice'
import { decimalPlaces, formatAmount } from '../helpers/format'

const Approve = props => {
  const dispatch                      = useDispatch()
  const [deposit, setDeposit]         = useState('')
  const [buttonLabel, setButtonLabel] = useState('Approve')
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
    const address       = props.address
    const vaultAddress  = props.vault.address
    const tokenContract = props.tokenContract()
    const allowance     = props.web3.utils.toWei('8000000000', 'ether')

    setButtonLabel('Approve...')
    setEnabled(false)

    tokenContract.methods.approve(vaultAddress, allowance).send({ from: address }).then(() => {
      setButtonLabel('Approve')
      setEnabled(true)
      dispatch(toastDestroyed('Approve rejected'))
      dispatch(fetchVaultsDataAsync())
      dispatch(
        toastAdded({
          title:   'Approval done',
          body:    'Your approval was successful, you can now deposit',
          icon:    'check-circle',
          style:   'success',
          autohide: true
        })
      )
    }).catch(error => {
      setButtonLabel('Approve')
      setEnabled(true)
      dispatch(
        toastAdded({
          title:    'Approve rejected',
          body:     error.message,
          icon:     'exclamation-triangle',
          style:    'danger',
          autohide: true
        })
      )
    })
  }

  const setMax = () => {
    const places = decimalPlaces(props.decimals)

    setDeposit(fromWei(props.balance, props.decimals).toFixed(places))
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
                disabled={! enabled}
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
  decimals:      PropTypes.object.isRequired,
  symbol:        PropTypes.string.isRequired,
  token:         PropTypes.string.isRequired,
  tokenContract: PropTypes.func.isRequired,
  vault:         PropTypes.object.isRequired,
  web3:          PropTypes.object.isRequired
}

export default Approve
