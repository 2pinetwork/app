import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Wallet from './wallet'

const mockStore = configureStore([])

describe('connected wallet component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      wallet: {
        address:  '0x06012c8cf97bead5deae237070f9587f8e7a266d',
        chainId:  80001,
        provider: undefined,
        status:   'idle',
        web3:     undefined
      }
    }

    store = mockStore(initialState)
  })

  test('renders wallet with connected account', () => {
    render(
      <Provider store={store}>
        <Wallet />
      </Provider>
    )

    const linkElement = screen.getByText(/266d/i)

    expect(linkElement).toBeInTheDocument()
  })
})

describe('disconnected wallet component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      wallet: {}
    }

    store = mockStore(initialState)
  })

  test('renders wallet with no connected account', () => {
    render(
      <Provider store={store}>
        <Wallet />
      </Provider>
    )

    const linkElement = screen.getByText(/Wallet/i)

    expect(linkElement).toBeInTheDocument()
  })
})
