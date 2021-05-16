import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { fetchVaultsDataAsync } from '../features/vaultsSlice'
import { fromWei, toWei } from '../helpers/wei'
import { decimalPlaces, formatAmount, toWeiFormatted } from '../helpers/format'

const Withdraw = props => {
  const dispatch                      = useDispatch()
  const [withdraw, setWithdraw]       = useState('0')
  const [buttonLabel, setButtonLabel] = useState('Withdraw')
  const [enabled, setEnabled]         = useState(true)

  const onChange = e => {
    const amount = toWei(new BigNumber(+e.target.value || 0), props.decimals)
    const places = decimalPlaces(props.decimals)

    if (props.deposited.comparedTo(amount) >= 0) {
      setWithdraw(fromWei(amount, props.decimals))
    } else {
      setWithdraw(fromWei(props.deposited, props.decimals).toFixed(places))
    }
  }

  const handleClick = () => {
    const vaultContract = props.vaultContract()
    const amount        = toWeiFormatted(new BigNumber(withdraw), props.decimals)

    setButtonLabel('Withdra...')
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
        <label htmlFor={depositedId()}>
          Deposited ({formatAmount(fromWei(props.deposited, props.decimals))} {props.symbol})
        </label>
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
