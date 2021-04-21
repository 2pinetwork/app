import PropTypes from 'prop-types'
import Wallet from './wallet'

const Header = props => (
  <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <a className="navbar-brand me-auto" href="/">2pi</a>
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
