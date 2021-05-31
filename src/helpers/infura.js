export const projectId = '5c86b242025449ee96c9120c215bd029'

const networks = {
  137:   'polygon-mainnet',
  80001: 'polygon-mumbai'
}

const networkNames = {
  137:   'matic',
  80001: 'matic-mumbai'
}

export const rpc = Object.fromEntries(
  Object.entries(networks).map(([chainId, subdomain]) => {
    return [chainId, `https://${subdomain}.infura.io/v3/${projectId}`]
  })
)

export const getDefaultProvider = chainId => {
  const name             = networkNames[chainId]
  const url              = rpc[chainId]
  const _defaultProvider = providers => new providers.JsonRpcProvider(url)

  return { name, chainId, _defaultProvider }
}
