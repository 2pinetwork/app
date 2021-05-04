import { render, screen } from '@testing-library/react'
import VaultActions from './vaultActions'

test('renders vault actions', () => {
  const props = {
    token:   'test-token',
    account: undefined,
    web3:    undefined
  }

  render(<VaultActions {...props}/>)

  const depositButtonElement  = screen.getByText('Deposit')
  const withdrawButtonElement = screen.getByText('Withdraw')

  expect(depositButtonElement).toBeInTheDocument()
  expect(withdrawButtonElement).toBeInTheDocument()
})
