import React from 'react'
import Web3 from 'web3'
import Header from './header'
import Tvl from './tvl'
import Vaults from './vaults'

class App extends React.Component {
  state = {
    account: undefined,
    chain: undefined,
    isConnecting: false,
    web3: undefined
  }

  connecting = isConnecting => {
    this.setState({ isConnecting })
  }

  setAccount = provider => {
    this.setState({ account: provider.selectedAddress, web3: new Web3(provider) })
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

  render () {
    return (
      <div className="container mt-5 pt-4">
        <Header connecting={this.connecting}
                subscribe={this.subscribe}
                setAccount={this.setAccount}
                account={this.state.account}
                isConnecting={this.state.isConnecting} />
        <Tvl />
        <Vaults />
      </div>
    )
  }
}
export default App
