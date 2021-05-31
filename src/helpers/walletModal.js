import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { addressChanged, chainChanged } from '../features/walletSlice'
import { walletConnect, walletLink } from './walletProviders'

const providerOptions = {
  walletconnect:       walletConnect,
  'custom-walletlink': walletLink
}

const subscribe = (provider, dispatch) => {
  provider.on('accountsChanged', _accounts => {
    if (provider.selectedAddress) {
      const address = provider.selectedAddress

      dispatch(addressChanged({ address }))
    } else {
      dispatch(addressChanged({ address: undefined }))
    }
  })

  provider.on('chainChanged', chainId => {
    dispatch(chainChanged({ chainId }))
  })
}

const WalletModal = {
  async connect (dispatch) {
    const modalOpts = { cacheProvider: true, theme: 'dark', providerOptions }
    const modal     = new Web3Modal(modalOpts)
    const provider  = await modal.connect()
    const web3      = new Web3(provider)
    const [address] = await web3.eth.getAccounts()
    const chainId   = await web3.eth.getChainId()

    subscribe(provider, dispatch)

    return { address, chainId, modal, provider, web3 }
  }
}

export default WalletModal
