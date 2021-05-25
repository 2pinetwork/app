import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { WalletLink } from 'walletlink'
import { addressChanged, chainChanged } from '../features/walletSlice'

const chainId         = 137 // Polygon Mainnet
const networkUrl      = 'https://rpc-mainnet.maticvigil.com/'
const providerOptions = {
  'custom-walletlink': {
    display: {
      logo: '/images/wallet-link.svg',
      name: 'WalletLink',
      description: 'Scan with WalletLink to connect',
    },
    options: {
      appName: '2pi',
      networkUrl,
      chainId,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options
      const appLogoUrl = '/images/favicon.svg'
      const walletLink = new WalletLink({ appName, appLogoUrl, darkMode: true })
      const provider   = walletLink.makeWeb3Provider(networkUrl, chainId)

      await provider.enable()

      return provider
    }
  }
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
    const web3Modal = new Web3Modal(modalOpts)
    const provider  = await web3Modal.connect()
    const web3      = new Web3(provider)
    const [address] = await web3.eth.getAccounts()
    const chainId   = await web3.eth.getChainId()

    subscribe(provider, dispatch)

    return { address, chainId, provider, web3 }
  }
}

export default WalletModal
