import { toWei, fromWei } from './wei'

export const formatAmount = (amount, prefix, decimals = 2) => {
  const order = Math.floor(Math.log10(amount) / 3)

  if (order < 0) {
    return `${prefix || ''}${amount.toFixed(decimals)}`
  }

  const units  = ['', 'K', 'M', 'B', 'T', 'Q']
  const number = (amount / 1000 ** order).toFixed(decimals)

  return `${prefix || ''}${number}${units[order]}`
}

export const decimalPlaces = (decimals, max = 8) => {
  return decimals.comparedTo(max) > 0 ? max : decimals.toNumber()
}

export const toUsd = (amountInWei, decimals, usdPrice) => {
  const amount = amountInWei && fromWei(amountInWei, decimals)

  return amount?.times(usdPrice)
}

export const toWeiFormatted = (amount, decimals) => {
  return toWei(amount, decimals).toFixed(0)
}

export const fromWeiFormatted = (amount, decimals) => {
  return formatAmount(fromWei(amount, decimals))
}

export const toPercentage = number => {
  number      = (number || 0.0) * 100.0
  const fixed = (number > 0.0 && number < 10) ? 3 : 2

  return `${(number).toFixed(fixed)}%`
}
