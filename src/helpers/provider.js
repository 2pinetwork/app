const networkNames = {
  137:   'matic',
  80001: 'matic-mumbai'
}

const providers = {
  137:   'https://polygon-rpc.com/',
  80001: 'https://matic-mumbai.chainstacklabs.com/'
}

export const getDefaultProvider = chainId => {
  const name             = networkNames[chainId]
  const url              = providers[chainId]
  const _defaultProvider = providers => new providers.JsonRpcProvider(url)

  return { name, chainId, _defaultProvider }
}
