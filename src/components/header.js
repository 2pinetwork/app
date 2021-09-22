import Wallet from './wallet'
import logo from '../assets/images/logo.svg'

const Header = props => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-transparent mt-1">
    <div className="container">
      <a className="navbar-brand me-auto mt-n2 ms-n4 d-none d-lg-inline" href="/">
        <img src={logo} alt="2pi" width="136" height="108" />
      </a>
      <a className="navbar-brand me-auto ms-n3 d-lg-none" href="/">
        <img src={logo} alt="2pi" width="95" height="76" />
      </a>

      <button className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menu"
              aria-controls="menu"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="menu">
        <Wallet />

        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-lg-2 ms-lg-4 order-1 order-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="https://docs.2pi.network/how-to-guide" target="_blank" rel="noreferrer">
              How-to guide
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

export default Header
