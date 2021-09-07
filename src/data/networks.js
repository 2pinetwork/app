export const networks = {
  137: {
    chainId:        `0x${parseInt(137).toString(16)}`,
    chainName:      'Polygon Mainnet',
    nativeCurrency: {
      name:     'MATIC',
      symbol:   'MATIC',
      decimals: 18,
    },
    rpcUrls: [
      'https://polygon-rpc.com/',
      'https://rpc-mainnet.matic.network/',
      'https://matic-mainnet.chainstacklabs.com'
    ],
    blockExplorerUrls: [
      'https://polygonscan.com/',
      'https://polygon-explorer-mainnet.chainstacklabs.com/',
      'https://explorer-mainnet.maticvigil.com'
    ]
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
    blockExplorerUrls: ['https://mumbai.polygonscan.com/']
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
