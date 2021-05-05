import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { Contract, Provider, setMulticallAddress } from 'ethers-multicall'
import vaults from '../data/vaults'
import { vaultsLoaded } from './vaultsSlice'

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

        extraData[j][keys[i]] = new BigNumber(valueData.toString())
      })
    })

    const vaultsData = vaults.map((vault, i) => {
      return {
        ...vault,
        ...extraData[i]
      }
    })

    dispatch(vaultsLoaded(vaultsData))
  })
}

export async function fetchVaultsData (address, provider, web3, dispatch) {
  // Mumbai address
  setMulticallAddress(80001, "0x5a0439824F4c0275faa88F2a7C5037F9833E29f1")

  const ethersProvider  = new ethers.providers.Web3Provider(provider)
  const ethcallProvider = new Provider(ethersProvider)
  const keys            = ['decimals', 'balance', 'allowance', 'deposited', 'tvl']

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

  const promises = [
    vaults,
    ethcallProvider.all(tokenCalls),
    ethcallProvider.all(vaultCalls)
  ]

  call(promises, keys, dispatch)
}
