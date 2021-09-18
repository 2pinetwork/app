import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Header from './header'

const mockStore = configureStore([])

describe('header component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      wallet: {}
    }

    store = mockStore(initialState)
  })

  test('renders 2pi finance link', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    const linkElement = screen.getByText(/How-to guide/i)

    expect(linkElement).toBeInTheDocument()
  })
})
