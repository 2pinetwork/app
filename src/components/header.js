import PropTypes from 'prop-types'
import Wallet from './wallet'
import logo from '../assets/images/logo.svg'

const Header = props => (
  <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-transparent pt-4">
    <div className="container">
      <a className="navbar-brand me-auto" href="/">
        <img src={logo} alt="2pi Finance" width="149" height="24" />
      </a>
      <Wallet connecting={props.connecting}
              subscribe={props.subscribe}
              setAccount={props.setAccount}
              account={props.account}
              isConnecting={props.isConnecting} />
    </div>
  </nav>
)

Header.propTypes = {
  connecting: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
  setAccount: PropTypes.func.isRequired,
  account: PropTypes.string,
  isConnecting: PropTypes.bool.isRequired
}

export default Header
