import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { Contract, Provider, setMulticallAddress } from 'ethers-multicall'
import vaults from '../data/vaults'
import { vaultsLoaded } from './vaultsSlice'
import { toastAdded, toastDestroyed } from './toastsSlice'

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
    const vaults    = data.shift()
    const prices    = data.pop()
    const extraData = []

    helpers.chunk(data.flat(), keys.length).forEach((chunkedData, i) => {
      extraData[i] = {}

      chunkedData.forEach((valueData, j) => {
        if (keys[j] === 'apy') {
          // TODO: Change for compound function
          extraData[i][keys[j]] = Number(valueData.currentLiquidityRate) / 1e25
        } else {
          extraData[i][keys[j]] = new BigNumber(valueData.toString())
        }
      })
    })

    const vaultsData = vaults.map((vault, i) => {
      return {
        ...vault,
        ...extraData[i],
        usdPrice: prices && prices[vault.priceId]['usd']
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

export async function fetchVaultsData (address, provider, web3, dispatch) {
  // Mumbai address
  setMulticallAddress(80001, '0x5a0439824F4c0275faa88F2a7C5037F9833E29f1')

  const ethersProvider  = new ethers.providers.Web3Provider(provider)
  const ethcallProvider = new Provider(ethersProvider)
  const keys            = [
    'decimals',
    'balance',
    'allowance',
    'deposited',
    'pricePerFullShare',
    'tvl',
    'apy'
  ]

  await ethcallProvider.init()

  const calls = vaults.flatMap(v => {
    const vault         = require(`../abis/vaults/${v.token}`).default
    const token         = require(`../abis/tokens/${v.token}`).default
    const pool          = require(`../abis/pools/${v.pool}`).default
    const tokenContract = new Contract(token.address, token.abi)
    const vaultContract = new Contract(vault.address, vault.abi)
    const poolContract  = new Contract(pool.address, pool.abi)

    return [
      tokenContract.decimals(),
      tokenContract.balanceOf(address),
      tokenContract.allowance(address, vault.address),
      vaultContract.balanceOf(address),
      vaultContract.getPricePerFullShare(),
      vaultContract.balance(),
      poolContract.getReserveData(token.address)
    ]
  })

  const promises = [vaults, ethcallProvider.all(calls), getPrices(dispatch)]

  call(promises, keys, dispatch)
}
