import BigNumber from 'bignumber.js'

export const fromWei = (amount, decimals) => {
  return amount.div(new BigNumber(10).pow(decimals))
}

export const toWei = (amount, decimals) => {
  return amount.times(new BigNumber(10).pow(decimals))
}
