import React from 'react'
import Header from './header'
import Tvl from './tvl'
import Vaults from './vaults'
import Toasts from './toasts'

const App = props => {
  return (
    <div className="container mt-5 pt-4">
      <Header />
      <Tvl />
      <Vaults />
      <Toasts />
    </div>
  )
}

export default App
