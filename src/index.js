import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/react'
import { store } from './app/store'
import { dsn, integrations } from './data/sentry'
import App from './components/app'
import './css/app.scss'

Sentry.init({ dsn, integrations, tracesSampleRate: 1.0 })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
