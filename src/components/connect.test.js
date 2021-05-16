import { Provider } from 'react-redux'
import BigNumber from 'bignumber.js'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Connect from './connect'

const mockStore = configureStore([])

describe('connect component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      wallet: {}
    }

    store = mockStore(initialState)
  })

  test('renders connect', () => {
    render(
      <Provider store={store}>
        <Connect />
      </Provider>
    )

    const buttonElement = screen.getByText(/Connect/i)

    expect(buttonElement).toBeInTheDocument()
  })
})
