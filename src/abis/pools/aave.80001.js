const dataProvider = {
  address: '0xFA3bD19110d986c5e5E9DD5F69362d05035D045B',
  abi: [
    {
      'inputs': [],
      'name': 'getAllATokens',
      'outputs': [
        {
          'components': [
            {
              'internalType': 'string',
              'name': 'symbol',
              'type': 'string'
            },
            {
              'internalType': 'address',
              'name': 'tokenAddress',
              'type': 'address'
            }
          ],
          'internalType': 'struct AaveProtocolDataProvider.TokenData[]',
          'name': '',
          'type': 'tuple[]'
        }
      ],
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'inputs': [],
      'name': 'getAllReservesTokens',
      'outputs': [
        {
          'components': [
            {
              'internalType': 'string',
              'name': 'symbol',
              'type': 'string'
            },
            {
              'internalType': 'address',
              'name': 'tokenAddress',
              'type': 'address'
            }
          ],
          'internalType': 'struct AaveProtocolDataProvider.TokenData[]',
          'name': '',
          'type': 'tuple[]'
        }
      ],
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'inputs': [
        {
          'internalType': 'address',
          'name': 'asset',
          'type': 'address'
        }
      ],
      'name': 'getReserveConfigurationData',
      'outputs': [
        {
          'internalType': 'uint256',
          'name': 'decimals',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'ltv',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'liquidationThreshold',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'liquidationBonus',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'reserveFactor',
          'type': 'uint256'
        },
        {
          'internalType': 'bool',
          'name': 'usageAsCollateralEnabled',
          'type': 'bool'
        },
        {
          'internalType': 'bool',
          'name': 'borrowingEnabled',
          'type': 'bool'
        },
        {
          'internalType': 'bool',
          'name': 'stableBorrowRateEnabled',
          'type': 'bool'
        },
        {
          'internalType': 'bool',
          'name': 'isActive',
          'type': 'bool'
        },
        {
          'internalType': 'bool',
          'name': 'isFrozen',
          'type': 'bool'
        }
      ],
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'inputs': [
        {
          'internalType': 'address',
          'name': 'asset',
          'type': 'address'
        }
      ],
      'name': 'getReserveData',
      'outputs': [
        {
          'internalType': 'uint256',
          'name': 'availableLiquidity',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'totalStableDebt',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'totalVariableDebt',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'liquidityRate',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'variableBorrowRate',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'stableBorrowRate',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'averageStableBorrowRate',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'liquidityIndex',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'variableBorrowIndex',
          'type': 'uint256'
        },
        {
          'internalType': 'uint40',
          'name': 'lastUpdateTimestamp',
          'type': 'uint40'
        }
      ],
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'inputs': [
        {
          'internalType': 'address',
          'name': 'asset',
          'type': 'address'
        }
      ],
      'name': 'getReserveTokensAddresses',
      'outputs': [
        {
          'internalType': 'address',
          'name': 'aTokenAddress',
          'type': 'address'
        },
        {
          'internalType': 'address',
          'name': 'stableDebtTokenAddress',
          'type': 'address'
        },
        {
          'internalType': 'address',
          'name': 'variableDebtTokenAddress',
          'type': 'address'
        }
      ],
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'inputs': [
        {
          'internalType': 'address',
          'name': 'asset',
          'type': 'address'
        },
        {
          'internalType': 'address',
          'name': 'user',
          'type': 'address'
        }
      ],
      'name': 'getUserReserveData',
      'outputs': [
        {
          'internalType': 'uint256',
          'name': 'currentATokenBalance',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'currentStableDebt',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'currentVariableDebt',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'principalStableDebt',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'scaledVariableDebt',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'stableBorrowRate',
          'type': 'uint256'
        },
        {
          'internalType': 'uint256',
          'name': 'liquidityRate',
          'type': 'uint256'
        },
        {
          'internalType': 'uint40',
          'name': 'stableRateLastUpdated',
          'type': 'uint40'
        },
        {
          'internalType': 'bool',
          'name': 'usageAsCollateralEnabled',
          'type': 'bool'
        }
      ],
      'stateMutability': 'view',
      'type': 'function'
    }
  ]
}

const distributionManager = {
  address: '0xd41aE58e803Edf4304334acCE4DC4Ec34a63C644',
  abi: [
    {
      'inputs': [
        {
          'internalType': 'address',
          'name': 'asset',
          'type': 'address'
        }
      ],
      'name': 'assets',
      'outputs': [
        {
          'internalType': 'uint128',
          'name': 'emissionPerSecond',
          'type': 'uint128'
        },
        {
          'internalType': 'uint128',
          'name': 'lastUpdateTimestamp',
          'type': 'uint128'
        },
        {
          'internalType': 'uint256',
          'name': 'index',
          'type': 'uint256'
        }
      ],
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'inputs': [
        {
          'internalType': 'address[]',
          'name': 'assets',
          'type': 'address[]'
        },
        {
          'internalType': 'address',
          'name': 'user',
          'type': 'address'
        }
      ],
      'name': 'getRewardsBalance',
      'outputs': [
        {
          'internalType': 'uint256',
          'name': '',
          'type': 'uint256'
        }
      ],
      'stateMutability': 'view',
      'type': 'function'
    }
  ]
}

const pool = { dataProvider, distributionManager }

export default pool
