import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { WalletLink } from 'walletlink'
import { addressChanged, chainChanged } from '../features/walletSlice'

const infuraProjectId = '5c86b242025449ee96c9120c215bd029'
const network         = 'ropsten'
const chainId         = 0x3
const networkUrl      = `https://${network}.infura.io/v3/${infuraProjectId}`
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
      const walletLink = new WalletLink({ appName })
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId)

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
    const web3Modal = new Web3Modal({ cacheProvider: true, providerOptions })
    const provider  = await web3Modal.connect()
    const web3      = new Web3(provider)
    const [address] = await web3.eth.getAccounts()
    const chainId   = await web3.eth.getChainId()

    subscribe(provider, dispatch)

    return { address, chainId, provider, web3 }
  }
}

export default WalletModal
