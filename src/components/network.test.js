import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Network from './network'

const mockStore = configureStore([])

describe('network component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      wallet: {
        chainId: 137
      }
    }

    store = mockStore(initialState)
  })

  test('renders network', () => {
    render(
      <Provider store={store}>
        <Network />
      </Provider>
    )

    const networkNameElement = screen.getByText('Polygon')

    expect(networkNameElement).toBeInTheDocument()
  })
})
