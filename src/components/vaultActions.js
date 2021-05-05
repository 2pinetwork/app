import PropTypes from 'prop-types'
import React from 'react'
import BigNumber from 'bignumber.js'

class VaultActions extends React.Component {
  static propTypes = {
    account:       PropTypes.string,
    token:         PropTypes.string.isRequired,
    tokenContract: PropTypes.func,
    vault:         PropTypes.object,
    vaultContract: PropTypes.func,
    web3:          PropTypes.object
  }

  state = {
    depositText:   'Approve',
    enableDeposit: true,
    approved:      false
  }

  depositInput  = React.createRef()
  withdrawInput = React.createRef()

  handleApproval = () => {
    if (this.props.vault) {
      const account       = this.props.account
      const vaultAddress  = this.props.vault.address
      const amount        = +this.depositInput.current.value
      const tokenContract = this.props.tokenContract()
      const allowance     = this.props.web3.utils.toWei('8000000000', 'ether')

      if (amount > 0) {
        this.setState({ depositText: 'Approving...', enableDeposit: false })

        tokenContract.methods.approve(vaultAddress, allowance).send({ from: account }).then(() => {
          this.setState({ depositText: 'Deposit', enableDeposit: true, approved: true })
        })
      }
    }
  }

  handleDeposit = async () => {
    const vaultContract = this.props.vaultContract()
    const amount        = new BigNumber(this.depositInput.current.value)

    if (amount > 0) {
      this.setState({ depositText: 'Depositing...', enableDeposit: false })

      vaultContract.methods.deposit(await this.toWei(amount)).send({ from: this.props.account }).then(() => {
        this.setState({ depositText: 'Approve', enableDeposit: true })
      })
    }
  }

  toWei = async amount => {
    const vaultContract = this.props.vaultContract()
    const decimals      = await vaultContract.methods.decimals().call()

    return amount.times(new BigNumber(10).pow(decimals))
  }

  fromWei = async amount => {
    const vaultContract = this.props.vaultContract()
    const decimals      = await vaultContract.methods.decimals().call()

    return amount.div(new BigNumber(10).pow(decimals)).toFixed(decimals)
  }

  balanceId () {
    return `balance-${this.props.token}`
  }

  depositedId () {
    return `deposited-${this.props.token}`
  }

  render () {
    // const [deposit, setDeposit]   = useState('0')
    // const [withdraw, setWithdraw] = useState('0')

    // const onDepositChanged  = e => setDeposit(e.target.value)
    // const onWithdrawChanged = e => setWithdraw(e.target.value)

    return (
      <React.Fragment>
        <hr />

        <div className="row">
          <div className="col-lg-6">
            <div className="form-floating mb-3">
              <input ref={this.depositInput} type="number" className="form-control" id={this.balanceId()} placeholder="0" />
              <label htmlFor={this.balanceId()}>Balance</label>
            </div>

            <div className="d-grid gap-2 mb-3 mb-lg-0">
              <button type="button"
                      className="btn btn-primary text-white fw-bold"
                      disabled={! (this.props.web3 && this.state.enableDeposit)}
                      onClick={this.state.approved ? this.handleDeposit : this.handleApproval}>
                {this.state.depositText}
              </button>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-floating mb-3">
              <input ref={this.withdrawInput} type="number" className="form-control" id={this.depositedId()} placeholder="0" />
              <label htmlFor={this.depositedId()}>Deposited</label>
            </div>

            <div className="d-grid gap-2">
              <button type="button" className="btn btn-outline-primary bg-white fw-bold" disabled={!this.props.web3}>
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
