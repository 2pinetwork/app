import PropTypes from 'prop-types'
import React from 'react'
import { CSSTransition } from 'react-transition-group'
import VaultActions from './vault_actions'

class Vault extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    uses: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    web3: PropTypes.object
  }

  state = {
    expanded: false
  }

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  constructor (props) {
    super(props)

    this.ref = React.createRef()
  }

  classes () {
    const color = this.props.color

    return `card bg-white border border-${color} shadow-${color}`
  }

  imagePath () {
    return `/images/tokens/${this.props.token}.svg`
  }

  renderVaultActions () {
    if (this.state.expanded) {
      const { token, web3 } = this.props

      return (<VaultActions token={token} web3={web3} />)
    }
  }

  render () {
    return (
      <CSSTransition nodeRef={this.ref} key={this.props.token} in={this.state.expanded} timeout={300} classNames="vault">
        <div ref={this.ref}>
          <div className={this.classes()}>
            <div className="card-body">
              <div className="row align-items-center cursor-pointer" onClick={this.handleClick}>
                <div className="col-3 col-md-2 col-lg-2">
                  <img src={this.imagePath()} alt={this.props.token} height="48" width="48" />
                </div>
                <div className="col-9 col-md-10 col-lg-3">
                  <h3 className="h4 mb-1">
                    {this.props.token}
                  </h3>
                  <p className="small text-muted mb-0">
                    Uses:
                    <span className="ms-2">
                      {this.props.uses}
                    </span>
                  </p>
                </div>
                <div className="col-6 col-lg-2 text-lg-center mt-3 mt-lg-0">
                  <p className="small text-primary mb-0">
                    π
                  </p>
                  <p className="small text-muted mb-0">
                    Balance
                  </p>
                </div>
                <div className="col-6 col-lg-2 text-lg-center mt-3 mt-lg-0">
                  <p className="small text-primary mb-0">
                    π
                  </p>
                  <p className="small text-muted mb-0">
                    Deposited
                  </p>
                </div>
                <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
                  <p className="small text-nowrap mb-0">
                    100%
                  </p>
                  <p className="small text-muted mb-0">
                    APY
                  </p>
                </div>
                <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
                  <p className="small text-nowrap mb-0">
                    100%
                  </p>
                  <p className="small text-muted mb-0">
                    Daily
                  </p>
                </div>
                <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
                  <p className="small text-nowrap mb-0">
                    100%
                  </p>
                  <p className="small text-muted mb-0">
                    TVL
                  </p>
                </div>
              </div>

              {this.renderVaultActions()}
            </div>
          </div>
        </div>
      </CSSTransition>
    )
  }
}

export default Vault
