import { useSelector, useDispatch } from 'react-redux'
import { connectAsync, selectStatus } from '../features/walletSlice'

const Connect = props => {
  const status     = useSelector(selectStatus)
  const dispatch   = useDispatch()

  const buttonLabel = () => {
    if (status === 'loading') {
      return 'Connecting...'
    } else if (status === 'success') {
      return 'Connected'
    } else {
      return 'Connect'
    }
  }

  return (
    <button type="button"
            className="btn btn-outline-primary bg-dark text-primary fw-bold mt-4 mb-3 mx-auto d-block"
            disabled={['loading', 'success'].includes(status)}
            onClick={() => { dispatch(connectAsync()) }}>
      {buttonLabel()}
    </button>
  )
}

export default Connect
