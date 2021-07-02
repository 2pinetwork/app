import Head from 'next/head'
import { Provider } from 'react-redux'
import * as Sentry from '@sentry/react'
import { store } from '../src/app/store'
import App from '../src/components/app'

export default function Home() {
  return (
    <Provider store={store}>
      <Head>
        <title>2pi Finance</title>
      </Head>

      <App />
    </Provider>
  )
}
