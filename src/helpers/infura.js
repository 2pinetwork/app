const projectId = '5c86b242025449ee96c9120c215bd029'

const networks = {
  '137':   'polygon-mainnet',
  '80001': 'polygon-mumbai'
}

const networkNames = {
  '137':   'matic',
  '80001': 'matic-mumbai'
}

export const getDefaultProvider = chainId => {
  const network          = networks[`${chainId}`]
  const name             = networkNames[`${chainId}`]
  const url              = `https://${network}.infura.io/v3/${projectId}`
  const _defaultProvider = providers => new providers.JsonRpcProvider(url)

  return { name, chainId, _defaultProvider }
}
