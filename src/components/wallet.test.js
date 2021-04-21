import { render, screen } from '@testing-library/react'
import Wallet from './wallet'

test('renders wallet with connected account', () => {
  const props = {
    connecting:   () => false,
    subscribe:    () => {},
    setAccount:   account => undefined,
    account:      '0x06012c8cf97bead5deae237070f9587f8e7a266d',
    isConnecting: false
  }

  render(<Wallet {...props} />)

  const linkElement = screen.getByText(/266d/i)

  expect(linkElement).toBeInTheDocument()
})

test('renders wallet with no connected account', () => {
  const props = {
    connecting:   () => false,
    subscribe:    () => {},
    setAccount:   account => undefined,
    account:      undefined,
    isConnecting: false
  }

  render(<Wallet {...props} />)

  const linkElement = screen.getByText(/Wallet/i)

  expect(linkElement).toBeInTheDocument()
})
