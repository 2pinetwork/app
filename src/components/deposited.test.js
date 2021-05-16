import { Provider } from 'react-redux'
import BigNumber from 'bignumber.js'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Deposited from './deposited'

const mockStore = configureStore([])

describe('deposited component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      vaults: {
        value: []
      }
    }

    store = mockStore(initialState)
  })

  test('renders deposited', () => {
    render(
      <Provider store={store}>
        <Deposited />
      </Provider>
    )

    const headerElement = screen.getByText(/Deposited/i)

    expect(headerElement).toBeInTheDocument()
  })
})
