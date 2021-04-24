import { render, screen } from '@testing-library/react'
import App from './app'

test('renders Wallet and Tvl components', () => {
  render(<App />)

  const headerElement = screen.getByText(/TVL/i)
  const linkElement   = screen.getByText(/Wallet/i)

  expect(headerElement).toBeInTheDocument()
  expect(linkElement).toBeInTheDocument()
})
