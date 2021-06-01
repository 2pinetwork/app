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
  }
}

export const getRpcUrl = chainId => {
  const network = networks[chainId]

  return network?.rpcUrls.find(_ => true)
}
