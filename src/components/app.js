import React from 'react'
import Header from './header'
import Tvl from './tvl'
import Vaults from './vaults'

const App = props => {
  return (
    <div className="container mt-5 pt-4">
      <Header />
      <Tvl />
      <Vaults />
    </div>
  )
}

export default App
