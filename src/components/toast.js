import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Toast as BSToast } from 'bootstrap'
import { toastDestroyed } from '../features/toastsSlice'

const Toast = props => {
  const ref      = React.useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const element = ref.current
    const toast   = new BSToast(element, { autohide: props.autohide })

    toast.show()

    element.addEventListener('hidden.bs.toast', () => {
      dispatch(toastDestroyed(props.title))
    })
  })

  return (
    <div ref={ref}
         className={`toast border border-${props.style} border-3 bg-dark`}
         role="alert"
         aria-live="assertive"
         aria-atomic="true">
      <div className="toast-header bg-dark">
        <span className={`text-${props.style}`}>
          <i className={`bi-${props.icon} me-2`}></i>
        </span>
        <span className="me-auto fw-bold">{props.title}</span>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>

      <div className="toast-body">
        {props.body}
      </div>
    </div>
  )
}

Toast.propTypes = {
  title:    PropTypes.string.isRequired,
  body:     PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  icon:     PropTypes.string.isRequired,
  style:    PropTypes.string.isRequired,
  autohide: PropTypes.bool.isRequired
}

export default Toast
