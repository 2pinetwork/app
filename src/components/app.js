import React from 'react'
import Header from './header'
import Tvl from './tvl'
import Vaults from './vaults'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = props => {
  return (
    <div className="container mt-5 pt-4">
      <Header />
      <Tvl />
      <Vaults />
      <ToastContainer />
    </div>
  )
}

export default App
