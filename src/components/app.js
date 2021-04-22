import React from 'react'
import Web3 from 'web3'
import Header from './header'
import usdtToken from './usdt_token'
import basicVault from './basic_vault'

const toString = (value) => value.toLocaleString('fullwide', {useGrouping: false})

const BIG_ALLOWANCE = toString(2**140)

class App extends React.Component {

  state = {
    account: undefined,
    chain: undefined,
    isConnecting: false,
    web3: undefined,
    token: undefined,
    vault: undefined,
    balance: 0.0,
    deposited: 0.0
  }

  connecting = isConnecting => {
    this.setState({ isConnecting })
  }

  setAccount = provider => {
    this.setState({ account: provider.selectedAddress, web3: new Web3(provider) })
    this.balance()
    this.deposited()
  }

  subscribe = provider => {
    provider.on('accountsChanged', _accounts => {
      if (provider.selectedAddress) {
        this.setAccount(provider)
      } else {
        this.setState({ account: undefined, web3: undefined })
      }
    })

    provider.on('chainChanged', chainId => {
      this.setState({ chain: chainId })
    })
  }

  USDT = () => {
    const usdt = new this.state.web3.eth.Contract(usdtToken.abi, usdtToken.address)
    return usdt
  }

  approve = () => {
   // should be the first action in the vault
   this.USDT().methods.approve(basicVault.address, BIG_ALLOWANCE).send({from: this.state.account})
  }

  toWei = (amount) => {
    const decimals = 6 // USDT().methods.decimals().call()

    return toString(parseFloat(amount) * (10 ** decimals))
  }

  fromWei = (amount) => {
    const decimals = 6 // USDT().methods.decimals().call()

    return parseFloat(parseInt(amount) / (10 ** decimals)).toFixed(decimals)
  }

  deposit = (amount) => {
    console.log("deposito")
    console.log(amount)
    console.log(this.toWei(amount))
    console.log(this.state.account)
    this.vault().methods.deposit(this.toWei(amount)).send({from: this.state.account})
  }

  balance = () => {
    if (this.state.web3)
      this.USDT().methods.balanceOf(this.state.account).call().then((balance) =>
        this.setState({balance: this.fromWei(balance)})
      )
  }

  deposited = () => {
    if (this.state.web3)
      this.vault().methods.balanceOf(this.state.account).call().then((deposited) =>
        this.setState({deposited: this.fromWei(deposited)})
      )
  }

  vault = () => {
    let vault = this.state.vault;

    if (!vault) {
       vault = new this.state.web3.eth.Contract(basicVault.abi, basicVault.address)
       // this.setState({vault: vault})
    }

    return vault
  }

  depositAll = () => {
    this.vault().methods.deposit(
      this.toWei(this.state.balance)
      ).send({from: this.state.account})
  }

  withdrawAll = () => {
    this.vault().methods.withdrawAll().send({from: this.state.account})
  }


  render () {
    return (
      <div className="container mt-5 pt-4">
        <Header connecting={this.connecting}
                subscribe={this.subscribe}
                setAccount={this.setAccount}
                account={this.state.account}
                isConnecting={this.state.isConnecting} />
        <p>
          <button type="button" className="btn btn-link">2pi Finance</button>
        </p>

        <div className="row">
          <div className="col-4">Token</div>
          <div className="col-4">Balance</div>
          <div className="col-4">Deposited</div>
        </div>
        <div className="row">
          <div className="col-4">USDT</div>
          <div className="col-4">${this.state.balance}</div>
          <div className="col-4">${this.state.deposited}</div>
        </div>
        <div className="row">
          <div className="col-3"><a href="#" className="btn btn-primary" onClick={this.depositAll}>Deposit</a></div>
          <div className="col-3"><a href="#" className="btn btn-primary" onClick={this.depositAll}>DepositAll</a></div>
          <div className="col-3"><a href="#" className="btn btn-secondary" onClick={this.withdrawAll}>Withraw</a></div>
          <div className="col-3"><a href="#" className="btn btn-secondary" onClick={this.withdrawAll}>WithdrawAll</a></div>
        </div>
      </div>
    )
  }
}
export default App
