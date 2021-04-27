import { render, screen } from '@testing-library/react'
import VaultActions from './vault_actions'

test('renders vault actions', () => {
  const props = {
    token: 'test-token',
    web3:  undefined
  }

  render(<VaultActions {...props}/>)

  const depositButtonElement  = screen.getByText('Deposit')
  const withdrawButtonElement = screen.getByText('Withdraw')

  expect(depositButtonElement).toBeInTheDocument()
  expect(withdrawButtonElement).toBeInTheDocument()
})
