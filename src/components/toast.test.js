import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import Toast from './toast'

const mockStore = configureStore([])

describe('toast component render', () => {
  let store

  beforeEach(() => {
    const initialState = {}

    store = mockStore(initialState)
  })

  test('renders toast', () => {
    const props = {
      title:    'Test title',
      body:     'Test body',
      icon:     'warning',
      style:    'danger',
      autohide: false
    }

    render(
      <Provider store={store}>
        <Toast {...props}/>
      </Provider>
    )

    const titleElement = screen.getByText(props.title)
    const bodyElement  = screen.getByText(props.body)

    expect(titleElement).toBeInTheDocument()
    expect(bodyElement).toBeInTheDocument()
  })
})
