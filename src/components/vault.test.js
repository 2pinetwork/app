import { render, screen } from '@testing-library/react'
import Vault from './vault'

test('renders vault', () => {
  const props = {
    token: 'test-token',
    uses:  'test-pool',
    color: 'warning',
    web3:  undefined
  }

  render(<Vault {...props}/>)

  const tokenHeaderElement = screen.getByText(props.token)
  const usesHeaderElement  = screen.getByText(props.uses)

  expect(tokenHeaderElement).toBeInTheDocument()
  expect(usesHeaderElement).toBeInTheDocument()
})
