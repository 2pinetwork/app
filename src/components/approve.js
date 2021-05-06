import PropTypes from 'prop-types'
import React, { useState } from 'react'

const Approve = props => {
  const [amount, setAmount]   = useState('0')
  const [buttonLabel, setButtonLabel] = useState('Approve')
  const [enabled, setEnabled] = useState(true)
  const input = React.createRef()

  const onChange = e => setAmount(toString(+e.target.value))

  const handleClick = () => {
    const address       = props.address
    const vaultAddress  = props.vault.address
    const tokenContract = this.props.tokenContract()
    const allowance     = this.props.web3.utils.toWei('8000000000', 'ether')

    setButtonLabel('Approving...')
    setEnabled(false)

    tokenContract.methods.approve(vaultAddress, allowance).send({ from: address }).then(() => {
      setButtonLabel('Approve')
      setEnabled(true)
    })
  }

  const balanceId = () => `balance-${props.token}`

  return (
    <React.Fragment>
      <div className="form-floating mb-3">
        <input ref={input} type="number" className="form-control" id={balanceId()} placeholder="0" onChange={onChange} value={amount} />
        <label htmlFor={balanceId()}>Balance</label>
      </div>

      <div className="d-grid gap-2 mb-3 mb-lg-0">
        <button type="button"
                className="btn btn-primary text-white fw-bold"
                disabled={! (enabled && props.balance.comparedTo(0) > 0)}
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
  token:         PropTypes.string.isRequired,
  toWei:         PropTypes.func.isRequired,
  vaultContract: PropTypes.func.isRequired
}

export default Approve

