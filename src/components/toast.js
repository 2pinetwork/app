import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Toast as BSToast } from 'bootstrap'

const Toast = props => {
  const ref         = React.createRef()
  const className   = `toast text-${props.textStyle} bg-${props.backgroundStyle}`
  const headerClass = `toast-header text-${props.textStyle} bg-${props.backgroundStyle}`

  useEffect(() => {
    const toast = new BSToast(ref.current, { autohide: false })

    toast.show()
  })

  return (
    <div ref={ref} className={className} role="alert" aria-live="assertive" aria-atomic="true">
      <div className={headerClass}>
        <span className="me-auto">{props.title}</span>
        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>

      <div className="toast-body">
        {props.body}
      </div>
    </div>
  )
}

Toast.propTypes = {
  title:           PropTypes.string.isRequired,
  body:            PropTypes.string.isRequired,
  backgroundStyle: PropTypes.string.isRequired,
  textStyle:       PropTypes.string.isRequired
}

export default Toast
