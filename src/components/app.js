import React from 'react'
import Header from './header'
import Experimental from './experimental'
import Tvl from './tvl'
import Deposited from './deposited'
import Network from './network'
import Vaults from './vaults'
import Toasts from './toasts'
import Footer from './footer'

const App = props => {
  return (
    <div className="container">
      <Experimental />
      <Header />
      <Tvl />
      <Deposited />
      <Network />
      <Vaults />
      <Toasts />
      <Footer />
    </div>
  )
}

export default App
