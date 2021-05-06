export const formatAmount = (amount, prefix) => {
  const order = Math.floor(Math.log10(amount) / 3)

  if (order < 0) {
    return '0.00'
  }

  const units  = ['', 'K', 'M', 'B', 'T']
  const number = (amount / 1000 ** order).toFixed(2)

  return `${prefix || ''}${number}${units[order]}`
}
