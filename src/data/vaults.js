const localhostVauls = [
  {
    key:     '2pi',
    token:   '2pi',
    earn:    '2PI',
    priceId: 'dai',
    uses:    'Aave',
    pool:    'aave',
    symbol:  '2PI',
    color:   'primary',
    borrow:  { depth: 0, percentage: 0.73 }
  }
]

const polygonVaults = [
  {
    key:     'dai',
    token:   'dai',
    earn:    'DAI',
    priceId: 'dai',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'DAI',
    color:   'primary',
    borrow:  { depth: 8, percentage: 0.73 }
  },
  {
    key:     'matic',
    token:   'matic',
    earn:    'MATIC',
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
    earn:    'BTC',
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
    earn:    'ETH',
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
    earn:    'USDC',
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
    earn:    'USDT',
    priceId: 'tether',
    uses:    'Aave',
    pool:    'aave',
    symbol:  'USDT',
    color:   'info',
    borrow:  { depth: 0, percentage: 0 }
  }
]

const vaults = {
  137:   polygonVaults,
  1337:  localhostVauls,
  80001: polygonVaults
}

export default vaults
