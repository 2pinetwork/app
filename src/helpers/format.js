import { toWei, fromWei } from './wei'

export const formatAmount = (amount, prefix) => {
  const order = Math.floor(Math.log10(amount) / 3)

  if (order < 0) {
    return '0.00'
  }

  const units  = ['', 'K', 'M', 'B', 'T']
  const number = (amount / 1000 ** order).toFixed(2)

  return `${prefix || ''}${number}${units[order]}`
}

export const decimalPlaces = decimals => {
  return decimals.comparedTo(8) > 0 ? 8 : decimals.toNumber()
}

export const toWeiFormatted = (amount, decimals) => {
  return toWei(amount, decimals).toFixed(0)
}

export const fromWeiFormatted = (amount, decimals) => {
  return formatAmount(fromWei(amount, decimals))
}