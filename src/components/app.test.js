import { render, screen } from '@testing-library/react'
import App from './app'

test('renders Wallet and Tvl components', () => {
  render(<App />)

  const tvlElements = screen.getAllByText(/TVL/i)
  const linkElement = screen.getByText(/Wallet/i)

  tvlElements.forEach(tvlElement => {
    expect(tvlElement).toBeInTheDocument()
  })

  expect(linkElement).toBeInTheDocument()
})
