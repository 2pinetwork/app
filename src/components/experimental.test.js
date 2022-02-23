import { render, screen } from '@testing-library/react'
import Experimental from './experimental'

describe('experimental component render', () => {
  test('renders experimental message', () => {
    render(<Experimental />)

    const alertElement = screen.getByText(/This application has been deprecated/i)

    expect(alertElement).toBeInTheDocument()
  })
})
