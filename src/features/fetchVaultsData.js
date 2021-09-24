import BigNumber from 'bignumber.js'
import { Contract, Provider } from 'ethers-multicall'
import vaults from '../data/vaults'
import { vaultsLoaded, vaultsFetchError } from './vaultsSlice'
import { toastAdded, toastDestroyed } from './toastsSlice'
import { fetchApys, getVaultApy } from '../helpers/apy'
import { getEthersProvider } from '../helpers/ethers'
import { getPrices } from '../helpers/prices'

const chunk = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  )
}

const getMaxVaultApy = (vault, dataProvider, distributionManager, prices) => {
  return Math.max(
    getVaultApy(vault, dataProvider, distributionManager, prices),
    getVaultApy(vault, dataProvider, distributionManager, prices, 0)
  )
}

const call = (promises, keys, chainId, dispatch, order, errors) => {
  const filteredVaults  = vaults.filter(
    vault => vault.pool === 'aave' || chainId !== 80001
  )

  Promise.all(promises).then(results => {
    const [ apys, data, prices ] = results
    const extraData = []

    chunk(data, keys.length).forEach((chunkedData, i) => {
      let dataProvider
      let distributionManager = {}

      extraData[i] = {}

      chunkedData.forEach((valueData, j) => {
        switch (keys[j]) {
          case 'dataProvider':
            dataProvider = valueData
            break
          case 'distributionSupply':
            distributionManager['supply'] = valueData
            break
          case 'distributionBorrow':
            distributionManager['borrow'] = valueData
            break
          default:
            extraData[i][keys[j]] = new BigNumber(valueData.toString())
        }
      })

      let vault = {
        ...filteredVaults[i],
        ...extraData[i],
      }

      // MATIC is the native tokenn so it doesn't need allowance
      if (vault.token === 'matic') {
        extraData[i]['allowance'] = new BigNumber(1e58.toString())
      }

     if (vault.token === '2Pi') {
        extraData[i]['apy'] = 0.1
      } else if (vault.pool === 'curve') {
        extraData[i]['apy'] = (apys['curve-poly-ren'] || {}).totalApy
      } else {
        extraData[i]['apy'] = getMaxVaultApy(vault, dataProvider, distributionManager, prices)
      }
    })

    const vaultsData = filteredVaults.map((vault, i) => {
      const usdPrice = prices && prices[vault.priceId]['usd']

      return {
        ...vault,
        ...extraData[i],
        usdPrice
      }
    })

    dispatch(vaultsLoaded({order: order, vaults: vaultsData}))
    dispatch(toastDestroyed('Data loading error'))
  }).catch(error => {
    dispatch(vaultsFetchError())

    // Do not complain on first fetch error since they are so frequent
    if (errors > 2) {
      dispatch(
        toastAdded({
          title: 'Data loading error',
          body:  "We can't reach out some resources, please refresh the page and try again",
          icon:  'exclamation-triangle',
          style: 'danger'
        })
      )
    }
  })
}

const getKeys = address => {
  const keys = [
    'decimals',
    'pricePerFullShare',
    'tvl',
    'vaultDecimals',
    'dataProvider',
    'distributionSupply',
    'distributionBorrow'
  ]

  if (address) {
    keys.push(
      'balance',
      'allowance',
      'shares'
    )
  }

  return keys
}

const getCalls = (address, chainId, ethcallProvider, v) => {
  const vault         = require(`../abis/vaults/${chainId}/${v.pool}-${v.token}`).default
  const token         = require(`../abis/tokens/${chainId}/${v.token}`).default
  const vaultContract = new Contract(vault.address, vault.abi)

  let decimals, balance, allowance

  if (token.abi) {
    const tokenContract = new Contract(token.address, token.abi)

    decimals  = tokenContract.decimals()
    balance   = tokenContract.balanceOf(address)
    allowance = tokenContract.allowance(address, vault.address)
  } else {
    // MATIC is native so it needs other functions
    decimals  = vaultContract.decimals() // same decimals
    balance   = ethcallProvider.getEthBalance(address)
    allowance = ethcallProvider.getEthBalance(address) // fake allowance
  }

  const results = [
    decimals,
    vaultContract.getPricePerFullShare(),
    vaultContract.balance(),
    vaultContract.decimals(),
  ]

  if (v.pool === 'aave') {
    const pool                        = require(`../abis/pools/${chainId}/${v.pool}`).default
    const dataProviderContract        = new Contract(pool.dataProvider.address, pool.dataProvider.abi)
    const distributionManagerContract = new Contract(pool.distributionManager.address, pool.distributionManager.abi)

    results.push(
      dataProviderContract.getReserveData(token.address),
      distributionManagerContract.assets(vault.aToken.address),
      distributionManagerContract.assets(vault.debtToken.address)
    )
  } else {
    // fake to keep order
    results.push(
      ethcallProvider.getEthBalance(address || token.address),
      ethcallProvider.getEthBalance(address || token.address),
      ethcallProvider.getEthBalance(address || token.address)
    )
  }

  if (address) {
    results.push(
      balance,
      allowance,
      vaultContract.balanceOf(address)
    )
  }

  return results
}

export async function fetchVaultsData (
  address,
  chainId,
  provider,
  web3,
  dispatch,
  order,
  errors
) {
  const ethersProvider  = getEthersProvider(provider, chainId)
  const ethcallProvider = new Provider(ethersProvider)
  const keys            = getKeys(address)
  const filteredVaults  = vaults.filter(
    vault => vault.pool === 'aave' || chainId !== 80001
  )

  await ethcallProvider.init()

  const calls = filteredVaults.flatMap(vault => {
    return getCalls(address, chainId, ethcallProvider, vault)
  })

  const promises = [
    fetchApys(),
    ethcallProvider.all(calls),
    getPrices(filteredVaults, dispatch)
  ]

  call(promises, keys, chainId, dispatch, order, errors)
}
