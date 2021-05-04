import PropTypes from 'prop-types'
import Wallet from './wallet'
import logo from '../assets/images/logo.svg'

const Header = props => (
  <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-transparent pt-4">
    <div className="container">
      <a className="navbar-brand me-auto" href="/">
        <img src={logo} alt="2pi Finance" width="149" height="24" />
      </a>
      <Wallet />
    </div>
  </nav>
)

export default Header
