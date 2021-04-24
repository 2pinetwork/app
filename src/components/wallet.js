import PropTypes from 'prop-types'
import React from 'react'
import WalletModal from '../helpers/wallet_modal'

class Wallet extends React.Component {
  static propTypes = {
    connecting: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    setAccount: PropTypes.func.isRequired,
    account: PropTypes.string,
    isConnecting: PropTypes.bool.isRequired
  }

  handleClick = () => {
    this.props.connecting(true)

    WalletModal.connect()
      .then(provider => {
        if (provider) {
          this.props.subscribe(provider)
          this.props.setAccount(provider)
        }
      })
      .catch(console.error)
      .finally(() => {
        this.props.connecting(false)
      })
  }

  accountLabel () {
    const account = this.props.account

    if (account) {
      return `${account.substr(0, 6)}...${account.substr(38, 42)}`
    } else if (this.props.isConnecting) {
      return 'Connecting...'
    } else {
      return 'Connect wallet'
    }
  }

  accountIcon () {
    return this.props.account ? 'bi-wallet-fill' : 'bi-plug-fill'
  }

  render () {
    return (
      <React.Fragment>
        <button type="button"
                className="btn btn-outline-primary btn-sm bg-white shadow-primary font-weight-semi-bold"
                disabled={this.props.isConnecting}
                onClick={this.handleClick}>
          <span className="me-2">
            <i className={this.accountIcon()}></i>
          </span>
          {this.accountLabel()}
        </button>
      </React.Fragment>
    )
  }
}

export default Wallet
