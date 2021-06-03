import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { fromWei, toWei } from '../helpers/wei'
import { fetchVaultsDataAsync } from '../features/vaultsSlice'
import { toastAdded, toastDestroyed } from '../features/toastsSlice'
import { decimalPlaces, formatAmount } from '../helpers/format'
import { transactionReceived, transactionSended } from '../helpers/transactions'

const Approve = props => {
  const dispatch                      = useDispatch()
  const [deposit, setDeposit]         = useState('')
  const [useAll, setUseAll]           = useState(false)
  const [buttonLabel, setButtonLabel] = useState('Approve')
  const [status, setStatus]           = useState('blank')

  useEffect(() => {
    if (status !== 'approve') {
      if (/^\d*\.?\d*$/.test(deposit) && +deposit) {
        const amount = toWei(new BigNumber(deposit), props.decimals)

        setStatus(props.balance.comparedTo(amount) >= 0 ? 'valid' : 'invalid')
      } else if (deposit.length === 0) {
        setStatus('blank')
      } else {
        setStatus('invalid')
      }
    }
  }, [deposit, status, props.balance, props.decimals])

  const onChange = e => {
    const value = e.target.value

    setUseAll(false)
    setDeposit(value)
  }

  const handleClick = () => {
    const address       = props.address
    const vaultAddress  = props.vault.address
    const tokenContract = props.tokenContract()
    const allowance     = toWei(new BigNumber('1e58'), props.decimals).toFixed()

    setButtonLabel('Approve...')
    setStatus('approve')

    tokenContract.methods.approve(vaultAddress, allowance).send({
      from: address
    }).on('transactionHash', hash => {
      transactionSended(hash, dispatch)
    }).on('receipt', receipt => {
      transactionReceived(receipt, dispatch)
    }).then(() => {
      setStatus('blank')
      setButtonLabel('Approve')
      dispatch(toastDestroyed('Approve rejected'))
      dispatch(fetchVaultsDataAsync())
      dispatch(
        toastAdded({
          title:    'Approval done',
          body:     'Your approval was successful, you can now deposit',
          icon:     'check-circle',
          style:    'success',
          autohide: true
        })
      )
    }).catch(error => {
      setStatus('blank')
      setButtonLabel('Approve')
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

    setUseAll(true)
    setDeposit(fromWei(props.balance, props.decimals).toFixed(places))
  }

  const balanceId = () => `balance-${props.token}`

  return (
    <React.Fragment>
      <label className="text-muted text-decoration-underline-dotted cursor-pointer mb-2"
             htmlFor={balanceId()}
             onClick={setMax}>
        Balance ({formatAmount(fromWei(props.balance, props.decimals), '', 8)} {props.symbol})
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

      <div className="d-grid gap-2 mb-3 mb-lg-0">
        <button type="button"
                className="btn btn-primary text-white fw-bold"
                disabled={['invalid', 'approve'].includes(status)}
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
