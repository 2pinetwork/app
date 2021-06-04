import PropTypes from 'prop-types'
import React, { useState }from 'react'
import { CSSTransition } from 'react-transition-group'
import VaultActions from './vaultActions'
import { fromWei } from '../helpers/wei'
import { formatAmount, toPercentage } from '../helpers/format'
import { supportedChains } from '../features/walletSlice'

const Vault = props => {
  const ref                     = React.createRef()
  const [expanded, setExpanded] = useState(false)

  const tokenAbi = () => {
    if (supportedChains.includes(props.chainId)) {
      return require(`../abis/tokens/${props.chainId}/${props.token}`).default
    }
  }

  const vaultAbi = () => {
    if (supportedChains.includes(props.chainId)) {
      return require(`../abis/vaults/${props.chainId}/${props.token}`).default
    }
  }

  const token = tokenAbi()
  const vault = vaultAbi()

  const handleClick = () => {
    setExpanded(! expanded)
  }

  const tokenContract = (token, web3) => {
    return () => {
      if (token.abi)
        return new web3.eth.Contract(token.abi, token.address)
    }
  }

  const vaultContract = (vault, web3) => {
    return () => {
      return new web3.eth.Contract(vault.abi, vault.address)
    }
  }

  const renderVaultActions = () => {
    if (expanded) {
      const {
        address,
        allowance,
        balance,
        decimals,
        deposited,
        symbol,
        web3
      } = props

      return (
        <VaultActions address={address}
                      allowance={allowance}
                      balance={balance}
                      decimals={decimals}
                      deposited={deposited}
                      pricePerFullShare={props.pricePerFullShare}
                      symbol={symbol}
                      token={props.token}
                      tokenContract={tokenContract(token, web3)}
                      vault={vault}
                      vaultContract={vaultContract(vault, web3)}
                      vaultDecimals={props.vaultDecimals}
                      web3={web3} />
      )
    }
  }

  return (
    <CSSTransition nodeRef={ref} key={props.token} in={expanded} timeout={300} classNames="vault">
      <div ref={ref} className="my-4">
        <div className={`card border border-${props.color} border-2 bg-dark`}>
          <div className="card-body ms-2">
            <div className="row align-items-center cursor-pointer" onClick={handleClick}>
              <div className="col-3 col-md-2 col-lg-2">
                <img src={`/images/tokens/${props.token}.svg`} alt={props.token} height="48" width="48" />
              </div>
              <div className="col-9 col-md-10 col-lg-3">
                <h3 className="h4 mb-1">
                  {props.symbol}
                </h3>
                <p className="small text-muted mb-0">
                  Earn:
                  <span className="ms-2">
                    {props.earn}
                  </span>
                </p>
                <p className="small text-muted mb-0">
                  Uses:
                  <span className="ms-2">
                    {props.uses}
                  </span>
                </p>
              </div>
              <div className="col-6 col-lg-2 text-lg-center mt-3 mt-lg-0">
                <p className="small text-muted mb-0">
                  {props.balanceUsd ? formatAmount(props.balanceUsd, '$') : '-'}
                </p>
                <p className="small text-primary mb-0">
                  {props.balance ? formatAmount(fromWei(props.balance, props.decimals), '', 8) : '-'}
                </p>
                <p className="small text-muted mb-0">
                  Balance
                </p>
              </div>
              <div className="col-6 col-lg-2 text-lg-center mt-3 mt-lg-0">
                <p className="small text-muted mb-0">
                  {props.depositedUsd ? formatAmount(props.depositedUsd, '$') : '-'}
                </p>
                <p className="small text-primary mb-0">
                  {props.deposited ? formatAmount(fromWei(props.deposited, props.decimals), '', 8) : '-'}
                </p>
                <p className="small text-muted mb-0">
                  Deposited
                </p>
              </div>
              <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
                <p className="lead text-nowrap mb-0">
                  {toPercentage(props.apy)}
                </p>
                <p className="small text-muted mb-0">
                  <abbr title="Annual percentage yield">APY</abbr>
                </p>
              </div>
              <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
                <p className="text-nowrap mb-0">
                  {toPercentage((props.apy || 0.0) / 365)}
                </p>
                <p className="small text-muted mb-0">
                  Daily
                </p>
              </div>
              <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
                <p className="small text-nowrap mb-0">
                  {props.tvlUsd ? formatAmount(props.tvlUsd, '$') : '-'}
                </p>
                <p className="small text-muted mb-0">
                  <abbr title="Total assets">TA</abbr>
                </p>
              </div>
            </div>

            {renderVaultActions()}
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

Vault.propTypes = {
  address:           PropTypes.string,
  allowance:         PropTypes.object,
  apy:               PropTypes.number,
  balance:           PropTypes.object,
  balanceUsd:        PropTypes.object,
  chainId:           PropTypes.number,
  color:             PropTypes.string.isRequired,
  decimals:          PropTypes.object,
  deposited:         PropTypes.object,
  depositedUsd:      PropTypes.object,
  earn:              PropTypes.string.isRequired,
  pricePerFullShare: PropTypes.object,
  symbol:            PropTypes.string.isRequired,
  token:             PropTypes.string.isRequired,
  tvlUsd:            PropTypes.object,
  usdPrice:          PropTypes.number,
  uses:              PropTypes.string.isRequired,
  vaultDecimals:     PropTypes.object,
  web3:              PropTypes.object
}

export default Vault
