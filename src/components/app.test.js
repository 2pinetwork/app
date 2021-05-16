import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import App from './app'

const mockStore = configureStore([])

describe('app component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      toasts: [],
      vaults: {
        value: []
      },
      wallet: {}
    }

    store = mockStore(initialState)
  })

  test('renders sub-components', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const depositedElements = screen.getAllByText(/Deposited/i)
    const tvlElements = screen.getAllByText(/TVL/i)
    const linkElement = screen.getByText(/Wallet/i)

    depositedElements.forEach(depositedElement => {
      expect(depositedElement).toBeInTheDocument()
    })

    tvlElements.forEach(tvlElement => {
      expect(tvlElement).toBeInTheDocument()
    })

    expect(linkElement).toBeInTheDocument()
  })
})
