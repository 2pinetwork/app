export const networks = {
  137: {
    chainId:        `0x${parseInt(137).toString(16)}`,
    chainName:      'Polygon Mainnet',
    nativeCurrency: {
      name:     'MATIC',
      symbol:   'MATIC',
      decimals: 18,
    },
    rpcUrls:           ['https://rpc-mainnet.maticvigil.com/'],
    blockExplorerUrls: ['https://explorer.matic.network/']
  },
  80001: {
    chainId:        `0x${parseInt(80001).toString(16)}`,
    chainName:      'Polygon Testnet (Mumbai)',
    nativeCurrency: {
      name:     'MATIC',
      symbol:   'MATIC',
      decimals: 18,
    },
    rpcUrls:           ['https://rpc-mumbai.matic.today/'],
    blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com/']
  }
}

export const getRpcUrl = chainId => {
  const network = networks[chainId]

  return network?.rpcUrls.find(_ => true)
}

export const getBlockExplorerUrl = chainId => {
  const network = networks[chainId]

  return network?.blockExplorerUrls.find(_ => true)
}
