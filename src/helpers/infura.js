export const projectId = '5c86b242025449ee96c9120c215bd029'

const networkNames = {
  137:   'matic',
  1337:  'local',
  80001: 'matic-mumbai'
}

export const rpc = {
  137:   `https://polygon-mainnet.infura.io/v3/${projectId}`,
  1337:  'http://localhost:8545',
  80001: `https://polygon-mumbai.infura.io/v3/${projectId}`,
}

export const getDefaultProvider = chainId => {
  const name             = networkNames[chainId]
  const url              = rpc[chainId]
  const _defaultProvider = providers => new providers.JsonRpcProvider(url)

  return { name, chainId, _defaultProvider }
}
