const BigNumber = require('bignumber.js')

const SECONDS_PER_YEAR = 31536000
const BASE_HPY = 8760
const RAY_DECIMALS = '1e27'
const COMMON_DECIMALS = '1e18'

const compound = (r, n = 365, t = 1, c = 1) => {
  return (1 + (r * c) / n) ** (n * t) - 1
}

const getVaultApy = (vault, dataProvider, distributionManager, prices) => {
  // Mumbai price is 0.34
  prices = prices || {}
  prices['matic-network'] = { usd: 0.347874307 }

  const { supplyBase, supplyMatic, borrowBase, borrowMatic } = getVaultData(vault, dataProvider, distributionManager, prices)

  const {
    leveragedSupplyBase,
    leveragedBorrowBase,
    leveragedSupplyMatic,
    leveragedBorrowMatic,
  } = getLeveragedApys(
    supplyBase,
    borrowBase,
    supplyMatic,
    borrowMatic,
    vault.borrow.depth,
    vault.borrow.percentage
  )

  let totalMatic = leveragedSupplyMatic.plus(leveragedBorrowMatic)
  let compoundedMatic = compound(totalMatic, BASE_HPY, 0.96)

  return leveragedSupplyBase.minus(leveragedBorrowBase).plus(compoundedMatic).toNumber()
}

const getVaultData = (vault, dataProvider, distributionManager, prices) => {
  const availableLiquidity = new BigNumber(dataProvider.availableLiquidity.toString())
  const totalStableDebt    = new BigNumber(dataProvider.totalStableDebt.toString())
  const totalVariableDebt  = new BigNumber(dataProvider.totalVariableDebt.toString())
  const liquidityRate      = new BigNumber(dataProvider.liquidityRate.toString())
  const variableBorrowRate = new BigNumber(dataProvider.variableBorrowRate.toString())
  const tokenDecimals      = new BigNumber(10).pow(vault.decimals)

  const supplyBase = liquidityRate.div(RAY_DECIMALS)
  const borrowBase = variableBorrowRate.div(RAY_DECIMALS)

  const tokenPrice =  prices[vault.priceId].usd
  const totalBorrowInUsd = totalVariableDebt.times(tokenPrice).div(tokenDecimals)
  const totalSupplyInUsd = availableLiquidity
    .plus(totalStableDebt)
    .plus(totalVariableDebt)
    .times(tokenPrice)
    .div(tokenDecimals)

  const { supplyMaticInUsd, borrowMaticInUsd } = getMaticPerYear(
    vault, distributionManager, prices
  )
  const supplyMatic = supplyMaticInUsd.div(totalSupplyInUsd)
  const borrowMatic = totalBorrowInUsd.isZero()
    ? new BigNumber(0)
    : borrowMaticInUsd.div(totalBorrowInUsd)

  return { supplyBase, supplyMatic, borrowBase, borrowMatic }
}

const getMaticPerYear = (vault, distributionManager, prices) => {
  const supplyMaticRate = new BigNumber(distributionManager.supply.emissionPerSecond.toString())
  const borrowMaticRate = new BigNumber(distributionManager.borrow.emissionPerSecond.toString())

  const maticPrice = prices['matic-network'].usd
  const supplyMaticInUsd = supplyMaticRate.times(SECONDS_PER_YEAR).times(maticPrice).div(COMMON_DECIMALS)
  const borrowMaticInUsd = borrowMaticRate.times(SECONDS_PER_YEAR).times(maticPrice).div(COMMON_DECIMALS)

  return { supplyMaticInUsd, borrowMaticInUsd }
}

const getLeveragedApys = (
  supplyBase,
  borrowBase,
  supplyMatic,
  borrowMatic,
  depth,
  borrowPercent
) => {
  borrowPercent = new BigNumber(borrowPercent)

  // Always the supply will be the original supply percentage
  let leveragedSupplyBase = new BigNumber(supplyBase.toString())
  let leveragedSupplyMatic = new BigNumber(supplyMatic.toString())
  let leveragedBorrowBase = new BigNumber(0)
  let leveragedBorrowMatic = new BigNumber(0)

  for (let i = 1; i <= depth; i++) {
    let borrowPercentExp = borrowPercent.exponentiatedBy(i)

    leveragedSupplyBase = leveragedSupplyBase.plus(
      supplyBase.times(borrowPercentExp)
    )
    leveragedSupplyMatic = leveragedSupplyMatic.plus(
      supplyMatic.times(borrowPercentExp)
    )
    leveragedBorrowBase = leveragedBorrowBase.plus(
      borrowBase.times(borrowPercentExp)
    )
    leveragedBorrowMatic = leveragedBorrowMatic.plus(
      borrowMatic.times(borrowPercentExp)
    )
  }

  return {
    leveragedSupplyBase,
    leveragedBorrowBase,
    leveragedSupplyMatic,
    leveragedBorrowMatic,
  }
}

module.exports = { getVaultApy }
