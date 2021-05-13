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

const call = (promises, keys, dispatch) => {
  Promise.all(promises).then(data => {
    const vaults    = data.shift()
    const extraData = []

    helpers.chunk(data.flat(), vaults.length).forEach((chunkedData, i) => {
      chunkedData.forEach((valueData, j) => {
        extraData[j] = extraData[j] || {}

        if (keys[i] === 'apy') {
          // TODO: Change for compound function
          extraData[j][keys[i]] = Number(valueData.currentLiquidityRate) / 1e25
        } else {
          extraData[j][keys[i]] = new BigNumber(valueData.toString())
        }
      })
    })

    const vaultsData = vaults.map((vault, i) => {
      return {
        ...vault,
        ...extraData[i]
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
    'tvl',
    'apy'
  ]

  await ethcallProvider.init()

  const tokenCalls = vaults.flatMap(v => {
    const vault         = require(`../abis/vaults/${v.token}`).default
    const token         = require(`../abis/tokens/${v.token}`).default
    const tokenContract = new Contract(token.address, token.abi)

    return [
      tokenContract.decimals(),
      tokenContract.balanceOf(address),
      tokenContract.allowance(address, vault.address)
    ]
  })

  const vaultCalls = vaults.flatMap(v => {
    const vault         = require(`../abis/vaults/${v.token}`).default
    const vaultContract = new Contract(vault.address, vault.abi)

    return [
      vaultContract.balanceOf(address),
      vaultContract.balance()
    ]
  })

  const poolCalls = vaults.flatMap(v => {
    const token        = require(`../abis/tokens/${v.token}`).default
    const pool         = require(`../abis/pools/${v.token}`).default
    const poolContract = new Contract(pool.address, pool.abi)

    return [
      poolContract.getReserveData(token.address)
    ]
  })

  const calls    = tokenCalls.concat(vaultCalls, poolCalls)
  const promises = [vaults, ethcallProvider.all(calls)]

  call(promises, keys, dispatch)
}
