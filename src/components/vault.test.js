import { render, screen } from '@testing-library/react'
import Vault from './vault'

test('renders vault', () => {
  const props = {
    address:           undefined,
    allowance:         undefined,
    apy:               undefined,
    balance:           undefined,
    balanceUsd:        undefined,
    chainId:           undefined,
    color:             'info',
    decimals:          undefined,
    deposited:         undefined,
    depositedUsd:      undefined,
    pricePerFullShare: undefined,
    symbol:            'DAI',
    token:             'dai',
    tvlUsd:            undefined,
    usdPrice:          undefined,
    uses:              'aave',
    vaultDecimals:     undefined,
    web3:              undefined
  }

  render(<Vault {...props}/>)

  const tokenHeaderElement = screen.getByText(props.symbol)
  const usesHeaderElement  = screen.getByText(props.uses)

  expect(tokenHeaderElement).toBeInTheDocument()
  expect(usesHeaderElement).toBeInTheDocument()
})
