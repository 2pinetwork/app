import PropTypes from 'prop-types'
import Vault from './vault'

const Vaults = props => (
  <div className="mt-1">
    <h2 className="h2 fw-bold mt-1">
      Vaults
    </h2>

    <div className="mt-3">
      <Vault color="warning" token="2pi" uses="2pi" web3={props.web3} />
    </div>
  </div>
)

Vaults.propTypes = {
  web3: PropTypes.object
}

export default Vaults
