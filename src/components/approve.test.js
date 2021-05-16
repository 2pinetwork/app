import { Provider } from 'react-redux'
import BigNumber from 'bignumber.js'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Approve from './approve'

const mockStore = configureStore([])

describe('approve component render', () => {
  let store

  beforeEach(() => {
    const initialState = {}

    store = mockStore(initialState)
  })

  test('renders approve', () => {
    const props = {
      address:       '0x06012c8cf97bead5deae237070f9587f8e7a266d',
      balance:       new BigNumber(0),
      symbol:        'DAI',
      token:         'dai',
      tokenContract: () => {},
      vault:         {},
      web3:          {}
    }

    render(
      <Provider store={store}>
        <Approve {...props} />
      </Provider>
    )

    const buttonElement = screen.getByText(/Approve/i)

    expect(buttonElement).toBeInTheDocument()
  })
})
