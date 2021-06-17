import { Provider } from 'react-redux'
import BigNumber from 'bignumber.js'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Withdraw from './withdraw'

const mockStore = configureStore([])

describe('withdraw component render', () => {
  let store

  beforeEach(() => {
    const initialState = {}

    store = mockStore(initialState)
  })

  test('renders withdraw', () => {
    const props = {
      address:       '0x06012c8cf97bead5deae237070f9587f8e7a266d',
      apy:           10,
      decimals:      new BigNumber(18),
      deposited:     new BigNumber(0),
      symbol:        'DAI',
      token:         'dai',
      vaultContract: () => {},
      vaultDecimals: new BigNumber(18)
    }

    render(
      <Provider store={store}>
        <Withdraw {...props} />
      </Provider>
    )

    const buttonElement = screen.getByText(/Withdraw all/i)

    expect(buttonElement).toBeInTheDocument()
  })
})
