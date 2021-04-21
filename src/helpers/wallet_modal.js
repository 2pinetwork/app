import Web3Modal from 'web3modal'
import { WalletLink } from 'walletlink'

const networkUrl = 'https://ropsten.infura.io/v3/5c86b242025449ee96c9120c215bd029'
const chainId = 0x1
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

const WalletModal = {
  connect () {
    const web3Modal = new Web3Modal({ cacheProvider: true, providerOptions })

    return web3Modal.connect()
  }
}

export default WalletModal
