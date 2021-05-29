import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Tvl from './tvl'

const mockStore = configureStore([])

describe('TVL component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      vaults: {
        value: []
      }
    }

    store = mockStore(initialState)
  })

  test('renders TVL', () => {
    render(
      <Provider store={store}>
        <Tvl />
      </Provider>
    )

    const headerElement = screen.getByText(/TVL/i)

    expect(headerElement).toBeInTheDocument()
  })
})
