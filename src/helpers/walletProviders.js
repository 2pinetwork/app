import WalletConnectProvider from '@walletconnect/web3-provider'
import { WalletLink } from 'walletlink'
import { getRpcUrl } from '../data/networks'
import { projectId as infuraId } from './infura'

export const walletLink = {
  display: {
    logo:        '/images/wallet-link.svg',
    name:        'WalletLink',
    description: 'Scan with WalletLink to connect',
  },
  options: {
    appName:    '2pi',
    chainId:    137, // Polygon Mainnet
    networkUrl: getRpcUrl(137)
  },
  package: WalletLink,
  connector: async (_, options) => {
    const { appName, networkUrl, chainId } = options

    const appLogoUrl = '/images/favicon.svg'
    const walletlink = new WalletLink({ appName, appLogoUrl, darkMode: true })
    const provider   = walletlink.makeWeb3Provider(networkUrl, chainId)

    await provider.enable()

    return provider
  }
}

export const walletConnect = {
  package: WalletConnectProvider,
  options: {
    network: 'matic',
    rpc: {
      // 1 is needed at least for Trust Wallet
      1:     'https://polygon-rpc.com/',
      137:   'https://polygon-rpc.com/',
      80001: 'https://rpc-mumbai.matic.today/'
    },
    infuraId
  }
}
