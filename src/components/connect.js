import { useSelector, useDispatch } from 'react-redux'
import { connectAsync, selectStatus } from '../features/walletSlice'

const Connect = props => {
  const status   = useSelector(selectStatus)
  const dispatch = useDispatch()

  return (
    <button type="button"
            className="btn btn-outline-primary bg-dark text-primary fw-bold mt-4 mb-3 mx-auto d-block"
            disabled={status === 'loading'}
            onClick={() => { dispatch(connectAsync()) }}>
      {status === 'loading' ? 'Connecting...' : 'Connect'}
    </button>
  )
}

export default Connect
