import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { Contract, Provider, setMulticallAddress } from 'ethers-multicall'
import vaults from '../data/vaults'
import { vaultsLoaded } from './vaultsSlice'
import { toastAdded, toastDestroyed } from './toastsSlice'
import { getVaultApy } from '../helpers/apy'

const helpers = {
  chunk (array, size) {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
      array.slice(i * size, i * size + size)
    )
  }
}

const getPrices = dispatch => {
  const ids = vaults.map(vault => vault.priceId).join()

  return fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  ).then(response => {
    dispatch(toastDestroyed('Prices loading error'))

    return response.json()
  }).catch(error => {
    dispatch(
      toastAdded({
        title: 'Prices loading error',
        body:  error.message,
        icon:  'exclamation-triangle',
        style: 'danger'
      })
    )
  })
}

const call = (promises, keys, dispatch) => {
  Promise.all(promises).then(data => {
    const extraData = []
    const prices    = data.pop()

    helpers.chunk(data.flat(), keys.length).forEach((chunkedData, i) => {
      extraData[i] = {}
      let dataProvider
      let distributionManager = {}

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
        ...vaults[i],
        ...extraData[i],
      }

      // MATIC is the native tokenn so it doesn't need allowance
      if (vault.token === 'matic') {
        extraData[i]['allowance'] = new BigNumber(1e58.toString())
      }

      extraData[i]['apy'] = getVaultApy(
        vault,
        dataProvider,
        distributionManager,
        prices
      )
    })

    const vaultsData = vaults.map((vault, i) => {
      const usdPrice = prices && prices[vault.priceId]['usd']

      return {
        ...vault,
        ...extraData[i],
        usdPrice
      }
    })

    dispatch(vaultsLoaded(vaultsData))
    dispatch(toastDestroyed('Data loading error'))
  }).catch(error => {
    dispatch(
      toastAdded({
        title: 'Data loading error',
        body:  error.message,
        icon:  'exclamation-triangle',
        style: 'danger'
      })
    )
  })
}

export async function fetchVaultsData (address, chainId, provider, web3, dispatch) {
  // Mumbai address
  setMulticallAddress(80001, '0x5a0439824F4c0275faa88F2a7C5037F9833E29f1')
  // Polygon address
  setMulticallAddress(137, '0xc4f1501f337079077842343Ce02665D8960150B0')

  const ethersProvider  = new ethers.providers.Web3Provider(provider)
  const ethcallProvider = new Provider(ethersProvider)
  const keys            = [
    'decimals',
    'balance',
    'allowance',
    'shares',
    'pricePerFullShare',
    'tvl',
    'vaultDecimals',
    'dataProvider',
    'distributionSupply',
    'distributionBorrow'
  ]

  await ethcallProvider.init()

  const calls = vaults.flatMap(v => {
    const vault                       = require(`../abis/vaults/${chainId}/${v.token}`).default
    const token                       = require(`../abis/tokens/${chainId}/${v.token}`).default
    const pool                        = require(`../abis/pools/${chainId}/${v.pool}`).default
    const vaultContract               = new Contract(vault.address, vault.abi)
    const dataProviderContract        = new Contract(pool.dataProvider.address, pool.dataProvider.abi)
    const distributionManagerContract = new Contract(pool.distributionManager.address, pool.distributionManager.abi)

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

    return [
      decimals,
      balance,
      allowance,
      vaultContract.balanceOf(address),
      vaultContract.getPricePerFullShare(),
      vaultContract.balance(),
      vaultContract.decimals(),
      dataProviderContract.getReserveData(token.address),
      distributionManagerContract.assets(vault.aToken.address),
      distributionManagerContract.assets(vault.debtToken.address),
    ]
  })

  const promises = [ethcallProvider.all(calls), getPrices(dispatch)]

  call(promises, keys, dispatch)
}
