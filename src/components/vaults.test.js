import { render, screen } from '@testing-library/react'
import Vaults from './vaults'

test('renders vaults', () => {
  const props = {
    web3: undefined
  }

  render(<Vaults {...props}/>)

  const headerElement = screen.getByText(/Vaults/i)

  expect(headerElement).toBeInTheDocument()
})
