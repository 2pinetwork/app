import { render, screen } from '@testing-library/react'
import App from './app'

test('renders 2pi finance link', () => {
  render(<App />)

  const linkElement = screen.getByText(/2pi finance/i)

  expect(linkElement).toBeInTheDocument()
})
