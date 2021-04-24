import { render, screen } from '@testing-library/react'
import Header from './header'

test('renders 2pi finance link', () => {
  const props = {
    connecting:   () => true,
    subscribe:    () => {},
    setAccount:   account => undefined,
    account:      '0x06012c8cf97bead5deae237070f9587f8e7a266d',
    isConnecting: false
  }

  render(<Header {...props}/>)

  const linkElement = screen.getByAltText(/2pi/i)

  expect(linkElement).toBeInTheDocument()
})
