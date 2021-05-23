const vaults = [
  {
    key:     'dai',
    token:   'dai',
    priceId: 'dai',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'DAI',
    color:   'primary',
    borrow:  { depth: 8, percentage: 0.73 }
  },
  {
    key:     'wmatic',
    token:   'wmatic',
    priceId: 'matic-network',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'MATIC',
    color:   'primary-dark',
    borrow:  { depth: 8, percentage: 0.48 }
  },
  {
    key:     'btc',
    token:   'btc',
    priceId: 'bitcoin',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'BTC',
    color:   'info',
    borrow:  { depth: 8, percentage: 0.68 }
  },
  {
    key:     'eth',
    token:   'eth',
    priceId: 'ethereum',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'ETH',
    color:   'primary',
    borrow:  { depth: 8, percentage: 0.78 }
  },
  {
    key:     'usdc',
    token:   'usdc',
    priceId: 'usd-coin',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'USDC',
    color:   'primary-dark',
    borrow:  { depth: 8, percentage: 0.78 }
  },
  {
    key:     'usdt',
    token:   'usdt',
    priceId: 'tether',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'USDT',
    color:   'info',
    borrow:  { depth: 0, percentage: 0 }
  }
]

export default vaults
