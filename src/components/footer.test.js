import { render, screen } from '@testing-library/react'
import Footer from './footer'

describe('footer component render', () => {
  test('renders 2pi network footer info', () => {
    render(
      <Footer />
    )

    const linkElement = screen.getByTitle(/Email us/i)

    expect(linkElement).toBeInTheDocument()
  })
})
