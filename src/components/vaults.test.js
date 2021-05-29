import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Vaults from './vaults'

const mockStore = configureStore([])

describe('vaults component render', () => {
  let store

  beforeEach(() => {
    const initialState = {
      vaults: {
        value: []
      },
      wallet: {}
    }

    store = mockStore(initialState)
  })

  test('renders vaults', () => {
    render(
      <Provider store={store}>
        <Vaults />
      </Provider>
    )

    const headerElement = screen.getByText(/Vaults$/i)

    expect(headerElement).toBeInTheDocument()
  })
})
