import { Provider } from 'react-redux'
import BigNumber from 'bignumber.js'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Deposit from './deposit'

const mockStore = configureStore([])

describe('deposit component render', () => {
  let store

  beforeEach(() => {
    const initialState = {}

    store = mockStore(initialState)
  })

  test('renders deposit', () => {
    const props = {
      address:       '0x06012c8cf97bead5deae237070f9587f8e7a266d',
      balance:       new BigNumber(0),
      decimals:      new BigNumber(18),
      symbol:        'DAI',
      token:         'dai',
      vaultContract: () => {}
    }

    render(
      <Provider store={store}>
        <Deposit {...props} />
      </Provider>
    )

    const buttonElement = screen.getByText(/Deposit all/i)

    expect(buttonElement).toBeInTheDocument()
  })
})
