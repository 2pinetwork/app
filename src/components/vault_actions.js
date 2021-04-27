import PropTypes from 'prop-types'
import React from 'react'

class VaultActions extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    web3: PropTypes.object
  }

  balanceId () {
    return `balance-${this.props.token}`
  }

  depositedId () {
    return `deposited-${this.props.token}`
  }

  render () {
    return (
      <React.Fragment>
        <hr />

        <div className="row">
          <div className="col-lg-6">
            <div class="form-floating mb-3">
              <input type="number" class="form-control" id={this.balanceId()} placeholder="0" />
              <label for={this.balanceId()}>Balance</label>
            </div>

            <div className="d-grid gap-2 mb-3 mb-lg-0">
              <button type="button" className="btn btn-primary text-white fw-bold">
                Deposit
              </button>
            </div>
          </div>

          <div className="col-lg-6">
            <div class="form-floating mb-3">
              <input type="number" class="form-control" id={this.depositedId()} placeholder="0" />
              <label for={this.depositedId()}>Deposited</label>
            </div>

            <div className="d-grid gap-2">
              <button type="button" className="btn btn-outline-primary bg-white fw-bold">
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default VaultActions
