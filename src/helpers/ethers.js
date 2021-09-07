import { ethers } from 'ethers'
import { getDefaultProvider } from './provider'

export const getEthersProvider = (provider, chainId) => {
  if (provider) {
    return new ethers.providers.Web3Provider(provider)
  } else {
    const defaultProvider = getDefaultProvider(chainId)

    return ethers.getDefaultProvider(defaultProvider)
  }
}

