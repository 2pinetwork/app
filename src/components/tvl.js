import PropTypes from 'prop-types'

const Tvl = props => (
  <div className="text-end mt-4">
    <h2 className="h4 border-end pe-3 border-2 d-inline">
      TVL
    </h2>
    <h3 className="h4 text-primary d-inline ms-3">
      π
    </h3>
  </div>
)

Tvl.propTypes = {
  web3: PropTypes.object
}

export default Tvl
