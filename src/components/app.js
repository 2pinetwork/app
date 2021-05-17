import React from 'react'
import Header from './header'
import Tvl from './tvl'
import Deposited from './deposited'
import Vaults from './vaults'
import Toasts from './toasts'

const App = props => {
  return (
    <div className="container">
      <Header />
      <Tvl />
      <Deposited />
      <Vaults />
      <Toasts />
    </div>
  )
}

export default App
