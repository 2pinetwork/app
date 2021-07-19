import { render, screen } from '@testing-library/react'
import Experimental from './experimental'

describe('experimental component render', () => {
  test('renders experimental message', () => {
    render(<Experimental />)

    const alertElement = screen.getByText(/This application is experimental/i)

    expect(alertElement).toBeInTheDocument()
  })
})
