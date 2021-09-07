import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { fromWei, toWei } from '../helpers/wei'
import { fetchVaultsDataAsync, newVaultFetch } from '../features/vaultsSlice'
import { toastAdded, toastDestroyed } from '../features/toastsSlice'
import { decimalPlaces, formatAmount, toWeiFormatted } from '../helpers/format'
import { transactionSent } from '../helpers/transactions'

const Withdraw = props => {
  const dispatch                                = useDispatch()
  const [withdraw, setWithdraw]                 = useState('')
  const [useAll, setUseAll]                     = useState(false)
  const [withdrawLabel, setWithdrawLabel]       = useState('Withdraw')
  const [withdrawAllLabel, setWithdrawAllLabel] = useState('Withdraw all')
  const [status, setStatus]                     = useState('blank')

  useEffect(() => {
    if (status !== 'withdraw') {
      if (/^\d*\.?\d*$/.test(withdraw) && +withdraw) {
        const amount = toWei(new BigNumber(withdraw), props.decimals)

        setStatus(props.deposited.comparedTo(amount) >= 0 ? 'valid' : 'invalid')
      } else {
        setStatus('invalid')
      }
    }
  }, [withdraw, status, props.deposited, props.decimals])

  const onChange = e => {
    const value = e.target.value

    if (status === 'withdraw') {
      setStatus('invalid')
    }

    setUseAll(false)
    setWithdraw(value)
  }

  const handleWithdrawClick = () => {
    const vaultContract = props.vaultContract()
    const withdrawInWei = toWei(new BigNumber(withdraw), props.decimals)
    const shares        = withdrawInWei.div(props.pricePerFullShare)
    const amount        = toWeiFormatted(shares, props.vaultDecimals)

    setWithdrawLabel('Withdraw...')
    setStatus('withdraw')

    vaultContract.methods.withdraw(amount).send({
      from: props.address
    }).on('transactionHash', hash => {
      transactionSent(hash, dispatch)
    }).then(() => {
      setWithdraw('')
      setStatus('blank')
      setWithdrawLabel('Withdraw')
      dispatch(toastDestroyed('Withdraw rejected'))
      dispatch(newVaultFetch())
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
      setStatus('blank')
      setWithdrawLabel('Withdraw')
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
    setStatus('withdraw')

    vaultContract.methods.withdrawAll().send({
      from: props.address
    }).on('transactionHash', hash => {
      transactionSent(hash, dispatch)
    }).then(() => {
      setWithdraw('')
      setStatus('withdraw')
      setWithdrawAllLabel('Withdraw all')
      dispatch(toastDestroyed('Withdraw all rejected'))
      dispatch(newVaultFetch())
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
      setStatus('blank')
      setWithdrawAllLabel('Withdraw all')
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

  const actions = () => {
    if (+props.apy > 0) {
      return (
        <React.Fragment>
          <div className="input-group mb-3">
            <input type="number"
                   className="form-control"
                   id={depositedId()}
                   onKeyDown={e => onChange(e) && e.preventDefault()}
                   onChange={onChange}
                   value={withdraw} />
            <button type="button"
                    className="btn btn-link bg-input"
                    disabled={props.deposited?.isZero() || useAll}
                    onClick={setMax}>
              Max
            </button>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="d-grid gap-2 mb-3 mb-lg-0">
                <button type="button"
                        className="btn btn-outline-primary bg-dark fw-bold"
                        disabled={status !== 'valid'}
                        onClick={useAll ? handleWithdrawAllClick : handleWithdrawClick}>
                  {withdrawLabel}
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-grid gap-2 mb-3 mb-lg-0">
                <button type="button"
                        className="btn btn-outline-primary bg-dark fw-bold"
                        disabled={status === 'withdraw' || props.deposited?.isZero()}
                        onClick={handleWithdrawAllClick}>
                  {withdrawAllLabel}
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    } else {
      return (
        <div className="alert alert-info py-2 mb-0">
          <p className="text-center small mb-0">
            Withdrawals are temporarily disabled
          </p>
        </div>
      )
    }
  }

  return (
    <React.Fragment>
      <label className="text-muted text-decoration-underline-dotted cursor-pointer mb-2"
             htmlFor={depositedId()}
             onClick={setMax}>
        Deposited ({formatAmount(fromWei(props.deposited, props.decimals), '', 8)} {props.symbol})
      </label>

      {actions()}
    </React.Fragment>
  )
}

Withdraw.propTypes = {
  address:       PropTypes.string.isRequired,
  apy:           PropTypes.number.isRequired,
  decimals:      PropTypes.object.isRequired,
  deposited:     PropTypes.object.isRequired,
  symbol:        PropTypes.string.isRequired,
  token:         PropTypes.string.isRequired,
  vaultContract: PropTypes.func.isRequired,
  vaultDecimals: PropTypes.object.isRequired
}

export default Withdraw
