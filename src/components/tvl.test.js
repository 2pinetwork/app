import { render, screen } from '@testing-library/react'
import Tvl from './tvl'

test('renders TVL', () => {
  const props = {
    web3: undefined
  }

  render(<Tvl {...props}/>)

  const headerElement = screen.getByText(/TVL/i)

  expect(headerElement).toBeInTheDocument()
})
